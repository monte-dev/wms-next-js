import prismadb from '@/lib/prismadb';
import ProductForm from './components/productForm';

const ProductPage = async ({ params }: { params: { productId: string } }) => {
	const suppliers = await prismadb.supplier.findMany({
		include: { productsSupplied: true },
	});
	const product = await prismadb.product.findUnique({
		where: {
			id: params.productId,
		},
	});
	const productBySKU = await prismadb.product.findMany({
		where: {
			SKU: product?.SKU,
		},
	});
	return (
		<div>
			<ProductForm
				suppliers={suppliers}
				initialData={productBySKU}
			></ProductForm>
		</div>
	);
};
export default ProductPage;
