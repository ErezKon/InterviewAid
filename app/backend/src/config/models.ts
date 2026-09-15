export type Provider = 'openai-like' | 'anthropic' | 'google';

export interface ModelDef {
  id: string;
  label: string;
  provider: Provider;
  supportsTools: boolean;
  supportsStructuredOutput: boolean;
  defaultTemperature: number;
  maxTokens: number;
}

export const MODELS: ModelDef[] = [
  {
    id: 'gpt-oss-120b',
    label: 'GPT-OSS 120B',
    provider: 'openai-like',
    supportsTools: true,
    supportsStructuredOutput: true,
    defaultTemperature: 0.3,
    maxTokens: 4096,
  },
  {
    id: 'claude-opus-4.6',
    label: 'Claude Opus 4.6',
    provider: 'anthropic',
    supportsTools: true,
    supportsStructuredOutput: false,
    defaultTemperature: 0.5,
    maxTokens: 4096,
  },
  {
    id: 'claude-sonnet-4',
    label: 'Claude Sonnet 4',
    provider: 'anthropic',
    supportsTools: true,
    supportsStructuredOutput: false,
    defaultTemperature: 0.3,
    maxTokens: 4096,
  },
  {
    id: 'gemini-2.5-pro',
    label: 'Gemini 2.5 Pro',
    provider: 'google',
    supportsTools: true,
    supportsStructuredOutput: false,
    defaultTemperature: 0.3,
    maxTokens: 8192,
  },
  {
    id: 'gemini-2.5-flash',
    label: 'Gemini 2.5 Flash',
    provider: 'google',
    supportsTools: true,
    supportsStructuredOutput: false,
    defaultTemperature: 0.3,
    maxTokens: 8192,
  },
];

export const DEFAULT_MODEL_ID = 'gpt-oss-120b';

/**
 * Auto-detect provider from a model name (fallback for model IDs not in registry).
 * - /claude|anthropic/i  → 'anthropic'
 * - /gemini/i            → 'google'
 * - Everything else      → 'openai-like'
 */
export function detectProvider(modelName: string): Provider {
  const lower = modelName.toLowerCase();
  if (/claude|anthropic/.test(lower)) return 'anthropic';
  if (/gemini/.test(lower)) return 'google';
  return 'openai-like';
}

/**
 * Look up a model by ID. If not found, create a dynamic ModelDef
 * using auto-detected provider from the model name.
 */
export function getModel(id?: string): ModelDef {
  if (!id) return MODELS[0];
  const found = MODELS.find(m => m.id === id);
  if (found) return found;

  const provider = detectProvider(id);
  return {
    id,
    label: id,
    provider,
    supportsTools: true,
    supportsStructuredOutput: provider === 'openai-like',
    defaultTemperature: 0.3,
    maxTokens: 4096,
  };
}
