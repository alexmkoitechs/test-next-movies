import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET() {
	try {
    const data = await prisma.movies.findMany();

    return NextResponse.json([ ...data ]);
	} catch (error) {
		return NextResponse.json({ error });
	}
}