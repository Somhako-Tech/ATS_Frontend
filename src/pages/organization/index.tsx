import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import dashboardIcon from "/public/images/icons/dashboard.png";
import integrationIcon from "/public/images/icons/integration.png";
import jobsIcon from "/public/images/icons/jobs.png";
import analyticsIcon from "/public/images/icons/analytics.png";
import vendorsIcon from "/public/images/icons/vendors.png";
import applicantsIcon from "/public/images/icons/applicants.png";
import settingsIcon from "/public/images/icons/settings.png";

export default function Organization() {
	const quicklinks = [
		{
			name: "Dashboard",
			icon: dashboardIcon,
			link: "/organization/dashboard"
		},
		{
			name: "Integration",
			icon: integrationIcon,
			link: "/dashboard"
		},
		{
			name: "Jobs",
			icon: jobsIcon,
			link: "/organization/jobs"
		},
		{
			name: "Analytics",
			icon: analyticsIcon,
			link: "/organization/analytics"
		},
		{
			name: "Vendors",
			icon: vendorsIcon,
			link: "/organization/settings/vendors"
		},
		{
			name: "Applicants",
			icon: applicantsIcon,
			link: "/organization/applicants"
		},
		{
			name: "Settings",
			icon: settingsIcon,
			link: "/organization/settings"
		}
	];
	return (
		<>
			<Head>
				<title>Home</title>
				<meta name="description" content="Generated by create next app" />
			</Head>
			<main className="py-8">
				<div className="md:px-26 mx-auto w-full max-w-[1920px] px-4 lg:px-40">
					<div className="rounded-normal bg-white p-6 shadow-normal dark:bg-gray-800">
						<div className="mx-auto w-full max-w-[1100px]">
							<div className="-mx-4 flex flex-wrap items-center">
								{quicklinks.map((links, i) => (
									<div key={i} className="mb-8 w-full px-4 md:max-w-[50%] lg:max-w-[33.33%]">
										<Link
											href={links.link}
											className=" flex w-full items-center rounded-normal bg-white p-6 shadow-normal hover:bg-lightBlue dark:bg-gray-700 dark:hover:bg-gray-600"
										>
											<div className="mr-4 flex h-[45px] w-[45px] items-center justify-center rounded bg-[#B2E3FF] p-3">
												<Image src={links.icon} alt={links.name} width={30} height={30} />
											</div>
											<span className="text-lg font-bold">{links.name}</span>
										</Link>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export async function getServerSideProps(context: any) {
	const session: any = await getServerSession(context.req, context.res, authOptions);
	if (!session)
		return {
			redirect: {
				destination: "/auth/signin",
				permanent: false
			}
		};

	return {
		props: {}
	};
}
