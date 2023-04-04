import OrgSideBar from "@/components/organization/SideBar";
import OrgTopBar from "@/components/organization/TopBar";
import Head from "next/head";
import Image from "next/image";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { useRouter } from "next/router";
import integrationIcon from "/public/images/icons/integration.png";
import FormField from "@/components/FormField";
import Button from "@/components/Button";

export default function Vendors() {
	const router = useRouter();
    const cancelButtonRef = useRef(null);
    const [addGroups, setAddGroups] = useState(false);
	const tabHeading_1 = [
		{
			title: "On Board"
		},
		{
			title: "Vendors List"
		}
	];
	const tabHeading_2 = [
		{
			title: "New Vendor",
			icon: <i className="fa-solid fa-user-plus"></i>
		},
		{
			title: "Pending Vendors",
			icon: <i className="fa-solid fa-clock"></i>
		}
	];
	return (
		<>
			<Head>
				<title>Vendors</title>
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
						<div className="py-4">
							<div className="mx-auto mb-4 flex w-full max-w-[1100px] flex-wrap items-center justify-start py-2 px-4">
								<button
									onClick={() => router.back()}
									className="mr-10 justify-self-start text-darkGray dark:text-gray-400"
								>
									<i className="fa-solid fa-arrow-left text-2xl"></i>
								</button>
								<h2 className="flex items-center text-xl font-bold">
									<div className="mr-4 flex h-[45px] w-[45px] items-center justify-center rounded bg-[#B2E3FF] p-3">
										<Image src={integrationIcon} alt="Active Job" height={20} />
									</div>
									<span>Vendors</span>
								</h2>
							</div>
							<Tab.Group>
								<div className={"border-b px-4"}>
									<Tab.List className={"mx-auto w-full max-w-[950px]"}>
										{tabHeading_1.map((item, i) => (
											<Tab key={i} as={Fragment}>
												{({ selected }) => (
													<button
														className={
															"mr-16 border-b-4 py-2 font-semibold focus:outline-none" +
															" " +
															(selected
																? "border-primary text-primary"
																: "border-transparent text-darkGray dark:text-gray-400")
														}
													>
														{item.title}
													</button>
												)}
											</Tab>
										))}
									</Tab.List>
								</div>
								<Tab.Panels className={"mx-auto w-full max-w-[980px] px-4 py-8"}>
									<Tab.Panel>
										<Tab.Group>
											<Tab.List className={"mb-6 border-b"}>
												{tabHeading_2.map((item, i) => (
													<Tab key={i} as={Fragment}>
														{({ selected }) => (
															<button
																className={
																	"mr-6 inline-flex items-center border-b-4 py-2 px-4 font-semibold focus:outline-none" +
																	" " +
																	(selected
																		? "border-primary text-primary"
																		: "border-transparent text-darkGray dark:text-gray-400")
																}
															>
																<div className="mr-2">{item.icon}</div>
																{item.title}
															</button>
														)}
													</Tab>
												))}
											</Tab.List>
											<Tab.Panels>
												<Tab.Panel>
													<div className="-mx-3 flex flex-wrap">
														<div className="mb-4 w-full px-3 md:max-w-[50%]">
															<FormField label="Company Name" fieldType="input" inputType="text" />
														</div>
														<div className="mb-4 w-full px-3 md:max-w-[50%]">
															<FormField label="Email ID" fieldType="input" inputType="email" required />
														</div>
													</div>
													<div className="-mx-3 flex flex-wrap">
														<div className="mb-4 w-full px-3 md:max-w-[50%]">
															<FormField label="Contact Number" fieldType="input" inputType="text" />
														</div>
														<div className="mb-4 w-full px-3 md:max-w-[50%]">
															<FormField label="Agent Name" fieldType="input" inputType="text" />
														</div>
													</div>
													<FormField label="Message" fieldType="textarea" />
													<div className="-mx-3 flex flex-wrap items-start">
														<div className="mb-4 w-full px-3 md:max-w-[50%]">
                                                            <h6 className="mb-1 font-bold">Agreement</h6>
                                                            <div className="min-h-[45px] relative w-full p-3 rounded-normal border border-borderColor dark:border-gray-600 text-sm dark:bg-gray-700 focus:bg-red-500 pr-9">
                                                                <input type="file" className="cursor-pointer absolute w-full h-full left-0 top-0 opacity-0 z-10" />
                                                                <span className="absolute right-3 top-[12px] text-lightGray">
                                                                    <i className="fa-solid fa-paperclip"></i>
                                                                </span>
                                                                <span className="absolute left-5 top-[12px] text-darkGray dark:text-gray-400">Pdf, Docx etc...</span>
                                                            </div>
                                                            <div className="flex my-2">
                                                                <div className="">
                                                                    <i className="fa-solid fa-file-pdf text-[50px] text-red-500"></i>
                                                                    {/* <i className="fa-solid fa-file-word text-[50px] text-indigo-800"></i> */}
                                                                </div>
                                                                <div className="grow pl-4 flex flex-col justify-between">
                                                                    <div className="flex items-center justify-between text-[12px]">
                                                                        <span className="w-[50%] flex items-center"> 
                                                                            <small className="clamp_1 mr-2">Agent Agreement</small>
                                                                            (4.5MB)
                                                                        </span>
                                                                        <aside>
                                                                            <button type="button" className="text-primary hover:text-underline" title="View">
                                                                                <i className="fa-solid fa-eye"></i>
                                                                            </button>
                                                                            <button type="button" className="text-red-500 hover:text-underline ml-4" title="Delete">
                                                                                <i className="fa-solid fa-trash"></i>
                                                                            </button>
                                                                        </aside>
                                                                    </div>
                                                                    <div className="relative pt-4">
                                                                        <div className="bg-gray-100 w-full h-2 rounded border relative overflow-hidden">
                                                                            <span className="absolute left-0 top-0 w-full h-full bg-primary transition-all" style={{width: '60%'}}></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
														</div>
														<div className="mb-4 w-full px-3 md:max-w-[50%] flex flex-wrap">
                                                            <h6 className="mb-1 font-bold w-full">Agreement Validity</h6>
															<div className="w-full md:max-w-[50%] pr-2">
                                                                <FormField
                                                                    id={"start"}
                                                                    fieldType="date"
                                                                    placeholder="Start Time"
                                                                    singleSelect
                                                                    showTimeSelect
                                                                    showHours
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="w-full md:max-w-[50%] pl-2">
                                                                <FormField
                                                                    id={"end"}
                                                                    fieldType="date"
                                                                    placeholder="End Time"
                                                                    singleSelect
                                                                    showTimeSelect
                                                                    showHours
                                                                    required
                                                                />
                                                            </div>
														</div>
													</div>
                                                    <Button label="Send Agreement" btnType="button" handleClick={() => setAddGroups(true)} />
												</Tab.Panel>
												<Tab.Panel>BB</Tab.Panel>
											</Tab.Panels>
										</Tab.Group>
									</Tab.Panel>
									<Tab.Panel>B</Tab.Panel>
								</Tab.Panels>
							</Tab.Group>
						</div>
					</div>
				</div>
			</main>
            <Transition.Root show={addGroups} as={Fragment}>
				<Dialog as="div" className="relative z-40" initialFocus={cancelButtonRef} onClose={setAddGroups}>
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
								<Dialog.Panel className="relative w-full transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left text-black shadow-xl transition-all dark:bg-gray-800 dark:text-white sm:my-8 sm:max-w-2xl">
									<div className="flex items-center justify-between bg-gradient-to-b from-gradLightBlue to-gradDarkBlue px-8 py-3 text-white">
										<h4 className="flex items-center font-semibold leading-none">
											Add Group
										</h4>
										<button
											type="button"
											className="leading-none hover:text-gray-700"
											onClick={() => setAddGroups(false)}
										>
											<i className="fa-solid fa-xmark"></i>
										</button>
									</div>
									<div className="p-8">
                                        hghgc
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