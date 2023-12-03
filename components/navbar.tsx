import { UserButton, auth, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { PiBoundingBoxFill } from 'react-icons/pi';
import { Button } from './ui/button';
import Link from 'next/link';
import DashboardNavigation from './dashboardNavigation';

const Navbar = async () => {
	const { userId } = auth();
	const user = await currentUser();

	if (!userId) {
		redirect('/sign-in');
	}

	return (
		<div className="border-b ms-1">
			<div className="flex ps-28 items-center justify-between overflow-hidden">
				<Link
					href={'/'}
					className="flex flex-row pe-2 rounded-md items-center hover:bg-gray-100 transition z-40"
				>
					<Button variant={'ghost'} size={'icon'}>
						<PiBoundingBoxFill className="text-2xl" />
					</Button>
					<h2 className="cursor-pointer font-bold">Next.WMS</h2>
				</Link>
				<div className="flex flex-row border-s-2 items-center">
					<div className="self-end border-s-2 flex flex-row gap-x-2 py-2 px-4  transition-all  bg-white hover:bg-slate-100">
						<div className="flex flex-col items-center justify-center text-xs  transition-all ">
							<p>logged in as</p>
							<p className="mt-1 text-blue-400">
								{user?.emailAddresses[0].emailAddress}
							</p>
						</div>
						<div className="flex items-center mx-2">
							<UserButton />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Navbar;
