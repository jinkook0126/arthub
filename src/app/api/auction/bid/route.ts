import { auth } from '@/auth';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: '로그인이 필요합니다.' });
  }
  const { auctionIdx, price } = await request.json();
  const auction = await prisma.art.findUnique({
    where: { id: auctionIdx },
  });
  if (!auction) {
    return NextResponse.json({ success: false, error: '작품이 존재하지 않습니다.' });
  }
  const { currentPrice } = auction;
  if (price <= currentPrice) {
    return NextResponse.json({ success: false, error: '응찰가가 현재가보다 낮습니다.' });
  }
  await prisma.bidHistory.create({
    data: {
      artId: auctionIdx,
      userId: session.user.id,
      bidAmount: price,
      currAmount: currentPrice,
    },
  });
  await prisma.art.update({
    where: { id: auctionIdx },
    data: { currentPrice: price, bidCount: { increment: 1 } },
  });
  return NextResponse.json({ success: true });
}
