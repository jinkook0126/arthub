import { ICreatorRequestBody } from '@/model/artist';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const res = await prisma.creators.findMany();
    return NextResponse.json({
      sucess: true,
      lists: res
        .map(item => ({ ...item, id: Number(item.id) }))
        .sort((a, b) => a.creatorName.localeCompare(b.creatorName)),
    });
  } catch (error) {
    console.error('prisma get error :', error);
    return NextResponse.json({ sucess: false, msg: '데이터 조회 실패' });
  }
}

export async function POST(req: Request) {
  try {
    const { creatorName, creatorDesc, creatorTags }: ICreatorRequestBody = await req.json();
    let parsedTags: string[] = [];
    if (creatorTags) {
      parsedTags = creatorTags.split(',');
    }
    await prisma.creators.create({
      data: {
        creatorDesc,
        creatorName,
        creatorTags: parsedTags,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }
}
