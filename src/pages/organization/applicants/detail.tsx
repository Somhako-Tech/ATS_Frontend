import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { axiosInstance } from "@/utils";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import Orgsidebar from "@/components/organization/SideBar";
import Orgtopbar from "@/components/organization/TopBar";
import { axiosInstanceAuth } from "@/pages/api/axiosApi";
import { useEffect, useState } from "react";
import { useApplicantStore } from "@/utils/code";
import Button from "@/components/Button";

export default function Detail() {
	const router = useRouter();

	const applicantlist = useApplicantStore((state) => state.applicantlist);
	const setapplicantlist = useApplicantStore((state) => state.setapplicantlist);
	const applicantdetail = useApplicantStore((state) => state.applicantdetail);
	const setapplicantdetail = useApplicantStore((state) => state.setapplicantdetail);
	const jobid = useApplicantStore((state) => state.jobid);
	const setjobid = useApplicantStore((state) => state.setjobid);
	const canid = useApplicantStore((state) => state.canid);
	const setcanid = useApplicantStore((state) => state.setcanid);

	const { data: session } = useSession();
	const [token, settoken] = useState("");
	const [refersh, setrefersh] = useState(0);
	const [refersh1, setrefersh1] = useState(0);

	useEffect(() => {
		if (session) {
			settoken(session.accessToken as string);
		} else if (!session) {
			settoken("");
		}
	}, [session]);

	const axiosInstanceAuth2 = axiosInstanceAuth(token);

	async function loadApplicantDetail() {
		await axiosInstanceAuth2
			.get(`/candidate/listuser/${canid}/${jobid}`)
			.then(async (res) => {
				console.log(res.data);
				setapplicantdetail(res.data);
				setrefersh(0);
			})
			.catch((err) => {
				console.log(err);
				setrefersh(0);
			});
	}

	useEffect(() => {
		if (
			(token.length > 0 && Object.keys(applicantdetail).length === 0 && jobid.length > 0 && canid.length > 0) ||
			refersh != 0
		) {
			loadApplicantDetail();
		}
	}, [token, applicantdetail, refersh, jobid, canid]);

	async function loadApplicant() {
		await axiosInstanceAuth2
			.get(`/job/listapplicant/`)
			.then(async (res) => {
				// console.log(res.data)
				setapplicantlist(res.data);
				setrefersh1(0);
			})
			.catch((err) => {
				console.log(err);
				setrefersh1(0);
			});
	}

	useEffect(() => {
		if (refersh1 != 0) {
			loadApplicant();
		}
	}, [refersh1]);

	async function chnageStatus(status, arefid) {
		const fdata = new FormData();
		fdata.append("status", status);
		await axiosInstanceAuth2
			.put(`/job/applicant/${arefid}/update/`, fdata)
			.then((res) => {
				setrefersh1(1);
			})
			.catch((err) => {
				console.log(err);
				setrefersh1(1);
			});
	}

	return (
		<>
			<Head>
				<title>Jobs</title>
				<meta name="description" content="Generated by create next app" />
			</Head>
			<main>
				<Orgsidebar />
				<Orgtopbar />
				<div id="overlay" className="fixed left-0 top-0 z-[9] hidden h-full w-full bg-[rgba(0,0,0,0.2)]"></div>
				<div id="dashboard" className="p-4 lg:p-8">
					<div className="-mx-4">
						<Button
							label="Back"
							loader={false}
							btnType="button"
							handleClick={() => {
								setjobid("");
								setcanid("");
								setapplicantdetail({});
								setapplicantlist([]);
								router.back();
							}}
						/>

						{/* {applicantdetail && applicantlist['Resume'].map((data, i) => (
								<Document file=`${data['file']}` key={i}/>
							))} */}

						{applicantdetail["Resume"] &&
							applicantdetail["Resume"].map((data, i) => (
								<iframe src={`http://127.0.0.1:8000${data["file"]}`} key={i} />
							))}
						{applicantlist &&
							applicantlist.map(
								(data, i) =>
									data["job"]["refid"] == jobid &&
									data["user"]["erefid"] == canid && (
										<ul
											key={i}
											className="m-4 w-full list-disc rounded-normal bg-white p-4 p-6 shadow-normal hover:bg-lightBlue dark:bg-gray-700 dark:hover:bg-gray-600"
										>
											<li>
												Current Status : <span className="text-lg font-bold">{data["status"]}</span>
											</li>
											<li>
												<Button
													label="Sourced"
													loader={false}
													btnType="button"
													handleClick={() => {
														chnageStatus("Sourced", data["arefid"]);
													}}
												/>
												<Button
													label="Applied"
													loader={false}
													btnType="button"
													handleClick={() => {
														chnageStatus("Applied", data["arefid"]);
													}}
												/>
												<Button
													label="Phone Screen"
													loader={false}
													btnType="button"
													handleClick={() => {
														chnageStatus("Phone Screen", data["arefid"]);
													}}
												/>
												<Button
													label="Assement"
													loader={false}
													btnType="button"
													handleClick={() => {
														chnageStatus("Assement", data["arefid"]);
													}}
												/>
												<Button
													label="Interview"
													loader={false}
													btnType="button"
													handleClick={() => {
														chnageStatus("Interview", data["arefid"]);
													}}
												/>
												<Button
													label="Offered"
													loader={false}
													btnType="button"
													handleClick={() => {
														chnageStatus("Offered", data["arefid"]);
													}}
												/>
												<Button
													label="Hired"
													loader={false}
													btnType="button"
													handleClick={() => {
														chnageStatus("Hired", data["arefid"]);
													}}
												/>
											</li>
										</ul>
									)
							)}
					</div>
				</div>
			</main>
		</>
	);
}
