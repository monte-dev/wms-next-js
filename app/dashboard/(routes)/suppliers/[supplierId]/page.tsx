import prismadb from '@/lib/prismadb';
import SupplierForm from './components/supplierForm';

const SupplierPage = async ({ params }: { params: { supplierId: string } }) => {
	const supplier = await prismadb.supplier.findFirst({
		where: {
			id: params.supplierId,
		},
		include: { productsSupplied: true },
	});

	// Handle the case where supplier is null or undefined
	const productsSupplied = supplier?.productsSupplied! || [];

	console.log(productsSupplied);

	return (
		<div>
			<SupplierForm
				initialData={supplier}
				productsSupplied={productsSupplied}
			></SupplierForm>
		</div>
	);
};

export default SupplierPage;
