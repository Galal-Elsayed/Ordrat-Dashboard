// Mock Prisma client - no database connection required
// This allows the project to run without a database setup

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRecord = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createMockModel = (): any => ({
  findUnique: async (_args?: AnyRecord): Promise<AnyRecord | null> => null,
  findFirst: async (_args?: AnyRecord): Promise<AnyRecord | null> => null,
  findMany: async (_args?: AnyRecord): Promise<AnyRecord[]> => [],
  create: async (args: { data: AnyRecord }): Promise<AnyRecord> => args.data,
  update: async (args: { data: AnyRecord }): Promise<AnyRecord> => args.data,
  updateMany: async (_args?: AnyRecord) => ({ count: 0 }),
  delete: async (_args?: AnyRecord): Promise<AnyRecord> => ({}),
  deleteMany: async (_args?: AnyRecord) => ({ count: 0 }),
  count: async (_args?: AnyRecord): Promise<number> => 0,
  findFirstOrThrow: async (_args?: AnyRecord): Promise<AnyRecord> => {
    throw new Error('Not found');
  },
  upsert: async (args: { create: AnyRecord }): Promise<AnyRecord> => args.create,
});

type MockModel = ReturnType<typeof createMockModel>;

interface PrismaClient {
  user: MockModel;
  userRole: MockModel;
  userPermission: MockModel;
  userRolePermission: MockModel;
  verificationToken: MockModel;
  systemSetting: MockModel;
  systemLog: MockModel;
  account: MockModel;
  session: MockModel;
  $transaction: (fn: ((tx: PrismaClient) => Promise<unknown>) | Promise<unknown>[]) => Promise<unknown>;
  $disconnect: () => Promise<void>;
}

export const prisma: PrismaClient = {
  user: createMockModel(),
  userRole: createMockModel(),
  userPermission: createMockModel(),
  userRolePermission: createMockModel(),
  verificationToken: createMockModel(),
  systemSetting: createMockModel(),
  systemLog: createMockModel(),
  account: createMockModel(),
  session: createMockModel(),
  $transaction: async (fn: ((tx: PrismaClient) => Promise<unknown>) | Promise<unknown>[]) => {
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
