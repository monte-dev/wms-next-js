import { HTTP_STATUS } from '@/lib/enums/statusCodes';
import prismadb from '@/lib/prismadb';
import { isValidUUID } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params;

		if (id) {
			if (isValidUUID(id)) {
				const product = await prismadb.product.findFirst({
					where: { id },
					include: {
						locations: true,
						orders: true,
					},
				});

				return NextResponse.json(product);
			}
		}

		const productsBySKU = await prismadb.product.findMany({
			where: { SKU: id },
			include: {
				locations: true,
				orders: true,
			},
		});

		return NextResponse.json(productsBySKU);
	} catch (error) {
		console.error('[PRODUCT_GET_REQUEST]', error);
		return new NextResponse('Internal Server Error', {
			status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
		});
	}
}

export async function DELETE(
	_req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', {
				status: HTTP_STATUS.UNAUTHENTICATED,
			});
		}

		if (!params.id) {
			return new NextResponse('Product id is required', {
				status: HTTP_STATUS.BAD_REQUEST,
			});
		}

		const product = await prismadb.product.delete({
			where: {
				id: params.id,
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

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	await prismadb.$connect();
	try {
		const { userId } = auth();
		const body = await req.json();

		if (!userId) {
			return new NextResponse('Unauthenticated, please log in', {
				status: HTTP_STATUS.UNAUTHENTICATED,
			});
		}

		const { name, description, SKU, price, supplierId, quantity } = body;

		if (
			!name &&
			!description &&
			!SKU &&
			!price &&
			supplierId === undefined &&
			quantity === undefined
		) {
			return new NextResponse('No data to update', {
				status: HTTP_STATUS.BAD_REQUEST,
			});
		}

		// update specified product's quantity
		const updatedIndividualQuantity = await prismadb.product.update({
			where: {
				id: params.id,
			},
			data: {
				quantity,
			},
		});
		const relatedBySKU = await prismadb.product.findMany({
			where: {
				SKU: updatedIndividualQuantity.SKU,
			},
		});
		await Promise.all(
			relatedBySKU.map(async (relatedProduct) => {
				await prismadb.product.update({
					where: { id: relatedProduct.id },
					data: {
						name,
						description,
						SKU,
						supplierId,
						price,
					},
				});
			})
		);

		return NextResponse.json({ message: 'Product updated successfully' });
	} catch (error) {
		console.error('PRODUCT_PATCH_REQUEST', error);
		return new NextResponse('Internal error', {
			status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
		});
	}
}
