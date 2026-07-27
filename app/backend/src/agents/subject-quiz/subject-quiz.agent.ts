import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { SystemMessage } from '@langchain/core/messages';
import { createChatModel } from '../model-factory.js';
import { createSearchSubjectsTool } from '../shared/tools/search-subjects.tool.js';
import { createGetSubjectTool } from '../shared/tools/get-subject.tool.js';
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

  const agent = createReactAgent({
    llm: model,
    tools,
    prompt: new SystemMessage(SUBJECT_QUIZ_SYSTEM_PROMPT),
  });

  return { agent, def };
}
