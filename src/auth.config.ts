import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';

export default {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await res.json();
          if (data.success) return data.user;
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return { ...token, ...user };
      }
      if (trigger === 'update') {
        const updatedToken = { ...token };
        if (session.user.balance) {
          updatedToken.balance = session.user.balance;
        }
        if (session.user.creatorId) {
          updatedToken.creatorId = session.user.creatorId;
        }
        if (session.user.role) {
          updatedToken.role = session.user.role;
        }
        return updatedToken;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role as string,
          id: token.id as string,
          creatorId: token.creatorId as number,
          balance: token.balance as number,
        },
      };
    },
  },
} satisfies NextAuthConfig;
