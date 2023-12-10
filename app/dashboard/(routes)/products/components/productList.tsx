import { DataTable } from '@/components/ui/data-table';
import { products, ProductColumns } from './columns';
interface Products {
	data: ProductColumns[];
}
const ProductList: React.FC<Products> = ({ data }) => {
	return (
		<div>
			<div className="m-2 border-2 min-h-full rounded-lg p-2 border-gray-200 ">
				<DataTable data={data} columns={products}></DataTable>
			</div>
		</div>
	);
};
export default ProductList;
