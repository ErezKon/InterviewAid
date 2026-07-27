import { BaseChatModel, type BaseChatModelParams } from '@langchain/core/language_models/chat_models';
import { AIMessage, BaseMessage } from '@langchain/core/messages';
import { type ChatResult, type ChatGeneration } from '@langchain/core/outputs';
import { CallbackManagerForLLMRun } from '@langchain/core/callbacks/manager';
import type { BindToolsInput } from '@langchain/core/language_models/chat_models';

export interface ChatAnthropicVertexInput extends BaseChatModelParams {
  accessToken: string;
  model?: string;
  baseUrl?: string;
  projectId?: string;
  region?: string;
  temperature?: number;
  maxTokens?: number;
}

export class ChatAnthropicVertex extends BaseChatModel {
  private accessToken: string;
  private modelId: string;
  private baseUrl: string;
  private projectId: string;
  private region: string;
  private temperature: number;
  private maxTokens: number;
  private _boundTools: BindToolsInput[] = [];

  constructor(fields: ChatAnthropicVertexInput) {
    super(fields);
    this.accessToken = fields.accessToken;
    this.modelId = fields.model ?? 'claude-sonnet-5';
    this.baseUrl = (fields.baseUrl ?? '').replace(/\/+$/, '');
    this.projectId = fields.projectId ?? 'gcp-dsx-gpu';
    this.region = fields.region ?? 'global';
    this.temperature = fields.temperature ?? 0.5;
    this.maxTokens = fields.maxTokens ?? 4096;
  }

  _llmType(): string {
    return 'anthropic-vertex';
  }

  bindTools(tools: BindToolsInput[], _kwargs?: Record<string, unknown>): this {
    const clone = Object.create(Object.getPrototypeOf(this));
    Object.assign(clone, this);
    clone._boundTools = tools;
    return clone;
  }

  async _generate(
    messages: BaseMessage[],
    _options: this['ParsedCallOptions'],
    _runManager?: CallbackManagerForLLMRun,
  ): Promise<ChatResult> {
    let systemPrompt: string | undefined;
    const apiMessages: Array<{ role: string; content: any }> = [];

    for (const msg of messages) {
      const type = msg._getType();

      if (type === 'system') {
        systemPrompt = typeof msg.content === 'string'
          ? msg.content
          : JSON.stringify(msg.content);
        continue;
      }

      if (type === 'tool') {
        apiMessages.push({
          role: 'user',
          content: [{
            type: 'tool_result',
            tool_use_id: (msg as any).tool_call_id,
            content: typeof msg.content === 'string'
              ? msg.content
              : JSON.stringify(msg.content),
          }],
        });
        continue;
      }

      const role = type === 'human' ? 'user' : type === 'ai' ? 'assistant' : 'user';

      if (type === 'ai' && (msg as AIMessage).tool_calls?.length) {
        const content: any[] = [];
        if (typeof msg.content === 'string' && msg.content) {
          content.push({ type: 'text', text: msg.content });
        }
        for (const tc of (msg as AIMessage).tool_calls!) {
          content.push({
            type: 'tool_use',
            id: tc.id,
            name: tc.name,
            input: tc.args,
          });
        }
        apiMessages.push({ role: 'assistant', content });
      } else {
        apiMessages.push({
          role,
          content: typeof msg.content === 'string'
            ? msg.content
            : JSON.stringify(msg.content),
        });
      }
    }

    const mergedMessages = this.mergeConsecutiveRoles(apiMessages);

    const url =
      `${this.baseUrl}/projects/${this.projectId}/locations/${this.region}` +
      `/publishers/anthropic/models/${this.modelId}:rawPredict`;

    const body: Record<string, any> = {
      anthropic_version: 'vertex-2023-10-16',
      max_tokens: this.maxTokens,
      temperature: this.temperature,
      messages: mergedMessages,
    };

    if (systemPrompt) {
      body.system = systemPrompt;
    }

    if (this._boundTools.length > 0) {
      body.tools = this.formatToolsForAnthropic();
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      throw new Error(
        `Anthropic Vertex API error: ${response.status} ${response.statusText}. ${errBody.slice(0, 1000)}`,
      );
    }

    const data = await response.json() as any;
    return this.parseAnthropicResponse(data);
  }

  private mergeConsecutiveRoles(
    messages: Array<{ role: string; content: any }>,
  ): Array<{ role: string; content: any }> {
    if (messages.length === 0) return messages;

    const merged: Array<{ role: string; content: any }> = [];
    for (const msg of messages) {
      const last = merged[merged.length - 1];
      if (last && last.role === msg.role) {
        const lastContent = Array.isArray(last.content)
          ? last.content
          : [{ type: 'text', text: String(last.content) }];
        const msgContent = Array.isArray(msg.content)
          ? msg.content
          : [{ type: 'text', text: String(msg.content) }];
        last.content = [...lastContent, ...msgContent];
      } else {
        merged.push({ ...msg });
      }
    }
    return merged;
  }

  private formatToolsForAnthropic(): any[] {
    return this._boundTools.map((tool: any) => {
      let inputSchema: any = { type: 'object', properties: {} };

      if (tool.input_schema) {
        inputSchema = tool.input_schema;
      } else if (tool.schema) {
        try {
          const { zodToJsonSchema } = require('zod-to-json-schema');
          inputSchema = zodToJsonSchema(tool.schema);
          delete inputSchema.$schema;
          delete inputSchema.default;
        } catch {
          inputSchema = { type: 'object', properties: {} };
        }
      } else if (tool.type === 'function' && tool.function) {
        return {
          name: tool.function.name,
          description: tool.function.description ?? '',
          input_schema: tool.function.parameters ?? { type: 'object', properties: {} },
        };
      }

      return {
        name: tool.name ?? 'unknown',
        description: tool.description ?? '',
        input_schema: inputSchema,
      };
    });
  }

  private parseAnthropicResponse(data: any): ChatResult {
    const contentBlocks = data.content ?? [];
    let textContent = '';
    const toolCalls: Array<{ id: string; name: string; args: Record<string, any> }> = [];

    for (const block of contentBlocks) {
      if (block.type === 'text') {
        textContent += block.text;
      } else if (block.type === 'tool_use') {
        toolCalls.push({
          id: block.id,
          name: block.name,
          args: block.input ?? {},
        });
      }
    }

    const aiMessage = new AIMessage({
      content: textContent,
      tool_calls: toolCalls.length > 0 ? toolCalls : undefined,
    });

    return {
      generations: [{
        text: textContent,
        message: aiMessage,
      }] as ChatGeneration[],
    };
  }
}
