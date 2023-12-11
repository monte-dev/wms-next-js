'use client';

import * as z from 'zod';

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Product name must be at least 2 characters long.' })
		.max(25),
	description: z.string().min(2).max(75),
	SKU: z.string().min(2).max(10),
	price: z.coerce.number().min(1),
	// supplierId: z.string().min(2).max(25),
	quantity: z.coerce.number().min(2).max(1000),
});

const ProductForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			description: '',
			SKU: '',
			price: 0,
			quantity: 0,
		},
	});
	const onSubmit = (data: z.infer<typeof formSchema>) => {
		console.log('form submitted');
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
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
			</form>
		</Form>
	);
};
export default ProductForm;
