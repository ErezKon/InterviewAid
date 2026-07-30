import path from 'node:path';
import { env } from './env.js';

export const CONTENT_ROOT = env.CONTENT_ROOT;
export const PROBLEMS_DIR = path.join(CONTENT_ROOT, 'Data', 'Problems', 'LeetCode');
export const PROBLEMS_DATA_JSON = path.join(CONTENT_ROOT, 'LeetCode', 'problems_data.json');
export const RAW_BY_COMPANY_DIR = path.join(CONTENT_ROOT, 'LeetCode', 'Raw By Company');
export const MATERIAL_DIR = path.join(CONTENT_ROOT, 'Data', 'Material');

export const DATA_DIR = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../data');
export const METADATA_DIR = path.join(DATA_DIR, 'metadata');
export const DB_PATH = path.resolve(env.DB_PATH);
