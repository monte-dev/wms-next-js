import prismadb from '@/lib/prismadb';

import { Separator } from '@/components/ui/separator';
import ProductForm from './components/productForm';
import SkuList from './components/skuList';
import SectionHeading from '@/components/sectionHeading';

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
		include: {
			supplier: true,
			locations: true,
		},
	});
	return (
		<div className="lg:px-12">
			<SectionHeading
				title="Product Overview"
				description="Add new or modify existing product"
			/>
			<Separator />
			<ProductForm
				suppliers={suppliers}
				initialData={productBySKU}
			></ProductForm>
			<Separator />
			<SkuList initialData={productBySKU} />
		</div>
	);
};
export default ProductPage;
