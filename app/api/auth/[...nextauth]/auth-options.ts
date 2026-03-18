import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  loginWithCredentials,
  refreshAccessToken,
} from '@/lib/ordrat-api/auth';
import { filterKnownRoles } from '@/config/roles';

const SELLER_SETUP_URL = 'https://ordrat.com';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error(
            JSON.stringify({ code: 400, message: 'Please enter both email and password.' }),
          );
        }

        const data = await loginWithCredentials(
          credentials.email,
          credentials.password,
        ).catch((err: Error) => {
          throw new Error(JSON.stringify({ code: 401, message: err.message }));
        });

        // Incomplete seller setup — redirect to onboarding instead of dashboard
        if (!data.shopId) {
          throw new Error(
            JSON.stringify({
              code: 302,
              message: 'Shop setup incomplete.',
              redirectUrl: `${SELLER_SETUP_URL}/ar/sellerSettings?sellerId=${data.id}`,
            }),
          );
        }

        const mainBranch =
          data.branches.find((b) => b.isMain) ?? data.branches[0] ?? null;

        return {
          id: data.id,
          name: `${data.firstName} ${data.lastName}`.trim(),
          email: data.email,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          shopId: data.shopId,
          roles: filterKnownRoles(data.roles),
          branches: data.branches,
          mainBranchId: mainBranch?.id ?? null,
          userType: data.userType,
          subdomain: data.subdomain,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days — refresh token determines real TTL
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      // Initial sign-in: populate all JWT fields from authorize() return value
      if (trigger === 'signIn' && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpiresAt: Date.now() + 55 * 60 * 1000,
          shopId: user.shopId,
          sellerId: user.id,
          name: user.name ?? '',
          email: user.email ?? '',
          roles: user.roles,
          branches: user.branches,
          mainBranchId: user.mainBranchId ?? null,
          userType: user.userType,
          subdomain: user.subdomain,
          error: undefined,
        } as JWT;
      }

      // Token still valid — return as-is
      if (Date.now() < (token.accessTokenExpiresAt ?? 0) - 60_000) {
        return token;
      }

      // Access token near/past expiry — attempt silent refresh
      try {
        const refreshed = await refreshAccessToken(token.refreshToken);
        const mainBranch =
          refreshed.branches.find((b) => b.isMain) ??
          refreshed.branches[0] ??
          null;

        return {
          ...token,
          accessToken: refreshed.accessToken,
          refreshToken: refreshed.refreshToken,
          accessTokenExpiresAt: Date.now() + 55 * 60 * 1000,
          roles: filterKnownRoles(refreshed.roles),
          branches: refreshed.branches,
          mainBranchId: mainBranch?.id ?? null,
          error: undefined,
        } as JWT;
      } catch (err) {
        const isAuthError =
          err instanceof Error && err.message === 'RefreshAccessTokenError';

        if (isAuthError) {
          // Hard failure — mark session as expired so proxy can redirect
          return { ...token, error: 'RefreshAccessTokenError' } as JWT;
        }

        // Network error — fail-open, keep existing token
        return token;
      }
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.user = {
        id: token.sellerId,
        name: token.name ?? '',
        email: token.email ?? '',
        shopId: token.shopId,
        roles: token.roles ?? [],
        branches: token.branches ?? [],
        mainBranchId: token.mainBranchId,
        userType: token.userType,
        subdomain: token.subdomain,
      };
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
};

export default authOptions;
