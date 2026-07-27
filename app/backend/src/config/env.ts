import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('3100').transform(Number),
  CONTENT_ROOT: z.string().min(1, 'CONTENT_ROOT is required'),
  DB_PATH: z.string().default('./data/interview.db'),
  OAUTH_CLIENT_ID: z.string().optional().default(''),
  OAUTH_CLIENT_SECRET: z.string().optional().default(''),
  OAUTH_TOKEN_URL: z.string().optional().default(''),
  OPENAI_API_KEY: z.string().optional().default(''),
  OPENAI_BASE_URL: z.string().optional().default(''),
  ANTHROPIC_API_KEY: z.string().optional().default(''),
  ANTHROPIC_BASE_URL: z.string().optional().default(''),
  DEBUG_RUNS: z.string().default('false').transform(v => v === 'true'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  for (const issue of parsed.error.issues) {
    console.error(`   ${issue.path.join('.')}: ${issue.message}`);
  }
  console.error('\n   Copy .env.example to .env and fill in the required values.\n');
  process.exit(1);
}

export const env = parsed.data;
