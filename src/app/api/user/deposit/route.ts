import { auth } from '@/auth';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: '로그인이 필요합니다.' });
  }
  const { amount } = await req.json();
  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    if (!user) {
      return NextResponse.json({ success: false, error: '사용자 정보를 찾을 수 없습니다.' });
    }
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        deposit: { increment: amount },
      },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: '예치금 충전에 실패하였습니다.' });
  }
}
