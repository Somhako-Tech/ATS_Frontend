import Button from "@/components/Button";
import FormField from "@/components/FormField";
import Logo from "@/components/Logo";
import Head from "next/head";
import Link from "next/link";

export default function AuthForgot() {
	return (
		<>
			<Head>
				<title>Forgot</title>
				<meta name="description" content="Generated by create next app" />
			</Head>
			<main className="py-8">
				<div className="mx-auto w-full max-w-[550px] px-4">
					<div className="mb-4 text-center">
						<Logo width={180} />
					</div>
					<div className="min-h-[400px] rounded-large bg-white p-6 shadow-normal dark:bg-gray-800 md:py-8 md:px-12">
						<h1 className="mb-6 text-3xl font-bold">
							Forgot <span className="text-primary">Password</span>
						</h1>
						<FormField
							fieldType="input"
							inputType="email"
							label="Email"
							icon={<i className="fa-regular fa-envelope"></i>}
							required
						/>
						<div className="mb-4">
							<Button btnType="submit" label="Submit" full={true} loader={false} disabled={false} />
						</div>
						<p className="text-center text-darkGray">
							Already have an Account?{" "}
							<Link href={"/auth/signin"} className="font-bold text-primary hover:underline">
								Sign In
							</Link>
						</p>
					</div>
				</div>
			</main>
		</>
	);
}

Forgot.noAuth = true;
