import Button from "@/components/Button";
import FormField from "@/components/FormField";
import OrgSideBar from "@/components/organization/SideBar";
import OrgTopBar from "@/components/organization/TopBar";
import TeamMembers from "@/components/TeamMembers";
import { Dialog, Transition } from "@headlessui/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useReducer, useRef, useState } from "react";
import jobIcon from "/public/images/icons/jobs.png";
import userImg from "/public/images/user-image.png";
import { useApplicantStore } from "@/utils/code";
import { useSession } from "next-auth/react";
import { axiosInstance } from "@/utils";
import toastcomp from "@/components/toast";
import { addNotifyLog, axiosInstance2, axiosInstanceAuth, axiosInstanceAuth22 } from "@/pages/api/axiosApi";
import moment from "moment";

export default function ScheduleInterview() {
	const router = useRouter();

	const { data: session } = useSession();

	const cancelButtonRef = useRef(null);

	const [interviewerSearch, setInterviewerSearch] = useState("");

	const [socialPopup, setSocialPopup] = useState(false);

	const [scheduleType, setScheduleType] = useState(0);

	const [interDuration, setInterDuration] = useState("15");

	const applicantDetail = useApplicantStore((state: { applicantdetail: any }) => state.applicantdetail);
	const applicantlist = useApplicantStore((state: { applicantlist: any }) => state.applicantlist);
	const canid = useApplicantStore((state: { canid: any }) => state.canid);
	const jobid = useApplicantStore((state: { jobid: any }) => state.jobid);

	const [token, settoken] = useState("");
	useEffect(() => {
		if (session) {
			settoken(session.accessToken as string);
		} else if (!session) {
			settoken("");
		}
	}, [session]);

	const axiosInstanceAuth2 = axiosInstanceAuth(token);

	const initialState: CalendarEvent = {
		summary: "",
		description: "",
		type: [],
		platform: [],
		start: new Date(),
		end: new Date()
	};

	const updateNewSchedule = (prevScheduleDate: CalendarEvent, { target: { id, value } }: any) => {
		if (id === "reset") return initialState;

		if (id === "start" && value.getTime() > prevScheduleDate.end.getTime()) {
			const newStart = new Date(value);

			const newEnd = new Date(newStart.setMinutes(newStart.getMinutes() + Number(interDuration)));

			return { ...prevScheduleDate, [id]: value, end: newEnd };
		}

		if (id === "end" && value.getTime() < prevScheduleDate.start.getTime()) return prevScheduleDate;

		return { ...prevScheduleDate, [id]: value };
	};
	const [newSchedule, handleNewSchedule] = useReducer(updateNewSchedule, initialState);

	const [assignedInterviewerList, setAssignedInterviewerList] = useState<Array<any>>([]);

	const [interviewerList, setInterviewerList] = useState([]);

	useEffect(() => {
		const currentStart = new Date(newSchedule.start);

		const newEnd = new Date(currentStart.setMinutes(currentStart.getMinutes() + Number(interDuration)));

		handleNewSchedule({ target: { id: "end", value: newEnd } });
	}, [interDuration, newSchedule.start]);

	useEffect(() => {
		async function loadApplicant() {
			//* This endpoint lists all organization accounts and individual profiles
			const { OrganizationAccounts, IndividualProfiles }: any = await axiosInstance.api
				.get("/organization/list_organization_account_and_individual_profile/", {
					headers: { authorization: "Bearer " + session?.accessToken }
				})
				.then((response) => response.data)
				.catch((err) => {
					console.log(err);
					return { OrganizationAccounts: [], IndividualProfiles: [] };
				});

			setInterviewerList(
				OrganizationAccounts?.map(({ name, email, role, id }: any) => ({
					name,
					email,
					role,
					id,
					profile: IndividualProfiles.find((profile: any) => profile.user == id)?.profile
				}))
			);
		}
		loadApplicant();
	}, [session?.accessToken]);

	useEffect(() => {
		handleNewSchedule({
			target: {
				id: "attendees",
				value: [
					...assignedInterviewerList.map(({ email }) => ({ email })),
					{ email: applicantDetail.CandidateProfile[0].user.email }
				]
			}
		});
	}, [applicantDetail.CandidateProfile, assignedInterviewerList]);

	const [calendarIntegrations, setCalendarIntegration] = useState([]);

	useEffect(() => {
		async function loadCalendarIntegrations() {
			if (!session) return;

			const { validatedIntegrations: newIntegrations } = await axiosInstance.next_api
				.get("/api/integrations/calendar")
				.then((response) => response.data)
				.catch((err) => {
					console.log(err);
					return { validatedIntegrations: [] };
				});

			setCalendarIntegration(newIntegrations);
		}

		loadCalendarIntegrations();
	}, [router, session]);

	const createEvent = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		console.log("@", newSchedule);

		if (calendarIntegrations.length == 0) return;

		await axiosInstance.next_api
			.post("/api/integrations/gcal/createEvent", {
				googleCalendarIntegration: calendarIntegrations[0],
				event: newSchedule
			})
			.then(async (res) => {
				toastcomp("Interview Scheduled, Invitations Sent", "success");
				console.log("!", "res", res);
				let link = res.data.data.hangoutLink;
				let arefid = "";
				let teamId = [];
				let refid = jobid;
				for (let i = 0; i < applicantlist.length; i++) {
					if (applicantlist[i]["job"]["refid"] === refid && applicantlist[i]["user"]["erefid"] === canid) {
						arefid = applicantlist[i]["arefid"];
					}
				}

				console.log("@", link);
				console.log("@", arefid);
				console.log("@", refid);
				console.log("@", interviewerList);

				let att = newSchedule["attendees"];

				for (let i = 0; i < interviewerList.length; i++) {
					for (let j = 0; j < att.length; j++) {
						if (att[j]["email"] === interviewerList[i]["email"]) {
							teamId.push(interviewerList[i]["id"]);
						}
					}
				}

				console.log("@", teamId);

				const fd = new FormData();
				fd.append("teamID", teamId.join("|"));
				fd.append("date_time_from", moment(`${newSchedule["start"]}`).format().toString());
				fd.append("date_time_to", moment(`${newSchedule["end"]}`).format().toString());
				if (newSchedule["summary"] && newSchedule["summary"].length > 0)
					fd.append("interview_name", newSchedule["summary"]);
				if (newSchedule["platform"] && newSchedule["platform"].length > 0)
					fd.append("platform", newSchedule["platform"][0]["name"]);
				if (newSchedule["description"] && newSchedule["description"].length > 0)
					fd.append("description", newSchedule["description"]);
				if (link && link.length > 0) fd.append("link", link);
				await axiosInstanceAuth2
					.post(`/job/create-interview/${arefid}/${refid}/`, fd)
					.then(async (res) => {
						toastcomp("Interview Scheduled In backend", "success");
					})
					.catch((err) => {
						toastcomp("Interview Scheduled not In backend", "error");
					});
				router.push("/organization/interviews");
			});
	};

	const TeamTableHead = [
		{
			title: "User Name"
		},
		{
			title: "Department/Title"
		},
		{
			title: "Email"
		},
		{
			title: " "
		}
	];
	return (
		<>
			<Head>
				<title>Schedule Interview</title>
				<meta name="description" content="Generated by create next app" />
			</Head>
			<main>
				<OrgSideBar />
				<OrgTopBar />
				<div
					id="overlay"
					className="fixed left-0 top-0 z-[9] hidden h-full w-full bg-[rgba(0,0,0,0.2)] dark:bg-[rgba(255,255,255,0.2)]"
				></div>
				<div className="layoutWrap p-4 lg:p-8">
					<div className="rounded-normal bg-white shadow-normal dark:bg-gray-800">
						<div className="border-b py-4">
							<div className="mx-auto flex w-full max-w-[1150px] flex-wrap items-center justify-between px-4">
								<div className="flex flex-wrap items-center justify-start py-2">
									<button
										onClick={() => router.back()}
										className="mr-10 justify-self-start text-darkGray dark:text-gray-400"
									>
										<i className="fa-solid fa-arrow-left text-xl"></i>
									</button>
									<h2 className="text-lg font-bold">
										<span>Schedule Interview</span>
									</h2>
								</div>
								<TeamMembers />
							</div>
						</div>
						<div className="mx-auto w-full max-w-[1150px] px-4 py-8">
							<aside className="mb-10 flex items-center">
								<Image src={jobIcon} alt="Jobs" width={20} className="mr-3 dark:invert" />
								<h2 className="mr-10 text-lg font-bold">
									<span>Software Developer</span>
								</h2>
								<p className="text-darkGray dark:text-gray-400">ID-301478</p>
							</aside>
							<div className="mb-10 flex flex-wrap items-center">
								<label
									htmlFor="manualSchedule"
									className="mr-6 flex cursor-pointer items-center overflow-hidden rounded bg-gray-50 pr-4 text-sm font-bold shadow-normal dark:bg-gray-600"
								>
									<div className="mr-4 flex h-[25px] w-[25px] items-center justify-center rounded-l border-r bg-white p-5 dark:border-gray-500 dark:bg-gray-700">
										<input
											type="radio"
											id="manualSchedule"
											name="setSchedule"
											checked={scheduleType == 0}
											onClick={() => setScheduleType(0)}
										/>
									</div>
									Schedule Manually
								</label>
								<label
									htmlFor="chooseSchedule"
									className="mr-6 flex cursor-pointer items-center overflow-hidden rounded bg-gray-50 pr-4 text-sm font-bold shadow-normal dark:bg-gray-600"
								>
									<div className="mr-4 flex h-[25px] w-[25px] items-center justify-center rounded-l border-r bg-white p-5 dark:border-gray-500 dark:bg-gray-700">
										<input
											type="radio"
											id="chooseSchedule"
											name="setSchedule"
											checked={scheduleType == 1}
											onClick={() => setScheduleType(1)}
										/>
									</div>
									Let the invite choose from my availability
								</label>
							</div>
							<form className="flex flex-wrap rounded-normal border" onSubmit={createEvent}>
								<div className="w-full border-r p-4 lg:max-w-[40%]">
									<div className="mb-4 rounded-normal border p-3">
										<h2 className="mb-3 font-bold">Applicant</h2>
										<div className="flex flex-wrap items-center rounded border p-2">
											<div className="w-[70px]">
												<Image
													src={
														process.env.NODE_ENV === "production"
															? process.env.NEXT_PUBLIC_PROD_BACKEND_BASE
															: process.env.NEXT_PUBLIC_DEV_BACKEND + applicantDetail.CandidateProfile[0].profile
													}
													alt="User"
													width={300}
													height={300}
													className="mx-auto h-[60px] w-[60px] rounded-full object-cover shadow-normal"
												/>
											</div>
											<div className="my-1 pl-2">
												<h5 className="mb-1 font-semibold">
													{" "}
													{applicantDetail.CandidateProfile[0]["first_name"]}{" "}
													{applicantDetail.CandidateProfile[0]["last_name"]}
												</h5>
												<p className="text-[12px] text-darkGray dark:text-gray-400">
													Product Manager - ID {applicantDetail.CandidateProfile[0]["id"]}
												</p>
											</div>
										</div>
									</div>
									<div className="rounded-normal border p-3">
										<div className="mb-2 flex items-start justify-between">
											<h2 className="font-bold">Interviewer</h2>
											<div className="mt-[-10px]">
												<Button btnStyle="sm" btnType="button" label="Add" handleClick={() => setSocialPopup(true)} />
											</div>
										</div>
										{assignedInterviewerList.map(({ email, name, role, profile }, i) => (
											<div
												className="relative mb-2 flex flex-wrap items-center overflow-hidden rounded border p-2 pr-[40px]"
												key={i}
											>
												<div className="w-[70px]">
													<Image
														src={
															process.env.NODE_ENV === "production"
																? process.env.NEXT_PUBLIC_PROD_BACKEND_BASE
																: process.env.NEXT_PUBLIC_DEV_BACKEND + profile
														}
														alt="User"
														width={300}
														height={300}
														className="mx-auto h-[60px] w-[60px] rounded-full object-cover shadow-normal"
													/>
												</div>
												<div className="my-1 pl-2">
													<h5 className="mb-1 font-semibold">{name}</h5>
													<p className="text-[12px] text-darkGray dark:text-gray-400">{role}</p>
												</div>
												<button
													type="button"
													className="absolute right-0 top-0 h-full w-[30px] bg-gray-200 text-darkGray hover:bg-red-500 hover:text-white"
													onClick={() =>
														setAssignedInterviewerList((prevList) =>
															prevList.filter(({ email: listEmail }) => listEmail != email)
														)
													}
												>
													<i className="fa-solid fa-trash-can"></i>
												</button>
											</div>
										))}
										{assignedInterviewerList.length == 0 && (
											<>
												<p className="text-sm text-darkGray dark:text-gray-400">No Interviewer Added</p>
											</>
										)}
									</div>
								</div>
								<div className="w-full p-4 lg:max-w-[60%]">
									<FormField
										id={"summary"}
										fieldType="input"
										inputType="text"
										label="Summary"
										value={newSchedule.summary}
										handleChange={handleNewSchedule}
										required
									/>
									<FormField
										id={"description"}
										fieldType="reactquill"
										label="Description"
										value={newSchedule.description}
										handleChange={handleNewSchedule}
									/>
									<FormField
										id={"platform"}
										fieldType="select"
										label="Platform"
										singleSelect
										value={newSchedule.platform}
										handleChange={handleNewSchedule}
										options={[{ name: "Google Meet" }, { name: "Telephonic" }]}
									/>

									<div className="mx-[-10px] flex flex-wrap">
										<div className="mb-4 w-full px-[10px] md:max-w-[50%]">
											<label className="mb-1 inline-block font-bold">Interview Duration</label>
											<div className="relative flex w-[280px] overflow-hidden rounded-normal border dark:border-gray-600">
												<label
													htmlFor="min15"
													className={
														"cursor-pointer border-r px-3 py-3 text-sm text-darkGray last:border-r-0 dark:border-gray-600 dark:text-gray-400" +
														" " +
														(interDuration == "15" ? "bg-gradDarkBlue text-white dark:text-white" : "")
													}
												>
													15 min
													<input
														type="radio"
														name="interDuration"
														id="min15"
														className="hidden"
														value={"15"}
														onChange={(e) => setInterDuration(e.target.value)}
													/>
												</label>
												<label
													htmlFor="min30"
													className={
														"cursor-pointer border-r px-3 py-3 text-sm text-darkGray last:border-r-0 dark:border-gray-600 dark:text-gray-400" +
														" " +
														(interDuration == "30" ? "bg-gradDarkBlue text-white dark:text-white" : "")
													}
												>
													30 min
													<input
														type="radio"
														name="interDuration"
														id="min30"
														className="hidden"
														value={"30"}
														onChange={(e) => setInterDuration(e.target.value)}
													/>
												</label>
												<label
													htmlFor="min45"
													className={
														"cursor-pointer border-r px-3 py-3 text-sm text-darkGray last:border-r-0 dark:border-gray-600 dark:text-gray-400" +
														" " +
														(interDuration == "45" ? "bg-gradDarkBlue text-white dark:text-white" : "")
													}
												>
													45 min
													<input
														type="radio"
														name="interDuration"
														id="min45"
														className="hidden"
														value={"45"}
														onChange={(e) => setInterDuration(e.target.value)}
													/>
												</label>
												<label
													htmlFor="min60"
													className={
														"cursor-pointer border-r px-3 py-3 text-sm text-darkGray last:border-r-0 dark:border-gray-600 dark:text-gray-400" +
														" " +
														(interDuration == "60" ? "bg-gradDarkBlue text-white dark:text-white" : "")
													}
												>
													60 min
													<input
														type="radio"
														name="interDuration"
														id="min60"
														className="hidden"
														value={"60"}
														onChange={(e) => setInterDuration(e.target.value)}
													/>
												</label>
											</div>
										</div>
									</div>
									<div className="mx-[-10px] flex flex-wrap">
										<div className="mb-4 w-full px-[10px] md:max-w-[50%]">
											<FormField
												id={"start"}
												fieldType="date"
												label="Start Time"
												singleSelect
												value={newSchedule.start}
												handleChange={handleNewSchedule}
												showTimeSelect
												showHours
												required
											/>
										</div>
										<div className="mb-4 w-full px-[10px] md:max-w-[50%]">
											<FormField
												id={"end"}
												fieldType="date"
												label="End Time"
												singleSelect
												value={newSchedule.end}
												handleChange={handleNewSchedule}
												showTimeSelect
												showHours
												required
											/>
										</div>
									</div>
									<div>
										<Button label="Send Invitation" btnType={"submit"} />
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</main>
			<Transition.Root show={socialPopup} as={Fragment}>
				<Dialog as="div" className="relative z-40" initialFocus={cancelButtonRef} onClose={setSocialPopup}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 z-10 overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel className="relative w-full transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left text-black shadow-xl transition-all dark:bg-gray-800 dark:text-white sm:my-8 sm:max-w-4xl">
									<div className="flex items-center justify-between bg-gradient-to-b from-gradLightBlue to-gradDarkBlue px-8 py-3 text-white">
										<h4 className="font-semibold leading-none">Add interviewers to this interview</h4>
										<button
											type="button"
											className="leading-none hover:text-gray-700"
											onClick={() => setSocialPopup(false)}
										>
											<i className="fa-solid fa-xmark"></i>
										</button>
									</div>
									<div className="p-8">
										<FormField
											fieldType="input"
											id={"search"}
											inputType="search"
											placeholder="Search"
											icon={<i className="fa-solid fa-magnifying-glass"></i>}
											handleChange={(e) => setInterviewerSearch(e.target.value)}
										/>
										<div className="overflow-x-auto">
											<table cellPadding={"0"} cellSpacing={"0"} className="w-full">
												<thead>
													<tr>
														{TeamTableHead.map((item, i) => (
															<th className="border-b px-3 py-2 text-left" key={i}>
																{item.title}
															</th>
														))}
													</tr>
												</thead>
												<tbody>
													{interviewerList
														.filter(({ email, role, name }: any) => {
															if (!email) return false;
															return (
																(email.toLowerCase().match(interviewerSearch) &&
																	email.toLowerCase().match(interviewerSearch).length > 0) ||
																(role &&
																	role.toLowerCase().match(interviewerSearch) &&
																	role.toLowerCase().match(interviewerSearch).length > 0) ||
																(name &&
																	name.toLowerCase().match(interviewerSearch) &&
																	name.toLowerCase().match(interviewerSearch).length > 0)
															);
														})
														.map(({ email, role, name, profile }, i) => (
															<tr key={i}>
																<td className="border-b px-3 py-2 text-sm">{name}</td>
																<td className="border-b px-3 py-2 text-sm">{role}</td>
																<td className="border-b px-3 py-2 text-sm">{email}</td>
																<td className="border-b px-3 py-2 text-right">
																	<input
																		type="checkbox"
																		checked={assignedInterviewerList?.find((interviewer) => interviewer.email == email)}
																		onChange={(e) =>
																			!e.target.checked
																				? setAssignedInterviewerList((prevList) =>
																						prevList.filter((interviewer) => interviewer.email !== email)
																				  )
																				: setAssignedInterviewerList((prevList) => [
																						...prevList,
																						{ email, role, name, profile }
																				  ])
																		}
																	/>
																</td>
															</tr>
														))}
												</tbody>
											</table>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
}
