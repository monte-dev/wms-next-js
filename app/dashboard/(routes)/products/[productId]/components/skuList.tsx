'use client';
import { DataTable } from '@/components/ui/data-table';
import { Product } from '@prisma/client';
import { products, ProductColumns } from './columns';

interface SkuListProps {
	initialData: ProductColumns[];
}
const SkuList: React.FC<SkuListProps> = ({ initialData }) => {
	return (
		<div className="px-4 py-4 max-w-6xl m-auto">
			<DataTable columns={products} data={initialData} />
		</div>
	);
};
export default SkuList;
