import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

process.env.CONTENT_ROOT ??= '/home/sio/Code/Interview';
process.env.DB_PATH ??= '/tmp/interview-test-model.db';
process.env.OPENAI_API_KEY ??= 'test-key';
process.env.OPENAI_BASE_URL ??= 'https://localhost:9999';
process.env.ANTHROPIC_API_KEY ??= 'test-key';
process.env.ANTHROPIC_BASE_URL ??= 'https://localhost:9998';
process.env.GOOGLE_API_KEY ??= 'test-key';
process.env.GOOGLE_BASE_URL ??= 'https://localhost:9997';
process.env.OAUTH_CLIENT_ID ??= 'test-id';
process.env.OAUTH_CLIENT_SECRET ??= 'test-secret';

const { MODELS, getModel, detectProvider, DEFAULT_MODEL_ID } = await import('../config/models.js');

describe('Model registry', () => {
  it('should have at least 5 models', () => {
    assert.ok(MODELS.length >= 5, `Expected >=5 models, got ${MODELS.length}`);
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
    assert.equal(m.provider, 'anthropic');
  });

  it('getModel should return gemini-2.5-pro when requested', () => {
    const m = getModel('gemini-2.5-pro');
    assert.equal(m.id, 'gemini-2.5-pro');
    assert.equal(m.provider, 'google');
  });

  it('getModel should auto-detect provider for unknown model ids', () => {
    const claude = getModel('claude-3-haiku-20240307');
    assert.equal(claude.provider, 'anthropic');

    const gemini = getModel('gemini-1.5-pro-latest');
    assert.equal(gemini.provider, 'google');

    const openai = getModel('gpt-4o');
    assert.equal(openai.provider, 'openai-like');
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

  it('anthropic provider should NOT support structured output', () => {
    const ant = MODELS.find(m => m.provider === 'anthropic');
    assert.ok(ant, 'Should have an anthropic model');
    assert.equal(ant!.supportsStructuredOutput, false);
  });

  it('google provider should NOT support structured output', () => {
    const google = MODELS.find(m => m.provider === 'google');
    assert.ok(google, 'Should have a google model');
    assert.equal(google!.supportsStructuredOutput, false);
  });
});

describe('detectProvider', () => {
  it('should detect anthropic from claude model names', () => {
    assert.equal(detectProvider('claude-opus-4.6'), 'anthropic');
    assert.equal(detectProvider('claude-sonnet-4'), 'anthropic');
    assert.equal(detectProvider('claude-3-haiku-20240307'), 'anthropic');
    assert.equal(detectProvider('anthropic-custom-model'), 'anthropic');
  });

  it('should detect google from gemini model names', () => {
    assert.equal(detectProvider('gemini-2.5-pro'), 'google');
    assert.equal(detectProvider('gemini-2.5-flash'), 'google');
    assert.equal(detectProvider('gemini-1.5-pro-latest'), 'google');
  });

  it('should default to openai-like for other models', () => {
    assert.equal(detectProvider('gpt-oss-120b'), 'openai-like');
    assert.equal(detectProvider('gpt-4o'), 'openai-like');
    assert.equal(detectProvider('llama-3.1-70b'), 'openai-like');
    assert.equal(detectProvider('mistral-large'), 'openai-like');
    assert.equal(detectProvider('some-custom-model'), 'openai-like');
  });
});
