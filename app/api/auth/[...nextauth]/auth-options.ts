import { NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

// Demo user for running without a database
const DEMO_USER = {
  id: 'demo-user-id',
  email: 'admin@demo.com',
  password: 'demo123',
  name: 'Demo Admin',
  status: 'ACTIVE' as const,
  roleId: 'admin-role-id',
  roleName: 'Administrator',
  avatar: null,
};

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'Remember me', type: 'boolean' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error(
            JSON.stringify({
              code: 400,
              message: 'Please enter both email and password.',
            }),
          );
        }

        if (
          credentials.email !== DEMO_USER.email ||
          credentials.password !== DEMO_USER.password
        ) {
          throw new Error(
            JSON.stringify({
              code: 401,
              message: 'Invalid credentials. Use admin@demo.com / demo123',
            }),
          );
        }

        return {
          id: DEMO_USER.id,
          status: DEMO_USER.status,
          email: DEMO_USER.email,
          name: DEMO_USER.name,
          roleId: DEMO_USER.roleId,
          avatar: DEMO_USER.avatar,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      async profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name || 'Anonymous',
          status: 'ACTIVE' as const,
          roleId: DEMO_USER.roleId,
          roleName: DEMO_USER.roleName,
          avatar: profile.picture || null,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({
      token,
      user,
      session,
      trigger,
    }: {
      token: JWT;
      user: User;
      session?: Session;
      trigger?: 'signIn' | 'signUp' | 'update';
    }) {
      if (trigger === 'update' && session?.user) {
        token = session.user;
      } else {
        if (user && user.roleId) {
          token.id = (user.id || token.sub) as string;
          token.email = user.email;
          token.name = user.name;
          token.avatar = user.avatar;
          token.status = user.status;
          token.roleId = user.roleId;
          token.roleName = DEMO_USER.roleName;
        }
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.avatar = token.avatar;
        session.user.status = token.status;
        session.user.roleId = token.roleId;
        session.user.roleName = token.roleName;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
};

export default authOptions;
