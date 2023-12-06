import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	await prismadb.$connect();
	try {
		const { userId } = auth();
		const body = await req.json();

		const { unit, aisle, bay, shelf, bin } = body;
		if (!userId)
			return new NextResponse('Unauthenticated, please log in', {
				status: 401,
			});
		if (!unit || !aisle || !bay || !shelf || !bin) {
			return new NextResponse(
				'All location fields need to be filled in.',
				{ status: 400 }
			);
		}

		const newLocation = await prismadb.location.create({
			data: {
				unit,
				aisle,
				bay,
				shelf,
				bin,
			},
		});
		return NextResponse.json(newLocation);
	} catch (error) {
		console.log('[LOCATIONS_POST_REQUEST]', error);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}

export async function GET(req: Request) {
	try {
		const locations = await prismadb.location.findMany({
			include: {
				product: true,
			},
		});

		return NextResponse.json(locations);
	} catch (error) {
		console.log('[LOCATIONS_GET_REQUEST]', error);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}
