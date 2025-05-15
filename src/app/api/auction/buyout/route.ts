import { auth } from '@/auth';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: '로그인이 필요합니다.' });
  }
  const { auctionIdx } = await request.json();
  const auction = await prisma.art.findUnique({
    where: { id: auctionIdx },
  });
  if (!auction) {
    return NextResponse.json({ success: false, error: '작품이 존재하지 않습니다.' });
  }
  await prisma.art.update({
    where: { id: auctionIdx },
    data: {
      currentPrice: auction.buyoutPrice,
      bidCount: { increment: 1 },
      winnerId: session.user?.id,
      isAuctionActive: false,
    },
  });
  return NextResponse.json({ success: true });
}
