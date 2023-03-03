import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import dashboardIcon from "/public/images/icons/dashboard.png";
import integrationIcon from "/public/images/icons/integration.png";
import jobsIcon from "/public/images/icons/jobs.png";
import analyticsIcon from "/public/images/icons/analytics.png";
import vendorsIcon from "/public/images/icons/vendors.png";
import applicantsIcon from "/public/images/icons/applicants.png";
import collectionIcon from "/public/images/icons/collection.png";
import { useRouter } from "next/router";
import { axiosInstance } from "@/utils";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";

export default function Home() {
	const router = useRouter();

	const { data: session } = useSession();

	const quicklinks = [
		{
			name: "Post New Job",
			icon: jobsIcon,
			link: "/organization/jobs/create"
		},
		{
			name: "Active Jobs",
			icon: integrationIcon,
			link: "/organization/jobs/active"
		},
		{
			name: "Drafted Jobs",
			icon: jobsIcon,
			link: "/organization/jobs/drafted"
		},
		{
			name: "Archived Jobs",
			icon: analyticsIcon,
			link: "/organization/jobs/archived"
		},
		{
			name: "Closed Jobs",
			icon: vendorsIcon,
			link: "/organization/jobs/closed"
		},
		{
			name: "Applicants",
			icon: applicantsIcon,
			link: "/organization/jobs/applicant"
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