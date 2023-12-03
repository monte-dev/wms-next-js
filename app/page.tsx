import { SignIn, SignUp, UserButton } from '@clerk/nextjs';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="flex flex-row gap-4 items-center">
				<div className="text-black">
					<SignUp afterSignUpUrl={'/dashboard'} />
				</div>
				<div className="">
					<SignIn afterSignInUrl={'/dashboard'} />
				</div>
			</div>
			<UserButton />
		</main>
	);
}
