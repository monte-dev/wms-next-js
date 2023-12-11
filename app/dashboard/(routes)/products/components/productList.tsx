'use client';
import { products, ProductColumns } from './columns';

import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SectionHeading from '@/components/sectionHeading';
import { useRouter } from 'next/navigation';

interface Products {
	data: ProductColumns[];
}

const ProductList: React.FC<Products> = async ({ data }) => {
	const router = useRouter();
	return (
		<div>
			<div className="mx-4 flex justify-between">
				<div>
					<SectionHeading
						title="Products"
						description="Manage your inventory"
					/>
				</div>
				<Button onClick={() => router.push(`/dashboard/products/new`)}>
					Add product
				</Button>
			</div>
			<Separator />
			<div className="m-2 border-2 min-h-full rounded-lg p-2 border-gray-200  bg-slate-100 ">
				<DataTable data={data} columns={products}></DataTable>
			</div>
		</div>
	);
};
export default ProductList;
