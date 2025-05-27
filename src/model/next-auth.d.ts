import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role: 'user' | 'creator';
      id: string;
      creatorId: number;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'user' | 'creator';
    id: string;
    creatorId: number;
  }
}
