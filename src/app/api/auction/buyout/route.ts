import { auth } from '@/auth';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: '로그인이 필요합니다.' });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    if (!user) {
      return NextResponse.json({ success: false, error: '사용자 정보를 찾을 수 없습니다.' });
    }
    const { auctionIdx } = await request.json();
    const auction = await prisma.art.findUnique({
      where: { id: auctionIdx },
    });
    if (!auction) {
      return NextResponse.json({ success: false, error: '작품이 존재하지 않습니다.' });
    }
    if (user.deposit < auction.buyoutPrice) {
      return NextResponse.json({ success: false, error: '예치금이 부족합니다.' });
    }
    const previousBid = await prisma.bidHistory.findFirst({
      where: {
        artId: auctionIdx,
      },
      orderBy: {
        id: 'desc',
      },
    });
    if (previousBid) {
      await prisma.user.update({
        where: { id: previousBid.userId },
        data: {
          deposit: { increment: previousBid.bidAmount },
          heldDeposit: { decrement: previousBid.bidAmount },
        },
      });
    }
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        deposit: { decrement: auction.buyoutPrice },
      },
    });
    await prisma.bidHistory.create({
      data: {
        artId: auctionIdx,
        userId: session.user.id,
        bidAmount: auction.buyoutPrice,
        currAmount: auction.currentPrice,
      },
    });
    await prisma.art.update({
      where: { id: auctionIdx },
      data: {
        currentPrice: auction.buyoutPrice,
        bidCount: { increment: 1 },
        winnerId: session.user?.id,
        isAuctionActive: false,
      },
    });
    return NextResponse.json({ success: true, data: { balance: user.deposit - auction.buyoutPrice } });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
}
