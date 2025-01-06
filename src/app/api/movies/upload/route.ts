import { type NextRequest, NextResponse } from "next/server";
import { uploadFileToS3 } from "../helpers";
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const file = formData.get("file");
		const title = formData.get("title");
		const year = formData.get("year");
		const movieId = formData.get("id");
    
    const fileName = `${Date.now()}.jpeg`;

		if(!file) {
			return NextResponse.json( { error: "File is required."}, { status: 400 } );
		} 

    if (file instanceof File) {
      const buffer = Buffer.from(await file.arrayBuffer());
      await uploadFileToS3(buffer, fileName);
    }

    const reqData = {
      title: title as string,
      year: year as string,
      imgUrl: process.env.NEXT_PUBLIC_AWS_HOSTNAME + fileName,
    };

    if (movieId) {
      await prisma.movies.update({
        where: { id: +movieId },
        data: reqData,
      });
    } else {
      await prisma.movies.create({
        data: reqData,
      });
    }

    return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error });
	}
}