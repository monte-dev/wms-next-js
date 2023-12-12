'use client';
import { ColumnDef } from '@tanstack/react-table';

export type SuppliersColumns = {
	id: string;
	name: string;
	contactInformation: string;
	productsSupplied: {
		id: string;
		name: string;
		description: string;
		SKU: string;
		price: number;
		quantity: number;
		supplierId: string | null;
		createdAt: Date;
		updatedAt: Date;
	}[];
};
export const suppliers: ColumnDef<SuppliersColumns>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'productsSupplied',
		header: 'Products',
		cell: ({ row }) => {
			const productsSupplied = row.original.productsSupplied;
			return <div className="">{productsSupplied.length}</div>;
		},
	},
	{
		accessorKey: 'contactInformation',
		header: 'Contact',
	},
];
