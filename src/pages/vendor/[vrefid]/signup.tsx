import Button from "@/components/Button";
import FormField from "@/components/FormField";
import toastcomp from "@/components/toast";
import { axiosInstance, axiosInstance2 } from "@/pages/api/axiosApi";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useLangStore } from "@/utils/code";

export default function VendorSignup() {
	const { t } = useTranslation("common");
	const srcLang = useLangStore((state: { lang: any }) => state.lang);
	const router = useRouter();
	const { vrefid } = router.query;

	const [load, setload] = useState(false);
	const { data: session } = useSession();
	const [token, settoken] = useState("");
	const [vdata, setvdata] = useState({});

	// useEffect(() => {
	// 	if (session) {
	// 		settoken(session.accessToken as string);
	// 	} else if (!session) {
	// 		settoken("");
	// 	}
	// }, [session]);

	//steps state
	const [email, setemail] = useState("");
	const [pass1, setpass1] = useState("");
	const [pass2, setpass2] = useState("");
	const [cname, setcname] = useState("");
	const [aname, setaname] = useState("");
	const [sdate, setsdate] = useState("");
	const [edate, setedate] = useState("");
	const [aggrement, setaggrement] = useState("");
	const [sign, setsign] = useState<File | null>(null);
	const [check1, setcheck1] = useState(false);
	const [file, setfile] = useState(false);

	// const axiosInstanceAuth2 = axiosInstanceAuth(token);

	async function loadVendorData(id: string) {
		await axiosInstance
			.get(`/vendors/vendor_data/${id}/`)
			.then(async (res) => {
				// console.log("!", res.data);
				if (res.data && res.data.length > 0) {
					setvdata(res.data[0]);
					const data = res.data;
					for (let i = 0; i < data.length; i++) {
						setemail(data[i]["email"]);
						setcname(data[i]["company_name"]);
						setaname(data[i]["agent_name"]);
						setsdate(data[i]["agreement_valid_start_date"]);
						setedate(data[i]["agreement_valid_end_date"]);
						setaggrement(data[i]["agreement"]);
					}
				}
				setload(true);
			})
			.catch((err) => {
				// console.log("!", err);
				setload(false);
			});
	}

	function handleFileInputChange(event: ChangeEvent<HTMLInputElement>) {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files && event.target.files[0];
			setsign(file);
			setfile(true);
		} else {
			if (file == null) {
				setsign(null);
				setfile(false);
			}
		}
	}

	useEffect(() => {
		if (vrefid && vrefid.length > 0) {
			loadVendorData(vrefid);
		}
	}, [vrefid]);

	const [step, setstep] = useState(1);

	function checkForm() {
		return (
			email.length > 0 &&
			pass1.length > 0 &&
			pass2.length > 0 &&
			pass1 === pass2 &&
			check1 &&
			sign != null
		);
	}

	async function regVendor() {
		const fd = new FormData();
		fd.append("email", email);
		fd.append("signature", sign);
		fd.append("password", pass1);
		fd.append("password2", pass2);
		await axiosInstance2
			.post(`/vendors/vendor_registration/${vrefid}/`, fd)
			.then(async (res) => {
				// console.log("!", res.data);
				try {
					let title = `${aname} (${email}) has signup in as an vendor`;
					// let notification_type = `${}`

					await axiosInstance2
						.post("/chatbot/notification/unauth/", {
							email: email,
							title: title
							// notification_type: notification_type
						})
						.then((res) => {
							toastcomp("Notify Add", "success");
						})
						.catch((err) => {
							toastcomp("Notify Add", "success");
						});
				} catch (error) {
					toastcomp("Notify Add", "success");
				}

				setemail("");
				setpass1("");
				setpass2("");
				setcname("");
				
				setaname("");
				
				
				
				
				setsdate("");
				setedate("");
				setaggrement("");
				setsign(null);
				setcheck1(false);
				setfile(false);
				setstep(1);
				toastcomp("reg success", "success");
				router.push(`/vendor/${vrefid}/signin`);
			})
			.catch((err) => {
				// console.log("!", err);
				toastcomp("reg error", "error");
			});
	}

	return (
		<>
			<Head>
				<title>
					{t("Words.Vendors")} | {t("Btn.SignUp")}
				</title>
			</Head>
			{load && (
				<main className="py-8">
					<div className="md:px-26 mx-auto w-full max-w-[1920px] px-4 lg:px-40">
						<div className="rounded-normal bg-white p-6 shadow-normal dark:bg-gray-800">
							<div className="mx-auto w-full max-w-[1100px]">
								{/* steps */}
								<div className="mb-4 flex flex-wrap items-center justify-center border-b py-4 dark:border-b-gray-600">
									<div className="after:content[''] relative w-[200px] p-4 after:absolute after:left-[50%] after:top-[50px] after:block after:h-[0px] after:w-[200px] after:border-b-2 after:border-dashed last:after:hidden dark:after:border-gray-600">
										<div
											className={
												step === 1
													? "relative z-10 mx-auto mb-2 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-gradDarkBlue p-2 shadow-highlight"
													: "relative z-10 mx-auto mb-2 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white p-2 shadow-highlight dark:bg-gray-600"
											}
										>
											<span
												className={
													step === 1
														? "text-[32px] font-bold text-white"
														: "text-[32px] font-bold text-darkGray dark:text-gray-400"
												}
											>
												{" "}
												1{" "}
											</span>
										</div>
										<p
											className={
												step === 1
													? "relative z-10 text-center text-sm font-bold"
													: "relative z-10 text-center text-sm font-bold text-darkGray dark:text-gray-400"
											}
										>
											{t("Form.CreatePassword")}
										</p>
									</div>
									<div className="after:content[''] relative w-[200px] p-4 after:absolute after:left-[50%] after:top-[50px] after:block after:h-[0px] after:w-[200px] after:border-b-2 after:border-dashed last:after:hidden dark:after:border-gray-600">
										<div
											className={
												step === 2
													? "relative z-10 mx-auto mb-2 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-gradDarkBlue p-2 shadow-highlight"
													: "relative z-10 mx-auto mb-2 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white p-2 shadow-highlight dark:bg-gray-600"
											}
										>
											<span
												className={
													step === 2
														? "text-[32px] font-bold text-white"
														: "text-[32px] font-bold text-darkGray dark:text-gray-400"
												}
											>
												{" "}
												2{" "}
											</span>
										</div>
										<p
											className={
												step === 2
													? "relative z-10 text-center text-sm font-bold"
													: "relative z-10 text-center text-sm font-bold text-darkGray dark:text-gray-400"
											}
										>
											{t("Words.ApproveAgreement")}
										</p>
									</div>
								</div>

								{step === 1 && (
									<section className="mx-auto w-full max-w-[500px] py-4">
										<FormField
											label={t("Form.CompanyName")}
											fieldType="input"
											inputType="text"
											value={cname}
											handleChange={(e) => setcname(e.target.value)}
											readOnly
											required
										/>

										<FormField
											label={t("Form.AgentName")}
											fieldType="input"
											value={aname}
											handleChange={(e) => setaname(e.target.value)}
											inputType="text"
											readOnly
											required
										/>

										<FormField
											label={t("Form.Email")}
											fieldType="input"
											inputType="email"
											value={email}
											handleChange={(e) => setemail(e.target.value)}
											readOnly
											required
										/>
										<FormField
											label={t("Form.NewPassword")}
											fieldType="input"
											inputType="password"
											value={pass1}
											handleChange={(e) => setpass1(e.target.value)}
											required
										/>
										<FormField
											label={t("Form.ConfirmPassword")}
											fieldType="input"
											inputType="password"
											value={pass2}
											handleChange={(e) => setpass2(e.target.value)}
											required
										/>
										<div className="flex flex-wrap justify-center">
											<div className="my-1 mr-4 last:mr-0">
												<Button label={t("Btn.Next")} btnType={"button"} handleClick={() => setstep(2)} />
											</div>
										</div>
									</section>
								)}
								
								{step === 2 && (
									<section className="mx-auto w-full max-w-[700px] py-4">
										<p className="text-center">
											{aggrement && aggrement.length > 0 && (
												<iframe src={`${aggrement}`} className="h-[50vh] w-[100%]"></iframe>
											)}
										</p>
										<hr className="my-4" />
										<div className="mb-8">
											{/* <h5 className="mb-2 font-bold">Agreement Validity</h5> */}
											<div className="mx-[-10px] flex flex-wrap">
												<div className="mb-4 w-full px-[10px] md:max-w-[50%]">
													<FormField
														label={t("Form.StartDate")}
														fieldType="input"
														inputType="date"
														value={sdate}
														handleChange={(e) => {
															setsdate(e.target.value);
														}}
														readOnly
														required
													/>
												</div>
												<div className="mb-4 w-full px-[10px] md:max-w-[50%]">
													<FormField
														label={t("Form.EndDate")}
														fieldType="input"
														inputType="date"
														value={edate}
														handleChange={(e) => {
															setedate(e.target.value);
														}}
														readOnly
														required
													/>
												</div>
											</div>
											<h5 className="mb-2 font-bold">{t("Form.AddSignature")}</h5>
											<label
												htmlFor="uploadBanner"
												className="flex min-h-[180px] w-full cursor-pointer flex-col items-center justify-center rounded-normal border-2 border-dashed hover:bg-lightBlue dark:hover:bg-gray-700"
											>
												{!file ? (
													<>
														<i className="fa-solid fa-plus text-[80px] text-lightGray"></i>
														<p className="text-sm text-darkGray dark:text-gray-400">
															Upload Signature or Photo
															<br />
															<small>(File type should be .png format)</small>
														</p>
													</>
												) : (
													<>
														<Image
															src={URL.createObjectURL(sign)}
															alt="User"
															width={1200}
															height={800}
															className="mx-auto h-auto max-h-[200px] w-auto object-contain"
														/>
													</>
												)}
												<input type="file" hidden id="uploadBanner" accept="image/*" onChange={handleFileInputChange} />
											</label>
											{/* // <div className="relative block w-full overflow-hidden rounded-normal border">
												// 	<Image
												// 		src={URL.createObjectURL(sign)}
												// 		alt="User"
												// 		width={1200}
												// 		height={800}
												// 		className="mx-auto h-auto max-h-[200px] w-auto object-contain"
												// 	/>
												// </div> */}
										</div>
										<div className="mb-4">
											<label htmlFor="agreeWithAgreement" className="flex cursor-pointer text-sm font-bold">
												<input
													type="checkbox"
													id="agreeWithAgreement"
													className="mr-4 mt-1"
													checked={check1}
													onChange={(e) => setcheck1(e.target.checked)}
												/>
												{srcLang === "ja"
													? "契約内容をご確認いただき、必要情報の記入が完了しましたら、こちらにチェックを入れてください。"
													: "Click here if you read the agreement terms and submit your filled details to create an account on the Somhako."}
											</label>
										</div>

										<div className="flex flex-wrap justify-center">
											<div className="my-1 mr-4 last:mr-0">
												<Button
													btnStyle="gray"
													label={t("Btn.Prev")}
													btnType={"button"}
													handleClick={() => setstep(1)}
												/>
											</div>
											<div className="my-1 mr-4 last:mr-0">
												<Button
													label={t("Btn.Submit")}
													btnType={"button"}
													handleClick={regVendor}
													disabled={!checkForm()}
												/>
											</div>
										</div>
									</section>
								)}
							</div>
						</div>
					</div>
				</main>
			)}
		</>
	);
}
export async function getStaticPaths() {
	return {
		paths: [{ params: { vrefid: "string" } }],
		fallback: true
	};
}
export async function getStaticProps({ context, locale }: any) {
	const translations = await serverSideTranslations(locale, ["common"]);
	return {
		props: {
			...translations
		}
	};
}
VendorSignup.noAuth = true;
