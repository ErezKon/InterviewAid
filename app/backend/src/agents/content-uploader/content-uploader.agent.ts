import { createAgent } from 'langchain';
import { createChatModel } from '../model-factory.js';
import { createClassifyContentTool } from './tools/classify-content.tool.js';
import { createSplitMaterialTool } from './tools/split-material.tool.js';
import { createSaveUploadedFilesTool } from './tools/save-uploaded-files.tool.js';
import { CONTENT_UPLOADER_SYSTEM_PROMPT } from './content-uploader.prompt.js';
import { createLogger } from '../../utils/logger.js';
import type { UploadContext } from './upload-context.js';

const log = createLogger('content-uploader');

/**
 * Content uploader timeout — 5 minutes per LLM request.
 * The agent may need to process large files with many sections.
 */
const UPLOADER_TIMEOUT_MS = 300_000;

export async function createContentUploaderAgent(
  fileContents: Array<{ name: string; content: string }>,
  modelId?: string,
): Promise<{ agent: any; def: any }> {
  // Normalise line endings — uploaded files may use CRLF (\r\n) which breaks
  // heading regexes that rely on the $ anchor after split('\n').
  const ctx: UploadContext = {
    originalFiles: new Map(
      fileContents.map(f => [f.name, f.content.replace(/\r\n?/g, '\n')]),
    ),
    splitFiles: new Map(),
  };

  const { def, model } = await createChatModel(modelId, undefined, UPLOADER_TIMEOUT_MS);
  log.info(`Creating Content Uploader agent with model ${def.id}`);

  const tools = [
    createClassifyContentTool(ctx),
    createSplitMaterialTool(ctx),
    createSaveUploadedFilesTool(ctx),
  ];

  const agent = createAgent({
    model,
    tools,
    systemPrompt: CONTENT_UPLOADER_SYSTEM_PROMPT,
  });

  return { agent, def };
}
