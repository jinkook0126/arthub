import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, msg: 'ID is required' }, { status: 400 });
    }

    const res = await prisma.art.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      include: {
        Creators: {
          select: {
            creatorName: true,
            creatorDesc: true,
            creatorThumbnail: true,
            id: true,
          },
        },
      },
    });
    return NextResponse.json({
      success: true,
      art: {
        ...res,
        id: Number(res?.id),
        sellerId: Number(res?.sellerId),
        Creators: { ...res?.Creators, id: Number(res?.Creators?.id) },
      },
    });
  } catch (error) {
    console.error('prisma get error :', error);
    return NextResponse.json({ success: false, msg: '데이터 조회 실패' });
  }
}

export async function POST() {
  return null;
}
