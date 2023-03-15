import Button from "@/components/Button";
import FormField from "@/components/FormField";
import Logo from "@/components/Logo";
import { getProviders } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useReducer } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useCarrierStore } from "@/utils/code";
import { axiosInstance } from "@/pages/api/axiosApi";
import toastcomp from "@/components/toast";

export default function SignIn({ providers }: any) {
	const router = useRouter();
	const updateLoginInfo = (
		prevState: { email: string; password: string },
		event: { target: { id: string; value: any } }
	) => {
		return { ...prevState, [event.target.id]: event.target.value };
	};

	const [loginInfo, dispatch] = useReducer(updateLoginInfo, {
		email: "",
		password: ""
	});

	const cid = useCarrierStore((state) => state.cid)
	const cname = useCarrierStore((state) => state.cname)

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		await axiosInstance
        .post(`/candidate/candidatecheck/${loginInfo.email}/${cid}/`)
        .then(async (res) => {
			console.log(res.data)
			if(res.data.success){
				const callback = `${
					process.env.NODE_ENV === "production"
						? process.env.NEXT_PUBLIC_PROD_FRONTEND
						: `http://localhost:3000/organization/${cname}`
				}`;
				await signIn("credentials", {
					email: loginInfo.email,
					password: loginInfo.password,
					user_type: "candidate",
					callbackUrl: callback
				})
					.then(async (res) => console.log({ res }))
					.then(async () => await router.push(`/organization/${cname}`))
					.catch((err) => {
						console.log(err);
					});
			}
			else if(res.data.error){
				toastcomp(res.data.error, "error")
			}
        })
		.catch((err) => {
			console.log(err);
		});

		
		
	};
	return (
		<>
			<Head>
				<title>Sign In</title>
				<meta name="description" content="Generated by create next app" />
			</Head>
			<main className="py-8">
				<form className="mx-auto w-full max-w-[550px] px-4" onSubmit={handleSubmit}>
					<div className="mb-4 text-center">
						<Logo width={180} />
					</div>
					<div className="min-h-[400px] rounded-large bg-white p-6 shadow-normal dark:bg-gray-800 md:py-8 md:px-12">
						<h1 className="mb-6 text-3xl font-bold">
							Sign <span className="text-primary">In</span>
						</h1>
						<FormField
							fieldType="input"
							inputType="email"
							label="Email"
							id="email"
							value={loginInfo.email}
							handleChange={dispatch}
							icon={<i className="fa-regular fa-envelope"></i>}
							required
						/>
						<FormField
							fieldType="input"
							inputType="password"
							label="Password"
							id="password"
							value={loginInfo.password}
							handleChange={dispatch}
							required
						/>
						<div className="mb-4 flex flex-wrap items-center justify-between">
							<div className="flex items-center">
								<label htmlFor="rememberMe" className="text-darkGray">
									<input type="checkbox" id="rememberMe" className="mr-2 mb-1 rounded border-lightGray" />
									Remember Me
								</label>
							</div>
							<Link href={"/auth/forgot"} className="font-bold text-primary hover:underline">
								Forgot Password?
							</Link>
						</div>
						<div className="mb-4">
							<Button btnType="submit" label="Sign In" full={true} loader={false} disabled={false} />
						</div>
						<p className="text-center text-darkGray">
							Not sign up yet ?{" "}
							<Link href={"/auth/candidate/signup"} className="font-bold text-primary hover:underline">
								Create Account
							</Link>
						</p>
					</div>
				</form>
			</main>
		</>
	);
}

export async function getServerSideProps(context: any) {
	const providers = await getProviders();
	return {
		props: {
			providers
		}
	};
}
