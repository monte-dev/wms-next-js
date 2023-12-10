'use client';
import { ColumnDef } from '@tanstack/react-table';

export type ProductColumns = {
	id: string;
	name: string;
	description: string;
	SKU: string;
	price: number;
	supplierId: string | null;
	supplier: {
		name: string;
		contactInformation: string;
	} | null;
	quantity: number;
	locations: {
		id: string;
		unit: number;
		aisle: number;
		bay: number;
		shelf: string;
		bin: number;
		quantity: number | null;
		productId: string | null;
	}[];
};
export const products: ColumnDef<ProductColumns>[] = [
	{
		accessorKey: 'rowPosition',
		header: 'Row Position',
		cell: ({ row }) => {
			return <div className="">{row.index + 1}</div>; // Display index + 1 to start from 1
		},
	},
	{
		accessorKey: 'SKU',
		header: 'SKU',
	},
	{
		accessorKey: 'locations',
		header: 'Locations',
		cell: ({ row }) => {
			const locations = row.original.locations;
			return <div className="">{locations.length}</div>;
		},
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
	{
		accessorKey: 'supplier.name',
		header: 'Supplier',
	},

	{
		accessorKey: 'quantity',
		header: 'Quantity',
	},
];
