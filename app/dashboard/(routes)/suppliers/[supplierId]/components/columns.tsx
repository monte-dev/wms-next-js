'use client';
import { ColumnDef } from '@tanstack/react-table';

export type ProductColumns = {
	id: string;
	name: string;
	description: string;
	SKU: string;
	price: number;
	supplierId: string | null;

	quantity: number;
};
export const products: ColumnDef<ProductColumns>[] = [
	{
		accessorKey: 'SKU',
		header: 'SKU',
	},

	{
		accessorKey: 'quantity',
		header: 'Quantity',
	},

	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'description',
		header: 'Description',
	},
	{
		accessorKey: 'price',
		header: 'Price',
	},
];
