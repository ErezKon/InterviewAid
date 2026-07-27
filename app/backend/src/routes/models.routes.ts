import { Router } from 'express';
import { MODELS, DEFAULT_MODEL_ID } from '../config/models.js';

export const modelsRouter = Router();

modelsRouter.get('/models', (_req, res) => {
  res.json({
    data: MODELS.map(m => ({
      id: m.id,
      label: m.label,
      provider: m.provider,
      supportsTools: m.supportsTools,
      supportsStructuredOutput: m.supportsStructuredOutput,
    })),
    meta: { defaultModelId: DEFAULT_MODEL_ID },
  });
});
