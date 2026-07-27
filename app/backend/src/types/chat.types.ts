export interface ChatThread {
  id: string;
  title: string | null;
  mode: string;
  modelId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  payloadJson: string | null;
  createdAt: string;
}

export interface InterviewSession {
  id: string;
  threadId: string;
  targetCompany: string | null;
  targetRole: string | null;
  planJson: string;
  currentStep: number;
  stage: string | null;
  status: string | null;
  createdAt: string;
  updatedAt: string;
}
