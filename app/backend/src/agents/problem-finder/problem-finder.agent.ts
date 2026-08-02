import { createAgent } from 'langchain';
import { createChatModel, createResponseFormat } from '../model-factory.js';
import { createSearchProblemsTool } from '../shared/tools/search-problems.tool.js';
import { createListFiltersTool } from '../shared/tools/list-filters.tool.js';
import { createGetProblemTool } from '../shared/tools/get-problem.tool.js';
import { createGetProblemHintTool } from '../shared/tools/get-problem-hint.tool.js';
import { createSearchSubjectsTool } from '../shared/tools/search-subjects.tool.js';
import { createGetSubjectTool } from '../shared/tools/get-subject.tool.js';
import { chatUiResponseSchema } from '../shared/ui-response.schema.js';
import { PROBLEM_FINDER_SYSTEM_PROMPT } from './problem-finder.prompt.js';
import { createLogger } from '../../utils/logger.js';

const log = createLogger('problem-finder');

export async function createProblemFinderAgent(modelId?: string): Promise<{ agent: any; def: any }> {
  const { def, model } = await createChatModel(modelId);
  log.info(`Creating Problem Finder agent with model ${def.id}`);

  const tools = [
    createListFiltersTool(),
    createSearchProblemsTool(),
    createGetProblemTool(),
    createGetProblemHintTool(),
    createSearchSubjectsTool(),
    createGetSubjectTool(),
  ];

  const agent = createAgent({
    model,
    tools,
    systemPrompt: PROBLEM_FINDER_SYSTEM_PROMPT,
    responseFormat: createResponseFormat(def, chatUiResponseSchema),
  });

  return { agent, def };
}
