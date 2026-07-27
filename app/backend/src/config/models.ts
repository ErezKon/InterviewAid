export type Provider = 'openai-like' | 'anthropic-vertex';

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
    provider: 'anthropic-vertex',
    supportsTools: true,
    supportsStructuredOutput: false,
    defaultTemperature: 0.5,
    maxTokens: 4096,
  },
];

export const DEFAULT_MODEL_ID = 'gpt-oss-120b';

export const getModel = (id?: string): ModelDef =>
  MODELS.find(m => m.id === id) ?? MODELS[0];
