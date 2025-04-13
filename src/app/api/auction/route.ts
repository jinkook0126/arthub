import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const res = await prisma.art.findMany({
      include: {
        Creators: {
          select: {
            creatorName: true,
          },
        },
      },
    });
    return NextResponse.json({
      sucess: true,
      art: res.map(item => ({
        ...item,
        id: Number(item.id),
        sellerId: Number(item.sellerId),
        winnerId: Number(item.winnerId),
      })),
    });
  } catch (error) {
    console.error('prisma get error :', error);
    return NextResponse.json({ sucess: false, msg: '데이터 조회 실패' });
  }
}

export async function POST() {
  return null;
}
