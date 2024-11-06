import { client } from './db/db';

global.afterAll(async () => {
  await client.close();
});