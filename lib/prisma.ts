// Mock Prisma client - no database connection required
// This allows the project to run without a database setup

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createMockModel = () => ({
  findUnique: async () => null,
  findFirst: async () => null,
  findMany: async () => [],
  create: async (args: { data: unknown }) => args.data,
  update: async (args: { data: unknown }) => args.data,
  updateMany: async () => ({ count: 0 }),
  delete: async () => ({}),
  deleteMany: async () => ({ count: 0 }),
  count: async () => 0,
  findFirstOrThrow: async () => {
    throw new Error('Not found');
  },
  upsert: async (args: { create: unknown }) => args.create,
});

export const prisma = {
  user: createMockModel(),
  userRole: createMockModel(),
  userPermission: createMockModel(),
  userRolePermission: createMockModel(),
  verificationToken: createMockModel(),
  systemSetting: createMockModel(),
  systemLog: createMockModel(),
  account: createMockModel(),
  session: createMockModel(),
  $transaction: async (fn: ((tx: typeof prisma) => Promise<unknown>) | Promise<unknown>[]) => {
    if (typeof fn === 'function') return fn(prisma);
    return Promise.all(fn);
  },
  $disconnect: async () => {},
};

// Prisma namespace stub to replace @prisma/client Prisma namespace
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Prisma {
  export type TransactionClient = typeof prisma;
}

export default prisma;
