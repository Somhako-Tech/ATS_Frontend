import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import bulbIcon from "/public/images/icons/bulb.png";
import jobsIcon from "/public/images/icons/post-new-job.png";
import draftedIcon from "/public/images/icons/drafted.png";
import folderIcon from "/public/images/icons/folder.png";
import closedIcon from "/public/images/icons/closed.png";
import applicantsIcon from "/public/images/icons/applicants.png";
import { useRouter } from "next/router";
import { axiosInstance } from "@/utils";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import Orgsidebar from "@/components/organization/SideBar";
import Orgtopbar from "@/components/organization/TopBar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useLangStore } from "@/utils/code";
import OrgRSideBar from "@/components/organization/RSideBar";
import { useNewNovusStore } from "@/utils/novus";
import { useEffect, useState } from "react";
import Joyride from "react-joyride";
import { axiosInstanceAuth } from "@/pages/api/axiosApi";
import useJoyrideStore from "@/utils/joyride";
export default function JobsDashboard({ atsVersion, userRole, comingSoon, currentUser }: any) {
	useEffect(() => {
		if (currentUser.is_expired) {
			router.push("/organization/settings/pricing");
		}
	}, [currentUser]);
	const { t } = useTranslation("common");
	const srcLang = useLangStore((state: { lang: any }) => state.lang);

	const router = useRouter();

	const { data: session } = useSession();
	const [token, settoken] = useState("");
	const [tourCompleted, setTourCompleted] = useState(false);
	const [isTourOpen, setIsTourOpen] = useState(false);
	const { shouldShowJoyride, isJoyrideCompleted, showJoyride, completeJoyride } = useJoyrideStore();

	useEffect(() => {
		if (session) {
			settoken(session.accessToken as string);
		} else if (!session) {
			settoken("");
		}
	}, [session]);
	useEffect(() => {
		if (!isJoyrideCompleted) {
			showJoyride();
		}
	}, [isJoyrideCompleted, showJoyride]);

	const axiosInstanceAuth2 = axiosInstanceAuth(token);

	function hideOrNot(name: any) {
		if (userRole === "Hiring Manager" && name === "PostNewJob") {
			return true;
		}
		return false;
	}

	const quicklinks = [
		{
			name: t("Words.PostNewJob"),
			icon: jobsIcon,
			link: "/organization/jobs/create",
			color: "#B2E3FF",
			hide: hideOrNot("PostNewJob")
		},
		{
			name: t("Words.ActiveJobs"),
			icon: bulbIcon,
			link: "/organization/jobs/active",
			color: "#FFCA7B",
			hide: hideOrNot("ActiveJobs")
		},
		{
			name: t("Words.DraftJobs"),
			icon: draftedIcon,
			link: "/organization/jobs/draft",
			color: "#FFF2B1",
			hide: hideOrNot("DraftJobs")
		},
		{
			name: t("Words.ArchivedJobs"),
			icon: folderIcon,
			link: "/organization/jobs/archived",
			color: "#B1FFF6",
			hide: hideOrNot("ArchivedJobs")
		},
		{
			name: t("Words.ClosedJobs"),
			icon: closedIcon,
			link: "/organization/jobs/closed",
			color: "#FFBBB2",
			hide: hideOrNot("ClosedJobs")
		}
	];
	const visible = useNewNovusStore((state: { visible: any }) => state.visible);
	const tvisible = useNewNovusStore((state: { tvisible: any }) => state.tvisible);
	const joyrideSteps = [
		{
			target: ".quicklink-1",
			title: t("Words.ActiveJobs"),
			content: "Here you can View teh active jobs",
			placement: "top",
			disableBeacon: true,
			disableOverlayClose: true,
			hideCloseButton: true
		},
		{
			target: ".quicklink-2",
			title: t("Words.DraftJobs"),
			content: "Here you can view your draft jobs",
			placement: "top",
			disableBeacon: true,
			disableOverlayClose: true,
			hideCloseButton: true
		},
		{
			target: ".quicklink-3",
			title: t("Words.ArchivedJobs"),
			content: "Archived job postings in the system are available here.",
			placement: "bottom",
			disableBeacon: true,
			disableOverlayClose: true,
			hideCloseButton: true
		},
		{
			target: ".quicklink-4",
			title: t("Words.ClosedJobs"),
			content: "Closed jobs are available here.",
			placement: "bottom",
			disableBeacon: true,
			disableOverlayClose: true,
			hideCloseButton: true
		},
		{
			target: ".quicklink-0",
			title: t("Words.PostNewJob"),
			content: "Lets create a Job ,Click here to post a new job.",
			// placement: "top",
			disableBeacon: true,
			disableOverlayClose: true,
			hideCloseButton: true,
			hideFooter: true,
			spotlightClicks: true
		}
		// Define steps for other quicklinks similarly
	];

	return (
		<>
			<Head>
				<title>{t("Words.Jobs")}</title>
			</Head>
			{currentUser && !currentUser.is_expired && (
				<main>
					<Orgsidebar />
					<Orgtopbar />
					{token && token.length > 0 && <OrgRSideBar axiosInstanceAuth2={axiosInstanceAuth2} />}
					<div id="overlay" className="fixed left-0 top-0 z-[9] hidden h-full w-full bg-[rgba(0,0,0,0.2)]"></div>
					<div className={`layoutWrap p-4` + " " + (visible && "mr-[calc(27.6%+1rem)]")}>
						<div className="relative rounded-normal bg-white p-10 dark:bg-gray-800">
							<h1 className="mb-6 text-xl font-bold">{t("Words.Jobs")}</h1>
							<div className="-mx-4 flex flex-wrap items-center">
								{quicklinks.map((links, i) => (
									<>
										{!links.hide && (
											<div
												key={i}
												className={`mb-8 w-full px-4 md:max-w-[50%] xl:max-w-[33.3333%] 2xl:max-w-[25%] quicklink-${i}`}
											>
												<Link
													href={links.link}
													className="block rounded-normal bg-white p-6 shadow-normal hover:bg-lightBlue dark:bg-gray-700 dark:hover:bg-gray-600"
												>
													<div className="mb-10 flex w-full items-center">
														<div
															className={`mr-4 flex h-[45px] w-[45px] items-center justify-center rounded p-3`}
															style={{ backgroundColor: links.color }}
														>
															<Image src={links.icon} alt={links.name} height={20} />
														</div>
														<span className="text-lg font-bold">{links.name}</span>
													</div>
													<span className="flex items-center text-sm text-primary dark:text-gray-300">
														{t("Words.GoTo")} <i className="fa-solid fa-arrow-right ml-2 text-[12px]"></i>
													</span>
												</Link>
											</div>
										)}
									</>
								))}
							</div>
						</div>
						<Joyride
							steps={joyrideSteps}
							run={shouldShowJoyride}
							continuous={true}
							styles={{
								options: {
									arrowColor: "#0066ff", // Set to primary color
									backgroundColor: "#F5F8FA", // Set to lightBlue
									overlayColor: "rgba(0, 0, 0, 0.4)", // Adjusted to match your styling
									primaryColor: "#0066ff", // Set to primary color
									textColor: "#3358c5", // Set to secondary color
									// width: 100, // Adjust as needed
									zIndex: 1000 // Set as needed
								}
							}}
							showProgress={true}
							// showSkipButton={true}
							callback={(data: any) => {
								const { action } = data;
								if (action === "close") {
									setIsTourOpen(false);
									setTourCompleted(true); // Mark the tour as completed when the user closes it
								}
							}}
						/>
					</div>
				</main>
			)}
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
