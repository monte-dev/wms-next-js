import prismadb from '@/lib/prismadb';
import ProductForm from './components/productForm';
import { useParams } from 'next/navigation';

const ProductPage = async ({ params }: { params: {} }) => {
	const suppliers = await prismadb.supplier.findMany({
		include: { productsSupplied: true },
	});
	return (
		<div>
			<ProductForm suppliers={suppliers}></ProductForm>
		</div>
	);
};
export default ProductPage;
