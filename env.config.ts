import { config } from 'dotenv';
import * as process from 'node:process';

config();

const env = process.env;

export default {
  DB_URL: env.DB_URL!,
  JWT_SECRET: env.JWT_SECRET!
};
