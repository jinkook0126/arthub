import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ sucess: false, msg: 'userId가 없습니다.' });
  }

  try {
    const res = await prisma.bidHistory.findMany({
      where: {
        userId,
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
      list: res.map(item => ({
        ...item,
        id: Number(item.id),
        artId: Number(item.artId),
      })),
    });
  } catch (error) {
    console.error('prisma get error :', error);
    return NextResponse.json({ sucess: false, msg: '데이터 조회 실패' });
  }
}
