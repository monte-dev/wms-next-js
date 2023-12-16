'use client';
import { products, ProductColumns } from './columns';

import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SectionHeading from '@/components/sectionHeading';
import { useRouter } from 'next/navigation';
import { PiPenBold, PiPlusCircleBold } from 'react-icons/pi';
import { useState } from 'react';

interface Products {
	data: ProductColumns[];
}

const ProductList: React.FC<Products> = ({ data }) => {
	const router = useRouter();

	//todo fix table to combine products by SKU

	const [selectedProduct, setSelectedProduct] =
		useState<ProductColumns | null>(null);

	const handleRowClick = (product: ProductColumns) => {
		setSelectedProduct(product);
	};

	const title = selectedProduct ? 'Edit Product' : 'Add product';
	const route = selectedProduct
		? `products/${selectedProduct.id}`
		: 'products/new';

	return (
		<div>
			<div className="mx-4 my-1 flex justify-between items-center">
				<div>
					<SectionHeading
						title="Products"
						description="Manage your inventory"
					/>
				</div>
				<Button onClick={() => router.push(route)}>
					<span className="me-1">
						{selectedProduct ? <PiPenBold /> : <PiPlusCircleBold />}
					</span>
					{title}
				</Button>
			</div>
			<Separator />
			<div className="m-2 border-2 min-h-full rounded-lg p-2 border-gray-200  bg-slate-100 ">
				<DataTable
					data={data}
					columns={products}
					onRowClick={handleRowClick}
					selectedProduct={selectedProduct}
				></DataTable>
			</div>
		</div>
	);
};
export default ProductList;
