'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SectionHeading from '@/components/sectionHeading';

import { suppliers, SuppliersColumns } from './columns';

import { PiPenBold, PiPlusCircleBold } from 'react-icons/pi';

interface Suppliers {
	data: SuppliersColumns[];
}
const SuppliersList: React.FC<Suppliers> = ({ data }) => {
	const router = useRouter();

	const [selectedSupplier, setSelectedSupplier] =
		useState<SuppliersColumns | null>(null);

	const handleRowClick = (supplier: SuppliersColumns) => {
		setSelectedSupplier(supplier);
	};
	const buttonText = selectedSupplier ? 'Edit supplier' : 'Add supplier';

	const route = selectedSupplier
		? `suppliers/${selectedSupplier.id}`
		: 'suppliers/new';

	return (
		<div>
			<div className="mx-4 my-1 flex justify-between items-center">
				<div>
					<SectionHeading
						title="Suppliers"
						description="Manage your suppliers"
					/>
				</div>
				<Button onClick={() => router.push(route)}>
					<span className="me-1">
						{selectedSupplier ? (
							<PiPenBold />
						) : (
							<PiPlusCircleBold />
						)}
					</span>
					{buttonText}
				</Button>
			</div>
			<Separator />
			<div className="m-2 border-2 min-h-full rounded-lg p-2 border-gray-200  bg-slate-100 ">
				<DataTable
					data={data}
					columns={suppliers}
					onRowClick={handleRowClick}
					selectedProduct={selectedSupplier}
				></DataTable>
			</div>
		</div>
	);
};
export default SuppliersList;
