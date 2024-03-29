import OrgSideBar from "@/components/organization/SideBar";
import OrgTopBar from "@/components/organization/TopBar";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import bellIcon from "/public/images/icons/bell.png";
import calendarSetting from "/public/images/calendar-setting.png";
import Button from "@/components/Button";
import FormField from "@/components/FormField";
import UpcomingComp from "@/components/organization/upcomingComp";
import { useNewNovusStore } from "@/utils/novus";
import { axiosInstanceAuth } from "@/pages/api/axiosApi";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import OrgRSideBar from "@/components/organization/RSideBar";
import { useLangStore } from "@/utils/code";

export default function Notifications({ atsVersion, userRole, upcomingSoon }: any) {
	const router = useRouter();
	const srcLang = useLangStore((state: { lang: any }) => state.lang);
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
				<title>{srcLang === "ja" ? "お知らせ" : "Notifications"}</title>
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
										<Image src={bellIcon} alt="Active Job" height={20} />
									</div>
									<span>Notifications</span>
								</h2>
							</div>
						</div>
						<div className="mx-auto w-full max-w-[800px] px-4 py-6">
							{upcomingSoon ? (
								<UpcomingComp />
							) : (
								<>
									<div className="mb-4 rounded-normal bg-white p-4 shadow-normal last:mb-0 dark:bg-gray-700">
										<div>
											<table cellPadding={"0"} cellSpacing={"0"} className="w-full text-left">
												<thead>
													<tr>
														<th className="border-b px-3 py-2 font-bold dark:border-b-gray-600">
															Applicant Notifications
														</th>
														<th className="w-[100px] border-b px-3 py-2 text-center font-bold dark:border-b-gray-600">
															Receive
														</th>
													</tr>
												</thead>
												<tbody className="text-sm text-darkGray dark:text-gray-400">
													<tr>
														<td className="px-3 py-2">Applicant Applications</td>
														<td className="w-[100px] px-3 py-2 text-center">
															<input type="checkbox" />
														</td>
													</tr>
													<tr>
														<td className="px-3 py-2">Interview Scheduled</td>
														<td className="w-[100px] px-3 py-2 text-center">
															<input type="checkbox" />
														</td>
													</tr>
													<tr>
														<td className="px-3 py-2">Feedback</td>
														<td className="w-[100px] px-3 py-2 text-center">
															<input type="checkbox" />
														</td>
													</tr>
													<tr>
														<td className="px-3 py-2">Feedback submitted on candidate in the job you have access to</td>
														<td className="w-[100px] px-3 py-2 text-center">
															<input type="checkbox" />
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<div className="mb-4 rounded-normal bg-white p-4 shadow-normal last:mb-0 dark:bg-gray-700">
										<div>
											<table cellPadding={"0"} cellSpacing={"0"} className="w-full text-left">
												<thead>
													<tr>
														<th className="border-b px-3 py-2 font-bold dark:border-b-gray-600">
															Company Notifications
														</th>
														<th className="w-[100px] border-b px-3 py-2 text-center font-bold dark:border-b-gray-600">
															Receive
														</th>
													</tr>
												</thead>
												<tbody className="text-sm text-darkGray dark:text-gray-400">
													<tr>
														<td className="px-3 py-2">New job opening created</td>
														<td className="w-[100px] px-3 py-2 text-center">
															<input type="checkbox" />
														</td>
													</tr>
													<tr>
														<td className="px-3 py-2">New user signed up</td>
														<td className="w-[100px] px-3 py-2 text-center">
															<input type="checkbox" />
														</td>
													</tr>
													<tr>
														<td className="px-3 py-2">Job opening closed</td>
														<td className="w-[100px] px-3 py-2 text-center">
															<input type="checkbox" />
														</td>
													</tr>
													<tr>
														<td className="px-3 py-2">Job opening archived</td>
														<td className="w-[100px] px-3 py-2 text-center">
															<input type="checkbox" />
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
