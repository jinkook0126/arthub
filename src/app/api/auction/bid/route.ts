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
  try {
    const auction = await prisma.art.findUnique({
      where: { id: auctionIdx },
    });
    if (!auction) {
      return NextResponse.json({ success: false, error: '작품이 존재하지 않습니다.' });
    }
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    if (!user) {
      return NextResponse.json({ success: false, error: '사용자 정보를 찾을 수 없습니다.' });
    }
    if (auction.sellerId === user.creatorId) {
      return NextResponse.json({ success: false, error: '작가 본인은 입찰할 수 없습니다.' });
    }
    const { currentPrice, buyoutPrice } = auction;
    if (price <= currentPrice) {
      return NextResponse.json({ success: false, error: '응찰가가 현재가보다 낮습니다.' });
    }
    const buyout = price >= buyoutPrice;
    await prisma.bidHistory.create({
      data: {
        artId: auctionIdx,
        userId: session.user.id,
        bidAmount: Math.min(price, buyoutPrice),
        currAmount: currentPrice,
      },
    });
    await prisma.art.update({
      where: { id: auctionIdx },
      data: {
        currentPrice: Math.min(price, buyoutPrice),
        bidCount: { increment: 1 },
        isAuctionActive: !buyout,
        winnerId: buyout ? session.user.id : null,
      },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
}
