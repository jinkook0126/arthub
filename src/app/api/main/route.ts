import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function GET() {
  try {
    const artList = await prisma.art.findMany({
      where: {
        isAuctionActive: true,
        auctionEndAt: {
          gte: new Date(),
        },
      },
      include: {
        Creators: {
          select: {
            creatorName: true,
          },
        },
      },
      orderBy: {
        currentPrice: 'desc',
      },
      take: 5,
    });

    const sellerIdLists = await prisma.art.groupBy({
      by: ['sellerId'],
      _sum: {
        bidCount: true,
      },
      orderBy: {
        _sum: {
          bidCount: 'desc',
        },
      },
      take: 4,
    });
    const creatorList = await prisma.creators.findMany({
      where: {
        id: {
          in: sellerIdLists.map(seller => Number(seller.sellerId)),
        },
      },
    });
    return NextResponse.json({
      success: true,
      data: {
        artList: artList.map(art => ({
          ...art,
          id: Number(art.id),
          sellerId: Number(art.sellerId),
        })),
        creatorList: creatorList.map(creator => ({
          ...creator,
          id: Number(creator.id),
        })),
      },
    });
  } catch (error) {
    console.error('Error fetching main:', error);
    return NextResponse.json({
      success: false,
      error: 'fetch error',
    });
  }
}
