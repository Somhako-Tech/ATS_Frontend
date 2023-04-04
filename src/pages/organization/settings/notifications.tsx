import OrgSideBar from "@/components/organization/SideBar";
import OrgTopBar from "@/components/organization/TopBar";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import bellIcon from "/public/images/icons/bell.png";
import calendarSetting from "/public/images/calendar-setting.png";
import Button from "@/components/Button";
import FormField from "@/components/FormField";

export default function Notifications() {
    const router = useRouter();

    return(
        <>
            <Head>
				<title>Notifications</title>
				<meta name="description" content="Generated by create next app" />
			</Head>
			<main>
				<OrgSideBar />
				<OrgTopBar />
				<div id="overlay" className="fixed left-0 top-0 z-[9] hidden h-full w-full bg-[rgba(0,0,0,0.2)] dark:bg-[rgba(255,255,255,0.2)]"></div>
				<div className="layoutWrap p-4 lg:p-8">
                    <div className="rounded-normal bg-white shadow-normal dark:bg-gray-800">
						<div className="border-b py-4">
                            <div className="w-full max-w-[1100px] mx-auto flex flex-wrap items-center justify-start py-2 px-4">
                                <button
                                    onClick={() => router.back()}
                                    className="mr-10 justify-self-start text-darkGray dark:text-gray-400"
                                >
                                    <i className="fa-solid fa-arrow-left text-2xl"></i>
                                </button>
                                <h2 className="text-xl font-bold flex items-center">
                                    <div className="mr-4 flex h-[45px] w-[45px] items-center justify-center rounded bg-[#B2E3FF] p-3">
                                        <Image src={bellIcon} alt='Active Job' height={20} />
                                    </div>
                                    <span>Notifications</span>
                                </h2>
                            </div>
						</div>
                        <div className="w-full max-w-[800px] mx-auto px-4 py-6">
                            <div className="bg-white dark:bg-gray-700 rounded-normal shadow-normal p-4 mb-4 last:mb-0">
                                <div>
                                    <table cellPadding={"0"} cellSpacing={"0"} className="w-full text-left">
                                        <thead>
                                            <tr>
                                                <th className="border-b dark:border-b-gray-600 py-2 px-3 font-bold">
                                                    Applicant Notifications
                                                </th>
                                                <th className="border-b dark:border-b-gray-600 py-2 px-3 font-bold text-center w-[100px]">
                                                    Receive
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm text-darkGray dark:text-gray-400">
                                            <tr>
                                                <td className="py-2 px-3">
                                                    Applicant Applications
                                                </td>
                                                <td className="py-2 px-3 text-center w-[100px]">
                                                    <input type="checkbox" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 px-3">
                                                    Interview Scheduled
                                                </td>
                                                <td className="py-2 px-3 text-center w-[100px]">
                                                    <input type="checkbox" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 px-3">
                                                    Feedback
                                                </td>
                                                <td className="py-2 px-3 text-center w-[100px]">
                                                    <input type="checkbox" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 px-3">
                                                    Feedback submitted on candidate in the job you have access to
                                                </td>
                                                <td className="py-2 px-3 text-center w-[100px]">
                                                    <input type="checkbox" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-700 rounded-normal shadow-normal p-4 mb-4 last:mb-0">
                                <div>
                                    <table cellPadding={"0"} cellSpacing={"0"} className="w-full text-left">
                                        <thead>
                                            <tr>
                                                <th className="border-b dark:border-b-gray-600 py-2 px-3 font-bold">
                                                    Company Notifications
                                                </th>
                                                <th className="border-b dark:border-b-gray-600 py-2 px-3 font-bold text-center w-[100px]">
                                                    Receive
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm text-darkGray dark:text-gray-400">
                                            <tr>
                                                <td className="py-2 px-3">
                                                    New job opening created
                                                </td>
                                                <td className="py-2 px-3 text-center w-[100px]">
                                                    <input type="checkbox" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 px-3">
                                                    New user signed up
                                                </td>
                                                <td className="py-2 px-3 text-center w-[100px]">
                                                    <input type="checkbox" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 px-3">
                                                    Job opening closed
                                                </td>
                                                <td className="py-2 px-3 text-center w-[100px]">
                                                    <input type="checkbox" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 px-3">
                                                    Job opening archived
                                                </td>
                                                <td className="py-2 px-3 text-center w-[100px]">
                                                    <input type="checkbox" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
					</div>
                </div>
            </main>
        </>
    )
}