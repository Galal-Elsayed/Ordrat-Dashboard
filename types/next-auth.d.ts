import 'next-auth';
import 'next-auth/jwt';

interface Branch {
  id: string;
  nameEn?: string;
  nameAr?: string;
  isMain?: boolean;
  [key: string]: unknown;
}

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    error?: 'RefreshAccessTokenError';
    user: {
      id: string; // sellerId
      name: string;
      email: string;
      avatar?: string | null; // kept for backward compat with profile/avatar features
      shopId: string;
      roles: string[];
      branches: Branch[];
      mainBranchId: string | null;
      userType: string;
      subdomain: string;
    };
  }

  interface User {
    id: string; // sellerId
    name: string;
    email: string;
    avatar?: string | null;
    accessToken: string;
    refreshToken: string;
    shopId: string;
    roles: string[];
    branches: Branch[];
    mainBranchId: string | null;
    userType: string;
    subdomain: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number; // Unix ms timestamp
    shopId: string;
    sellerId: string;
    name: string;
    email: string;
    roles: string[];
    branches: Branch[];
    mainBranchId: string | null;
    userType: string;
    subdomain: string;
    error?: 'RefreshAccessTokenError';
  }
}
