import prismadb from '@/lib/prismadb';
import SuppliersList from './components/suppliersList';

const SuppliersPage = async () => {
	const suppliers = await prismadb.supplier.findMany({
		include: {
			productsSupplied: true,
		},
	});

	return (
		<div className="w-full h-full">
			<SuppliersList data={suppliers}></SuppliersList>
		</div>
	);
};
export default SuppliersPage;
