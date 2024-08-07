import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils";
import { useSession } from "next-auth/react";
import HeaderBar from "@/components/HeaderBar";
import JobCard_2 from "@/components/JobCard-2";
import OrgSideBar from "@/components/organization/SideBar";
import OrgTopBar from "@/components/organization/TopBar";
import draftedIcon from "/public/images/icons/drafted.png";
import Image from "next/image";
import { axiosInstanceAuth } from "@/pages/api/axiosApi";
import FormField from "@/components/FormField";
import Link from "next/link";
import noActivedata from "/public/images/no-data/iconGroup-1.png";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useLangStore } from "@/utils/code";
import OrgRSideBar from "@/components/organization/RSideBar";
import { useNewNovusStore } from "@/utils/novus";

export default function JobsDrafted({ atsVersion, userRole, upcomingSoon }: any) {
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

	const [draftedJobs, setDraftedJobs] = useState([]);
	const [filterJobs, setFilterJobs] = useState([]);
	const [search, setsearch] = useState("");

	const getDraftedJobs = async () => {
		await axiosInstance.api
			.get("/job/list-job", { headers: { authorization: "Bearer " + session?.accessToken } })
			.then((response) => {
				let arr = [];

				response.data.map((job: any) => job.jobStatus === "Draft" && arr.push(job));

				setDraftedJobs(arr);
				setFilterJobs(arr);
			})
			.catch((error) => {
				// console.log({ error });
				return null;
			});

		// setDraftedJobs(newDraftedJobs);
	};
	useEffect(() => {
		session && getDraftedJobs();
	}, [session]);

	useEffect(() => {
		if (search.length > 0) {
			let localSearch = search.toLowerCase();
			let arr = [];
			for (let i = 0; i < draftedJobs.length; i++) {
				if (draftedJobs[i]["jobTitle"].toLowerCase().includes(localSearch)) {
					arr.push(draftedJobs[i]);
				}
			}
			setFilterJobs(arr);
		} else {
			setFilterJobs(draftedJobs);
		}
	}, [search]);
	const visible = useNewNovusStore((state: { visible: any }) => state.visible);
	const tvisible = useNewNovusStore((state: { tvisible: any }) => state.tvisible);

	return (
		<>
			<Head>
				<title>{t("Words.DraftJobs")}</title>
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
							<div className="mx-auto w-full max-w-[1100px] px-4">
								<div className="flex flex-wrap items-center justify-start py-2">
									<button
										onClick={() => router.back()}
										className="mr-10 justify-self-start text-darkGray dark:text-gray-400"
									>
										<i className="fa-solid fa-arrow-left text-xl"></i>
									</button>
									<h2 className="flex items-center text-lg font-bold">
										<div className="mr-4 flex h-[45px] w-[45px] items-center justify-center rounded bg-[#B2E3FF] p-3">
											<Image src={draftedIcon} alt="Draft Job" height={20} />
										</div>
										<span>{t("Words.DraftJobs")}</span>
									</h2>
								</div>
							</div>
						</div>
						<div className="mx-auto w-full max-w-[980px] px-4 py-8">
							<div className="mb-6">
								<FormField
									fieldType="input"
									inputType="search"
									placeholder={t("Words.Search")}
									icon={<i className="fa-solid fa-search"></i>}
									value={search}
									handleChange={(e) => setsearch(e.target.value)}
								/>
							</div>
							{filterJobs && filterJobs.length > 0 ? (
								<div className="mx-[-15px] flex flex-wrap">
									{filterJobs &&
										filterJobs.map(
											(job: any, i) =>
												job && (
													<div className="mb-[30px] w-full px-[15px] xl:max-w-[50%]" key={i}>
														<JobCard_2
															key={i}
															job={job}
															// handleView={() => {
															// 	router.push("/organization/jobs/drafted/" + job.refid);
															// }}
															axiosInstanceAuth2={axiosInstanceAuth2}
															loadJob={getDraftedJobs}
															userRole={userRole}
														/>
													</div>
												)
										)}
								</div>
							) : (
								<div className="mx-auto w-full max-w-[300px] py-8 text-center">
									<div className="mb-6 p-2">
										<Image
											src={noActivedata}
											alt="No Data"
											width={300}
											className="mx-auto max-h-[200px] w-auto max-w-[200px]"
										/>
									</div>
									<h5 className="mb-4 text-lg font-semibold">
										{t("Select.No")} {t("Words.DraftJobs")}
									</h5>
									<p className="mb-2 text-sm text-darkGray">
										{srcLang === "ja"
											? "ドラフト ジョブはありません。ドラフト ジョブを管理するには、新しいジョブを投稿してください"
											: "There are no Draft Jobs , Post a New Job to manage draft Jobs"}
									</p>
									<Link
										href={"/organization/jobs/create"}
										className="my-2 inline-block min-w-[60px] rounded bg-gradient-to-b from-gradLightBlue to-gradDarkBlue px-3 py-2 text-[14px] text-white hover:from-gradDarkBlue hover:to-gradDarkBlue"
									>
										{t("Words.PostNewJob")}
									</Link>
								</div>
							)}
						</div>
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
