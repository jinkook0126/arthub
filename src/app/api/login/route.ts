import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { compare } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return NextResponse.json({ success: false, error: '존재하지 않는 이메일입니다.' });
    }
    const isValid = await compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ success: false, error: '비밀번호가 잘못되었습니다.' });
    }
    return NextResponse.json({
      success: true,
      user: { ...user, creatorId: Number(user.creatorId), role: user.creatorId ? 'creator' : 'user' },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      const target = (e.meta as { target: string[] })?.target;
      if (target?.includes('email')) {
        return NextResponse.json({ success: false, error: '이미 존재하는 이메일입니다.' });
      }
    }
    return NextResponse.json({ success: false, error: 'Unknown error' });
  }
}
