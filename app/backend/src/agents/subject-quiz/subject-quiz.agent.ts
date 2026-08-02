import { createAgent } from 'langchain';
import { createChatModel, createResponseFormat } from '../model-factory.js';
import { createSearchSubjectsTool } from '../shared/tools/search-subjects.tool.js';
import { createGetSubjectTool } from '../shared/tools/get-subject.tool.js';
import { chatUiResponseSchema } from '../shared/ui-response.schema.js';
import { SUBJECT_QUIZ_SYSTEM_PROMPT } from './subject-quiz.prompt.js';
import { createLogger } from '../../utils/logger.js';

const log = createLogger('subject-quiz');

export async function createSubjectQuizAgent(modelId?: string): Promise<{ agent: any; def: any }> {
  const { def, model } = await createChatModel(modelId);
  log.info(`Creating Subject Quiz agent with model ${def.id}`);

  const tools = [
    createSearchSubjectsTool(),
    createGetSubjectTool(),
  ];

  const agent = createAgent({
    model,
    tools,
    systemPrompt: SUBJECT_QUIZ_SYSTEM_PROMPT,
    responseFormat: createResponseFormat(def, chatUiResponseSchema),
  });

  return { agent, def };
}
