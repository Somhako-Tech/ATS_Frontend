import Head from "next/head";
import React, { useRef, Fragment, useState, useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NoAuthHeader from "@/components/noAuth/NoAuthHeader";
import NoAuthFooter from "@/components/noAuth/NoAuthFooter";
import Image from "next/image";
import { axiosInstance, axiosInstance2 } from "./api/axiosApi";
import Link from "next/link";
import ToggleLang from "@/components/noAuth/ToggleLang";
import BookADemo from "@/components/noAuth/BookADemo";
import { RadioGroup, Switch } from "@headlessui/react";
import toastcomp from "@/components/toast";
import { useRouter } from "next/router";

export default function PricingPage() {
	const [scrollTop, setScrollTop] = useState(0);

	const handleScroll = (event) => {
		setScrollTop(event.currentTarget.scrollTop);
	};

	useEffect(() => {
		console.log("scrollTop", scrollTop);
	}, [scrollTop]);

	const [bookADemo, setbookADemo] = useState(false);
	const [enabled, setEnabled] = useState(false);

	const router = useRouter();

	return (
		<>
			<Head>
				<title>Pricing Page ATS</title>
			</Head>
			<main>
				<NoAuthHeader scrollTop={scrollTop} setbookADemo={setbookADemo} />

				<ToggleLang />
				<BookADemo bookADemo={bookADemo} setbookADemo={setbookADemo} />
				<div
					id="overlay"
					className="fixed left-0 top-0 z-[9] hidden h-full w-full bg-[rgba(0,0,0,0.2)] dark:bg-[rgba(255,255,255,0.2)]"
				></div>

				<div className="h-[100vh] w-[100vw] overflow-y-scroll" onScroll={handleScroll}>
					{/* hero section */}
					<div
						className="h-auto  w-full border-t-2 border-transparent  xl:min-h-[100vh]"
						style={{
							background: "linear-gradient(70deg, #2D129A -5.44%, #47BBFD 120.58%)"
						}}
					>
						<div
							className="relative mx-auto   sm:max-w-[600px] md:max-w-[720px] lg:max-w-[991px] xl:min-h-[100vh] xl:max-w-[1216px] 2xl:max-w-[1448px]"
							style={{ height: "inherit" }}
						>
							<div className="mt-[4rem] flex h-auto w-full flex-col items-center justify-start gap-4  p-8 max-xl:px-0 max-xl:py-4 max-md:gap-10 max-md:p-0 xl:min-h-[calc(100vh-4rem)]">
								<div className="flex flex-col justify-center gap-4">
									<div className="w-full text-center text-[2vw] font-bold text-white max-xl:text-[3.3vw] max-md:text-[4vw]">
										Our feature-rich plans come with transparent pricing.
									</div>
									<div className="w-full px-[20rem] text-center text-[1vw] font-light  tracking-wider text-white max-xl:px-[10rem] max-xl:text-[2vw] max-md:px-[5rem] max-md:text-[3.3vw]">
										Manage your entire talent acquisition process and talent management with the world&apos;s most
										comprehensive recruiting software.
									</div>
									<div className="mx-auto">
										<button
											className="transform rounded-normal bg-gradient-to-r from-blue-500 to-blue-700 px-8 py-3 tracking-wide text-white shadow-lg transition-all duration-500 ease-in-out hover:scale-110 hover:animate-pulse hover:from-blue-600 hover:to-blue-800 hover:brightness-110 active:animate-bounce"
											onClick={() => {
												router.push("/auth/signup");
											}}
										>
											Start your FREE trial
										</button>
									</div>
								</div>

								<div className="flex h-auto w-fit flex-col gap-10 rounded-normal  bg-white p-10 max-xl:gap-x-2 max-xl:px-4">
									<div className="flex items-center justify-evenly gap-4 max-sm:flex-col xl:hidden">
										<div className="flex w-[50%] flex-col gap-2  px-8  pb-8 text-base font-normal text-black max-sm:w-full ">
											<div
												className="ml-auto w-fit rounded-full bg-white px-4 py-2 text-xs"
												style={{
													boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.25)"
												}}
											>
												30 Days Only
											</div>
											<div className="flex items-end">
												<span className="text-5xl font-extrabold max-sm:text-3xl">￥０</span>
												<span className="text-[#848199]">/month</span>
											</div>
											<span className="mt-4 text-3xl font-normal">FREE trial</span>
											<span className="text-[#848199]">Experience before you buy </span>
											<div className="mt-4 flex flex-col gap-1">
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">Full access</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">30 days</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">Unlimited members</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">100 Applications</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">Experience NOVUS</span>
												</div>
											</div>
											<button
												className="mt-4 transform rounded-normal bg-gradient-to-r from-gray-400 to-gray-600 px-8 py-3 tracking-wide text-white shadow-lg transition-all duration-500 ease-in-out hover:scale-110 hover:animate-pulse hover:from-gray-500 hover:to-gray-700 hover:brightness-110 active:animate-bounce"
												onClick={() => {
													router.push("/auth/signup");
												}}
											>
												Get FREE trial now
											</button>
										</div>

										<div
											className="flex h-fit w-[50%] flex-nowrap items-center justify-center  bg-white px-4 py-8 text-base font-normal text-black max-sm:w-full"
											style={{
												filter: "drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.25))"
											}}
										>
											<ul className="list-disc px-4">
												<li>AI HR Assistant -NOVUS</li>
												<li>Unlimited mambers </li>
												<li>Vendor management</li>
												<li>internal chat </li>
												<li>Googlecalendar intergration </li>
												<li>Career page </li>
												<li>Applicant kanban </li>
												<li>Applicant curation & automation</li>
												<li>automated scheduling and TA operations</li>
												<li>One tool multi location </li>
											</ul>
										</div>
									</div>

									<div className="flex items-center justify-evenly gap-4 max-sm:flex-col-reverse xl:hidden">
										<div
											className="flex h-fit w-[50%] items-center justify-center bg-white   px-4 py-8 text-base font-normal text-black max-sm:w-full"
											style={{
												filter: "drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.25))"
											}}
										>
											<ul className="list-disc  px-4">
												<li>10 members </li>
												<li>Vendor management</li>
												<li>internal chat </li>
												<li>Googlecalendar intergration </li>
												<li>Career page </li>
												<li>Applicant kanban</li>
												<li>Manual workflow system</li>
												<li>Manual TA operations </li>
												<li>One tool multi location </li>
											</ul>
										</div>

										<div className="flex w-[50%] flex-col gap-2  px-8 pb-8 text-base font-normal text-black max-sm:w-full">
											<div className="flex items-end">
												<span className="text-5xl font-semibold tracking-tight max-sm:text-3xl">
													{enabled ? "￥30,000" : "￥360,000"}
												</span>
												<span className="">{enabled ? "/monthly" : "/yearly"}</span>
											</div>
											<span className="mt-4 text-3xl font-normal">Standard</span>
											<span className="text-[#848199]">Designed for occasional hiring</span>
											<div className="mt-4 flex flex-col gap-1">
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">Limited access</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">Up to 10 members</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">Offer management</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">Vendor management</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">Set up career page</span>
												</div>
											</div>
											<button
												className="mt-4 transform rounded-normal bg-gradient-to-r from-gray-400 to-gray-600 px-8 py-3 tracking-wide text-white shadow-lg transition-all duration-500 ease-in-out hover:scale-110 hover:animate-pulse hover:from-gray-500 hover:to-gray-700 hover:brightness-110 active:animate-bounce"
												onClick={() => setbookADemo(true)}
											>
												Book a demo
											</button>
										</div>
									</div>

									<div className="flex items-center justify-evenly gap-4 max-sm:flex-col xl:hidden">
										<div
											className="flex w-[50%] flex-col rounded-normal  px-8  pb-8 pt-8 text-base font-normal text-white max-sm:w-full"
											style={{
												background: "linear-gradient(70deg, #2D129A -5.44%, #47BBFD 120.58%)",
												boxShadow: "0px 42px 34px 0px rgba(82, 67, 194, 0.30)"
											}}
										>
											<div className="mb-4 flex items-center justify-between gap-2 text-xs text-white max-md:flex-col">
												<div
													className="rounded-full px-4 py-2"
													style={{
														background: "linear-gradient(88deg, #197DF9 1.75%, #45BBED 103.51%)"
													}}
												>
													MOST POPULAR
												</div>
												<div className="flex items-center gap-0.5">
													<Switch
														checked={enabled}
														onChange={setEnabled}
														className={`${enabled ? "bg-white" : "bg-gray-200"}
          relative inline-flex h-[16px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
													>
														<span className="sr-only">Use setting</span>
														<span
															aria-hidden="true"
															className={`${enabled ? "translate-x-4" : "translate-x-0"}
            pointer-events-none transform shadow-lg transition duration-200 ease-in-out`}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="14"
																height="14"
																viewBox="0 0 12 12"
																fill="none"
															>
																<ellipse cx="6" cy="5.6875" rx="6" ry="5.5" fill="url(#paint0_linear_2283_2614)" />
																<defs>
																	<linearGradient
																		id="paint0_linear_2283_2614"
																		x1="-1.47881"
																		y1="9.72058"
																		x2="16.3365"
																		y2="2.58971"
																		gradientUnits="userSpaceOnUse"
																	>
																		<stop stop-color="#2D129A" />
																		<stop offset="1" stop-color="#47BBFD" />
																	</linearGradient>
																</defs>
															</svg>
														</span>
													</Switch>
													<span className="text-base">/monthly</span>
												</div>
											</div>
											<div className="mt-4 flex items-end">
												<span className="text-5xl font-semibold tracking-tight max-sm:text-3xl">
													{enabled ? "￥40,000" : "￥480,000"}
												</span>
												<span className="">{enabled ? "/monthly" : "/yearly"}</span>
											</div>
											<span className="mt-4 text-3xl font-normal">Enterprise</span>
											<span className="mt-2 font-light">Tailored for strategic recruitment</span>
											<div className="mt-4 flex flex-col gap-1">
												<div className="flex items-center gap-2">
													<i className="fa-regular fa-circle-check text-white"></i>
													<span className="text-lg ">Full access</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-regular fa-circle-check text-white"></i>
													<span className="text-lg ">AI HR Assistant -Novus</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-regular fa-circle-check text-white"></i>
													<span className="text-lg ">Unlimited members</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-regular fa-circle-check text-white"></i>
													<span className="text-lg ">Internal chat</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-regular fa-circle-check text-white"></i>
													<span className="text-lg ">Offer management</span>
												</div>
											</div>
											<button
												className="mt-4 transform rounded-normal bg-gradient-to-r from-blue-500 to-blue-700 px-8 py-3 tracking-wide text-white shadow-lg transition-all duration-500 ease-in-out hover:scale-110 hover:animate-pulse hover:from-blue-600 hover:to-blue-800 hover:brightness-110 active:animate-bounce"
												onClick={() => setbookADemo(true)}
											>
												Request a Call
											</button>
										</div>

										<div
											className="flex h-fit w-[50%] items-center justify-center bg-white   px-4 py-8 text-base font-normal text-black max-sm:w-full"
											style={{
												filter: "drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.25))"
											}}
										>
											<ul className="list-disc px-4">
												<li>AI HR Assistant -NOVUS</li>
												<li>Unlimited mambers </li>
												<li>Vendor management</li>
												<li>internal chat </li>
												<li>Googlecalendar intergration </li>
												<li>Career page </li>
												<li>Applicant kanban </li>
												<li>Applicant curation & automation</li>
												<li>automated scheduling and TA operations</li>
												<li>One tool multi location </li>
											</ul>
										</div>
									</div>

									{/* big device */}
									<div className="grid grid-cols-3  place-content-around items-end justify-items-center gap-x-6 gap-y-2  max-xl:hidden ">
										<div className="flex w-full flex-col gap-2   px-8 pb-8 text-base font-normal text-black">
											<div
												className="ml-auto w-fit rounded-full bg-white px-4 py-2 text-xs"
												style={{
													boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.25)"
												}}
											>
												30 Days Only
											</div>
											<div className="flex items-end">
												<span className="text-5xl font-extrabold">￥０</span>
												<span className="text-[#848199]">/month</span>
											</div>
											<span className="mt-4 text-3xl font-normal">FREE trial</span>
											<span className="text-[#848199]">Experience before you buy </span>
											<div className="mt-4 flex flex-col gap-1">
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">Full access</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">30 days</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">Unlimited members</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">100 Applications</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">Experience NOVUS</span>
												</div>
											</div>
											<button
												className="mt-4 transform rounded-normal bg-gradient-to-r from-gray-400 to-gray-600 px-8 py-3 tracking-wide text-white shadow-lg transition-all duration-500 ease-in-out hover:scale-110 hover:animate-pulse hover:from-gray-500 hover:to-gray-700 hover:brightness-110 active:animate-bounce"
												onClick={() => {
													router.push("/auth/signup");
												}}
											>
												Get FREE trial now
											</button>
										</div>

										<div className="flex w-full flex-col gap-2  px-8 pb-8 text-base font-normal text-black">
											<div className="flex items-end">
												<span className="text-5xl font-semibold tracking-tight">
													{enabled ? "￥30,000" : "￥360,000"}
												</span>
												<span className="">{enabled ? "/monthly" : "/yearly"}</span>
											</div>
											<span className="mt-4 text-3xl font-normal">Standard</span>
											<span className="text-[#848199]">Designed for occasional hiring</span>
											<div className="mt-4 flex flex-col gap-1">
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">Limited access</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">Up to 10 members</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">Offer management</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">Vendor management</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-solid fa-circle-check text-[#848199]"></i>
													<span className="text-lg text-[#848199]">Set up career page</span>
												</div>
											</div>
											<button
												className="mt-4 transform rounded-normal bg-gradient-to-r from-gray-400 to-gray-600 px-8 py-3 tracking-wide text-white shadow-lg transition-all duration-500 ease-in-out hover:scale-110 hover:animate-pulse hover:from-gray-500 hover:to-gray-700 hover:brightness-110 active:animate-bounce"
												onClick={() => setbookADemo(true)}
											>
												Book a demo
											</button>
										</div>

										<div
											className="flex w-full flex-col rounded-normal   px-8 pb-8 pt-8 text-base font-normal text-white"
											style={{
												background: "linear-gradient(70deg, #2D129A -5.44%, #47BBFD 120.58%)",
												boxShadow: "0px 42px 34px 0px rgba(82, 67, 194, 0.30)"
											}}
										>
											<div className="mb-4 flex items-center justify-between text-xs text-white">
												<div
													className="rounded-full px-4 py-2"
													style={{
														background: "linear-gradient(88deg, #197DF9 1.75%, #45BBED 103.51%)"
													}}
												>
													MOST POPULAR
												</div>
												<div className="flex items-center gap-0.5">
													<Switch
														checked={enabled}
														onChange={setEnabled}
														className={`${enabled ? "bg-white" : "bg-gray-200"}
          relative inline-flex h-[16px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
													>
														<span className="sr-only">Use setting</span>
														<span
															aria-hidden="true"
															className={`${enabled ? "translate-x-4" : "translate-x-0"}
            pointer-events-none h-[13px] w-[13px] transform rounded-full bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg transition duration-200 ease-in-out`}
														>
															{/* <svg
																xmlns="http://www.w3.org/2000/svg"
																width="14"
																height="14"
																viewBox="0 0 12 12"
																fill="none"
															>
																<ellipse cx="6" cy="5.6875" rx="6" ry="5.5" fill="url(#paint0_linear_2283_2614)" />
																<defs>
																	<linearGradient
																		id="paint0_linear_2283_2614"
																		x1="-1.47881"
																		y1="9.72058"
																		x2="16.3365"
																		y2="2.58971"
																		gradientUnits="userSpaceOnUse"
																	>
																		<stop stop-color="#2D129A" />
																		<stop offset="1" stop-color="#47BBFD" />
																	</linearGradient>
																</defs>
															</svg> */}
														</span>
													</Switch>
													<span className="text-base">/monthly</span>
												</div>
											</div>
											<div className="mt-4 flex items-end">
												<span className="text-5xl font-semibold tracking-tight">
													{enabled ? "￥40,000" : "￥480,000"}
												</span>
												<span className="">{enabled ? "/monthly" : "/yearly"}</span>
											</div>
											<span className="mt-4 text-3xl font-normal">Enterprise</span>
											<span className="mt-2 font-light">Tailored for strategic recruitment</span>
											<div className="mt-4 flex flex-col gap-1">
												<div className="flex items-center gap-2">
													<i className="fa-regular fa-circle-check text-white"></i>

													<span className="text-lg ">Full access</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-regular fa-circle-check text-white"></i>
													<span className="text-lg ">AI HR Assistant -Novus</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-regular fa-circle-check text-white"></i>
													<span className="text-lg ">Unlimited members</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-regular fa-circle-check text-white"></i>
													<span className="text-lg ">Internal chat</span>
												</div>
												<div className="flex items-center gap-2">
													<i className="fa-regular fa-circle-check text-white"></i>
													<span className="text-lg ">Offer management</span>
												</div>
											</div>
											<button
												className="mt-4 transform rounded-normal bg-gradient-to-r from-blue-500 to-blue-700 px-8 py-3 tracking-wide text-white shadow-lg transition-all duration-500 ease-in-out hover:scale-110 hover:animate-pulse hover:from-blue-600 hover:to-blue-800 hover:brightness-110 active:animate-bounce"
												onClick={() => setbookADemo(true)}
											>
												Request a Call
											</button>
										</div>
									</div>

									<div className="grid  grid-cols-3 place-content-around items-end justify-items-center gap-x-6 gap-y-2  p-3 max-xl:hidden">
										<div
											className="flex items-center   justify-center bg-white px-4 py-8 text-base font-normal text-black"
											style={{
												filter: "drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.25))"
											}}
										>
											<ul className="list-disc px-4">
												<li>AI HR Assistant -NOVUS</li>
												<li>Unlimited mambers </li>
												<li>Vendor management</li>
												<li>internal chat </li>
												<li>Googlecalendar intergration </li>
												<li>Career page </li>
												<li>Applicant kanban </li>
												<li>Applicant curation & automation</li>
												<li>automated scheduling and TA operations</li>
												<li>One tool multi location </li>
											</ul>
										</div>
										<div
											className="flex  items-center justify-center   bg-white px-4 py-8 text-base font-normal text-black"
											style={{
												filter: "drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.25))"
											}}
										>
											<ul className="list-disc px-4">
												<li>10 members </li>
												<li>Vendor management</li>
												<li>internal chat </li>
												<li>Googlecalendar intergration </li>
												<li>Career page </li>
												<li>Applicant kanban</li>
												<li>Manual workflow system</li>
												<li>Manual TA operations </li>
												<li>One tool multi location </li>
											</ul>
										</div>
										<div
											className="flex  items-center justify-center   bg-white px-4 py-8 text-base font-normal text-black"
											style={{
												filter: "drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.25))"
											}}
										>
											<ul className="list-disc px-4">
												<li>AI HR Assistant -NOVUS</li>
												<li>Unlimited mambers </li>
												<li>Vendor management</li>
												<li>internal chat </li>
												<li>Googlecalendar intergration </li>
												<li>Career page </li>
												<li>Applicant kanban </li>
												<li>Applicant curation & automation</li>
												<li>automated scheduling and TA operations</li>
												<li>One tool multi location </li>
											</ul>
										</div>
									</div>

									<div className="flex w-full flex-col items-center justify-center">
										<span>The 30-day trial includes the complete feature set of the Enterprise plan.</span>
										<button
											className="mt-4 transform rounded-normal bg-gradient-to-r from-blue-500 to-blue-700 px-8 py-3 tracking-wide text-white shadow-lg transition-all duration-500 ease-in-out hover:scale-110 hover:animate-pulse hover:from-blue-600 hover:to-blue-800 hover:brightness-110 active:animate-bounce"
											onClick={() => {
												router.push("/auth/signup");
											}}
										>
											Start a 30-day trial
										</button>
										<p>
											or&nbsp;
											<span className="cursor-pointer text-blue-600 hover:underline" onClick={() => setbookADemo(true)}>
												Get a live demo
											</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<NoAuthFooter setbookADemo={setbookADemo} />
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

PricingPage.noAuth = true;
PricingPage.mobileEnabled = true;