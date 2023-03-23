import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { axiosInstance } from "@/utils";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import Orgsidebar from "@/components/organization/SideBar";
import Orgtopbar from "@/components/organization/TopBar";
import { axiosInstanceAuth } from "@/pages/api/axiosApi";
import { useEffect, useState, Fragment } from "react";
import { useApplicantStore } from "@/utils/code";
import Button from "@/components/Button";
import Image from "next/image";
import { Tab, Transition } from "@headlessui/react";
import jobIcon from "/public/images/icons/jobs.png";
import TeamMembers from "@/components/TeamMembers";
import userImg from "/public/images/user-image.png";
import moment from "moment";
import CardLayout_1 from "@/components/CardLayout-1";
import { Listbox } from '@headlessui/react'

const people = [
	{ id: 1, name: 'Shortlist', unavailable: false },
	{ id: 2, name: 'Hire', unavailable: false },
	{ id: 3, name: 'On Hold', unavailable: false },
	{ id: 4, name: 'Offer Letter Prepration', unavailable: true },
	{ id: 5, name: 'Offer Rolled Out', unavailable: false },
	{ id: 6, name: 'Offer Accepted', unavailable: false },
	{ id: 7, name: 'Offer Rejected', unavailable: false },
  ]

export default function Detail() {
	const router = useRouter();

	const applicantlist = useApplicantStore((state: { applicantlist: any }) => state.applicantlist);
	const setapplicantlist = useApplicantStore((state: { setapplicantlist: any }) => state.setapplicantlist);
	const applicantdetail = useApplicantStore((state: { applicantdetail: any }) => state.applicantdetail);
	const setapplicantdetail = useApplicantStore((state: { setapplicantdetail: any }) => state.setapplicantdetail);
	const jobid = useApplicantStore((state: { jobid: any }) => state.jobid);
	const setjobid = useApplicantStore((state: { setjobid: any }) => state.setjobid);
	const canid = useApplicantStore((state: { canid: any }) => state.canid);
	const setcanid = useApplicantStore((state: { setcanid: any }) => state.setcanid);

	const { data: session } = useSession();
	const [token, settoken] = useState("");
	const [refersh, setrefersh] = useState(1);
	const [refersh1, setrefersh1] = useState(0);

	const [selectedPerson, setSelectedPerson] = useState(people[0])

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
		console.log(token)
		console.log(jobid)
		console.log(canid)
		console.log(refersh)
		if (token.length > 0 && jobid.length > 0 && canid.length > 0 && refersh > 0) {
			loadApplicantDetail();
		}
	}, [token, refersh, jobid, canid]);

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

	async function chnageStatus(status: string | Blob, arefid: any) {
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

	// useEffect(() => {
	// 	console.log(applicantdetail)
	// }, [applicantdetail]);

	

	return (
		<>
			<Head>
				<title>Applicant Detail</title>
				<meta name="description" content="Generated by create next app" />
			</Head>
			<main>
				<Orgsidebar />
				<Orgtopbar />
				<div id="overlay" className="fixed left-0 top-0 z-[9] hidden h-full w-full bg-[rgba(0,0,0,0.2)] dark:bg-[rgba(255,255,255,0.2)]"></div>
				<div className="layoutWrap p-4 lg:p-8">
					<div className="relative">
						<div className="flex flex-wrap">
							<div className="w-full lg:max-w-[400px]">
								<div className="mb-4 flex items-center rounded-large border-2 border-slate-300 bg-white p-5 shadow-normal dark:border-gray-700 dark:bg-gray-800">
									<button className="mr-5 justify-self-start text-darkGray dark:text-white" onClick={()=>{router.back()}}>
										<i className="fa-solid fa-arrow-left text-2xl"></i>
									</button>
									<h2 className="text-xl font-bold">
										<span>Profile</span>
									</h2>
								</div>
								{applicantdetail["CandidateProfile"] && 
								applicantdetail["CandidateProfile"].map((data: any, i: React.Key) => (
								<div className="mb-4 rounded-large border-2 border-slate-300 bg-white p-5 shadow-normal dark:border-gray-700 dark:bg-gray-800" key={i}>
									<div className="mb-4 border-b pb-4">
										<div className="mb-4 border-b pb-2 text-center">
											<Image
												src={`http://127.0.0.1:8000${data["profile"]}`}
												alt="User"
												width={90}
												height={90}
												className="mx-auto mb-3 h-[90px] rounded-full object-cover shadow-normal"
											/>
											<h3 className="mb-2 font-bold">{data["first_name"]} {data["last_name"]}</h3>
											<p className="mb-2 text-sm text-darkGray">Product Manager - ID 43108</p>
											<p className="mb-2 text-sm text-darkGray">
												Source - &nbsp;
												<span className="font-semibold text-primary">
													<i className="fa-brands fa-linkedin"></i> LinkedIn
												</span>
											</p>
										</div>
										<div className="flex flex-wrap items-center justify-between">
											<div className="my-1 flex items-center">
												<div className="mr-2 block h-[26px] w-[30px] rounded border border-white bg-red-100 text-center leading-[23px] text-red-500 shadow-normal">
													<i className="fa-regular fa-envelope"></i>
												</div>
												<p className="text-[11px] font-semibold text-darkGray">{data["user"]["email"]}</p>
											</div>
											<div className="my-1 flex items-center">
												<div className="mr-2 block h-[26px] w-[30px] rounded border border-white bg-teal-100 text-center leading-[23px] text-teal-500 shadow-normal">
													<i className="fa-solid fa-phone text-[14px]"></i>
												</div>
												<p className="text-[11px] font-semibold text-darkGray">{data["mobile"]}</p>
											</div>
										</div>
										{applicantdetail["Link"] && <div className="flex flex-wrap items-center justify-center text-2xl">
										{applicantdetail["Link"].map((data: any, i: React.Key) => (
											<Link href={`${data["title"]}`} target="_blank" className="m-3 mb-0" key={i}>
												<i className="fa-brands fa-behance"></i>
											</Link>
										))}
										</div>}
									</div>
									<div className="mb-4 border-b pb-4">
										<h3 className="mb-4 text-lg font-semibold">Details</h3>
										<ul className="flex flex-wrap text-[12px] text-darkGray">
											<li className="mb-2 w-[50%] pr-2">Current Salary - {data["current_salary"]}</li>
											<li className="mb-2 w-[50%] pr-2">Expected Salary - {data["expected_salary"]}</li>
										</ul>
									</div>
									<div className="mb-4 border-b pb-4">
										<h3 className="mb-4 text-lg font-semibold">Summary</h3>
										<p className="text-[12px] text-darkGray">
											{
												`${data["summary"]}`
											}
										</p>
									</div>
									<div className="mb-4 border-b pb-4">
										<h3 className="mb-4 text-lg font-semibold">Skills</h3>
										{applicantdetail["Skill"] && <ul className="flex flex-wrap rounded-normal border p-2 text-[12px] shadow">
										{applicantdetail["Skill"].map((data: any, i: React.Key) => (
											<li className="m-1 min-w-[75px] rounded-[30px] bg-gray-100 px-4 py-2 text-center" key={i}>{data["title"]}</li>
										))}
										</ul>}
									</div>
									<div className="mb-4 border-b pb-4">
										<h3 className="mb-4 text-lg font-semibold">Education</h3>
										{applicantdetail["Education"] && applicantdetail["Education"].map((data: any, i: React.Key) => (
											<div className="mb-2 rounded-normal border p-3 text-[12px] text-darkGray shadow last:mb-0" key={i}>
											<h4 className="mb-1 font-bold text-black dark:text-white">{data["title"]}</h4>
											<p>{data["college"]}</p>
											<p className="mb-1">{moment(data["yearofjoin"]).format("MMMM YYYY")} - {data["yearofend"] ? moment(data["yearofend"]).format("MMMM YYYY") : <>PRESENT</>}</p>
											<p>
												{data["edubody"]}
											</p>
										</div>
										))}
									</div>
									<div className="mb-4 border-b pb-4">
										<h3 className="mb-4 text-lg font-semibold">Certifications</h3>
										{applicantdetail["Certification"] && applicantdetail["Certification"].map((data: any, i: React.Key) => (
											<div className="mb-2 rounded-normal border p-3 text-[12px] text-darkGray shadow last:mb-0" key={i}>
											<h4 className="mb-1 font-bold text-black dark:text-white">{data["title"]}</h4>
											<p>{data["college"]}</p>
											<p className="mb-1">{moment(data["yearofissue"]).format("MMMM YYYY")} - {data["yearofexp"] ? moment(data["yearofexp"]).format("MMMM YYYY") : <>NOT EXPIRE</>}</p>
											<p>
												URL : {data["creurl"]} <br />
												ID : {data["creid"]}
											</p>
										</div>
										))}
									</div>
									<div className="mb-4 border-b pb-4">
										<h3 className="mb-4 text-lg font-semibold">Experience</h3>
										{applicantdetail["Experience"] && applicantdetail["Experience"].map((data: any, i: React.Key) => (
											<div className="mb-2 rounded-normal border p-3 text-[12px] text-darkGray shadow last:mb-0" key={i}>
											<h4 className="mb-1 font-bold text-black dark:text-white">{data["title"]}</h4>
											<p>{data["company"]}</p>
											<p className="mb-1">{moment(data["year_of_join"]).format("MMMM YYYY")} - {data["year_of_end"] ? moment(data["year_of_end"]).format("MMMM YYYY") : <>PRESENT</>}</p>
											<p>{data["type"]}</p>
											<p>
												{data["expbody"]}
											</p>
										</div>
										))}
									</div>
									<div className="mb-4 border-b pb-4">
										<h3 className="mb-4 text-lg font-semibold">Message from Vendor</h3>
										<div className="mb-2 rounded-normal border p-3 text-[12px] text-darkGray shadow last:mb-0">
											<p>
												{data["recuriter_message"]}
											</p>
										</div>
									</div>
								</div> ))}
							</div>
							<div className="w-full lg:max-w-[calc(100%-400px)] lg:pl-8">
								<div className="overflow-hidden rounded-large border-2 border-slate-300 bg-white shadow-normal dark:border-gray-700 dark:bg-gray-800">
									<div className="jusitfy-between flex flex-wrap items-center p-5 shadow">
										<aside className="flex items-center">
											<Image src={jobIcon} alt="Jobs" width={20} className="mr-3" />
											<h2 className="text-lg font-bold">
												<span>Software Developer</span>
											</h2>
										</aside>
										<aside className="flex grow items-center justify-end">
											<div className="mr-4">
											<Listbox value={selectedPerson} onChange={setSelectedPerson}>
												<Listbox.Button className={"text-sm font-bold border border-slate-300 rounded"}>
													<span className="py-2 px-3">Move Applicant</span>
													<i className="fa-solid fa-chevron-down ml-2 text-sm border-l py-2 px-3"></i>
												</Listbox.Button>
												<Transition
													enter="transition duration-100 ease-out"
													enterFrom="transform scale-95 opacity-0"
													enterTo="transform scale-100 opacity-100"
													leave="transition duration-75 ease-out"
													leaveFrom="transform scale-100 opacity-100"
													leaveTo="transform scale-95 opacity-0"
												>
													<Listbox.Options
														className={
															"absolute right-0 top-[100%] mt-2 w-[250px] rounded-normal bg-white py-2 shadow-normal dark:bg-gray-700"
														}
													>
														{people.map((person) => (
														<Listbox.Option
															key={person.id}
															value={person}
															disabled={person.unavailable}
															className="clamp_1 relative cursor-pointer px-6 py-2 pl-8 text-sm hover:bg-gray-100 dark:hover:bg-gray-900"
														>
															{({ selected }) => (
																<>
																	<span className={` ${selected ? "font-bold" : "font-normal"}`}>{person.name}</span>
																	{selected ? (
																		<span className="absolute left-3">
																			<i className="fa-solid fa-check"></i>
																		</span>
																	) : null}
																</>
															)}
														</Listbox.Option>
														))}
													</Listbox.Options>
												</Transition>
											</Listbox>
											</div>
											<TeamMembers />
										</aside>
									</div>
									<div className="">
										<Tab.Group>
											<Tab.List className={"border-b px-4"}>
												<Tab as={Fragment}>
													{({ selected }) => (
														<button
															className={
																"border-b-4 py-3 px-6 font-semibold focus:outline-none" +
																" " +
																(selected ? "border-primary text-primary" : "border-transparent text-darkGray")
															}
														>
															Profile
														</button>
													)}
												</Tab>
												<Tab as={Fragment}>
													{({ selected }) => (
														<button
															className={
																"border-b-4 py-3 px-6 font-semibold focus:outline-none" +
																" " +
																(selected ? "border-primary text-primary" : "border-transparent text-darkGray")
															}
														>
															Assessment
														</button>
													)}
												</Tab>
												<Tab as={Fragment}>
													{({ selected }) => (
														<button
															className={
																"border-b-4 py-3 px-6 font-semibold focus:outline-none" +
																" " +
																(selected ? "border-primary text-primary" : "border-transparent text-darkGray")
															}
														>
															Feedback
														</button>
													)}
												</Tab>
												<Tab as={Fragment}>
													{({ selected }) => (
														<button
															className={
																"border-b-4 py-3 px-6 font-semibold focus:outline-none" +
																" " +
																(selected ? "border-primary text-primary" : "border-transparent text-darkGray")
															}
														>
															Timeline
														</button>
													)}
												</Tab>
											</Tab.List>
											<Tab.Panels>
												<Tab.Panel className={"min-h-[calc(100vh-250px)]"}>
												{applicantdetail["Resume"] &&
													applicantdetail["Resume"].map((data, i) => (
														<div className="flex flex-wrap items-center justify-between bg-lightBlue p-2 px-8 text-sm" key={i}>
															<p className="my-2">{data["file"].split("/").pop()}</p>
															<Link href={`http://127.0.0.1:8000${data["file"]}`} className="my-2 inline-block font-bold text-primary hover:underline" download={data["file"].split("/").pop()}>
																<i className="fa-solid fa-download mr-2"></i>
																Download
															</Link>
														</div>
												))}
													{/* <div className="px-8">Preview Here</div> */}
													{applicantdetail["Resume"] &&
													applicantdetail["Resume"].map((data, i) => (
													<iframe src={`http://127.0.0.1:8000${data["file"]}`} key={i} className="w-[100%] h-[100vh]"></iframe>
													))}
												</Tab.Panel>
												<Tab.Panel className={"min-h-[calc(100vh-250px)] py-6 px-8"}>
													<div className="mx-[-15px] flex flex-wrap">
														{Array(6).fill(
															<div className="mb-[30px] w-full px-[15px] md:max-w-[50%]">
																<CardLayout_1 isBlank={true} />
															</div>
														)}
													</div>
												</Tab.Panel>
												<Tab.Panel className={"min-h-[calc(100vh-250px)]"}>Content 3</Tab.Panel>
												<Tab.Panel className={"min-h-[calc(100vh-250px)] py-6 px-8"}>
													<div className="relative before:content-[''] before:w-[1px] before:h-[100%] before:bg-slate-200 before:absolute before:top-0 before:left-[80px] max-h-[455px] overflow-y-auto">
														<div className="flex items-start">
															<div className="w-[80px] px-2 py-4">
																<p className="text-sm text-darkGray">
																	8 Feb
																	<br />
																	<small>2:30 PM</small>
																</p>
															</div>
															<div className="w-[calc(100%-80px)] pl-6">
																<div className="border-b">
																	<article className="py-4">
																		<h6 className="font-bold text-sm mb-2">Applicant has been shifted to new Job -Software Engineer</h6>
																		<p className="text-[12px] text-darkGray">By - Steve Paul : Collaborator</p>
																	</article>
																</div>
															</div>
														</div>
														<div className="flex items-start">
															<div className="w-[80px] px-2 py-4">
																<p className="text-sm text-darkGray">
																	8 Feb
																	<br />
																	<small>2:30 PM</small>
																</p>
															</div>
															<div className="w-[calc(100%-80px)] pl-6">
																<div className="border-b">
																	<article className="py-4">
																		<h6 className="font-bold text-sm mb-2">Applicant has been shifted to new Job -Software Engineer</h6>
																		<p className="text-[12px] text-darkGray">By - Steve Paul : Collaborator</p>
																	</article>
																	<article className="py-4">
																		<h6 className="font-bold text-sm mb-2">Applicant has been shifted to new Job -Software Engineer</h6>
																		<p className="text-[12px] text-darkGray">By - Steve Paul : Collaborator</p>
																	</article>
																</div>
															</div>
														</div>
														<div className="flex items-start">
															<div className="w-[80px] px-2 py-4">
																<p className="text-sm text-darkGray">
																	8 Feb
																	<br />
																	<small>2:30 PM</small>
																</p>
															</div>
															<div className="w-[calc(100%-80px)] pl-6">
																<div className="border-b">
																	<article className="py-4">
																		<h6 className="font-bold text-sm mb-2">Applicant has been shifted to new Job -Software Engineer</h6>
																		<p className="text-[12px] text-darkGray">By - Steve Paul : Collaborator</p>
																	</article>
																</div>
															</div>
														</div>
													</div>
												</Tab.Panel>
											</Tab.Panels>
										</Tab.Group>
									</div>
								</div>
							</div>
						</div>
						{/* <div className="-mx-4">
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

							{applicantdetail && applicantlist['Resume'].map((data, i) => (
									<Document file=`${data['file']}` key={i}/>
								))}

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
						</div> */}
					</div>
				</div>
			</main>
		</>
	);
}
