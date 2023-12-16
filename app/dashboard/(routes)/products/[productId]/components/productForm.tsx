'use client';

import * as z from 'zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Product, Supplier } from '@prisma/client';
import { useRouter } from 'next/navigation';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
	SelectItem,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import SectionHeading from '@/components/sectionHeading';

const formSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Product name must be at least 2 characters long.' })
		.max(25),
	description: z
		.string()
		.min(2, {
			message: 'Product description must be at least 2 characters long.',
		})
		.max(75),
	SKU: z
		.string()
		.min(2, { message: 'Product SKU must be 2-10 characters long.' })
		.max(10),
	price: z.coerce
		.number()
		.min(1, { message: 'Price must be a numeric value greater than 0.' }),
	supplierId: z.string().min(1, { message: 'Select supplier from list.' }),
	quantity: z.coerce
		.number()
		.min(1, { message: 'Quantity must be a numeric value greater than 0.' })
		.max(1000),
});
interface ProductFormProps {
	suppliers: Supplier[];
	initialData: Product[];
}
const ProductForm: React.FC<ProductFormProps> = ({
	suppliers,
	initialData,
}) => {
	const router = useRouter();

	const totalQuantity = initialData.reduce(
		(total, item) => total + item.quantity,
		0
	);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			description: '',
			supplierId: '',
			SKU: '',
			price: initialData.length > 0 ? initialData[0].price : 0,
			quantity: totalQuantity || 0,
		},
	});
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			console.log('form submitted', data);
			if (initialData && initialData.length > 0) {
				// await axios.patch(`/api/products`)
			} else {
				await axios.post(`/api/products`, data);
				router.push('/dashboard/products');
			}
		} catch (error) {
			console.log('Something went wrong.', error);
		}
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-3/4 xl:w-1/2 m-auto px-4 py-8"
				>
					<div className=" grid grid-cols-2 gap-8">
						<FormField
							name="name"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Product Name</FormLabel>
									<FormControl>
										<Input
											placeholder="product name..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						></FormField>
						<FormField
							name="SKU"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Item Code</FormLabel>
									<FormControl>
										<Input
											placeholder="SKU..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						></FormField>
					</div>
					<FormField
						name="description"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="description..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					></FormField>
					<div className="grid grid-cols-3 gap-8 py-4">
						<FormField
							name="supplierId"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Supplier</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a supplier" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{suppliers.map(
												(supplier: Supplier) => (
													<SelectItem
														key={supplier.id}
														value={supplier.id}
													>
														{supplier.name}
													</SelectItem>
												)
											)}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						></FormField>
						<FormField
							name="price"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input
											placeholder="price..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						></FormField>
						<FormField
							name="quantity"
							control={form.control}
							disabled
							render={({ field }) => (
								<FormItem>
									<FormLabel>Total Quantity</FormLabel>
									<FormControl>
										<Input
											placeholder="amount..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						></FormField>
					</div>
					<Button type="submit" className="ml-auto">
						Add product
					</Button>
				</form>
			</Form>
		</>
	);
};
export default ProductForm;
