'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Button } from './ui/button';
import {
	PiList,
	PiBarcode,
	PiGridNine,
	PiNotepad,
	PiTruck,
} from 'react-icons/pi';
import { ReactElement } from 'react';

interface DashboardNavigationProps {
	className: string;
}

interface NavLink {
	href: string;
	name: string;
	active: boolean;
	icon: ReactElement;
}

const DashboardNavigation: React.FC<DashboardNavigationProps> = ({
	className,
}) => {
	const pathname = usePathname();
	const params = useParams();
	const navlinks: NavLink[] = [
		{
			href: '/dashboard/products',
			name: 'Products',
			active: pathname === `/dashboard/products`,
			icon: <PiBarcode />,
		},
		{
			href: '/dashboard/suppliers',
			name: 'Suppliers',
			active: pathname === `/dashboard/suppliers`,
			icon: <PiTruck />,
		},
		{
			href: '/dashboard/orders',
			name: 'Orders',
			active: pathname === `/dashboard/orders`,
			icon: <PiNotepad />,
		},
		{
			href: '/dashboard/inventory',
			name: 'Inventory',
			active: pathname === `/dashboard/inventory`,
			icon: <PiGridNine />,
		},
	];
	return (
		<div className={cn('bg-slate-400', className)}>
			<Button size={'icon'} className="mx-auto  my-[0.35rem] ">
				<PiList />
			</Button>
			<nav className="flex flex-col border-t-2">
				{navlinks.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						role="menuitem"
						aria-current={link.active ? 'page' : undefined}
						aria-label={link.name}
						className={cn(
							'flex flex-row items-center justify-start my-1 font-semibold hover:bg-gray-100 rounded-md px-1 py-3',
							link.active ? 'bg-gray-100' : ''
						)}
					>
						<span>{link.icon}</span>
						<span className="mx-auto">{link.name}</span>
					</Link>
				))}
			</nav>
		</div>
	);
};

export default DashboardNavigation;
