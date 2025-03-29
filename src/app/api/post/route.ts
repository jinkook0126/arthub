import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const res = await prisma.post.create({
    data: {
      content: 'hello supabase',
    },
  });
  console.log(res);
  return NextResponse.json('ok!');
}

export async function POST() {
  const res = await prisma.post.create({
    data: {},
  });
  console.log(res);
  return NextResponse.json('ok!');
}
