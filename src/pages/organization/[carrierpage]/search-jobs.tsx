import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { useCarrierStore } from "@/utils/code";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment";
import { getProviders } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useLangStore } from "@/utils/code";
import Head from "next/head";
import CandFooter from "@/components/candidate/footer";
import { axiosInstance } from "@/pages/api/axiosApi";

export default function CanCareerSearchJobs({ upcomingSoon }: any) {
	const { t } = useTranslation("common");
	const srcLang = useLangStore((state: { lang: any }) => state.lang);
	const [sklLoad] = useState(true);
	const router = useRouter();

	const cname = useCarrierStore((state: { cname: any }) => state.cname);
	const setcname = useCarrierStore((state: { setcname: any }) => state.setcname);
	const cid = useCarrierStore((state: { cid: any }) => state.cid);
	const setcid = useCarrierStore((state: { setcid: any }) => state.setcid);
	const orgdetail = useCarrierStore((state: { orgdetail: any }) => state.orgdetail);
	const setorgdetail = useCarrierStore((state: { setorgdetail: any }) => state.setorgdetail);
	const jid = useCarrierStore((state: { jid: any }) => state.jid);
	const setjid = useCarrierStore((state: { setjid: any }) => state.setjid);
	const jdata = useCarrierStore((state: { jdata: any }) => state.jdata);
	const setjdata = useCarrierStore((state: { setjdata: any }) => state.setjdata);

	const { carrierpage } = router.query;
	const [load, setload] = useState(false);

	async function loadOrgDetail(carrierID: any) {
		await axiosInstance
			.get(`/organization/get/organizationprofile/carrier/${carrierID}/`)
			.then((res) => {
				setorgdetail(res.data);
				// console.log("@", res.data);
			})
			.catch((err) => {
				// console.log(err);
				setorgdetail({});
			});
	}

	async function getcid(cname: any) {
		await axiosInstance.get(`/organization/get/organizationprofilecid/carrier/${cname}/`).then((res) => {
			// console.log(res.data);
			// console.log(res.data["OrgProfile"]);
			// console.log(res.data["OrgProfile"][0]["unique_id"]);
			setcid(res.data["OrgProfile"][0]["unique_id"]);
			loadOrgDetail(res.data["OrgProfile"][0]["unique_id"]);
			setload(true);
		});
	}

	useEffect(() => {
		if (carrierpage && carrierpage.length > 0 && !load) {
			setcname(carrierpage);
			setcid("");
			getcid(carrierpage);
		}
	}, [cname, carrierpage, load]);

	// useEffect(() => {
	// 	if (orgdetail && Object.keys(orgdetail).length === 0) {
	// 		if (cid == "" || cname == "") router.replace(`/organization/${cname}`);
	// 		else router.back();
	// 	}
	// }, [cid, orgdetail, cname]);

	return (
		<>
			<Head>
				<title>
					{t("Words.Career")} | {t("Words.Search")}
				</title>
			</Head>
			<main className="py-8">
				<div className="container flex flex-wrap">
					{/* temp hide naman */}
					{/* <div className="sticky top-0 h-[calc(100vh-120px)] w-[300px] rounded-normal border border-slate-300 bg-white shadow-normal dark:bg-gray-800">
						<div className="border-b px-6 py-2">
							<div className="relative">
								<input
									type={"search"}
									id={"jobSearch"}
									className={`w-full rounded border-0 pl-8 text-sm focus:ring-0 dark:bg-gray-800`}
									placeholder="Search for Jobs"
								/>
								<span className="absolute left-0 top-[2px] text-lg">
									<i className="fa-solid fa-magnifying-glass"></i>
								</span>
							</div>
						</div>
						<div className="px-6 py-4">
							<h2 className="mb-2 font-semibold">Filters</h2>
							<div className="py-2">
								<FormField fieldType="select" placeholder="Location" />
								<FormField fieldType="select" placeholder="Experience" />
								<FormField fieldType="select" placeholder="Job Type" />
							</div>
						</div>
						{upcomingSoon && (
							<div className="absolute left-0 top-0 z-[1] flex h-full w-full cursor-pointer items-center justify-center bg-[rgba(0,0,0,0.1)] p-6 backdrop-blur-md">
								<div className="rounded-normal bg-[rgba(0,0,0,0.5)] p-6 text-center text-white transition hover:scale-[1.05]">
									<h3 className="mb-1 text-lg font-extrabold">
										Job Filters
										<br />
										Coming Soon
									</h3>
									<p className="text-[12px]">We are working on this and it will ready for you soon.</p>
								</div>
							</div>
						)}
					</div> */}
					{orgdetail["Job"] && (
						// temp hide naman
						// <div className="w-[calc(100%-300px)] pl-8">
						<div className="w-[calc(100%)] ">
							<h3 className="mb-6 text-lg font-bold">
								{sklLoad ? (
									<>
										{orgdetail["Job"].length}{" "}
										{orgdetail["Job"].length > 1 ? <>{t("Words.Jobs")}</> : <>{srcLang === "ja" ? "仕事" : "Job"}</>}
									</>
								) : (
									<Skeleton width={100} />
								)}
							</h3>
							<div className="mx-[-7px] flex flex-wrap">
								{sklLoad
									? orgdetail["Job"].map((data: any, i: React.Key) => (
											<div className="mb-[15px] w-full px-[7px] lg:max-w-[50%]" key={i}>
												<div className="h-full rounded-[10px] bg-white p-5 shadow-normal dark:bg-gray-800">
													<h4 className="mb-3 text-lg font-bold">{data["jobTitle"]}</h4>
													<ul className="mb-3 flex flex-wrap items-center text-[12px] font-semibold text-darkGray dark:text-gray-400">
														<li className="mr-4">
															<i className="fa-solid fa-location-dot mr-2"></i>
															{data["jobWorktype"] ? data["jobWorktype"] : <>N/A</>}
														</li>
														<li className="mr-4">
															<i className="fa-regular fa-clock mr-2"></i>
															{data["jobEmploymentType"] ? data["jobEmploymentType"] : <>N/A</>}
														</li>
														<li>
															<i className="fa-solid fa-dollar-sign mr-2"></i>
															{data["jobCurrency"] && data["jobFromSalary"] && data["jobToSalary"] ? (
																<>
																	{data["jobCurrency"]} {data["jobFromSalary"]} to {data["jobToSalary"]}
																</>
															) : (
																<>N/A</>
															)}
														</li>
													</ul>
													<div className="flex flex-wrap items-center justify-between">
														<div className="mr-4">
															<Button
																btnStyle="sm"
																label={t("Btn.View")}
																loader={false}
																btnType="button"
																handleClick={() => {
																	setjid(data["refid"]);
																	// setjdata(data);
																	router.push(`/organization/${cname}/job-detail/${data["refid"]}`);
																}}
															/>
														</div>
														<p className="text-[12px] font-bold text-darkGray dark:text-gray-400">
															{moment(data["timestamp"]).fromNow()}
														</p>
													</div>
												</div>
											</div>
									  ))
									: Array(5).fill(
											<div className="mb-[15px] w-full px-[7px] lg:max-w-[50%]">
												<div className="h-full rounded-[10px] bg-white p-5 shadow-normal dark:bg-gray-800">
													<h4 className="mb-3 text-lg font-bold">
														<Skeleton width={160} />
													</h4>
													<ul className="mb-3 flex flex-wrap items-center text-[12px] font-semibold text-darkGray dark:text-gray-400">
														<li className="mr-8">
															<Skeleton width={40} />
														</li>
														<li className="mr-8">
															<Skeleton width={40} />
														</li>
														<li>
															<Skeleton width={40} />
														</li>
													</ul>
													<div className="flex flex-wrap items-center justify-between">
														<div className="mr-4">
															<Skeleton width={80} height={25} />
														</div>
														<p className="text-[12px] font-bold text-darkGray dark:text-gray-400">
															<Skeleton width={60} />
														</p>
													</div>
												</div>
											</div>
									  )}
							</div>
						</div>
					)}
				</div>
			</main>
			<CandFooter />
		</>
	);
}
export async function getServerSideProps({ context, locale }: any) {
	const translations = await serverSideTranslations(locale, ["common"]);
	return {
		props: {
			...translations
		}
	};
}
CanCareerSearchJobs.noAuth = true;
CanCareerSearchJobs.mobileEnabled = true;
