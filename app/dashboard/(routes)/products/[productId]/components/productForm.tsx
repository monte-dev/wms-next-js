'use client';

import * as z from 'zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import SectionHeading from '@/components/sectionHeading';
import { Supplier } from '@prisma/client';
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { SelectItem } from '@radix-ui/react-select';

const formSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Product name must be at least 2 characters long.' })
		.max(25),
	description: z.string().min(2).max(75),
	SKU: z.string().min(2).max(10),
	price: z.coerce.number().min(1),
	supplier: z.string().min(1),
	quantity: z.coerce.number().min(2).max(1000),
});
interface ProductFormProps {
	suppliers: Supplier[];
}
const ProductForm: React.FC<ProductFormProps> = ({ suppliers }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			description: '',
			supplier: '',
			SKU: '',
			price: 0,
			quantity: 0,
		},
	});
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			console.log('form submitted', data);
			await axios.post(`/api/products`, data);
		} catch (error) {
			console.log('Something went wrong.', error);
		}
	};

	return (
		<>
			<SectionHeading
				title="Add/Edit Product"
				description="Add new or modify existing product"
			/>
			<Separator />
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
							name="supplier"
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
							render={({ field }) => (
								<FormItem>
									<FormLabel>Quantity</FormLabel>
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