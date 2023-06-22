import Button from "@/components/Button";
import FormField from "@/components/FormField";
import Logo from "@/components/Logo";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useCarrierStore, useLangStore } from "@/utils/code";
import ToggleLang from "@/components/ToggleLang";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CandForgot() {
	const { t } = useTranslation('common')
	const router = useRouter();
	const srcLang = useLangStore((state: { lang: any }) => state.lang);
	const cname = useCarrierStore((state: { cname: any }) => state.cname);
	const orgdetail: any = useCarrierStore((state: { orgdetail: any }) => state.orgdetail);
	return (
		<>
			<Head>
				<title>Candidate | {srcLang === 'ja' ? 'パスワードをお忘れですか' : 'Forgot'}</title>
				<meta name="description" content="Generated by create next app" />
			</Head>
			<main className="py-8">
				<div className="mx-auto w-full max-w-[550px] px-4">
					<div className="mb-4 text-center">
						{
							orgdetail["OrgProfile"] 
							? 
							(
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
							)
							:
							<>
							<Logo width={180} />
							</>
						}
					</div>
					<div className="min-h-[400px] rounded-large bg-white p-6 shadow-normal dark:bg-gray-800 md:py-8 md:px-12">
						<h1 className="mb-6 text-3xl font-bold">
							{srcLang === 'ja' ? 'パスワードを忘れた方' : <>Forgot <span className="text-primary">Password</span></>}
						</h1>
						{
							srcLang === 'ja' &&
							<p className="mb-6 ">ご登録のメールアドレスを入力ください</p>
						}
						<FormField
							fieldType="input"
							inputType="email"
							label={t('Form.Email')}
							icon={<i className="fa-regular fa-envelope"></i>}
							required
						/>
						<div className="mb-4">
							<Button btnType="submit" label={t('Btn.Submit')} full={true} loader={false} disabled={false} />
						</div>
						<p className="text-center text-darkGray">
							{srcLang === 'ja' ? 'アカウント作成がまだの方は' : 'Already have an Account?'}{" "}
							<Link href={`/organization/${cname}/candidate/signin`} className="font-bold text-primary hover:underline">
								{srcLang === 'ja' ? 'こちら' : 'Sign In'}
							</Link>
						</p>
					</div>
					<div className="text-right pt-2">
						<ToggleLang />
					</div>
				</div>
			</main>
		</>
	);
}

export async function getServerSideProps({ context, locale }:any) {
	const translations = await serverSideTranslations(locale, ['common']);
	return {
		props: {
		...translations
		},
	};
}

CandForgot.noAuth = true;
