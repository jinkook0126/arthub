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
          if (data.success) return { ...data.user, role: 'user' };
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session, user: { ...session.user, role: token.role as string, id: token.id as string } };
    },
  },
} satisfies NextAuthConfig;
