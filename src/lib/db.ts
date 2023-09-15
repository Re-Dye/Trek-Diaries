import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { getDbUrl } from './secrets';
 
neonConfig.fetchConnectionCache = true;
 
const sql = neon(getDbUrl());
const db = drizzle(sql);