import OrgSideBar from "@/components/organization/SideBar";
import OrgTopBar from "@/components/organization/TopBar";
import Head from "next/head";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Switch } from "@headlessui/react";
import Button from "@/components/Button";
import integrationIcon from "/public/images/icons/integration.png";
import googleIcon from "/public/images/social/google-icon.png";
import calendlyIcon from "/public/images/social/calendly-icon.png";
import zoomIcon from "/public/images/social/zoom-icon.png";
import gmailIcon from "/public/images/social/gmail-icon.png";
import microsoftIcon from "/public/images/social/microsoft-icon.png";
import googleMeetIcon from "/public/images/social/google-meet-icon.png";
import googleCalIcon from "/public/images/social/google-cal-icon.png";
import outlookEmailIcon from "/public/images/social/outlook-email-icon.png";
import outlookTeamIcon from "/public/images/social/outlook-team-icon.png";
import bambooHrIcon from "/public/images/social/bambooHr-icon.png";
import adpIcon from "/public/images/social/adp-icon.png";
import checkrIcon from "/public/images/social/checkr-icon.png";
import linkedinIcon from "/public/images/social/linkedin-icon.png";
import somhakoIcon from "/public/images/social/somhako.ico";
import indeedIcon from "/public/images/social/indeed-icon.png";
import glassdoorIcon from "/public/images/social/glassdoor-icon.png";
import gorillaIcon from "/public/images/social/gorilla-icon.png";
import codilityIcon from "/public/images/social/codility-icon.png";
import slackIcon from "/public/images/social/slack-icon.png";
import UpcomingComp from "@/components/organization/upcomingComp";
import { useNewNovusStore } from "@/utils/novus";
import OrgRSideBar from "@/components/organization/RSideBar";
import { axiosInstanceAuth } from "@/pages/api/axiosApi";
import { useSession } from "next-auth/react";
import Button2 from "@/components/Button2";

