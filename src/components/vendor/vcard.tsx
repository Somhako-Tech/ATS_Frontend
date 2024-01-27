//@collapse
import { Dialog, Menu, Switch, Tab, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import FormField from "../FormField";
import Button from "../Button";
import { useLangStore } from "@/utils/code";
import toastcomp from "../toast";

export default function VCard(props: any) {
	const srcLang = useLangStore((state: { lang: any }) => state.lang);
	const cancelButtonRef = useRef(null);
	const [companyDetails, setCompanyDetails] = useState(false);
	const [enabled, setEnabled] = useState(false);
	useEffect(() => {
		if (props.data["verified"] === true && props.data["onboard"] === true && props.data["activate"] === true) {
			setEnabled(true);
		}
	}, [props]);

	const [cname, setcname] = useState("");
	const [email, setemail] = useState("");
	const [phone, setphone] = useState("");
	const [aname, setaname] = useState("");
	const [phone2, setphone2] = useState("");
	const [lno, setlno] = useState("");
	const [add, setadd] = useState("");
	const [agreement, setagreement] = useState("");
	const [signature, setsignature] = useState("");
	const [file, setfile] = useState(false);
	const [asdate, setasdate] = useState("");
	const [aedate, setaedate] = useState("");

	const axiosInstanceAuth2 = props.axiosInstanceAuth2;

	async function loadVendorRegData(vid: string) {
		await axiosInstanceAuth2
			.get(`/vendors/vendor_data2/${vid}/`)
			.then(async (res: any) => {
				if (res.data.length > 0) {
					setemail(res.data[0]["email"]);
					setcname(res.data[0]["vendor"]["company_name"]);
					setaname(res.data[0]["vendor"]["agent_name"]);
					setphone(res.data[0]["vendor"]["contact_number"]);
					setphone2(res.data[0]["contact_2"]);
					setlno(res.data[0]["license_number"]);
					setadd(res.data[0]["headquater_address"]);
					setagreement(res.data[0]["vendor"]["agreement"]);
					setsignature(res.data[0]["signature"]);
					setasdate(res.data[0]["vendor"]["agreement_valid_start_date"]);
					setaedate(res.data[0]["vendor"]["agreement_valid_end_date"]);
				} else {
					setemail("");
					setcname("");
					setaname("");
					setphone("");
					setphone2("");
					setlno("");
					setadd("");
					setagreement("");
					setsignature("");
					setasdate("");
					setaedate("");
				}
			})
			.catch((err: any) => {
				console.log("!", err);
				setemail("");
				setcname("");
				setaname("");
				setphone("");
				setphone2("");
				setlno("");
				setadd("");
				setagreement("");
				setasdate("");
				setaedate("");
				setcurrentvid();
			});
	}

	useEffect(() => {
		console.log("!", companyDetails);
		if (companyDetails) {
			loadVendorRegData(props.data["vrefid"]);
		}
	}, [companyDetails]);

	const [accountDelete, setAccountDelete] = useState(false);
	const [jobFunction1, setjobFunction1] = useState(false);
	const [jobData, setjobData] = useState([]);
	const [currentvid, setcurrentvid] = useState();

	const [checkedCheckboxes, setCheckedCheckboxes] = useState({});
	const [bchecked, setBChecked] = useState({});

	const handleCheckboxChange = (checkboxId) => {
		setCheckedCheckboxes((prevCheckedCheckboxes) => ({
			...prevCheckedCheckboxes,
			[checkboxId]: !prevCheckedCheckboxes[checkboxId]
		}));
		console.log("@!!", "check", checkedCheckboxes);
	};

	async function loadActiveJobs(vid: string) {
		await axiosInstanceAuth2
			.get(`/vendors/vendor_data2/${vid}/`)
			.then(async (res: any) => {
				if (res.data.length > 0) {
					console.log("@@@", "loadActiveJobs step1 vendor ID", res.data[0]["vendor"]["id"]);
					setcurrentvid(res.data[0]["vendor"]["id"]);
					var vvid = res.data[0]["vendor"]["id"];
					await axiosInstanceAuth2
						.get(`/job/active-list-job/`)
						.then(async (res: any) => {
							console.log("@@@", "loadActiveJobs step2 jobs", res.data);
							setjobData(res.data);
							const jobs = res.data;
							var checkedState = {};
							for (let i = 0; i < jobs.length; i++) {
								if (jobs[i]["vendor"].includes(vvid)) {
									checkedState[jobs[i]["refid"]] = true;
								} else {
									checkedState[jobs[i]["refid"]] = false;
								}
							}
							console.log("@!!", "loadActiveJobs before check", checkedState);
							setCheckedCheckboxes(checkedState);
							setBChecked(checkedState);
						})
						.catch((err: any) => {
							console.log("@@@", "loadActiveJobs step2 jobs", err);
							setjobData([]);
							setcurrentvid(null);
						});
				} else {
					setcurrentvid(null);
					setjobData([]);
				}
			})
			.catch((err: any) => {
				console.log("@@@", "loadActiveJobs step1 vendor", err);
				setjobData([]);
				setcurrentvid(null);
			});
	}

	useEffect(() => {
		setCheckedCheckboxes({});
		setBChecked({});
		if (jobFunction1 === true) {
			loadActiveJobs(props.data["vrefid"]);
		}
	}, [jobFunction1]);

	async function saveJobsVendor() {
		console.log("@!!", "before", bchecked);
		console.log("@!!", "new", checkedCheckboxes);

		const differingPairs = Object.keys(bchecked)
			.filter((key) => bchecked[key] !== checkedCheckboxes[key])
			.map((key) => ({ key, value: checkedCheckboxes[key] }));

		console.log("@!!", "new after", differingPairs);

		const trueValuesKeys = differingPairs.filter((item) => item.value === true).map((item) => item.key);
		const falseValuesKeys = differingPairs.filter((item) => item.value === false).map((item) => item.key);

		console.log("@!!", "new after true", trueValuesKeys);
		console.log("@!!", "new after false", falseValuesKeys);

		if (trueValuesKeys.length > 0 || falseValuesKeys.length > 0) {
			const fd = new FormData();
			fd.append("trueValuesKeys", trueValuesKeys.join());
			fd.append("falseValuesKeys", falseValuesKeys.join());
			await axiosInstanceAuth2
				.post(`/job/active-vendors-change/${currentvid}/`, fd)
				.then(async (res: any) => {
					console.log("@!!", "active-vendors-change", res.data);
					setjobFunction1(false);
					toastcomp("vendors job updated successfully", "success");
				})
				.catch((err: any) => {
					console.log("@!!", "active-vendors-change", err);
					setjobFunction1(false);
					toastcomp("vendors job updated unsuccessfully", "error");
				});
		} else {
			setjobFunction1(false);
			toastcomp("vendors job can't found any change", "success");
		}
	}

	return (
		<>
			{props.fvendor ? (
				props.data["verified"] === true &&
				props.data["onboard"] === true && (
					<div className="mb-[30px] w-full px-[15px] md:max-w-[50%] lg:max-w-[33.3333%]">
						<div className="h-full rounded-normal bg-lightBlue p-4 shadow-lg dark:bg-gray-700">
							<div className="mb-2 flex items-start justify-between">
								<h4 className="my-1 mr-2 text-lg font-semibold">{props.data["company_name"]}</h4>
								<div className="flex items-center gap-2">
									<div
										className="cursor-pointer text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-300"
										onClick={() => setjobFunction1(true)}
									>
										<i className="fa-solid fa-square-plus"></i>
									</div>
									<div
										className="cursor-pointer text-red-400 hover:text-red-500"
										onClick={() => setAccountDelete(true)}
									>
										<i className="fa-solid fa-trash"></i>
									</div>
								</div>
							</div>
							<p className="font-semibold text-darkGray dark:text-gray-300">{props.data["agent_name"]}</p>
							<p className="mb-4 text-sm text-darkGray dark:text-gray-300">{props.data["email"]}</p>
							<div className="flex items-center justify-between">
								<Switch
									checked={enabled}
									onChange={(e) => {
										props.activateVendor(props.data["vrefid"], !enabled);
										setEnabled(!enabled);
									}}
									className={`${
										enabled ? "bg-green-500" : "bg-gray-400"
									} relative inline-flex h-5 w-10 items-center rounded-full`}
								>
									<span className="sr-only">Enable notifications</span>
									<span
										className={`${
											enabled ? "translate-x-6" : "translate-x-1"
										} inline-block h-3 w-3 transform rounded-full bg-white transition`}
									/>
								</Switch>
								<Button
									btnStyle="sm"
									label={srcLang === "ja" ? "詳細" : "Company Details"}
									btnType="button"
									handleClick={() => setCompanyDetails(true)}
								/>
							</div>
						</div>
					</div>
				)
			) : (
				<>
					{props.data["verified"] === true && props.data["onboard"] === false && (
						<div className="mb-[30px] w-full px-[15px] md:max-w-[50%] lg:max-w-[33.3333%]">
							<div className="h-full rounded-normal bg-lightBlue p-4 shadow-lg dark:bg-gray-700">
								<div className="mb-2 flex items-start justify-between">
									<h4 className="my-1 mr-2 text-lg font-semibold">{props.data["company_name"]}</h4>
									<Menu as="div" className="relative">
										<Menu.Button className="ml-2 w-6 py-2 text-darkGray dark:text-gray-400">
											<i className="fa-solid fa-ellipsis-vertical"></i>
										</Menu.Button>
										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items
												className={
													"absolute right-0 top-[100%] w-[200px] rounded bg-white py-1 text-darkGray shadow-normal dark:bg-gray-700 dark:text-gray-400"
												}
											>
												<Menu.Item>
													<button
														type="button"
														className="relative flex w-full cursor-pointer items-center px-4 py-2 text-left text-sm font-bold hover:bg-gray-100 dark:hover:bg-gray-900"
														onClick={() => setCompanyDetails(true)}
													>
														<i className="fa-solid fa-building mr-2"></i>{" "}
														{srcLang === "ja" ? "詳細" : "Company Details"}
													</button>
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</Menu>
								</div>
								<p className="font-semibold text-darkGray dark:text-gray-300">{props.data["agent_name"]}</p>
								<p className="mb-4 text-sm text-darkGray dark:text-gray-300">{props.data["email"]}</p>
								<div className="flex items-center justify-between">
									<p className="flex items-center text-sm text-darkGray dark:text-gray-400">
										<i className="fa-solid fa-circle-check mr-2 text-green-500"></i>
										Verified
									</p>
									<Button
										btnStyle="sm"
										label={srcLang === "ja" ? "登録" : "On Board"}
										btnType={"button"}
										handleClick={(e: any) => props.onBoardVendor(props.data["vrefid"])}
									/>
								</div>
							</div>
						</div>
					)}

					{props.data["verified"] === false && props.data["onboard"] === false && (
						<div className="mb-[30px] w-full px-[15px] md:max-w-[50%] lg:max-w-[33.3333%]">
							<div className="h-full rounded-normal bg-lightBlue p-4 shadow-lg dark:bg-gray-700">
								<div className="mb-2 flex items-start justify-between">
									<h4 className="my-1 mr-2 text-lg font-semibold">{props.data["company_name"]}</h4>
								</div>
								<p className="font-semibold text-darkGray dark:text-gray-300">{props.data["agent_name"]}</p>
								<p className="mb-4 text-sm text-darkGray dark:text-gray-300">{props.data["email"]}</p>
								<div className="flex items-center justify-between">
									<p className="flex items-center text-sm text-darkGray dark:text-gray-400">
										<i className="fa-solid fa-clock mr-2"></i>
										Pending
									</p>
									<Button btnStyle="sm" label={srcLang === "ja" ? "登録" : "On Board"} disabled />
								</div>
							</div>
						</div>
					)}
				</>
			)}

			<Transition.Root show={companyDetails} as={Fragment}>
				<Dialog as="div" className="relative z-40" initialFocus={cancelButtonRef} onClose={setCompanyDetails}>
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
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel className="relative w-full transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left text-black shadow-xl transition-all dark:bg-gray-800 dark:text-white sm:my-8 sm:max-w-2xl">
									<div className="flex items-center justify-between bg-gradient-to-b from-gradLightBlue to-gradDarkBlue px-8 py-3 text-white">
										<h4 className="flex items-center font-semibold leading-none">
											{srcLang === "ja" ? "詳細" : "Company Details"}
										</h4>
										<button
											type="button"
											className="leading-none hover:text-gray-700"
											onClick={() => setCompanyDetails(false)}
										>
											<i className="fa-solid fa-xmark"></i>
										</button>
									</div>
									<div className="p-8">
										<div className="-mx-3 flex flex-wrap">
											<div className="mb-4 w-full px-3 md:max-w-[50%]">
												<FormField
													label={srcLang === "ja" ? "会社名" : "Company Name"}
													fieldType="input"
													inputType="text"
													value={cname}
													readOnly
												/>
											</div>
											<div className="mb-4 w-full px-3 md:max-w-[50%]">
												<FormField
													label={srcLang === "ja" ? "メールアドレス" : "Email"}
													fieldType="input"
													inputType="email"
													required
													value={email}
													readOnly
												/>
											</div>
										</div>
										<FormField
											label={srcLang === "ja" ? "担当エージェント" : "Agent Name"}
											fieldType="input"
											inputType="text"
											value={aname}
											readOnly
										/>
										<div className="-mx-3 flex flex-wrap">
											<div className="mb-4 w-full px-3 md:max-w-[50%]">
												<FormField
													label={srcLang === "ja" ? "電話番号" : "Phone Number"}
													fieldType="input"
													inputType="text"
													value={phone}
													readOnly
												/>
											</div>
											<div className="mb-4 w-full px-3 md:max-w-[50%]">
												<FormField
													label={srcLang === "ja" ? "電話番号 (オプション)" : "Phone Number (Optional)"}
													fieldType="input"
													inputType="text"
													value={phone2}
													readOnly
												/>
											</div>
										</div>
										<div className="-mx-3 flex flex-wrap">
											<div className="mb-4 w-full px-3 md:max-w-[50%]">
												<FormField
													label={srcLang === "ja" ? "有料職業紹介事業登録番号" : "License Number"}
													fieldType="input"
													inputType="text"
													value={lno}
													readOnly
												/>
											</div>
											<div className="mb-4 w-full px-3 md:max-w-[50%]">
												<FormField
													label={srcLang === "ja" ? "本社所在地" : "Headquarter Location"}
													fieldType="input"
													inputType="text"
													value={add}
													readOnly
												/>
											</div>
										</div>
										<div className="-mx-3 flex flex-wrap items-start">
											<div className="mb-4 flex w-full px-3 md:max-w-[50%]">
												<div className="w-[50%] ">
													<h6 className="mb-1 font-bold">{srcLang === "ja" ? "契約書" : "Agreement"}</h6>
													<div className="group my-2 flex">
														<div className="">
															<i className="fa-solid fa-file-pdf text-[40px] text-red-500"></i>
															{/* <i className="fa-solid fa-file-word text-[40px] text-indigo-800"></i> */}
														</div>
														<div className="flex grow items-center pl-4">
															{/* <span className="flex grow cursor-pointer items-center pr-3 text-[12px] group-hover:underline">
																
																{agreement.split("/").pop()}
															</span> */}
															<Button
																label={srcLang === "ja" ? "みる" : "View"}
																btnStyle="sm"
																btnType="button"
																handleClick={() => {
																	window.open(agreement, "_blank");
																}}
															/>
														</div>
													</div>
												</div>
												<div className="w-[50%]">
													<h6 className="mb-1 font-bold">{srcLang === "ja" ? "契約書" : "signature"}</h6>
													<div className="group my-2 flex">
														<div className="">
															<i className="fa-solid fa-signature text-[40px] text-red-500"></i>
															{/* <i className="fa-solid fa-file-word text-[40px] text-indigo-800"></i> */}
														</div>
														<div className="flex grow items-center pl-4">
															{/* <span className="flex grow cursor-pointer items-center pr-3 text-[12px] group-hover:underline">
																{agreement.split("/").pop()}
															</span> */}
															<Button
																label={srcLang === "ja" ? "みる" : "View"}
																btnStyle="sm"
																btnType="button"
																handleClick={() => {
																	window.open(signature, "_blank");
																}}
															/>
														</div>
													</div>
												</div>
											</div>
											<div className="mb-4 flex w-full flex-wrap px-3 md:max-w-[50%]">
												{/* <h6 className="mb-1 w-full font-bold">Agreement Validity</h6> */}
												<div className="w-full pr-2 md:max-w-[50%]">
													<FormField
														label={srcLang === "ja" ? "開始日" : "Start Date"}
														fieldType="input"
														inputType="date"
														value={asdate}
														readOnly
													/>
												</div>
												<div className="w-full pl-2 md:max-w-[50%]">
													<FormField
														label={srcLang === "ja" ? "終了日" : "End Date"}
														fieldType="input"
														inputType="date"
														value={aedate}
														readOnly
													/>
												</div>
											</div>
										</div>
										<Button
											label={srcLang === "ja" ? "近い" : "Close"}
											btnType="button"
											handleClick={() => setCompanyDetails(false)}
										/>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
			<Transition.Root show={accountDelete} as={Fragment}>
				<Dialog as="div" className="relative z-40" initialFocus={cancelButtonRef} onClose={setAccountDelete}>
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
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel className="relative w-full transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left text-black shadow-xl transition-all dark:bg-gray-800 dark:text-white sm:my-8 sm:max-w-lg">
									<div className="flex items-center justify-between bg-gradient-to-b from-gradLightBlue to-gradDarkBlue px-8 py-3 text-white">
										<h4 className="flex items-center font-semibold leading-none">
											Are you sure to delete This Agent/Vendor
										</h4>
										<button
											type="button"
											className="leading-none hover:text-gray-700"
											onClick={() => setAccountDelete(false)}
										>
											<i className="fa-solid fa-xmark"></i>
										</button>
									</div>
									<div className="p-8">
										<h3 className="mb-4 text-center text-lg font-bold">
											{srcLang === "ja"
												? "アカウントを削除してもよろしいですか?"
												: "Are you sure want to delete this vendor ?"}
										</h3>
										<div className="flex flex-wrap justify-center">
											<div className="my-1 mr-4 last:mr-0">
												<Button
													btnStyle="gray"
													label={"No"}
													btnType="button"
													handleClick={() => setAccountDelete(false)}
												/>
											</div>
											<div className="my-1 mr-4 last:mr-0">
												<Button
													btnStyle="danger"
													label={"Yes"}
													btnType="button"
													handleClick={() => {
														props.delAccount(props.data["vrefid"]).then(() => setAccountDelete(false));
													}}
												/>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
			<Transition.Root show={jobFunction1} as={Fragment}>
				<Dialog as="div" className="relative z-40" initialFocus={cancelButtonRef} onClose={setjobFunction1}>
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
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel className="relative w-full transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left text-black shadow-xl transition-all dark:bg-gray-800 dark:text-white sm:my-8 sm:max-w-lg">
									<div className="flex items-center justify-between bg-gradient-to-b from-gradLightBlue to-gradDarkBlue px-8 py-3 text-white">
										<h4 className="flex items-center font-semibold leading-none">Jobs for Agent</h4>
										<button
											type="button"
											className="leading-none hover:text-gray-700"
											onClick={() => setjobFunction1(false)}
										>
											<i className="fa-solid fa-xmark"></i>
										</button>
									</div>
									<div className="p-8">
										<div className="mb-4 flex flex-col ">
											{jobData && jobData.length > 0 ? (
												<>
													<div className="mb-2 flex justify-between gap-2 border-b-2 border-borderColor">
														<span>Job Title (refid)</span>
														<span>Active</span>
													</div>
													{jobData.map((data, i) => (
														<div className="mb-1 flex justify-between gap-2" key={i}>
															<span>
																{data["jobTitle"]} ({data["refid"]})
															</span>
															<Switch
																checked={checkedCheckboxes[data.refid] || false}
																onChange={() => handleCheckboxChange(data.refid)}
																className={`${
																	checkedCheckboxes[data.refid] ? "bg-green-500" : "bg-gray-400"
																} relative inline-flex h-5 w-10 items-center rounded-full`}
															>
																<span className="sr-only">Enable notifications</span>
																<span
																	className={`${
																		checkedCheckboxes[data.refid] ? "translate-x-6" : "translate-x-1"
																	} inline-block h-3 w-3 transform rounded-full bg-white transition`}
																/>
															</Switch>
														</div>
													))}
												</>
											) : (
												<>
													<h3>No Jobs</h3>
												</>
											)}
										</div>

										<div className="flex flex-wrap justify-center">
											<div className="my-1 mr-4 last:mr-0">
												<Button
													btnStyle="gray"
													label={"Close"}
													btnType="button"
													handleClick={() => setjobFunction1(false)}
												/>
											</div>
											<div className="my-1 mr-4 last:mr-0">
												<Button
													btnStyle="success"
													label={"Save"}
													btnType="button"
													// handleClick={() => {
													// 	props.delAccount(props.data["vrefid"]).then(() => setjobFunction1(false));
													// }}
													handleClick={() => saveJobsVendor()}
												/>
											</div>
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
