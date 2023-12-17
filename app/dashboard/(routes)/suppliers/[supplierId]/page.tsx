import prismadb from '@/lib/prismadb';
import SupplierForm from './components/supplierForm';

const SupplierPage = async ({ params }: { params: { supplierId: string } }) => {
	const supplier = await prismadb.supplier.findFirst({
		where: {
			id: params.supplierId,
		},
		include: { productsSupplied: true },
	});
	console.log(supplier?.productsSupplied);
	return (
		<div>
			<SupplierForm
				initialData={supplier}
				productsSupplied={supplier?.productsSupplied}
			></SupplierForm>
		</div>
	);
};
export default SupplierPage;
