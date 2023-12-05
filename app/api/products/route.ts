import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	await prismadb.$connect();
	try {
		const { userId } = auth();
		const body = await req.json();

		const {
			name,
			description,
			SKU,
			price,
			supplierId,
			quantity,
			location,
		} = body;
		if (!userId)
			return new NextResponse('Unauthenticated, please log in', {
				status: 401,
			});
		if (
			!name ||
			!description ||
			!SKU ||
			!price ||
			!supplierId ||
			!quantity ||
			!location
		) {
			return new NextResponse(
				'All required fields need to be filled in.',
				{ status: 400 }
			);
		}

		const productData = {
			name: 'Abcde',
			description: 'Abcdeee',
			SKU: '111AAA',
			price: 2,
			quantity: 1,
			supplierId: '70f40318-1aca-4a61-8d52-cf9a77b6e568',
			location: {
				create: [
					{
						unit: 1,
						aisle: 2,
						bay: 3,
						shelf: 'A',
						bin: 1,
						quantity: 1,
					},
				],
			},
		};

		const newProduct = await prismadb.product.create({
			data: productData,
		});
		return NextResponse.json(newProduct);
	} catch (error) {
		console.log('[PRODUCT_POST_REQUEST]', error);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}

export async function GET(req: Request) {
	try {
		const products = await prismadb.product.findMany({
			include: {
				location: true,
			},
		});

		return NextResponse.json(products);
	} catch (error) {
		console.log('[PRODUCT_GET_REQUEST]', error);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}
