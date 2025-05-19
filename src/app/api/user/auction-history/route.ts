import { auth } from '@/auth';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ sucess: false, msg: '로그인 후 이용해주세요.' });
  }
  try {
    const res = await prisma.bidHistory.findMany({
      where: {
        userId: session.user?.id,
      },
      include: {
        Art: {
          select: {
            url: true,
            winnerId: true,
            isAuctionActive: true,
            currentPrice: true,
          },
        },
      },
      distinct: ['artId'],
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json({
      sucess: true,
      lists: res.map(item => ({
        ...item,
        id: Number(item.id),
        artId: Number(item.artId),
        userId: Number(item.userId),
      })),
    });
  } catch (error) {
    console.error('prisma get error :', error);
    return NextResponse.json({ sucess: false, msg: '데이터 조회 실패' });
  }
}
