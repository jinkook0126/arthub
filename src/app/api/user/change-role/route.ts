import { auth } from '@/auth';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { creatorName, creatorTags, creatorThumbnail, creatorDesc } = await req.json();
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ success: false, error: '로그인이 필요합니다.' });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!user) {
      return NextResponse.json({ success: false, error: '존재하지 않는 유저입니다.' });
    }
    if (user.creatorId) {
      return NextResponse.json({ success: false, error: '이미 작가 권한을 가지고 있습니다.' });
    }
    const creator = await prisma.creators.create({
      data: {
        creatorName,
        creatorTags,
        creatorThumbnail,
        creatorDesc,
      },
    });
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        creatorId: creator.id,
      },
    });
    return NextResponse.json({ success: true, creatorId: Number(creator.id) });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Unknown error' });
  }
}
