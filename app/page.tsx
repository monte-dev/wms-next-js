import { SignInButton, UserButton } from '@clerk/nextjs';
import SignInForm from './(auth)/components/auth/sign-in-form';
import SignUpForm from './(auth)/components/auth/sign-up-form';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="flex flex-row gap-4 items-center">
				<div className="text-black">
					<SignUpForm />
				</div>
				<div className="">
					<SignInForm />
				</div>
			</div>
			<UserButton />
		</main>
	);
}
