import Button from "@/components/Button";
import FormField from "@/components/FormField";
import Logo from "@/components/Logo";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useLangStore } from "@/utils/code";
import ToggleLang from "@/components/ToggleLang";
import { useState } from "react";
import { axiosInstance } from "../api/axiosApi";
import toastcomp from "@/components/toast";

export default function AuthForgot() {
	const [email, setemail] = useState("");
	function validbtn() {
		return email.length > 0;
	}
	const { t } = useTranslation("common");
	const srcLang = useLangStore((state: { lang: any }) => state.lang);
	async function forgetpass() {
		await axiosInstance
			.post("/auth/request-reset-email/", { email: email })
			.then((response) => {
				toastcomp("Forget Password Mail Sent", "success");
				setemail("");
			})
			.catch((err) => {
				// console.log(err);
				if (err.response.data.non_field_errors) {
					err.response.data.non_field_errors.map((text) => toastcomp(text, "error"));
					return false;
				}
				if (err.response.data.detail) {
					toastcomp(err.response.data.detail, "error");
					return false;
				}
			});
	}
	return (
		<>
			<Head>
				<title>{srcLang === "ja" ? "パスワードをお忘れですか" : "Forgot"}</title>
			</Head>
			<main className="py-8">
				<div className="mx-auto w-full max-w-[550px] px-4">
					<div className="mb-4 text-center">
						<Logo width={180} />
					</div>
					<div className="rounded-large bg-white p-6 shadow-normal dark:bg-gray-800 md:px-12 md:py-8">
						<h1 className="mb-6 text-3xl font-bold">
							{srcLang === "ja" ? (
								"パスワードを忘れた方"
							) : (
								<>
									Forgot <span className="text-primary">Password</span>
								</>
							)}
						</h1>
						{srcLang === "ja" && <p className="mb-6 ">ご登録のメールアドレスを入力ください</p>}
						<FormField
							fieldType="input"
							inputType="email"
							label={t("Form.Email")}
							icon={<i className="fa-regular fa-envelope"></i>}
							value={email}
							handleChange={(e) => setemail(e.target.value)}
							required
						/>
						<div className="mb-4">
							<Button
								btnType="button"
								label={t("Btn.Submit")}
								full={true}
								loader={false}
								disabled={!validbtn()}
								handleClick={(e) => forgetpass()}
							/>
						</div>
						<p className="text-center text-darkGray">
							{srcLang === "ja" ? "アカウント作成がまだの方は" : "Already have an Account?"}{" "}
							<Link href={"/auth/signin"} className="font-bold text-primary hover:underline dark:text-white">
								{srcLang === "ja" ? "こちら" : "Sign In"}
							</Link>
						</p>
					</div>
					<div className="pt-2 text-right">
						<ToggleLang />
					</div>
				</div>
			</main>
		</>
	);
}

export async function getStaticProps({ context, locale }: any) {
	const translations = await serverSideTranslations(locale, ["common"]);
	return {
		props: {
			...translations
		}
	};
}

AuthForgot.noAuth = true;
