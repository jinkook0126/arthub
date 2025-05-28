import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, name } = await req.json();
  try {
    const user = await prisma.user.findUnique({
      where: { email, name },
    });
    if (!user) {
      return NextResponse.json({ success: false, error: '일치하는 사용자가 없습니다.' });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: '네트워크 오류 발생' });
  }
}

export async function PUT(req: Request) {
  const { email, name, password } = await req.json();
  try {
    await prisma.user.update({
      where: { email, name },
      data: { password: await hash(password, 10) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: '네트워크 오류 발생' });
  }
}
