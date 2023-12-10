import SectionHeading from '@/components/sectionHeading';
import { Separator } from '@/components/ui/separator';
import prismadb from '@/lib/prismadb';

const ProductsPage = async () => {
	const products = await prismadb.product.findMany({
		include: {
			locations: true,
			supplier: true,
		},
	});
	return (
		<div className="w-full">
			<div className="mx-4">
				<SectionHeading
					title="Products"
					description="Manage your inventory"
				/>
			</div>
			<Separator />
			<div></div>
		</div>
	);
};
export default ProductsPage;