export default function Integrations({ upcomingSoon }: any) {
	// console.log("ye hain upcoming soon",upcomingSoon)
	const router = useRouter();
	const [enabled, setEnabled] = useState(false);
	const tabHeading_1 = [
		{
			title: "Email Calendar"
		},
		{
			title: "HR System"
		},
		{
			title: "Job Boards"
		},
		{
			title: "Assessment"
		},
		{
			title: "Slack"
		}
	];
	const { data: session } = useSession();
	const [token, settoken] = useState("");
	useEffect(() => {
		if (session) {
			settoken(session.accessToken as string);
		} else if (!session) {
			settoken("");
		}
	}, [session]);
	async function connectLinkedin(){
		axiosInstanceAuth2.post('').then((res)=>{
			try {
				if (res.data) {
					// console.log(res.data);
				}
			} catch (error) {
				// console.log(error);
				
			}
		}).catch((error)=>{
			// console.log("Error connecting to linkedin",error);
		})
	}

	const axiosInstanceAuth2 = axiosInstanceAuth(token);
	const visible = useNewNovusStore((state: { visible: any }) => state.visible);
	const tvisible = useNewNovusStore((state: { tvisible: any }) => state.tvisible);

	return (
		<>
			<Head>
				<title>Integrations</title>
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
						<div className="py-4">
							<div className="mx-auto mb-4 flex w-full max-w-[1100px] flex-wrap items-center justify-start px-4 py-2">
								<button
									onClick={() => router.back()}
									className="mr-10 justify-self-start text-darkGray dark:text-gray-400"
								>
									<i className="fa-solid fa-arrow-left text-xl"></i>
								</button>
								<h2 className="flex items-center text-lg font-bold">
									<div className="mr-4 flex h-[45px] w-[45px] items-center justify-center rounded bg-[#B2E3FF] p-3">
										<Image src={integrationIcon} alt="Active Job" height={20} />
									</div>
									<span>Integrations</span>
								</h2>
							</div>
							{!upcomingSoon ? (
								<>
									<UpcomingComp />
								</>
							) : (
								<>
									<Tab.Group>
										<div className={"border-b px-4"}>
											<Tab.List className={"mx-auto w-full max-w-[950px]"}>
												{tabHeading_1.map((item, i) => (
													<Tab key={i} as={Fragment}>
														{({ selected }) => (
															<button
																className={
																	"mr-16 border-b-4 py-2 font-semibold focus:outline-none" +
																	" " +
																	(selected
																		? "border-primary text-primary"
																		: "border-transparent text-darkGray dark:text-gray-400")
																}
															>
																{item.title}
															</button>
														)}
													</Tab>
												))}
											</Tab.List>
										</div>
										<Tab.Panels className={"mx-auto w-full max-w-[980px] px-4 py-8"}>
											<Tab.Panel>
												<div className="-mx-3 flex flex-wrap">
													<div className="mb-6 w-full px-3 md:max-w-[50%] lg:max-w-[33.3333%]">
														<div className="h-full rounded-normal bg-lightBlue p-5 shadow-highlight dark:bg-gray-700">
															<Image src={googleIcon} alt="Social" width={150} className="mb-2 max-h-[26px] w-auto" />
															<h4 className="mb-4 font-bold">Google Suite</h4>
															<ul>
																<li className="my-3 flex items-center last:mb-0">
																	<div className="flex grow items-center">
																		<span className="block w-8">
																			<Image
																				src={gmailIcon}
																				alt="Social"
																				width={100}
																				className="mr-4 max-h-[14px] w-auto"
																			/>
																		</span>
																		<h6 className="text-sm text-darkGray dark:text-gray-400">Gmail</h6>
																	</div>
																	<Switch
																		checked={enabled}
																		onChange={setEnabled}
																		className={`${
																			enabled ? "bg-primary" : "bg-gray-400"
																		} relative inline-flex h-5 w-10 items-center rounded-full`}
																	>
																		<span className="sr-only">Enable notifications</span>
																		<span
																			className={`${
																				enabled ? "translate-x-6" : "translate-x-1"
																			} inline-block h-3 w-3 transform rounded-full bg-white transition`}
																		/>
																	</Switch>
																</li>
																<li className="my-3 flex items-center last:mb-0">
																	<div className="flex grow items-center">
																		<span className="block w-8">
																			<Image
																				src={googleCalIcon}
																				alt="Social"
																				width={100}
																				className="mr-4 max-h-[14px] w-auto"
																			/>
																		</span>
																		<h6 className="text-sm text-darkGray dark:text-gray-400">Google Calendar</h6>
																	</div>
																	<Switch
																		checked={enabled}
																		onChange={setEnabled}
																		className={`${
																			enabled ? "bg-primary" : "bg-gray-400"
																		} relative inline-flex h-5 w-10 items-center rounded-full`}
																	>
																		<span className="sr-only">Enable notifications</span>
																		<span
																			className={`${
																				enabled ? "translate-x-6" : "translate-x-1"
																			} inline-block h-3 w-3 transform rounded-full bg-white transition`}
																		/>
																	</Switch>
																</li>
																<li className="my-3 flex items-center last:mb-0">
																	<div className="flex grow items-center">
																		<span className="block w-8">
																			<Image
																				src={googleMeetIcon}
																				alt="Social"
																				width={100}
																				className="mr-4 max-h-[14px] w-auto"
																			/>
																		</span>
																		<h6 className="text-sm text-darkGray dark:text-gray-400">Google Meet</h6>
																	</div>
																	<Switch
																		checked={enabled}
																		onChange={setEnabled}
																		className={`${
																			enabled ? "bg-primary" : "bg-gray-400"
																		} relative inline-flex h-5 w-10 items-center rounded-full`}
																	>
																		<span className="sr-only">Enable notifications</span>
																		<span
																			className={`${
																				enabled ? "translate-x-6" : "translate-x-1"
																			} inline-block h-3 w-3 transform rounded-full bg-white transition`}
																		/>
																	</Switch>
																</li>
															</ul>
														</div>
													</div>
													<div className="mb-6 w-full px-3 md:max-w-[50%] lg:max-w-[33.3333%]">
														<div className="h-full rounded-normal bg-lightBlue p-5 shadow-highlight dark:bg-gray-700">
															<Image
																src={microsoftIcon}
																alt="Social"
																width={150}
																className="mb-2 max-h-[26px] w-auto"
															/>
															<h4 className="mb-4 font-bold">Microsoft</h4>
															<ul>
																<li className="my-3 flex items-center last:mb-0">
																	<div className="flex grow items-center">
																		<span className="block w-8">
																			<Image
																				src={outlookEmailIcon}
																				alt="Social"
																				width={100}
																				className="mr-4 max-h-[14px] w-auto"
																			/>
																		</span>
																		<h6 className="text-sm text-darkGray dark:text-gray-400">Outlook Email</h6>
																	</div>
																	<Switch
																		checked={enabled}
																		onChange={setEnabled}
																		className={`${
																			enabled ? "bg-primary" : "bg-gray-400"
																		} relative inline-flex h-5 w-10 items-center rounded-full`}
																	>
																		<span className="sr-only">Enable notifications</span>
																		<span
																			className={`${
																				enabled ? "translate-x-6" : "translate-x-1"
																			} inline-block h-3 w-3 transform rounded-full bg-white transition`}
																		/>
																	</Switch>
																</li>
																<li className="my-3 flex items-center last:mb-0">
																	<div className="flex grow items-center">
																		<span className="block w-8">
																			<Image
																				src={outlookEmailIcon}
																				alt="Social"
																				width={100}
																				className="mr-4 max-h-[14px] w-auto"
																			/>
																		</span>
																		<h6 className="text-sm text-darkGray dark:text-gray-400">Outlook Calendar</h6>
																	</div>
																	<Switch
																		checked={enabled}
																		onChange={setEnabled}
																		className={`${
																			enabled ? "bg-primary" : "bg-gray-400"
																		} relative inline-flex h-5 w-10 items-center rounded-full`}
																	>
																		<span className="sr-only">Enable notifications</span>
																		<span
																			className={`${
																				enabled ? "translate-x-6" : "translate-x-1"
																			} inline-block h-3 w-3 transform rounded-full bg-white transition`}
																		/>
																	</Switch>
																</li>
																<li className="my-3 flex items-center last:mb-0">
																	<div className="flex grow items-center">
																		<span className="block w-8">
																			<Image
																				src={outlookTeamIcon}
																				alt="Social"
																				width={100}
																				className="mr-4 max-h-[14px] w-auto"
																			/>
																		</span>
																		<h6 className="text-sm text-darkGray dark:text-gray-400">Outlook Team</h6>
																	</div>
																	<Switch
																		checked={enabled}
																		onChange={setEnabled}
																		className={`${
																			enabled ? "bg-primary" : "bg-gray-400"
																		} relative inline-flex h-5 w-10 items-center rounded-full`}
																	>
																		<span className="sr-only">Enable notifications</span>
																		<span
																			className={`${
																				enabled ? "translate-x-6" : "translate-x-1"
																			} inline-block h-3 w-3 transform rounded-full bg-white transition`}
																		/>
																	</Switch>
																</li>
															</ul>
														</div>
													</div>
													<div className="mb-6 w-full px-3 md:max-w-[50%] lg:max-w-[33.3333%]">
														<div className="h-full rounded-normal bg-lightBlue p-5 shadow-highlight dark:bg-gray-700">
															<Image src={calendlyIcon} alt="Social" width={150} className="mb-2 max-h-[26px] w-auto" />
															<h4 className="mb-4 font-bold">Calendly</h4>
															<p className="mb-4 text-sm text-darkGray dark:text-gray-400">
																Integrate with Calendly to get access
															</p>
															<Button2 btnStyle="outlined" label="Integrate" small />
														</div>
													</div>
													<div className="mb-6 w-full px-3 md:max-w-[50%] lg:max-w-[33.3333%]">
														<div className="h-full rounded-normal bg-lightBlue p-5 shadow-highlight dark:bg-gray-700">
															<Image src={zoomIcon} alt="Social" width={150} className="mb-2 max-h-[26px] w-auto" />
															<h4 className="mb-4 font-bold">Zoom</h4>
															<p className="mb-4 text-sm text-darkGray dark:text-gray-400">Integrate with Zoom</p>
															<Button2 btnStyle="outlined" label="Integrate" small />
														</div>
													</div>
												</div>
											</Tab.Panel>
											<Tab.Panel>
												<div className="-mx-3 flex flex-wrap">
													<div className="mb-6 w-full px-3 md:max-w-[50%] lg:max-w-[33.3333%]">
														<div className="h-full rounded-normal bg-lightBlue p-5 shadow-highlight dark:bg-gray-700">
															<Image src={bambooHrIcon} alt="Social" width={150} className="mb-2 max-h-[26px] w-auto" />
															<h4 className="mb-4 font-bold">Bamboo HR</h4>
															<p className="mb-4 text-sm text-darkGray dark:text-gray-400">
																Integrate with Bamboo HR to get access
															</p>
															<Button2 btnStyle="outlined" label="Integrate" small />
														</div>
													</div>
													<div className="mb-6 w-full px-3 md:max-w-[50%] lg:max-w-[33.3333%]">
														<div className="h-full rounded-normal bg-lightBlue p-5 shadow-highlight dark:bg-gray-700">
															<Image src={adpIcon} alt="Social" width={150} className="mb-2 max-h-[26px] w-auto" />
															<h4 className="mb-4 font-bold">ADP</h4>
															<p className="mb-4 text-sm text-darkGray dark:text-gray-400">
																Integrate with ADP to get access
															</p>
															<Button2 btnStyle="outlined" label="Integrate" />
														</div>
													</div>
													<div className="mb-6 w-full px-3 md:max-w-[50%] lg:max-w-[33.3333%]">
														<div className="h-full rounded-normal bg-lightBlue p-5 shadow-highlight dark:bg-gray-700">
															<Image src={checkrIcon} alt="Social" width={150} className="mb-2 max-h-[26px] w-auto" />
															<h4 className="mb-4 font-bold">Checkr</h4>
															<p className="mb-4 text-sm text-darkGray dark:text-gray-400">
																Integrate with Checkr to check the background of any user
															</p>
															<Button2 btnStyle="outlined" label="Integrate" small />
														</div>
													</div>
												</div>
											</Tab.Panel>
											<Tab.Panel>
												<div className="-mx-3 flex flex-wrap">
													<div className="mb-6 w-full px-3 md:max-w-[50%] lg:max-w-[33.3333%]">
														<div className="h-full rounded-normal bg-lightBlue p-5 shadow-highlight dark:bg-gray-700">
															<Image src={linkedinIcon} alt="Social" width={150} className="mb-2 max-h-[26px] w-auto" />
															<h4 className="mb-4 font-bold">LinkedIn</h4>
															<p className="mb-4 text-sm text-darkGray dark:text-gray-400">
																Integrate with LinkedIn to post a jobs in your LinkedIn account
															</p>
															<Button2 btnStyle="outlined" label="Integrate" small handleClick={connectLinkedin} />
														</div>
													</div>
													<div className="mb-6 w-full px-3 md:max-w-[50%] lg:max-w-[33.3333%]">
														<div className="h-full rounded-normal bg-lightBlue p-5 shadow-highlight dark:bg-gray-700">
															<Image src={somhakoIcon} alt="Social" width={150} className="mb-2 max-h-[26px] w-auto" />
															<h4 className="mb-4 font-bold">Somhako</h4>
															<p className="mb-4 text-sm text-darkGray dark:text-gray-400">
																Integrate with Somhako Marketplace to post a jobs
															</p>
															<Button2 btnStyle="outlined" label="Integrate" small />
														</div>
													</div>
													<div className="mb-6 w-full px-3 md:max-w-[50%] lg:max-w-[33.3333%]">
														<div className="h-full rounded-normal bg-lightBlue p-5 shadow-highlight dark:bg-gray-700">
															<Image src={indeedIcon} alt="Social" width={150} className="mb-2 max-h-[26px] w-auto" />
															<h4 className="mb-4 font-bold">Indeed</h4>
															<p className="mb-9 text-sm text-darkGray dark:text-gray-400">
																Integrate with Indeed to post a jobs
															</p>
															<Button2 btnStyle="outlined" label="Integrate" small />
														</div>
													</div>
													<div className="mb-6 w-full px-3 md:max-w-[50%] lg:max-w-[33.3333%]">
														<div className="h-full rounded-normal bg-lightBlue p-5 shadow-highlight dark:bg-gray-700">
															<Image
																src={glassdoorIcon}
																alt="Social"
																width={150}
																className="mb-2 max-h-[26px] w-auto"
															/>
															<h4 className="mb-4 font-bold">Glassdoor</h4>
															<p className="mb-4 text-sm text-darkGray dark:text-gray-400">
																Integrate with Glassdoor to post a jobs
															</p>
															<Button2 btnStyle="outlined" label="Integrate" small />
														</div>
													</div>
												</div>
											</Tab.Panel>
											<Tab.Panel>
												<div className="-mx-3 flex flex-wrap">
													<div className="mb-6 w-full px-3 md:max-w-[50%] lg:max-w-[33.3333%]">
														<div className="h-full rounded-normal bg-lightBlue p-5 shadow-highlight dark:bg-gray-700">
															<Image src={codilityIcon} alt="Social" width={150} className="mb-2 max-h-[20px] w-auto" />
															<h4 className="mb-4 font-bold">Codility</h4>
															<p className="mb-4 text-sm text-darkGray dark:text-gray-400">Integrate with Codility</p>
															<Button2 btnStyle="outlined" label="Integrate" small />
														</div>
													</div>
													<div className="mb-6 w-full px-3 md:max-w-[50%] lg:max-w-[33.3333%]">
														<div className="h-full rounded-normal bg-lightBlue p-5 shadow-highlight dark:bg-gray-700">
															<Image src={gorillaIcon} alt="Social" width={150} className="mb-2 max-h-[26px] w-auto" />
															<h4 className="mb-4 font-bold">Test Gorilla</h4>
															<p className="mb-4 text-sm text-darkGray dark:text-gray-400">
																Integrate with Test Gorilla
															</p>
															<Button2 btnStyle="outlined" label="Integrate" small />
														</div>
													</div>
												</div>
											</Tab.Panel>
											<Tab.Panel>
												<div className="-mx-3 flex flex-wrap">
													<div className="mb-6 w-full px-3 md:max-w-[50%] lg:max-w-[33.3333%]">
														<div className="h-full rounded-normal bg-lightBlue p-5 shadow-highlight dark:bg-gray-700">
															<Image src={slackIcon} alt="Social" width={150} className="mb-2 max-h-[20px] w-auto" />
															<h4 className="mb-4 font-bold">Slack</h4>
															<p className="mb-4 text-sm text-darkGray dark:text-gray-400">
																Integrate with Slack to communicate with your team members
															</p>
															<Button2 btnStyle="outlined" label="Integrate" small />
														</div>
													</div>
												</div>
											</Tab.Panel>
										</Tab.Panels>
									</Tab.Group>
								</>
							)}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
