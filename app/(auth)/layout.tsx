import { SignInButton } from '@clerk/nextjs';

export default function Home() {
	return (
		<div>
			<h1> Sign in </h1>
			<SignInButton>
				<button>Sign in with Clerk</button>
			</SignInButton>
		</div>
	);
}
