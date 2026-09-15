import { ChatOpenAI } from '@langchain/openai';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { toolStrategy } from 'langchain';
import { getModel } from '../config/models.js';
import { env } from '../config/env.js';
import { getAccessToken } from '../utils/oauth.util.js';
import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import type { ModelDef } from '../config/models.js';
import type { z } from 'zod';

/**
 * Resolve an API key for the OpenAI-like provider.
 * Uses the explicit OPENAI_API_KEY if set, otherwise falls back to OAuth.
 */
async function resolveOpenAIKey(): Promise<string> {
  if (env.OPENAI_API_KEY) return env.OPENAI_API_KEY;
  return getAccessToken();
}

export async function createChatModel(
  modelId?: string,
  temperature?: number,
  /** Per-request timeout in ms (default 120 000 = 2 min). */
  timeout?: number,
): Promise<{ def: ModelDef; model: BaseChatModel }> {
  const def = getModel(modelId);
  const requestTimeout = timeout ?? 120_000;

  switch (def.provider) {
    case 'anthropic': {
      return {
        def,
        model: new ChatAnthropic({
          model: def.id,
          anthropicApiKey: env.ANTHROPIC_API_KEY || undefined,
          temperature: temperature ?? def.defaultTemperature,
          maxTokens: def.maxTokens,
          maxRetries: 3,
          ...(env.ANTHROPIC_BASE_URL && {
            clientOptions: { baseURL: env.ANTHROPIC_BASE_URL },
          }),
        }),
      };
    }

    case 'google': {
      return {
        def,
        model: new ChatGoogleGenerativeAI({
          model: def.id,
          apiKey: env.GOOGLE_API_KEY || undefined,
          temperature: temperature ?? def.defaultTemperature,
          maxOutputTokens: def.maxTokens,
          maxRetries: 3,
        }),
      };
    }

    case 'openai-like':
    default: {
      const apiKey = await resolveOpenAIKey();
      return {
        def,
        model: new ChatOpenAI({
          model: def.id,
          apiKey,
          temperature: temperature ?? def.defaultTemperature,
          maxRetries: 3,
          timeout: requestTimeout,
          configuration: { baseURL: env.OPENAI_BASE_URL || undefined },
        }),
      };
    }
  }
}

/**
 * Pick the structured-output strategy for a model.
 * - openai-like: native JSON-schema response format — pass the Zod schema directly.
 * - anthropic / google: no native structured output, so force the schema through
 *   a synthetic tool call via toolStrategy().
 */
export function createResponseFormat(def: ModelDef, schema: z.ZodTypeAny): any {
  return def.supportsStructuredOutput ? schema : toolStrategy(schema);
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
