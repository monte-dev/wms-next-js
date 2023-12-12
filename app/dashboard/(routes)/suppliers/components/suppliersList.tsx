'use client';
import { useRouter } from 'next/navigation';

import { suppliers, SuppliersColumns } from './columns';

import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SectionHeading from '@/components/sectionHeading';
import React from 'react';
import { PiPlusCircleBold } from 'react-icons/pi';
interface Suppliers {
	data: SuppliersColumns[];
}
const SuppliersList: React.FC<Suppliers> = ({ data }) => {
	const router = useRouter();
	return (
		<div>
			<div className="mx-4 flex justify-between">
				<div>
					<SectionHeading
						title="Suppliers"
						description="Manage your suppliers"
					/>
				</div>
				<Button onClick={() => router.push(`/dashboard/suppliers/new`)}>
					<span className="me-1">
						<PiPlusCircleBold />
					</span>
					Add supplier
				</Button>
			</div>
			<Separator />
			<div className="m-2 border-2 min-h-full rounded-lg p-2 border-gray-200  bg-slate-100 ">
				<DataTable data={data} columns={suppliers}></DataTable>
			</div>
		</div>
	);
};
export default SuppliersList;
