import { auth } from '@/auth';
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
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json({
      sucess: true,
      art: res.map(item => ({
        ...item,
        id: Number(item.id),
        sellerId: Number(item.sellerId),
      })),
    });
  } catch (error) {
    console.error('prisma get error :', error);
    return NextResponse.json({ sucess: false, msg: '데이터 조회 실패' });
  }
}

export async function POST(req: Request) {
  const { artTitle, artDesc, artSize, artMaterial, artCreatedAt, url, startingPrice, buyoutPrice, auctionEndAt } =
    await req.json();
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ success: false, error: '로그인이 필요합니다.' });
  }
  if (session?.user?.role !== 'creator') {
    return NextResponse.json({ success: false, error: '작가 권한이 필요합니다.' });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    if (!user) {
      return NextResponse.json({ success: false, error: '작가 정보를 찾을 수 없습니다.' });
    }
    await prisma.art.create({
      data: {
        artTitle,
        artDesc,
        artSize,
        artMaterial,
        artCreatedAt: new Date(artCreatedAt),
        url,
        startingPrice,
        buyoutPrice,
        auctionEndAt: new Date(auctionEndAt),
        currentPrice: startingPrice,
        sellerId: user.creatorId,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('prisma get error :', error);
    return NextResponse.json({ sucess: false, msg: '데이터 조회 실패' });
  }
}
