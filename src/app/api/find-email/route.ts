import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { phone, name } = await req.json();
  try {
    const user = await prisma.user.findUnique({
      where: { phone, name },
    });
    if (!user) {
      return NextResponse.json({ success: false, error: '일치하는 사용자가 없습니다.' });
    }
    return NextResponse.json({ success: true, email: user.email });
  } catch (error) {
    return NextResponse.json({ success: false, error: '네트워크 오류 발생' });
  }
}
