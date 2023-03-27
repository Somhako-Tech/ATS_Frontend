import Head from "next/head";
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Popover } from "@headlessui/react";
import Button from "@/components/Button";
import Orgsidebar from "@/components/organization/SideBar";
import Orgtopbar from "@/components/organization/TopBar";
import userImg from "/public/images/user-image.png";
import customizeApplicants from "/public/images/icons/customize_applicants.png";
import customizeActivity from "/public/images/icons/customize_activity.png";
import customizeAnalytics from "/public/images/icons/customize_analytics.png";
import customizeRecent from "/public/images/icons/customize_recent.png";
import customizeTodo from "/public/images/icons/customize_todo.png";
import customizeUpcoming from "/public/images/icons/customize_upcoming.png";
import { getProviders, useSession } from "next-auth/react";
import ChatAssistance from "@/components/ChatAssistance";
import JobCard_1 from "@/components/JobCard-1";

export default function Dashboard() {
	const settings = {
		dots: false,
		arrows: true,
		infinite: false,
		speed: 500,
		slidesToShow: 2.5,
		slidesToScroll: 1,
		rows: 2,
		prevArrow: (
			<button type="button" className="slick-arrow">
				<i className="fa-solid fa-chevron-left"></i>
			</button>
		),
		nextArrow: (
			<button type="button" className="slick-arrow">
				<i className="fa-solid fa-chevron-right"></i>
			</button>
		)
	};
	const aplc_status = [
		{
			percentage: 10,
			title: "Total Pipelines",
			number: 99,
			color: "#58E700",
			icon: <i className="fa-solid fa-timeline"></i>
		},
		{
			percentage: 10,
			title: "Total On Hold",
			number: 100,
			color: "#FFF616",
			icon: <i className="fa-solid fa-circle-pause"></i>
		},
		{
			percentage: 6,
			title: "Total Shortlisted",
			number: 99,
			color: "#58E700",
			icon: <i className="fa-solid fa-circle-check"></i>
		},
		{
			percentage: 10,
			title: "Total Hired",
			number: 100,
			color: "#58E700",
			icon: <i className="fa-solid fa-users"></i>
		},
		{
			percentage: +10,
			title: "Total In Review",
			number: 100,
			color: "#FE8F66",
			icon: <i className="fa-solid fa-eye"></i>
		},
		{
			percentage: 6,
			title: "Total Rejected",
			number: 100,
			color: "#FF4500",
			icon: <i className="fa-solid fa-circle-xmark"></i>
		},
		{
			percentage: 6,
			title: "Total Interviews",
			number: 100,
			color: "#FE8F66",
			icon: <i className="fa-solid fa-clipboard-question"></i>
		},
		{
			percentage: 6,
			title: "Aging Profiles",
			number: 100,
			color: "#FF4500",
			icon: <i className="fa-solid fa-user-group"></i>
		}
	];
	const { data: session } = useSession();
	return (
		<>
			<Head>
				<title>Dashboard</title>
				<meta name="description" content="Generated by create next app" />
			</Head>
			<main>
				{session && <ChatAssistance accessToken={session.accessToken} /> }
				<Orgsidebar />
				<Orgtopbar />
				<div id="overlay" className="fixed left-0 top-0 z-[9] hidden h-full w-full bg-[rgba(0,0,0,0.2)] dark:bg-[rgba(255,255,255,0.2)]"></div>
				<div className="layoutWrap p-4 lg:p-8">
					<div id="dashboard" className="relative">
						<div className="mx-[-15px] flex flex-wrap">
							<div className="mb-[30px] w-full px-[15px] lg:max-w-[50%]">
								<div className="h-full rounded-normal bg-white shadow dark:bg-gray-800">
									<div className="flex items-center justify-between p-6">
										<h2 className="text-xl font-bold">Applicant Details</h2>
										<aside>
											<button type="button" className="h-[30px] w-[30px] rounded-full bg-darkGray text-gray-300 cursor-grab">
												<i className="fa-regular fa-hand"></i>
											</button>
										</aside>
									</div>
									<div className="dashboardSlider p-6 pt-0">
										<Slider {...settings}>
											{aplc_status.map((item, i) => (
												<div key={i}>
													<div className="py-3 px-2">
														<div className="relative rounded-normal border-b-[4px] border-lightGray bg-white p-3 pr-5 shadow-highlight dark:bg-gray-700">
															<div className="mb-2 flex items-center justify-between">
																<h4 className="text-2xl font-extrabold">{item.number}</h4>
																<div className="rounded bg-lightGray py-1 px-2 text-[12px] text-white">{item.icon}</div>
															</div>
															<p className="mb-2 text-sm">{item.title}</p>
															<div style={{ width: 40, height: 40 }}>
																<CircularProgressbar
																	value={item.percentage}
																	text={`${item.percentage}`}
																	styles={buildStyles({ pathColor: item.color, textSize: "26px", textColor: "#727272" })}
																/>
															</div>
															<div
																className={`absolute right-0 top-[50%] block h-[74px] w-[15px] translate-y-[-50%] border-[14px] border-transparent`}
																style={{ borderRightColor: item.color }}
															></div>
														</div>
													</div>
												</div>
											))}
										</Slider>
									</div>
								</div>
							</div>
							<div className="mb-[30px] w-full px-[15px] lg:max-w-[50%]">
								<div className="h-full rounded-normal bg-white shadow dark:bg-gray-800">
									<div className="flex items-center justify-between p-6">
										<h2 className="text-xl font-bold">Hiring Analytics</h2>
										<aside>
											<button type="button" className="h-[30px] w-[30px] rounded-full bg-darkGray text-gray-300 cursor-grab">
												<i className="fa-regular fa-hand"></i>
											</button>
										</aside>
									</div>
									<div className="p-6 pt-0">Body</div>
								</div>
							</div>
							<div className="mb-[30px] w-full px-[15px] lg:max-w-[50%]">
								<div className="h-full rounded-normal bg-white shadow dark:bg-gray-800">
									<div className="flex items-center justify-between p-6">
										<h2 className="text-xl font-bold">Upcoming Interviews</h2>
										<aside>
											<button type="button" className="h-[30px] w-[30px] rounded-full bg-darkGray text-gray-300 cursor-grab">
												<i className="fa-regular fa-hand"></i>
											</button>
										</aside>
									</div>
									<div className="p-6 pt-0">
										<div className="max-h-[330px] overflow-y-auto">
											{Array(6).fill(
												<>
													<div className="mb-3 flex flex-wrap items-center rounded-[10px] border py-2 px-3">
														<div className="flex w-[45%] items-center pr-2">
															<Image
																src={userImg}
																alt="User"
																className="rounded-full object-cover"
																width={30}
																height={30}
															/>
															<div className="pl-2">
																<h5 className="text-sm font-bold">Bethany Jackson</h5>
																<p className="text-[12px] text-darkGray">Software Developer</p>
															</div>
														</div>
														<div className="w-[30%] pr-2">
															<h5 className="text-sm font-bold">20 Nov 2023</h5>
															<p className="text-[12px] text-darkGray">10:40 AM</p>
														</div>
														<div className="w-[20%]">
															<Button btnStyle="outlined" label="View Profile" loader={false} />
														</div>
														<div className="w-[5%] text-center">
															<button type="button" className="text-lightGray">
																<i className="fa-solid fa-ellipsis-vertical"></i>
															</button>
														</div>
													</div>
												</>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="mb-[30px] w-full px-[15px] lg:max-w-[50%]">
								<div className="h-full rounded-normal bg-white shadow dark:bg-gray-800">
									<div className="flex items-center justify-between p-6">
										<h2 className="text-xl font-bold">To do List</h2>
										<aside>
											<button type="button" className="h-[30px] w-[30px] rounded-full bg-darkGray text-gray-300 cursor-grab">
												<i className="fa-regular fa-hand"></i>
											</button>
										</aside>
									</div>
									<div className="p-6 pt-0">
										<div className="max-h-[330px] overflow-y-auto">
											{Array(6).fill(
												<>
													<div className="mb-3 flex flex-wrap rounded-[10px] border">
														<div className="flex w-[65%] items-center py-2 px-3">
															<p className="clamp_2 text-sm">
																Being able to rename and edit users lorem rename and edit users Being able to rename and
																edit users lorem rename and edit users Being able to rename and edit users lorem rename
																and edit users
															</p>
														</div>
														<div className="flex w-[35%] items-center justify-center bg-lightBlue px-3 py-6 dark:bg-gray-700">
															<span className="mr-2 rounded bg-[#FF8A00] px-[6px] py-[1px] text-center text-xl leading-normal text-white dark:bg-gray-800">
																<i className="fa-regular fa-square-check"></i>
															</span>
															<h5 className="font-bold">20 Nov 2023</h5>
														</div>
													</div>
												</>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="mb-[30px] w-full px-[15px] lg:max-w-[50%]">
								<div className="h-full rounded-normal bg-white shadow dark:bg-gray-800">
									<div className="flex items-center justify-between p-6">
										<h2 className="text-xl font-bold">Recent Jobs</h2>
										<aside>
											<button type="button" className="h-[30px] w-[30px] rounded-full bg-darkGray text-gray-300 cursor-grab">
												<i className="fa-regular fa-hand"></i>
											</button>
										</aside>
									</div>
									<div className="p-6 pt-0">
										<div className="mx-[-7px] flex max-h-[330px] flex-wrap overflow-y-auto">
											{Array(4).fill(
												<>
													<div className="mb-[15px] w-full px-[7px] md:max-w-[50%]">
														<JobCard_1 />
													</div>
												</>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="mb-[30px] w-full px-[15px] lg:max-w-[50%]">
								<div className="h-full rounded-normal bg-white shadow dark:bg-gray-800">
									<div className="flex items-center justify-between p-6">
										<h2 className="text-xl font-bold">Activity Log</h2>
										<aside>
											<button type="button" className="h-[30px] w-[30px] rounded-full bg-darkGray text-gray-300 cursor-grab">
												<i className="fa-regular fa-hand"></i>
											</button>
										</aside>
									</div>
									<div className="p-6 pt-0">
										<div className="max-h-[330px] overflow-y-auto">
											{Array(2).fill(
												<>
													<div className="mb-3 flex flex-wrap items-center rounded-[10px] border py-1 px-2">
														<div className="flex items-center justify-center p-3">
															<span className="mr-2 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-gradDarkBlue text-lg leading-normal text-white">
																<i className="fa-solid fa-briefcase"></i>
															</span>
															<p className="w-[calc(100%-40px)]">
																<b>Product Manager </b>
																Job has been posted by the Adam Smith
															</p>
														</div>
													</div>
												</>
											)}
											{Array(2).fill(
												<>
													<div className="mb-3 flex flex-wrap items-center rounded-[10px] border py-1 px-2">
														<div className="flex items-center justify-center p-3">
															<div className="mr-2 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#FF930F] text-lg leading-normal text-white">
																<i className="fa-solid fa-star"></i>
															</div>
															<p className="w-[calc(100%-40px)]">
																<b>New User - Alison Will </b>
																has logged in as an <b>Admin</b>
															</p>
														</div>
													</div>
												</>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
						<aside className="absolute left-0 top-0 rounded-tl-normal rounded-br-normal bg-lightBlue p-3 dark:bg-gray-700">
							<Popover className="relative">
								<Popover.Button className={`flex h-[45px] w-[45px] items-center justify-center rounded-[10px] bg-gradient-to-b from-gradLightBlue to-gradDarkBlue text-2xl text-white hover:from-gradDarkBlue hover:to-gradDarkBlue focus:outline-none`}>
									<i className="fa-solid fa-gauge"></i>
								</Popover.Button>
								<Popover.Overlay className="fixed inset-0 bg-black opacity-30 dark:bg-white" />
								<Popover.Panel className="absolute z-10 w-[300px] overflow-hidden rounded-normal bg-white shadow-normal">
									<div className="flex flex-wrap">
										<label
											htmlFor="cust_applicants"
											className="relative flex h-[100px] w-[100px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-[#DCFFFB] to-[#A3CEFF] dark:from-gradLightBlue dark:to-gradDarkBlue p-2 text-center"
										>
											<input type="checkbox" name="cust_dashboard" id="cust_applicants" className="hidden" />
											<Image src={customizeApplicants} alt="Applicants" className="mb-2" />
											<p className="text-[12px] font-bold">Applicant Details</p>
										</label>
										<label
											htmlFor="cust_todo"
											className="relative flex h-[100px] w-[100px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-[#DCFFFB] to-[#A3CEFF] dark:from-gradLightBlue dark:to-gradDarkBlue p-2 text-center"
										>
											<input type="checkbox" name="cust_dashboard" id="cust_todo" className="hidden" />
											<Image src={customizeTodo} alt="To Do List" className="mb-2" />
											<p className="text-[12px] font-bold">To Do List</p>
										</label>
										<label
											htmlFor="cust_hiring"
											className="relative flex h-[100px] w-[100px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-[#DCFFFB] to-[#A3CEFF] dark:from-gradLightBlue dark:to-gradDarkBlue p-2 text-center"
										>
											<input type="checkbox" name="cust_dashboard" id="cust_hiring" className="hidden" />
											<Image src={customizeAnalytics} alt="Hiring Analytics" className="mb-2" />
											<p className="text-[12px] font-bold">Hiring Analytics</p>
										</label>
										<label
											htmlFor="cust_recent"
											className="relative flex h-[100px] w-[100px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-[#A3CEFF] to-[#DCFFFB] dark:from-gradDarkBlue dark:to-gradLightBlue p-2 text-center"
										>
											<input type="checkbox" name="cust_dashboard" id="cust_recent" className="hidden" />
											<Image src={customizeRecent} alt="Recent Jobs" className="mb-2" />
											<p className="text-[12px] font-bold">Recent Jobs</p>
										</label>
										<div className="relative flex h-[100px] w-[100px] flex-col items-center justify-center overflow-hidden bg-white dark:bg-primary p-2 text-center">
											<p className="text-[12px] font-bold">
												Customize <br />
												Your <br />
												Dashboard
											</p>
										</div>
										<label
											htmlFor="cust_upcoming"
											className="relative flex h-[100px] w-[100px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-[#A3CEFF] to-[#DCFFFB] dark:from-gradDarkBlue dark:to-gradLightBlue p-2 text-center"
										>
											<input type="checkbox" name="cust_dashboard" id="cust_upcoming" className="hidden" />
											<Image src={customizeUpcoming} alt="Upcoming Interviews" className="mb-2" />
											<p className="text-[12px] font-bold">Upcoming Interviews</p>
										</label>
										<label
											htmlFor="cust_activity"
											className="relative flex h-[100px] w-[100px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-[#DCFFFB] to-[#A3CEFF] dark:from-gradLightBlue dark:to-gradDarkBlue p-2 text-center"
										>
											<input type="checkbox" name="cust_dashboard" id="cust_activity" className="hidden" />
											<Image src={customizeActivity} alt="Activity Log" className="mb-2" />
											<p className="text-[12px] font-bold">Activity Log</p>
										</label>
										<div className="relative flex h-[100px] w-[100px] flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-[#DCFFFB] to-[#A3CEFF] dark:from-gradLightBlue dark:to-gradDarkBlue p-2 text-center"></div>
										<div className="relative flex h-[100px] w-[100px] flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-[#DCFFFB] to-[#A3CEFF] dark:from-gradLightBlue dark:to-gradDarkBlue p-2 text-center"></div>
									</div>
								</Popover.Panel>
							</Popover>
						</aside>
					</div>
				</div>
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
