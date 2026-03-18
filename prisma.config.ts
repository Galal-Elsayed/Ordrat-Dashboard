import path from 'node:path';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  earlyAccess: true,
  schema: path.join('prisma', 'schema.prisma'),
  migrate: {
    async adapter(env) {
      const { PrismaNeon } = await import('@prisma/adapter-neon');
      const { neonConfig, Pool } = await import('@neondatabase/serverless');
      const { WebSocket } = await import('ws');

      neonConfig.webSocketConstructor = WebSocket;
      const pool = new Pool({ connectionString: env.DIRECT_URL ?? env.DATABASE_URL });
      return new PrismaNeon(pool);
    },
  },
  client: {
    async adapter(env) {
      const { PrismaNeon } = await import('@prisma/adapter-neon');
      const { neonConfig, Pool } = await import('@neondatabase/serverless');
      const { WebSocket } = await import('ws');

      neonConfig.webSocketConstructor = WebSocket;
      const pool = new Pool({ connectionString: env.DATABASE_URL });
      return new PrismaNeon(pool);
    },
  },
});
