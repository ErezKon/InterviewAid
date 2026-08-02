import { createAgent } from 'langchain';
import { createChatModel, createResponseFormat } from '../model-factory.js';
import { createSearchProblemsTool } from '../shared/tools/search-problems.tool.js';
import { createListFiltersTool } from '../shared/tools/list-filters.tool.js';
import { createGetProblemTool } from '../shared/tools/get-problem.tool.js';
import { createGetProblemHintTool } from '../shared/tools/get-problem-hint.tool.js';
import { chatUiResponseSchema } from '../shared/ui-response.schema.js';
import { MOCK_INTERVIEW_SYSTEM_PROMPT } from './mock-interview.prompt.js';
import { createLogger } from '../../utils/logger.js';

const log = createLogger('mock-interview');

export async function createMockInterviewAgent(modelId?: string): Promise<{ agent: any; def: any }> {
  const { def, model } = await createChatModel(modelId);
  log.info(`Creating Mock Interview agent with model ${def.id}`);

  const tools = [
    createListFiltersTool(),
    createSearchProblemsTool(),
    createGetProblemTool(),
    createGetProblemHintTool(),
  ];

  const agent = createAgent({
    model,
    tools,
    systemPrompt: MOCK_INTERVIEW_SYSTEM_PROMPT,
    responseFormat: createResponseFormat(def, chatUiResponseSchema),
  });

  return { agent, def };
}
