import Navbar from '@/components/navbar';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { userId } = auth();
	if (!userId) {
		redirect('/sign-in');
	}

	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
