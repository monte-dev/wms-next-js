import { HTTP_STATUS } from '@/lib/enums/statusCodes';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	await prismadb.$connect();
	try {
		const { userId } = auth();
		const body = await req.json();

		const { name, description, SKU, price, supplierId, quantity } = body;
		if (!userId)
			return new NextResponse('Unauthenticated, please log in', {
				status: HTTP_STATUS.UNAUTHENTICATED,
			});
		if (
			!name ||
			!description ||
			!SKU ||
			!price ||
			!supplierId ||
			!quantity
		) {
			return new NextResponse(
				'All required fields need to be filled in.',
				{ status: HTTP_STATUS.BAD_REQUEST }
			);
		}

		const newProduct = await prismadb.product.create({
			data: {
				name,
				description,
				SKU,
				price,
				supplierId,
				quantity,
			},
		});

		return NextResponse.json(newProduct);
	} catch (error) {
		console.log('[PRODUCT_POST_REQUEST]', error);
		return new NextResponse('Internal Server Error', {
			status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
		});
	}
}

export async function GET(req: Request) {
	try {
		const products = await prismadb.product.findMany({
			include: {
				locations: true,
				orders: true,
			},
		});

		return NextResponse.json(products);
	} catch (error) {
		console.log('[PRODUCT_GET_REQUEST]', error);
		return new NextResponse('Internal Server Error', {
			status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
		});
	}
}
