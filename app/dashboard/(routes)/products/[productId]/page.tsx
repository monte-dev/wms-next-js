import prismadb from '@/lib/prismadb';
import ProductForm from './components/productForm';

const ProductPage = async () => {
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
