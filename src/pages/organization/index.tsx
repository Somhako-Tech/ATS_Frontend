import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import dashboardIcon from "/public/images/icons/dashboard.png";
import jobsIcon from "/public/images/icons/jobs.png";
import analyticsIcon from "/public/images/icons/analytics.png";
import vendorsIcon from "/public/images/icons/vendors.png";
import applicantsIcon from "/public/images/icons/applicants.png";
import settingsIcon from "/public/images/icons/settings.png";
import offerManageIcon from "/public/images/icons/offer-manage.png";
import interviewsIcon from "/public/images/icons/interviews.png";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useLangStore } from "@/utils/code";
import toastcomp from "@/components/toast";

export default function Organization({ atsVersion, userRole }: any) {
	const { t } = useTranslation("common");
	const srcLang = useLangStore((state: { lang: any }) => state.lang);
	function blurOrNot(name: any) {
		if (atsVersion === "starter") {
			return name === "Offer Management" || name === "Analytics" || name === "Vendors";
		}
		if (atsVersion === "premium") {
			return name === "Offer Management" || name === "Vendors";
		}
		if (atsVersion === "enterprise") {
			return false;
		}
	}
	const quicklinks = [
		{
			name: t("Words.Dashboard"),
			icon: dashboardIcon,
			link: "/organization/dashboard",
			blur: blurOrNot("Dashboard")
		},
		{
			name: t("Words.Jobs"),
			icon: jobsIcon,
			link: "/organization/jobs",
			blur: blurOrNot("Jobs")
		},
		{
			name: t("Words.Applicants"),
			icon: applicantsIcon,
			link: "/organization/applicants",
			blur: blurOrNot("Applicants")
		},
		{
			name: t("Words.OfferManagement"),
			icon: offerManageIcon,
			link: "/organization/offer-management",
			blur: blurOrNot("Offer Management")
		},
		{
			name: t("Words.Interviews"),
			icon: interviewsIcon,
			link: "/organization/interviews",
			blur: blurOrNot("Interviews")
		},
		{
			name: t("Words.Analytics"),
			icon: analyticsIcon,
			link: "/organization/analytics",
			blur: blurOrNot("Analytics")
		},
		{
			name: t("Words.Vendors"),
			icon: vendorsIcon,
			link: "/organization/settings/vendors",
			blur: blurOrNot("Vendors")
		},
		{
			name: t("Words.Settings"),
			icon: settingsIcon,
			link: "/organization/settings",
			blur: blurOrNot("Settings")
		}
	];
	return (
		<>
			<Head>
				<title>{srcLang === "ja" ? "ショートカット" : "Quicklinks"}</title>
				<meta name="description" content="Generated by create next app" />
			</Head>
			<main className="py-8">
				<div className="md:px-26 mx-auto w-full max-w-[1920px] px-4 lg:px-40">
					<div className="rounded-normal bg-white p-6 dark:bg-gray-800">
						<div className="mx-auto w-full max-w-[1100px]">
							<div className="-mx-4 flex flex-wrap items-center">
								{quicklinks.map((links, i) => (
									<div key={i} className="mb-8 w-full px-4 md:max-w-[50%] xl:max-w-[33.3333%]">
										<Link
											href={links.blur ? "javascript:void(0)" : links.link}
											className="relative flex w-full items-center overflow-hidden rounded-normal bg-white p-6 shadow-normal hover:bg-lightBlue dark:bg-gray-700 dark:hover:bg-gray-600"
										>
											<div className="mr-4 flex h-[45px] w-[45px] items-center justify-center rounded bg-[#B2E3FF] p-3">
												<Image src={links.icon} alt={links.name} width={30} height={30} />
											</div>
											<span className="text-lg font-bold">{links.name}</span>
											{links.blur && (
												<>
													<div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.3)] backdrop-blur-sm">
														<div className="mx-auto w-max max-w-[400px] rounded-normal px-6 py-2 text-center text-white transition hover:scale-[1.05]">
															<h3 className="mb-1 text-lg font-extrabold text-white">
																{srcLang === "ja" ? "プランをアップグレード" : "Go Premium"}
															</h3>
															<Link
																href={"/organization/settings/pricing"}
																className="inline-block rounded bg-gradient-to-b from-gradLightBlue to-gradDarkBlue p-1 text-[10px] text-white hover:from-gradDarkBlue hover:to-gradDarkBlue"
															>
																{srcLang === "ja" ? "アップグレード" : "Upgrade"}
															</Link>
														</div>
													</div>
												</>
											)}
										</Link>
									</div>
								))}
							</div>
							{/* <button onClick={() => toastcomp("Test12", "success")}>Toast Check</button> */}
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
