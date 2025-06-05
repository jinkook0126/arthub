import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password, name, phone, creatorName, creatorTags, creatorThumbnail, creatorDesc } = await req.json();
  try {
    const hashed = await hash(password, 10);
    const creator = await prisma.creators.create({
      data: {
        creatorName,
        creatorTags,
        creatorThumbnail,
        creatorDesc,
      },
    });
    await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
        phone,
        creatorId: creator.id,
      },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      const target = (e.meta as { target: string[] })?.target;
      if (target?.includes('email')) {
        return NextResponse.json({ success: false, error: '이미 존재하는 이메일입니다.' });
      }
    }
    return NextResponse.json({ success: false, error: 'Unknown error' });
  }
}
