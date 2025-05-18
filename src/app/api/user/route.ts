import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { compare, hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password, name } = await req.json();
  try {
    const hashed = await hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
      },
    });
    return NextResponse.json({ success: true });
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

export async function PUT(req: Request) {
  const { password, newPassword } = await req.json();
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ success: false, error: '로그인이 필요합니다.' });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email,
      },
    });
    if (!user) {
      return NextResponse.json({ success: false, error: '존재하지 않는 유저입니다.' });
    }
    const isValid = await compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ success: false, error: '비밀번호가 잘못되었습니다.' });
    }
    const hashed = await hash(newPassword, 10);
    await prisma.user.update({
      where: {
        email: session.user?.email,
      },
      data: { password: hashed },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Unknown error' });
  }
}
