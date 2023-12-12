'use client';

import * as z from 'zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	Form,
	FormControl,
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

const SupplierForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			contactInformation: '',
		},
	});
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			console.log('form submitted', data);
			await axios.post(`/api/suppliers`, data);
		} catch (error) {
			console.log('Something went wrong.', error);
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

					<Button type="submit" className="ml-auto mt-3">
						Add supplier
					</Button>
				</form>
			</Form>
		</>
	);
};
export default SupplierForm;
