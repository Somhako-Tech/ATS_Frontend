import OrgSideBar from "@/components/organization/SideBar";
import OrgTopBar from "@/components/organization/TopBar";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import calendarIcon from "/public/images/icons/calendar.png";
import calendarSetting from "/public/images/calendar-setting.png";
import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useLangStore } from "@/utils/code";
import UpcomingComp from "@/components/organization/upcomingComp";
import OrgRSideBar from "@/components/organization/RSideBar";
import { useNewNovusStore } from "@/utils/novus";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { axiosInstanceAuth } from "@/pages/api/axiosApi";

export default function Calendar({ upcomingSoon }: any) {
	const { t } = useTranslation("common");
	const srcLang = useLangStore((state: { lang: any }) => state.lang);
	const router = useRouter();

	const { data: session } = useSession();
	const [token, settoken] = useState("");
	useEffect(() => {
		if (session) {
			settoken(session.accessToken as string);
		} else if (!session) {
			settoken("");
		}
	}, [session]);

	const axiosInstanceAuth2 = axiosInstanceAuth(token);
	const visible = useNewNovusStore((state: { visible: any }) => state.visible);
	const tvisible = useNewNovusStore((state: { tvisible: any }) => state.tvisible);
	return (
		<>
			<Head>
				<title>{t("Words.Calendar")}</title>
			</Head>
			<main>
				<OrgSideBar />
				<OrgTopBar />
				{token && token.length > 0 && <OrgRSideBar axiosInstanceAuth2={axiosInstanceAuth2} />}
				<div
					id="overlay"
					className="fixed left-0 top-0 z-[9] hidden h-full w-full bg-[rgba(0,0,0,0.2)] dark:bg-[rgba(255,255,255,0.2)]"
				></div>
				<div className={`layoutWrap p-4` + " " + (visible && "mr-[calc(27.6%+1rem)]")}>
					<div className="rounded-normal bg-white shadow-normal dark:bg-gray-800">
						<div className="border-b py-4">
							<div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-start px-4 py-2">
								<button
									onClick={() => router.back()}
									className="mr-10 justify-self-start text-darkGray dark:text-gray-400"
								>
									<i className="fa-solid fa-arrow-left text-xl"></i>
								</button>
								<h2 className="flex items-center text-lg font-bold">
									<div className="mr-4 flex h-[45px] w-[45px] items-center justify-center rounded bg-[#B2E3FF] p-3">
										<Image src={calendarIcon} alt="Active Job" height={20} />
									</div>
									<span>{t("Words.Calendar")}</span>
								</h2>
							</div>
						</div>
						{upcomingSoon ? (
							<UpcomingComp />
						) : (
							<div className="mx-auto w-full max-w-[980px] px-4 py-6">
								<div className="mb-6 flex flex-wrap overflow-hidden rounded-normal bg-gradient-to-br from-[#8F93F8] to-[#8DB9FB] text-white">
									<div className="flex w-full items-center md:max-w-[calc(100%-200px)]">
										<Image src={calendarSetting} alt="Calendar" width={60} className="mb-8 ml-4" />
										<p className="grow px-4 text-center">
											{srcLang === "ja"
												? "既存のカレンダーを連携することができます"
												: "Connect your calendar with the provided integration"}
										</p>
									</div>
									<div className="flex w-full items-center justify-center border-l md:max-w-[200px]">
										<Button label={t("Btn.Integrate")} />
									</div>
								</div>
								<FormField fieldType="select" label={srcLang === "ja" ? "タイムゾーン" : "Time Zone"} />
								<div className="mx-auto w-full max-w-[600px]">
									<h6 className="mb-2 font-semibold text-darkGray dark:text-gray-400">
										{srcLang === "ja" ? "面接可能な時間帯を設定" : "Set your working week days to schedule interviews"}
									</h6>
									<div className="">
										<table cellPadding={"0"} cellSpacing={"0"} className="w-full">
											<tbody>
												<tr>
													<td className="border-b px-3 py-2 text-sm dark:border-b-gray-600">
														<input type="checkbox" />
													</td>
													<td className="border-b px-3 py-2 text-sm text-darkGray dark:border-b-gray-600 dark:text-gray-400">
														{srcLang === "ja" ? "月曜日" : "Monday"}
													</td>
													<td className="w-[150px] border-b px-3 py-2 dark:border-b-gray-600">
														<FormField
															id={"start"}
															fieldType="date"
															placeholder={t("Form.StartTime")}
															singleSelect
															showTimeSelect
															showHours
															required
														/>
													</td>
													<td className="w-[150px] border-b px-3 py-2 dark:border-b-gray-600">
														<FormField
															id={"end"}
															fieldType="date"
															placeholder={t("Form.EndTime")}
															singleSelect
															showTimeSelect
															showHours
															required
														/>
													</td>
												</tr>
												<tr>
													<td className="border-b px-3 py-2 text-sm dark:border-b-gray-600">
														<input type="checkbox" />
													</td>
													<td className="border-b px-3 py-2 text-sm text-darkGray dark:border-b-gray-600 dark:text-gray-400">
														{srcLang === "ja" ? "火曜日" : "Tuesday"}
													</td>
													<td className="w-[150px] border-b px-3 py-2 dark:border-b-gray-600">
														<FormField
															id={"start"}
															fieldType="date"
															placeholder={t("Form.StartTime")}
															singleSelect
															showTimeSelect
															showHours
															required
														/>
													</td>
													<td className="w-[150px] border-b px-3 py-2 dark:border-b-gray-600">
														<FormField
															id={"end"}
															fieldType="date"
															placeholder={t("Form.EndTime")}
															singleSelect
															showTimeSelect
															showHours
															required
														/>
													</td>
												</tr>
												<tr>
													<td className="border-b px-3 py-2 text-sm dark:border-b-gray-600">
														<input type="checkbox" />
													</td>
													<td className="border-b px-3 py-2 text-sm text-darkGray dark:border-b-gray-600 dark:text-gray-400">
														{srcLang === "ja" ? "水曜日" : "Wednesday"}
													</td>
													<td className="w-[150px] border-b px-3 py-2 dark:border-b-gray-600">
														<FormField
															id={"start"}
															fieldType="date"
															placeholder={t("Form.StartTime")}
															singleSelect
															showTimeSelect
															showHours
															required
														/>
													</td>
													<td className="w-[150px] border-b px-3 py-2 dark:border-b-gray-600">
														<FormField
															id={"end"}
															fieldType="date"
															placeholder={t("Form.EndTime")}
															singleSelect
															showTimeSelect
															showHours
															required
														/>
													</td>
												</tr>
												<tr>
													<td className="border-b px-3 py-2 text-sm dark:border-b-gray-600">
														<input type="checkbox" />
													</td>
													<td className="border-b px-3 py-2 text-sm text-darkGray dark:border-b-gray-600 dark:text-gray-400">
														{srcLang === "ja" ? "木曜日" : "Thursday"}
													</td>
													<td className="w-[150px] border-b px-3 py-2 dark:border-b-gray-600">
														<FormField
															id={"start"}
															fieldType="date"
															placeholder={t("Form.StartTime")}
															singleSelect
															showTimeSelect
															showHours
															required
														/>
													</td>
													<td className="w-[150px] border-b px-3 py-2 dark:border-b-gray-600">
														<FormField
															id={"end"}
															fieldType="date"
															placeholder={t("Form.EndTime")}
															singleSelect
															showTimeSelect
															showHours
															required
														/>
													</td>
												</tr>
												<tr>
													<td className="border-b px-3 py-2 text-sm dark:border-b-gray-600">
														<input type="checkbox" />
													</td>
													<td className="border-b px-3 py-2 text-sm text-darkGray dark:border-b-gray-600 dark:text-gray-400">
														{srcLang === "ja" ? "金曜日" : "Friday"}
													</td>
													<td className="w-[150px] border-b px-3 py-2 dark:border-b-gray-600">
														<FormField
															id={"start"}
															fieldType="date"
															placeholder={t("Form.StartTime")}
															singleSelect
															showTimeSelect
															showHours
															required
														/>
													</td>
													<td className="w-[150px] border-b px-3 py-2 dark:border-b-gray-600">
														<FormField
															id={"end"}
															fieldType="date"
															placeholder={t("Form.EndTime")}
															singleSelect
															showTimeSelect
															showHours
															required
														/>
													</td>
												</tr>
												<tr>
													<td className="border-b px-3 py-2 text-sm dark:border-b-gray-600">
														<input type="checkbox" />
													</td>
													<td className="border-b px-3 py-2 text-sm text-darkGray dark:border-b-gray-600 dark:text-gray-400">
														{srcLang === "ja" ? "土曜日" : "Saturday"}
													</td>
													<td className="w-[150px] border-b px-3 py-2 dark:border-b-gray-600">
														<FormField
															id={"start"}
															fieldType="date"
															placeholder={t("Form.StartTime")}
															singleSelect
															showTimeSelect
															showHours
															required
														/>
													</td>
													<td className="w-[150px] border-b px-3 py-2 dark:border-b-gray-600">
														<FormField
															id={"end"}
															fieldType="date"
															placeholder={t("Form.EndTime")}
															singleSelect
															showTimeSelect
															showHours
															required
														/>
													</td>
												</tr>
												<tr>
													<td className="border-b px-3 py-2 text-sm dark:border-b-gray-600">
														<input type="checkbox" />
													</td>
													<td className="border-b px-3 py-2 text-sm text-darkGray dark:border-b-gray-600 dark:text-gray-400">
														{srcLang === "ja" ? "日曜日" : "Sunday"}
													</td>
													<td className="w-[150px] border-b px-3 py-2 dark:border-b-gray-600">
														<FormField
															id={"start"}
															fieldType="date"
															placeholder={t("Form.StartTime")}
															singleSelect
															showTimeSelect
															showHours
															required
														/>
													</td>
													<td className="w-[150px] border-b px-3 py-2 dark:border-b-gray-600">
														<FormField
															id={"end"}
															fieldType="date"
															placeholder={t("Form.EndTime")}
															singleSelect
															showTimeSelect
															showHours
															required
														/>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						)}
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
