import { HTTP_STATUS } from '@/lib/enums/statusCodes';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
	req: Request,
	{ params }: { params: { productId: string } }
) {
	try {
		const product = await prismadb.product.findFirst({
			where: { id: params.productId },
			include: {
				locations: true,
				orders: true,
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_GET_REQUEST]', error);
		return new NextResponse('Internal Server Error', {
			status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
		});
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { productId: string } }
) {
	try {
		await prismadb.$connect();
		const { userId } = auth();
		const body = await req.json();
		const {
			name,
			SKU,
			description,
			price,
			quantity,
			locations,
			supplierId,
		} = body;

		if (!userId) {
			return new NextResponse('Unauthenticated', {
				status: HTTP_STATUS.UNAUTHENTICATED,
			});
		}

		const product = await prismadb.product.update({
			where: {
				id: params.productId,
			},
			data: {
				name,
				description,
				SKU,
				price,
				quantity,
				locations,
				supplierId,
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_POST_REQUEST]', error);
		return new NextResponse('Internal Server Error', {
			status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
		});
	}
}

export async function DELETE(
	_req: Request,
	{ params }: { params: { productId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', {
				status: HTTP_STATUS.UNAUTHENTICATED,
			});
		}

		if (!params.productId) {
			return new NextResponse('Product id is required', {
				status: HTTP_STATUS.BAD_REQUEST,
			});
		}

		const product = await prismadb.product.delete({
			where: {
				id: params.productId,
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('PRODUCT_DELETE_REQUEST', error);
		return new NextResponse('Internal error', {
			status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
		});
	}
}
