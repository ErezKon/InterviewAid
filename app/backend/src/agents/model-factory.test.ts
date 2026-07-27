import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

process.env.CONTENT_ROOT ??= '/home/sio/Code/Interview';
process.env.DB_PATH ??= '/tmp/interview-test-model.db';
process.env.OPENAI_API_KEY ??= 'test-key';
process.env.OPENAI_BASE_URL ??= 'https://localhost:9999';
process.env.ANTHROPIC_API_KEY ??= 'test-key';
process.env.ANTHROPIC_BASE_URL ??= 'https://localhost:9998';
process.env.OAUTH_CLIENT_ID ??= 'test-id';
process.env.OAUTH_CLIENT_SECRET ??= 'test-secret';

const { MODELS, getModel, DEFAULT_MODEL_ID } = await import('../config/models.js');

describe('Model registry', () => {
  it('should have at least 2 models', () => {
    assert.ok(MODELS.length >= 2, `Expected >=2 models, got ${MODELS.length}`);
  });

  it('should have gpt-oss-120b as default', () => {
    assert.equal(DEFAULT_MODEL_ID, 'gpt-oss-120b');
  });

  it('getModel should return gpt-oss-120b by default', () => {
    const m = getModel();
    assert.equal(m.id, 'gpt-oss-120b');
    assert.equal(m.provider, 'openai-like');
  });

  it('getModel should return claude-opus-4.6 when requested', () => {
    const m = getModel('claude-opus-4.6');
    assert.equal(m.id, 'claude-opus-4.6');
    assert.equal(m.provider, 'anthropic-vertex');
  });

  it('getModel should fallback to first model for unknown id', () => {
    const m = getModel('nonexistent-model');
    assert.equal(m.id, MODELS[0].id);
  });

  it('every model should have required fields', () => {
    for (const m of MODELS) {
      assert.ok(m.id, 'id required');
      assert.ok(m.label, 'label required');
      assert.ok(m.provider, 'provider required');
      assert.equal(typeof m.supportsTools, 'boolean');
      assert.equal(typeof m.supportsStructuredOutput, 'boolean');
      assert.equal(typeof m.defaultTemperature, 'number');
      assert.equal(typeof m.maxTokens, 'number');
      assert.ok(m.maxTokens > 0);
    }
  });

  it('openai-like provider should support structured output', () => {
    const oai = MODELS.find(m => m.provider === 'openai-like');
    assert.ok(oai, 'Should have an openai-like model');
    assert.equal(oai!.supportsStructuredOutput, true);
  });

  it('anthropic-vertex provider should NOT support structured output', () => {
    const ant = MODELS.find(m => m.provider === 'anthropic-vertex');
    assert.ok(ant, 'Should have an anthropic-vertex model');
    assert.equal(ant!.supportsStructuredOutput, false);
  });
});
