import { HTTP_STATUS } from '@/lib/enums/statusCodes';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
export async function PATCH(req: Request) {
	try {
		await prismadb.$connect();
		const { userId } = auth();
		const body = await req.json();
		const { name, contactInformation } = body;

		if (!userId) {
			return new NextResponse('Unauthenticated', {
				status: HTTP_STATUS.UNAUTHENTICATED,
			});
		}

		if (!name || !contactInformation) {
			return new NextResponse(
				'Name and Contact Information are required',
				{
					status: HTTP_STATUS.BAD_REQUEST,
				}
			);
		}

		const supplier = await prismadb.supplier.create({
			data: {
				name,
				contactInformation,
			},
		});

		return NextResponse.json(supplier);
	} catch (error) {
		console.log('[SUPPLIER_POST_REQUEST]', error);
		return new NextResponse('Internal Server Error', {
			status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
		});
	}
}

export async function GET(req: Request) {
	try {
		const suppliers = await prismadb.supplier.findMany({
			include: {
				productsSupplied: true,
			},
		});

		return NextResponse.json(suppliers);
	} catch (error) {
		console.log('[SUPPLIERS_GET_REQUEST]', error);
		return new NextResponse('Internal Server Error', {
			status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
		});
	}
}
