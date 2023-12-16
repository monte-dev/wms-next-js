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
		accessorKey: 'SKU',
		header: 'SKU',
	},
	{
		accessorKey: 'locations',
		header: 'Location',
		cell: ({ row }) => {
			const locations = row.original.locations;
			if (locations && locations.length > 0) {
				const location = `${locations[0]?.unit}:${locations[0]?.aisle}:${locations[0]?.bay}${locations[0]?.shelf}`;
				return <div className="">{location}</div>;
			} else {
				return <div className="">no location</div>;
			}
		},
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
	},
	{
		accessorKey: 'supplier',
		header: 'Supplier',
		cell: ({ row }) => {
			const supplierName = row.original.supplier?.name;
			return <p>{supplierName}</p>;
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
];
