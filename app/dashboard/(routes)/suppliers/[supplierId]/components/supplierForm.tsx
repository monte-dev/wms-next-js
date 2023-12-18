'use client';

import * as z from 'zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Supplier } from '@prisma/client';
import { useRouter } from 'next/navigation';

import {
	FormControl,
	Form,
	FormItem,
	FormField,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SectionHeading from '@/components/sectionHeading';
import ProductList from './productsList';
import { ProductColumns } from './columns';

const formSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Supplier name must be at least 1 character long.' })
		.max(25),
	contactInformation: z
		.string()
		.min(2, {
			message: 'Contact information must be at least 2 characters long.',
		})
		.max(125),
});
interface SupplierFormProps {
	initialData: Supplier | null;
	productsSupplied: ProductColumns[];
}
const SupplierForm: React.FC<SupplierFormProps> = ({
	initialData,
	productsSupplied,
}) => {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: initialData?.name || '',
			contactInformation: initialData?.contactInformation || '',
		},
	});

	// form actions
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			if (initialData) {
				await axios.patch(`/api/suppliers/${initialData.id}`, data);
			} else {
				await axios.post(`/api/suppliers`, data);
			}
			router.push('/dashboard/suppliers');
			router.refresh();
		} catch (error) {
			console.error('Error submitting form:', error);
			throw error;
		}
	};

	const onDeleteClick = async () => {
		try {
			await axios.delete(`/api/suppliers/${initialData?.id}`);
			router.refresh();
			router.push('/dashboard/suppliers');
		} catch (error) {
			console.log('Error deleting supplier:', error);
			throw error;
		}
	};

	return (
		<>
			<SectionHeading
				title="Add/Edit Supplier"
				description="Add new or modify supplier details"
			/>
			<Separator />

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-3/4 xl:w-1/2 m-auto px-4 py-8"
				>
					<div className=" grid grid-cols-1 gap-8">
						<FormField
							name="name"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Supplier name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						></FormField>
					</div>
					<FormField
						name="contactInformation"
						control={form.control}
						render={({ field }) => (
							<FormItem className="mt-3">
								<FormLabel>Contact Information</FormLabel>
								<FormControl>
									<Textarea
										placeholder="address, phone number, email, etc"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					></FormField>

					<div className="flex justify-between items-center mt-3">
						<Button type="submit">
							{initialData ? 'Edit supplier' : 'Add supplier'}
						</Button>
						{initialData && (
							<Button
								type="button"
								variant="destructive"
								onClick={onDeleteClick}
							>
								Delete
							</Button>
						)}
					</div>
				</form>
			</Form>
			<Separator />
			<ProductList initialData={productsSupplied} />
		</>
	);
};
export default SupplierForm;
