import { ChatOpenAI } from '@langchain/openai';
import { getModel } from '../config/models.js';
import { env } from '../config/env.js';
import { getAccessToken } from '../utils/oauth.util.js';
import { ChatAnthropicVertex } from '../llm/chat-anthropic-vertex.js';
import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import type { ModelDef } from '../config/models.js';

async function resolveApiKey(explicit: string | undefined): Promise<string> {
  if (explicit) return explicit;
  return getAccessToken();
}

export async function createChatModel(modelId?: string): Promise<{ def: ModelDef; model: BaseChatModel }> {
  const def = getModel(modelId);

  if (def.provider === 'anthropic-vertex') {
    const token = await resolveApiKey(env.ANTHROPIC_API_KEY || undefined);
    return {
      def,
      model: new ChatAnthropicVertex({
        accessToken: token,
        model: def.id,
        baseUrl: env.ANTHROPIC_BASE_URL || undefined,
        temperature: def.defaultTemperature,
        maxTokens: def.maxTokens,
      }),
    };
  }

  const apiKey = await resolveApiKey(env.OPENAI_API_KEY || undefined);
  return {
    def,
    model: new ChatOpenAI({
      model: def.id,
      apiKey,
      temperature: def.defaultTemperature,
      maxRetries: 3,
      timeout: 60000,
      configuration: { baseURL: env.OPENAI_BASE_URL || undefined },
    }),
  };
}

export function extractJson(text: string): any {
  // Strip markdown code fences
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const cleaned = fenceMatch ? fenceMatch[1].trim() : text.trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}
