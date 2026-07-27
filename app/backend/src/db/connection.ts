import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { DB_PATH } from '../config/paths.js';
import { createLogger } from '../utils/logger.js';

const log = createLogger('db');

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    const dir = path.dirname(DB_PATH);
    fs.mkdirSync(dir, { recursive: true });

    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    log.info(`Connected to SQLite at ${DB_PATH}`);
  }
  return db;
}

export function initSchema(): void {
  const schemaPath = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    'schema.sql',
  );
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  const database = getDb();

  // Split on semicolons and execute each statement
  const statements = schema
    .split(';')
    .map(s => s.split('\n').filter(line => !line.trim().startsWith('--')).join('\n').trim())
    .filter(s => s.length > 0);

  for (const stmt of statements) {
    try {
      database.exec(stmt);
    } catch (err) {
      // Skip errors for "already exists" when using IF NOT EXISTS
      const message = err instanceof Error ? err.message : String(err);
      if (!message.includes('already exists')) {
        log.warn(`Schema statement failed: ${message}`);
      }
    }
  }
  log.info('Schema initialized');
}

export function closeDb(): void {
  if (db) {
    db.close();
    db = null;
    log.info('Database closed');
  }
}
