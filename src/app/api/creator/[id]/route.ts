import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
  try {
    const { id } = params;
    const res = await prisma.creators.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json({
      sucess: true,
      creator: { ...res, id: Number(res?.id) },
    });
  } catch (error) {
    console.error('prisma get error :', error);
    return NextResponse.json({ sucess: false, msg: '데이터 조회 실패' });
  }
}

export async function POST() {
  return null;
}
