import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
  try {
    const { id } = params;
    const creator = await prisma.creators.findUnique({
      where: {
        id,
      },
    });
    const art = await prisma.art.findMany({
      where: {
        sellerId: id,
      },
      select: {
        url: true,
        id: true,
        isAuctionActive: true,
      },
    });
    return NextResponse.json({
      sucess: true,
      creator: { ...creator, id: Number(creator?.id) },
      art: art.map(item => ({ ...item, id: Number(item.id) })),
    });
  } catch (error) {
    console.error('prisma get error :', error);
    return NextResponse.json({ sucess: false, msg: '데이터 조회 실패' });
  }
}

export async function POST() {
  return null;
}
