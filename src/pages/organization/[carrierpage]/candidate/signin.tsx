import Button from "@/components/Button";
import FormField from "@/components/FormField";
import Logo from "@/components/Logo";
import { getProviders } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useReducer, useState } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useCarrierStore, useUserStore } from "@/utils/code";
import { axiosInstance, axiosInstance2 } from "@/pages/api/axiosApi";
import toastcomp from "@/components/toast";
import Image from "next/image";
import ToggleLang from "@/components/ToggleLang";

export default function CandSignIn({ providers }: any) {
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

	const cid = useCarrierStore((state: { cid: any }) => state.cid);
	const cname = useCarrierStore((state: { cname: any }) => state.cname);

	const type = useUserStore((state: { type: any }) => state.type);
	const role = useUserStore((state: { role: any }) => state.role);
	const user = useUserStore((state: { user: any }) => state.user);
	const settype = useUserStore((state: { settype: any }) => state.settype);
	const setrole = useUserStore((state: { setrole: any }) => state.setrole);
	const setuser = useUserStore((state: { setuser: any }) => state.setuser);
	const orgdetail: any = useCarrierStore((state: { orgdetail: any }) => state.orgdetail);
	const [btnLoader, setBtnLoader] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		setBtnLoader(true);

		await axiosInstance
			.post(`/candidate/candidatecheck/${loginInfo.email}/${cid}/`)
			.then(async (res) => {
				if (res.data.success) {
					await axiosInstance2
						.post("/candidate/candidatelogin/", {
							email: loginInfo.email,
							password: loginInfo.password
						})
						.then(async (response) => {
							console.log("@", res.data);
							setSuccess(true);
							if (response.data.role) {
								setrole(response.data.role);
							}
							if (response.data.type) {
								settype(response.data.type);
							}
							if (response.data.userObj && response.data["userObj"].length > 0) {
								setuser(response.data.userObj);
							}

							try {
								let title = `${response.data.userObj[0]["first_name"]} ${response.data.userObj[0]["last_name"]} (${response.data.userObj[0]["email"]}) has logged in as an ${response.data.role}`;
								// let notification_type = `${}`

								await axiosInstance2
									.post("/chatbot/external-notification/unauth/", {
										email: loginInfo.email,
										title: title
										// notification_type: notification_type
									})
									.then((res) => {
										toastcomp("Notify Add", "success");
									})
									.catch((err) => {
										toastcomp("Notify Not Add", "error");
									});
							} catch (error) {
								toastcomp("Notify Not Add", "error");
							}

							const callback = `${
								process.env.NODE_ENV === "production"
									? process.env.NEXT_PUBLIC_PROD_FRONTEND + "organization/" + cname + "/"
									: process.env.NEXT_PUBLIC_DEV_FRONTEND + "organization/" + cname + "/"
							}`;
							await signIn("credentials", {
								email: loginInfo.email,
								password: loginInfo.password,
								user_type: "candidate",
								callbackUrl: callback
							})
								.then(async (res) => {
									console.log({ res });
									router.push(`/organization/${cname}`);
								})
								.catch((err) => {
									console.log(err);
								});
						})
						.catch((err) => {
							setBtnLoader(false);
							settype("");
							setrole("");
							setuser([]);
							console.log(err);
							if (err.response.data.non_field_errors) {
								err.response.data.non_field_errors.map((text: any) => toastcomp(text, "error"));
								setBtnLoader(false);
								return false;
							}
							if (err.response.data.detail) {
								toastcomp(err.response.data.detail, "error");
								setBtnLoader(false);
								return false;
							}
							if (err.response.data.errors.email) {
								err.response.data.errors.email.map((text: any) => toastcomp(text, "error"));
								setBtnLoader(false);
								return false;
							}
						});
				} else if (res.data.error) {
					settype("");
					setrole("");
					setuser([]);
					toastcomp(res.data.error, "error");
					setBtnLoader(false);
				}
			})
			.catch((err) => {
				settype("");
				setrole("");
				setuser([]);
				console.log(err);
				setBtnLoader(false);
			});
	};
	return (
		<>
			<Head>
				<title>Candidate | Sign In</title>
				<meta name="description" content="Generated by create next app" />
			</Head>
			<main className="py-8">
				<form className="mx-auto w-full max-w-[550px] px-4" onSubmit={handleSubmit}>
					<div className="mb-4 text-center">
						{orgdetail["OrgProfile"] ? (
							<Image
								src={
									process.env.NODE_ENV === "production"
										? process.env.NEXT_PUBLIC_PROD_BACKEND + orgdetail["OrgProfile"][0]["logo"]
										: process.env.NEXT_PUBLIC_DEV_BACKEND + orgdetail["OrgProfile"][0]["logo"]
								}
								alt={"Somhako"}
								width={200}
								height={200}
								className="mx-auto max-h-[80px] w-auto"
								onClick={() => {
									router.push("/organization/" + cname);
								}}
							/>
						) : (
							<>
								<Logo width={180} />
							</>
						)}
					</div>
					<div className="min-h-[400px] rounded-large bg-white p-6 shadow-normal dark:bg-gray-800 md:px-12 md:py-8">
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
									<input type="checkbox" id="rememberMe" className="mb-1 mr-2 rounded border-lightGray" />
									Remember Me
								</label>
							</div>
							<Link href={"/auth/forgot"} className="font-bold text-primary hover:underline dark:text-white">
								Forgot Password?
							</Link>
						</div>
						<div className="mb-4">
							<Button btnType="submit" label="Sign In" full={true} loader={btnLoader} disabled={btnLoader} />
						</div>
						{success && (
							<p className="mb-4 text-center text-sm text-green-600">
								<i className="fa-solid fa-check fa-lg mr-2 align-middle"></i> Login Successfully
							</p>
						)}
						<p className="text-center text-darkGray">
							Not sign up yet ?{" "}
							<Link
								href={`/organization/${cname}/candidate/signup`}
								className="font-bold text-primary hover:underline dark:text-white"
							>
								Create Account
							</Link>
						</p>
					</div>
					<div className="pt-2 text-right">
						<ToggleLang />
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

CandSignIn.noAuth = true;
