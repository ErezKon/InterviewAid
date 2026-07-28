import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { SystemMessage } from '@langchain/core/messages';
import { createChatModel } from '../model-factory.js';
import { createScanProblemsTool } from './tools/scan-problems.tool.js';
import { createReadProblemFileTool } from './tools/read-problem-file.tool.js';
import { createEnrichProblemFileTool } from './tools/enrich-problem-file.tool.js';
import { createUpdateProblemMetadataTool } from './tools/update-problem-metadata.tool.js';
import { createReadAuditReportTool } from './tools/read-audit-report.tool.js';
import { CONTENT_ENRICHER_SYSTEM_PROMPT } from './content-enricher.prompt.js';
import { createLogger } from '../../utils/logger.js';

const log = createLogger('content-enricher');

export async function createContentEnricherAgent(modelId?: string): Promise<{ agent: any; def: any }> {
  const { def, model } = await createChatModel(modelId);
  log.info(`Creating Content Enricher agent with model ${def.id}`);

  const tools = [
    createScanProblemsTool(),
    createReadProblemFileTool(),
    createEnrichProblemFileTool(),
    createUpdateProblemMetadataTool(),
    createReadAuditReportTool(),
  ];

  const agent = createReactAgent({
    llm: model,
    tools,
    prompt: new SystemMessage(CONTENT_ENRICHER_SYSTEM_PROMPT),
  });

  return { agent, def };
}
