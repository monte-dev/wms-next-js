import DashboardNavigation from '@/components/dashboardNavigation';
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
			<div className="flex flex-row z-20">
				<DashboardNavigation className="flex flex-col -my-[3.3rem] px-2" />
				<div className="mb-[64px] w-full px-2 py-2">{children}</div>
			</div>
		</>
	);
}
