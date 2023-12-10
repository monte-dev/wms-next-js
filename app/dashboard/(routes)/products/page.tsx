import SectionHeading from '@/components/sectionHeading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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
			<div className="mx-4 flex justify-between">
				<div>
					<SectionHeading
						title="Products"
						description="Manage your inventory"
					/>
				</div>
				<Button>Add product</Button>
			</div>
			<Separator />
			<div>
				<ProductList data={products}></ProductList>
			</div>
		</div>
	);
};
export default ProductsPage;
