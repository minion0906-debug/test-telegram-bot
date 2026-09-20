import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const search = params.get("search") || "";
  const page = Number(params.get("page") || 1);
  const limit = 20;

  const where = search ? {
    OR: [
      { firstName: { contains: search } },
      { username: { contains: search } },
      { telegramId: { contains: search } },
      { phone: { contains: search } },
      { country: { contains: search } }
    ]
  } : {};

  const users = await prisma.telegramUser.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit
  });

  const total = await prisma.telegramUser.count({ where });

  return NextResponse.json({
    users,
    total,
    pages: Math.ceil(total / limit)
  });
}
