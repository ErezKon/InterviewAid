PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS problems (
  slug TEXT PRIMARY KEY,
  leetcode_id INTEGER,
  title TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy','Medium','Hard')),
  acceptance REAL,
  url TEXT,
  file_path TEXT NOT NULL,
  primary_topic TEXT NOT NULL,
  seniority TEXT,
  interview_value INTEGER,
  one_liner TEXT,
  has_solution INTEGER NOT NULL DEFAULT 0,
  description_md TEXT,
  examples_md TEXT,
  solution_md TEXT,
  complexity_md TEXT,
  follow_ups_md TEXT,
  takeaway_md TEXT,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS topics (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  kind TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS companies (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  problem_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS problem_topics (
  problem_slug TEXT,
  topic_id TEXT,
  PRIMARY KEY (problem_slug, topic_id)
);

CREATE TABLE IF NOT EXISTS problem_companies (
  problem_slug TEXT,
  company_slug TEXT,
  frequency REAL,
  PRIMARY KEY (problem_slug, company_slug)
);

CREATE TABLE IF NOT EXISTS problem_patterns (
  problem_slug TEXT,
  pattern TEXT,
  PRIMARY KEY (problem_slug, pattern)
);

CREATE TABLE IF NOT EXISTS subjects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  source_file TEXT NOT NULL,
  heading_level INTEGER,
  primary_topic TEXT,
  key_concepts TEXT,
  word_count INTEGER,
  body_md TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS subject_topics (
  subject_id TEXT,
  topic_id TEXT,
  PRIMARY KEY (subject_id, topic_id)
);

-- Session persistence
CREATE TABLE IF NOT EXISTS chat_threads (
  id TEXT PRIMARY KEY,
  title TEXT,
  mode TEXT NOT NULL,
  model_id TEXT NOT NULL,
  created_at TEXT,
  updated_at TEXT
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY,
  thread_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  payload_json TEXT,
  created_at TEXT
);

CREATE TABLE IF NOT EXISTS interview_sessions (
  id TEXT PRIMARY KEY,
  thread_id TEXT NOT NULL,
  target_company TEXT,
  target_role TEXT,
  plan_json TEXT NOT NULL,
  current_step INTEGER DEFAULT 0,
  stage TEXT,
  status TEXT,
  created_at TEXT,
  updated_at TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_problems_difficulty ON problems(difficulty);
CREATE INDEX IF NOT EXISTS idx_problems_primary_topic ON problems(primary_topic);
CREATE INDEX IF NOT EXISTS idx_pc_company ON problem_companies(company_slug);
CREATE INDEX IF NOT EXISTS idx_pt_topic ON problem_topics(topic_id);
CREATE INDEX IF NOT EXISTS idx_msg_thread ON chat_messages(thread_id, created_at);
