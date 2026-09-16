import { createAgent } from 'langchain';
import { createChatModel, createResponseFormat } from '../model-factory.js';
import { createSearchProblemsTool } from '../shared/tools/search-problems.tool.js';
import { createListFiltersTool } from '../shared/tools/list-filters.tool.js';
import { createGetProblemTool } from '../shared/tools/get-problem.tool.js';
import { createGetProblemHintTool } from '../shared/tools/get-problem-hint.tool.js';
import { createSearchSubjectsTool } from '../shared/tools/search-subjects.tool.js';
import { createGetSubjectTool } from '../shared/tools/get-subject.tool.js';
import { chatUiResponseSchema } from '../shared/ui-response.schema.js';
import { FREE_CHAT_SYSTEM_PROMPT } from './free-chat.prompt.js';
import { createLogger } from '../../utils/logger.js';

const log = createLogger('free-chat');

export async function createFreeChatAgent(modelId?: string): Promise<{ agent: any; def: any }> {
  const { def, model } = await createChatModel(modelId);
  log.info(`Creating Free Chat agent with model ${def.id}`);

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
    systemPrompt: FREE_CHAT_SYSTEM_PROMPT,
    responseFormat: createResponseFormat(def, chatUiResponseSchema),
  });

  return { agent, def };
}
