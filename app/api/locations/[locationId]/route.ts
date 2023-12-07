import { HTTP_STATUS } from '@/lib/enums/statusCodes';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
	req: Request,
	{ params }: { params: { locationId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', {
				status: HTTP_STATUS.UNAUTHENTICATED,
			});
		}

		if (!params.locationId) {
			return new NextResponse('Location id is required', {
				status: HTTP_STATUS.BAD_REQUEST,
			});
		}

		const location = await prismadb.location.findUnique({
			where: { id: params.locationId },
			include: {
				product: true,
			},
		});

		return NextResponse.json(location);
	} catch (error) {
		console.log('LOCATION_GET_REQUEST', error);
		return new NextResponse('Internal error', {
			status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
		});
	}
}
export async function PATCH(
	req: Request,
	{ params }: { params: { locationId: string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const { unit, aisle, bay, shelf, bin, quantity, productId } = body;

		if (!userId) {
			return new NextResponse('Unauthenticated', {
				status: HTTP_STATUS.UNAUTHENTICATED,
			});
		}

		if (!params.locationId) {
			return new NextResponse('Location id is required', {
				status: HTTP_STATUS.BAD_REQUEST,
			});
		}

		const location = await prismadb.location.update({
			where: {
				id: params.locationId,
			},
			data: {
				unit,
				aisle,
				bay,
				shelf,
				bin,
				quantity,
				productId,
			},
		});

		return NextResponse.json(location);
	} catch (error) {
		console.log('LOCATION_PATCH_REQUEST', error);
		return new NextResponse('Internal error', {
			status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
		});
	}
}

export async function DELETE(
	_req: Request,
	{ params }: { params: { locationId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', {
				status: HTTP_STATUS.UNAUTHENTICATED,
			});
		}

		if (!params.locationId) {
			return new NextResponse('Location id is required', {
				status: HTTP_STATUS.BAD_REQUEST,
			});
		}

		const location = await prismadb.location.delete({
			where: {
				id: params.locationId,
			},
		});

		return NextResponse.json(location);
	} catch (error) {
		console.log('LOCATION_DELETE_REQUEST', error);
		return new NextResponse('Internal error', {
			status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
		});
	}
}
