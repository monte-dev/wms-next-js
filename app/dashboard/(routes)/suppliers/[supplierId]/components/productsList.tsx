'use client';
import { DataTable } from '@/components/ui/data-table';
import { products, ProductColumns } from './columns';

interface ProductListProps {
	initialData: ProductColumns[];
}
const ProductList: React.FC<ProductListProps> = ({ initialData }) => {
	return (
		<div className="px-4 py-4 max-w-6xl m-auto">
			<DataTable columns={products} data={initialData} />
		</div>
	);
};
export default ProductList;
