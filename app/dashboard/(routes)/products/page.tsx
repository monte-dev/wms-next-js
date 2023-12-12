import prismadb from '@/lib/prismadb';
import ProductList from './components/productList';

const ProductsPage = async () => {
	const products = await prismadb.product.findMany({
		include: {
			locations: true,
			supplier: true,
		},
	});

	return (
		<div className="w-full h-full">
			<ProductList data={products}></ProductList>
		</div>
	);
};
export default ProductsPage;
