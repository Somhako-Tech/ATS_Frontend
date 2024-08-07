import Button from "@/components/Button";
import FormField from "@/components/FormField";
import Logo from "@/components/Logo";
import CandFooter from "@/components/candidate/footer";
import { useCarrierStore } from "@/utils/code";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { axiosInstance, axiosInstance2 } from "../api/axiosApi";
import moment from "moment";
import toastcomp from "@/components/toast";
import ThemeChange from "@/components/ThemeChange";
import ToggleLang from "@/components/ToggleLang";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useLangStore } from "@/utils/code";

export default function CandSchedule() {
	const { t } = useTranslation("common");
	const srcLang = useLangStore((state: { lang: any }) => state.lang);
	const orgdetail: any = useCarrierStore((state: { orgdetail: any }) => state.orgdetail);
	const [select, setSelected] = useState("");

	const [loader, setloader] = useState(true);
	const [finish, setfinish] = useState(false);
	const [email, setemail] = useState("");
	const [data, setdata] = useState({});

	const router = useRouter();

	const { refid } = router.query;

	async function loadInterviewDetail(refid: any) {
		await axiosInstance
			.get(`/gcal/slot/detail/${refid}/`)
			.then((res) => {
				// console.log("$", "res", res.data);
				setdata(res.data[0]);
				if (res.data[0]["vapplicant"]) {
					setemail(res.data[0]["vapplicant"]["applicant"]["email"]);
				}
				if (res.data[0]["capplicant"]) {
					setemail(res.data[0]["capplicant"]["user"]["email"]);
				}
				if (res.data[0]["applicant"]) {
					setemail(res.data[0]["applicant"]["email"]);
				}
				if (res.data[0]["selectedSlot"]) {
					if (res.data[0]["selectedSlot"] === res.data[0]["slot1"]) {
						setSelected("slot1");
						setfinish(true);
					}
					if (res.data[0]["selectedSlot"] === res.data[0]["slot2"]) {
						setSelected("slot2");
						setfinish(true);
					}
					if (res.data[0]["selectedSlot"] === res.data[0]["slot3"]) {
						setSelected("slot3");
						setfinish(true);
					}
					if (res.data[0]["selectedSlot"] === res.data[0]["slot4"]) {
						setSelected("slot4");
						setfinish(true);
					}
					if (res.data[0]["selectedSlot"] === res.data[0]["slot5"]) {
						setSelected("slot5");
						setfinish(true);
					}
				}
				setloader(false);
			})
			.catch((err) => {
				// console.log("$", "err", err);
				setdata({});
				loadInterviewDetail(refid);
			});
	}

	async function schduleInterviewCall() {
		setloader(true);
		const fd = new FormData();
		fd.append("selectedSlot", data[select]);
		fd.append("email", email);
		fd.append("start_time", moment(data[select]).format());
		fd.append("end_time", moment(data[select]).add(parseInt(data["duration"]), "minutes").format());
		fd.append("type", data["type"]);
		if (data["applicant"]) {
			fd.append("arefid", data["applicant"]["arefid"]);
			fd.append("jobpk", parseInt(data["applicant"]["job"]["id"]));
			fd.append(
				"title",
				`${data["type"][0].toUpperCase() + data["type"].slice(1)} with ${data["applicant"]["fname"]} ${
					data["applicant"]["lname"]
				} for ${data["applicant"]["job"]["jobTitle"]}`
			);
		}
		if (data["capplicant"]) {
			fd.append("arefid", data["capplicant"]["arefid"]);
			fd.append("jobpk", parseInt(data["capplicant"]["job"]["id"]));
			fd.append(
				"title",
				`${data["type"][0].toUpperCase() + data["type"].slice(1)} with ${data["capplicant"]["user"]["first_name"]} ${
					data["capplicant"]["user"]["last_name"]
				} for ${data["capplicant"]["job"]["jobTitle"]}`
			);
		}
		if (data["vapplicant"]) {
			fd.append("arefid", data["vapplicant"]["arefid"]);
			fd.append("jobpk", parseInt(data["vapplicant"]["job"]["id"]));
			fd.append(
				"title",
				`${data["type"][0].toUpperCase() + data["type"].slice(1)} with ${
					data["vapplicant"]["applicant"]["first_name"]
				} ${data["vapplicant"]["applicant"]["last_name"]} for ${data["vapplicant"]["job"]["jobTitle"]}`
			);
		}

		// for (let [key, value] of fd) {
		// 	// console.log("$", "fd", `${key}: ${value}`);
		// }
		await axiosInstance2
			.post(`/gcal/can/slot/update/${refid}/`, fd)
			.then((res) => {
				setloader(false);
				toastcomp(
					`${
						data["type"].length > 0 && data["type"][0].toUpperCase() + data["type"].slice(1)
					} Slot Selected Successfully`,
					"success"
				);
				loadInterviewDetail(refid);
			})
			.catch((err) => {
				setloader(false);
				// console.log("$", "err", err);
				toastcomp(
					`${
						data["type"].length > 0 && data["type"][0].toUpperCase() + data["type"].slice(1)
					}  Slot Not Selected Successfully`,
					"error"
				);
				loadInterviewDetail(refid);
			});
	}

	useEffect(() => {
		if (refid && refid.length > 0) {
			// setloader(false);
			loadInterviewDetail(refid);
		}
	}, [refid]);

	const getStartAndEndTime = (date: any, duration: any) => {
		const startTime = moment(date);
		const endTime = moment(date).add(parseInt(duration), "minutes");
		const start = startTime.format("hh:mm A");
		const end = endTime.format("hh:mm A");
		return `${start} to ${end}`;
		// // console.log("$", "-----");
		// // console.log("$", "date", date);
		// // console.log("$", "duration", duration);
		// // console.log("$", "startTime", startTime.format("DD/MM/YYYY hh:mm A"));
		// // console.log("$", "endTime", endTime.format("DD/MM/YYYY hh:mm A"));
		// // console.log("$", "start", start);
		// // console.log("$", "end", end);
	};
	return (
		<>
			<Head>
				<title>{t("Words.InterviewDetails")}</title>
			</Head>
			<main className="relative py-8">
				<div className="absolute right-2 top-5">
					<ThemeChange />
				</div>
				<div className="mx-auto w-full max-w-[800px] px-4">
					<div className="mb-4 text-center">
						<Logo width={180} />
					</div>
					<div className="rounded-large bg-white p-6 shadow-normal dark:bg-gray-800 md:px-12 md:py-8">
						{loader ? (
							<div className="absolute left-0 top-0 z-[1] flex h-[100vh] w-full cursor-pointer items-start justify-center bg-[rgba(0,0,0,0.1)] backdrop-blur-md">
								<div className="flex h-[100vh] flex-col items-center justify-center text-center">
									<i className="fa-solid fa-spinner fa-spin"></i>
									<p className="my-2 font-bold">Kindly hold on for a moment while we process your request.</p>
								</div>
							</div>
						) : (
							<>
								<h1 className="mb-6 text-3xl font-bold capitalize">
									{data["type"].length > 0 ? <>{data["type"]} Details</> : <>Interview Details</>}
								</h1>
								<div className="-mx-6 flex flex-wrap">
									<div className="flex w-full p-6 md:max-w-[50%]">
										<div className="flex h-[30px] w-[30px] items-center justify-center rounded bg-gradient-to-r from-[#5236FF] to-[#85C5FF] text-sm text-white">
											<i className="fa-solid fa-user"></i>
										</div>
										<div className="py-1 pl-6">
											<h6 className="mb-2 text-lg text-darkGray dark:text-gray-400">{t("Words.Interviewer")}</h6>
											<p>{data["user"] && data["user"]["email"] && data["user"]["email"]}</p>
										</div>
									</div>
									<div className="flex w-full p-6 md:max-w-[50%]">
										<div className="flex h-[30px] w-[30px] items-center justify-center rounded bg-gradient-to-r from-[#3CB8FE] to-[#67D2EA] text-sm text-white">
											<i className="fa-solid fa-user"></i>
										</div>
										<div className="py-1 pl-6">
											<h6 className="mb-2 text-lg text-darkGray dark:text-gray-400">{t("Words.EventDuration")}</h6>
											<p>{data["duration"] && data["duration"]} min</p>
										</div>
									</div>
									<div className="flex w-full p-6 md:max-w-[50%]">
										<div className="flex h-[30px] w-[30px] items-center justify-center rounded bg-gradient-to-r from-[#FF930F] to-[#FFB45B] text-sm text-white">
											<i className="fa-solid fa-user"></i>
										</div>
										<div className="py-1 pl-6">
											<h6 className="mb-2 text-lg text-darkGray dark:text-gray-400">{t("Words.JobTitle")}</h6>
											{data["applicant"] && data["applicant"]["job"] && data["applicant"]["job"]["jobTitle"] && (
												<>
													<p>{data["applicant"]["job"]["jobTitle"]}</p>
												</>
											)}
											{data["capplicant"] && data["capplicant"]["job"] && data["capplicant"]["job"]["jobTitle"] && (
												<>
													<p>{data["capplicant"]["job"]["jobTitle"]}</p>
												</>
											)}
											{data["vapplicant"] && data["vapplicant"]["job"] && data["vapplicant"]["job"]["jobTitle"] && (
												<>
													<p>{data["vapplicant"]["job"]["jobTitle"]}</p>
												</>
											)}
										</div>
									</div>
									<div className="flex w-full p-6 md:max-w-[50%]">
										<div className="flex h-[30px] w-[30px] items-center justify-center rounded bg-gradient-to-r from-[#F98442] to-[#FF9090] text-sm text-white">
											<i className="fa-solid fa-user"></i>
										</div>
										<div className="py-1 pl-6">
											<h6 className="mb-2 text-lg text-darkGray dark:text-gray-400">{t("Form.Platform")}</h6>
											<p className="capitalize">Google Meet</p>
										</div>
									</div>
								</div>
								<hr className="mb-4" />
								<div>
									<h6 className="mb-3 inline-block font-bold capitalize">
										Select Date and Time for {data["type"]} Call
									</h6>
									<div className="-mx-4 mb-2 flex flex-wrap">
										<div className="mb-4 w-[50%] px-4 md:max-w-[33.33%]">
											<label
												htmlFor="choosedate_1"
												className={`group cursor-pointer text-sm`}
												onClick={(e) => {
													if (!finish) {
														setSelected("slot1");
													}
												}}
											>
												{moment(data["slot1"]).format("DD MMMM YYYY")}
												<input
													type="text"
													value={getStartAndEndTime(data["slot1"], data["duration"])}
													id="choosedate_1"
													readOnly
													className={`mt-1 w-full cursor-pointer rounded-normal border border-borderColor p-3 text-sm focus:shadow-none focus:outline-none focus:ring-0 ${
														select === "slot1"
															? "bg-gradDarkBlue text-white"
															: "bg-transparent group-hover:bg-gradLightBlue group-hover:text-white"
													}`}
												/>
											</label>
										</div>
										<div className="mb-4 w-[50%] px-4 md:max-w-[33.33%]">
											<label
												htmlFor="choosedate_1"
												className="group cursor-pointer text-sm"
												onClick={(e) => {
													if (!finish) {
														setSelected("slot2");
													}
												}}
											>
												{moment(data["slot2"]).format("DD MMMM YYYY")}
												<input
													type="text"
													value={getStartAndEndTime(data["slot2"], data["duration"])}
													id="choosedate_1"
													readOnly
													className={`mt-1 w-full cursor-pointer rounded-normal border border-borderColor p-3 text-sm focus:shadow-none focus:outline-none focus:ring-0 ${
														select === "slot2"
															? "bg-gradDarkBlue text-white"
															: "bg-transparent group-hover:bg-gradLightBlue group-hover:text-white"
													}`}
												/>
											</label>
										</div>
										<div className="mb-4 w-[50%] px-4 md:max-w-[33.33%]">
											<label
												htmlFor="choosedate_1"
												className="group cursor-pointer text-sm"
												onClick={(e) => {
													if (!finish) {
														setSelected("slot3");
													}
												}}
											>
												{moment(data["slot3"]).format("DD MMMM YYYY")}
												<input
													type="text"
													value={getStartAndEndTime(data["slot3"], data["duration"])}
													id="choosedate_1"
													readOnly
													className={`mt-1 w-full cursor-pointer rounded-normal border border-borderColor p-3 text-sm focus:shadow-none focus:outline-none focus:ring-0 ${
														select === "slot3"
															? "bg-gradDarkBlue text-white"
															: "bg-transparent group-hover:bg-gradLightBlue group-hover:text-white"
													}`}
												/>
											</label>
										</div>
										<div className="mb-4 w-[50%] px-4 md:max-w-[33.33%]">
											<label
												htmlFor="choosedate_1"
												className="group cursor-pointer text-sm"
												onClick={(e) => {
													if (!finish) {
														setSelected("slot4");
													}
												}}
											>
												{moment(data["slot4"]).format("DD MMMM YYYY")}
												<input
													type="text"
													value={getStartAndEndTime(data["slot4"], data["duration"])}
													id="choosedate_1"
													readOnly
													className={`mt-1 w-full cursor-pointer rounded-normal border border-borderColor p-3 text-sm focus:shadow-none focus:outline-none focus:ring-0 ${
														select === "slot4"
															? "bg-gradDarkBlue text-white"
															: "bg-transparent group-hover:bg-gradLightBlue group-hover:text-white"
													}`}
												/>
											</label>
										</div>
										<div className="mb-4 w-[50%] px-4 md:max-w-[33.33%]">
											<label
												htmlFor="choosedate_1"
												className="group cursor-pointer text-sm"
												onClick={(e) => {
													if (!finish) {
														setSelected("slot5");
													}
												}}
											>
												{moment(data["slot5"]).format("DD MMMM YYYY")}
												<input
													type="text"
													value={getStartAndEndTime(data["slot5"], data["duration"])}
													id="choosedate_1"
													readOnly
													className={`mt-1 w-full cursor-pointer rounded-normal border border-borderColor p-3 text-sm focus:shadow-none focus:outline-none focus:ring-0 ${
														select === "slot5"
															? "bg-gradDarkBlue text-white"
															: "bg-transparent group-hover:bg-gradLightBlue group-hover:text-white"
													}`}
												/>
											</label>
										</div>
									</div>
									<hr className="mb-4" />
									<FormField
										fieldType="input"
										inputType="email"
										label={srcLang === "ja" ? "候補者の電子メール ID" : "Candidate Email Id"}
										value={email}
										readOnly
									/>
									<Button
										btnType="submit"
										label={`${finish ? t("Btn.AlreadyScheduled") : t("Btn.Schedule")}`}
										disabled={finish || loader}
										handleClick={schduleInterviewCall}
									/>
								</div>
							</>
						)}
					</div>
					<div className="pt-2 text-right">
						<ToggleLang />
					</div>
				</div>
				<CandFooter />
			</main>
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

CandSchedule.noAuth = true;
