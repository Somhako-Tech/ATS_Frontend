import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useCarrierStore } from "@/utils/code";
import { axiosInstance } from "@/pages/api/axiosApi";
import Button from "@/components/Button";
import moment from "moment";
import { useRouter } from "next/router";

export default function CanCareer() {
	const router = useRouter();

	const cname = useCarrierStore((state: { cname: any }) => state.cname);
	const setcname = useCarrierStore((state: { setcname: any }) => state.setcname);

	const cid = useCarrierStore((state: { cid: any }) => state.cid);
	const setcid = useCarrierStore((state: { setcid: any }) => state.setcid);
	const jid = useCarrierStore((state: { jid: any }) => state.jid);
	const setjid = useCarrierStore((state: { setjid: any }) => state.setjid);
	const jdata = useCarrierStore((state: { jdata: any }) => state.jdata);
	const setjdata = useCarrierStore((state: { setjdata: any }) => state.setjdata);
	const orgdetail = useCarrierStore((state: { orgdetail: any }) => state.orgdetail);
	const setorgdetail = useCarrierStore((state: { setorgdetail: any }) => state.setorgdetail);

	useEffect(() => {
		if (cname == "" || cname != window.location.href.toString().split("/").pop()) {
			setcname(window.location.href.toString().split("/").pop());
			setcid("");
		}
	}, [cname, setcname]);

	async function getcid(cname: any) {
		await axiosInstance.get(`/organization/get/organizationprofilecid/carrier/${cname}/`).then((res) => {
			console.log(res.data);
			console.log(res.data["OrgProfile"]);
			console.log(res.data["OrgProfile"][0]["unique_id"]);
			setcid(res.data["OrgProfile"][0]["unique_id"]);
		});
	}

	async function loadOrgDetail(carrierID: any) {
		await axiosInstance
			.get(`/organization/get/organizationprofile/carrier/${carrierID}/`)
			.then((res) => {
				setorgdetail(res.data);
			})
			.catch((err) => {
				setorgdetail([]);
			});
	}

	useEffect(() => {
		if (cname != "" || cid == "") {
			getcid(cname);
		}
	}, [cname, cid]);

	useEffect(() => {
		if (cid && Object.keys(orgdetail).length === 0) {
			loadOrgDetail(cid);
		}
	}, [cid, orgdetail]);

	return (
		<>
			<Head>
				<title>Career</title>
				<meta name="description" content="Generated by create next app" />
			</Head>
			<main className="py-8">
				{orgdetail &&
					orgdetail["OrgProfile"] &&
					orgdetail["OrgProfile"].map((data: any, i: React.Key) => (
						<>
							<div className="mx-auto w-full max-w-[1200px] px-4" key={i}>
								<Image
									src={`http://127.0.0.1:8000${data["banner"]}`}
									alt="Banner"
									width={1200}
									height={200}
									className="mx-auto mb-6 max-h-[200px] rounded-large object-cover"
								/>
								<div className="mx-auto w-full max-w-[1100px] px-4">
									<div className="mb-6 rounded-normal bg-white py-4 px-8 dark:bg-gray-800">
										<div className="mb-3 flex flex-wrap rounded-normal border p-4 pb-0">
											{orgdetail["Founder"].map(
												(
													data: {
														[x: string]:
															| string
															| number
															| boolean
															| React.ReactElement<any, string | React.JSXElementConstructor<any>>
															| React.ReactFragment
															| React.ReactPortal
															| null
															| undefined;
													},
													i: React.Key | null | undefined
												) => (
													<div
														className="mb-3 w-full pr-4 text-center md:max-w-[calc(100%/3)] lg:max-w-[calc(100%/4)] xl:max-w-[calc(100%/5)]"
														key={i}
													>
														<Image
															src={`http://127.0.0.1:8000${data["image"]}`}
															alt="User"
															width={80}
															height={80}
															className="mx-auto mb-2 h-[80px] rounded-full object-cover"
														/>
														<p className="mb-1 text-sm font-bold">{data["name"]}</p>
														<p className="text-sm text-darkGray">{data["designation"]}</p>
													</div>
												)
											)}
										</div>
										{data["org_Url"] && data["org_Url"] != "" && (
											<p className="mb-3">
												<Link
													href={`${data["org_Url"]}`}
													target="_blank"
													className="text-primary hover:underline dark:text-white"
												>
													<i className="fa-solid fa-globe mr-2"></i> {data["org_Url"]}
												</Link>
											</p>
										)}
										<ul className="mb-6 flex list-inside list-disc flex-wrap items-center font-semibold text-darkGray dark:text-gray-400">
											{data["company_Size"] && data["company_Size"] != "" && (
												<li className="mr-3 list-none">{data["company_Size"]} Employees</li>
											)}
											{data["headquarter_Location"] && data["headquarter_Location"] != "" && (
												<li className="mr-3">{data["headquarter_Location"]}</li>
											)}
											{data["funding_Details"] && data["funding_Details"] != "" && (
												<li className="mr-3">{data["funding_Details"]}</li>
											)}
										</ul>
										<hr className="mb-6" />
										{data["about_org"] && data["about_org"] != "" && (
											<article className="mb-6">{data["about_org"]}</article>
										)}
										<hr className="mb-6" />
										{data["organization_Benefits"] && data["organization_Benefits"] != "" && (
											<div className="mb-6">
												<h2 className="mb-3 text-lg font-bold">Benefits</h2>
												<p>{data["organization_Benefits"]}</p>
												{/* <ul className="mb-6 list-disc list-inside text-darkGray dark:text-gray-400 font-semibold">
                                            <li className="mr-3">
                                            Medical Insurance
                                            </li>
                                            <li className="mr-3">
                                            Quarterly Bonus
                                            </li>
                                            <li className="mr-3">
                                            Meals
                                            </li>
                                        </ul> */}
											</div>
										)}
										<hr className="mb-6" />
										{orgdetail["Gallery"] && (
											<div>
												<h2 className="mb-3 text-lg font-bold">Work Place Culture</h2>
												<div className="rounded-large border p-6">
													<ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
														<Masonry>
															{orgdetail["Gallery"].map((data: { image: any }, i: React.Key | null | undefined) => (
																<img
																	src={`http://127.0.0.1:8000${data.image}`}
																	alt="Office"
																	className="w-full rounded-normal p-2"
																	key={i}
																/>
															))}
														</Masonry>
													</ResponsiveMasonry>
												</div>
											</div>
										)}
									</div>
									{orgdetail["Job"] && (
										<div>
											<h2 className="mb-3 text-xl font-bold">Similar Jobs</h2>
											<div className="mx-[-7px] flex flex-wrap">
												{orgdetail["Job"].slice(0, 2).map((data: any, i: React.Key) => (
													<div className="mb-[15px] w-full px-[7px] md:max-w-[50%] lg:max-w-[calc(100%/3)]" key={i}>
														<div className="h-full rounded-[10px] bg-white p-5 shadow-normal dark:bg-gray-800">
															<h4 className="mb-3 text-lg font-bold">{data["job_title"]}</h4>
															<ul className="mb-3 flex flex-wrap items-center text-[12px] font-semibold text-darkGray dark:text-gray-400">
																<li className="mr-8">
																	<i className="fa-solid fa-location-dot mr-2"></i>
																	{data["worktype"] ? data["worktype"] : <>N/A</>}
																</li>
																<li className="mr-8">
																	<i className="fa-regular fa-clock mr-2"></i>
																	{data["employment_type"] ? data["employment_type"] : <>N/A</>}
																</li>
																<li>
																	<i className="fa-solid fa-dollar-sign mr-2"></i>
																	{data["currency"] ? data["currency"] : <>N/A</>}
																</li>
															</ul>
															<div className="flex flex-wrap items-center justify-between">
																<div className="mr-4">
																	<Button
																		btnStyle="sm"
																		label="View"
																		loader={false}
																		btnType="button"
																		handleClick={() => {
																			setjid(data["refid"]);
																			setjdata(data);
																			router.push(`/organization/${cname}/job-detail`);
																		}}
																	/>
																</div>
																<p className="text-[12px] font-bold text-darkGray dark:text-gray-400">
																	{moment(data["publish_date"]).fromNow()}
																</p>
															</div>
														</div>
													</div>
												))}
											</div>
											<Button
												btnStyle="sm"
												label="View All Job"
												loader={false}
												btnType="button"
												handleClick={() => {
													router.push(`/organization/${cname}/search-jobs`);
												}}
											/>
										</div>
									)}
								</div>
							</div>
						</>
					))}
			</main>
		</>
	);
}
