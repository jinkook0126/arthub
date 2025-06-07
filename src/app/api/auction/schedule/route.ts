import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST() {
  try {
    const auctions = await prisma.art.findMany({
      where: {
        auctionEndAt: { lt: new Date() },
        isAuctionActive: true,
      },
    });
    /* eslint-disable no-await-in-loop */
    auctions.forEach(async auction => {
      if (auction.bidCount && auction.bidCount > 0) {
        const winner = await prisma.bidHistory.findFirst({
          where: {
            artId: auction.id,
          },
          orderBy: {
            bidAmount: 'desc',
          },
        });
        if (winner) {
          await prisma.user.update({
            where: { id: winner.userId },
            data: { heldDeposit: { decrement: winner.bidAmount } },
          });
        }
        await prisma.art.update({
          where: { id: auction.id },
          data: { isAuctionActive: false, winnerId: winner?.userId || null },
        });
      } else {
        await prisma.art.update({
          where: { id: auction.id },
          data: { isAuctionActive: false },
        });
      }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}
