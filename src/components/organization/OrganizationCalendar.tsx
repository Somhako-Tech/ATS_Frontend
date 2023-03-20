import Image from "next/image";
import Link from "next/link";
import userImg from "/public/images/user-image.png";
import { Fragment, useCallback, useEffect, useReducer, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FormField from "../FormField";

type DateAction = "setDate" | "nextMonth" | "previousMonth";

type DateUpdate = { action?: DateAction; value?: Date };

type Schedule = {
	summary: string;
	description: string;
	start: Date;
	end: Date;
};

function DaysOfMonth({
	currentDay,
	currentDate,
	setCurrentDay,
	pageDays,
	handleDateUpdate
}: {
	currentDay: Date;
	currentDate: Date;
	setCurrentDay: (newDate: Date) => void;
	pageDays: Array<Array<number>>;
	handleDateUpdate: (update: DateUpdate) => void;
}) {
	const handleDayClick = (day: number, dayType: number) => {
		//If the day is in the current month
		if (dayType === 1) {
			setCurrentDay(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
			return;
		}

		setCurrentDay(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1 * (dayType === 0 ? -1 : 1), day));
		handleDateUpdate({ action: dayType === 0 ? "previousMonth" : "nextMonth" });
	};

	const CalendarDay = ({
		handleDayClick,
		selected,
		dayType,
		day
	}: {
		handleDayClick: (selectedDay: number, dayType: number) => void;
		selected: boolean;
		dayType: number;
		day: number;
	}) => (
		<div className="group h-[100px] w-[calc(100%/7)] cursor-pointer border border-slate-100" key={day.toString()}>
			<div
				className={
					dayType !== 1
						? "flex h-full w-full items-center justify-center rounded-[35px] p-2 text-lg font-semibold text-slate-400  group-hover:bg-slate-400 group-hover:text-white"
						: "flex h-full w-full items-center justify-center rounded-[35px] p-2 text-lg font-semibold " +
						  (selected ? "bg-gradient-to-b from-gradLightBlue to-gradDarkBlue text-white" : "")
				}
				onClick={() => handleDayClick(day, dayType)}
			>
				{day}
			</div>
		</div>
	);

	return (
		<div className="flex flex-wrap p-3 pt-0">
			{pageDays.map((dayList, dayType) =>
				dayList.map((i: number) => (
					<CalendarDay
						handleDayClick={handleDayClick}
						selected={
							new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate()).getTime() ==
							new Date(currentDate.getFullYear(), currentDate.getMonth(), i).getTime()
						}
						dayType={dayType}
						day={i}
						key={i.toString()}
					/>
				))
			)}
		</div>
	);
}

function EventCard({
	jobTitle,
	jobId,
	platform,
	participants,
	date,
	meetingLink
}: {
	jobTitle: string;
	jobId: string;
	platform: string;
	participants: Array<any>;
	date: Date;
	meetingLink: string;
}) {
	const participantCards = participants.map((person: { name: string; role: string; userImg: string }, i) => (
		<div className="flex items-center py-3 last:border-b" key={i}>
			<Image src={person.userImg} alt="User" width={40} height={40} className="h-[40px] rounded-full object-cover" />
			<div className="w-[calc(100%-40px)] pl-3 text-sm">
				<h6 className="font-semibold">{person.name}</h6>
				<p className="text-darkGray">{person.role}</p>
			</div>
		</div>
	));

	const meetingIcon =
		platform == "Google Meet" ? <i className="fa-solid fa-video"></i> : <i className="fa-solid fa-phone"></i>;

	return (
		<div className="mb-4 overflow-hidden rounded-[10px] shadow">
			<div className="flex bg-gradient-to-b from-gradLightBlue to-gradDarkBlue p-3 text-white">
				<div className="w-[50%] pr-2">
					<h5 className="text-sm font-semibold">{jobTitle}</h5>
				</div>
				<div className="w-[50%]">
					<p className="mb-1 text-sm font-semibold">{jobId}</p>
					<span className="flex h-[16px] w-[16px] items-center justify-center rounded border border-violet-400 bg-gradient-to-b from-gradLightBlue to-gradDarkBlue text-[8px] text-white">
						<i className="fa-solid fa-video"></i>
					</span>
				</div>
			</div>
			<div className="bg-white p-3">
				<div className="mb-3">{participantCards}</div>
				<h4 className="mb-1 font-bold">Platform</h4>
				<div className="flex">
					<span className="mt-1 flex h-[16px] w-[16px] items-center justify-center rounded border border-violet-400 bg-gradient-to-b from-gradLightBlue to-gradDarkBlue text-[8px] text-white">
						{meetingIcon}
					</span>
					<div className="w-[calc(100%-16px)] pl-2 text-darkGray">
						<h6 className="font-semibold">{platform}</h6>
						<p className="my-1 text-sm">{date.toDateString()}</p>
						<Link
							href={meetingLink}
							target="_blank"
							className="inline-block rounded bg-gradient-to-b from-gradLightBlue to-gradDarkBlue py-[3px] px-3 text-[12px] leading-normal text-white"
						>
							Meet
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

function CreateNewSchedule({
	createScheduleOpen,
	setCreateScheduleOpen
}: {
	createScheduleOpen: boolean;
	setCreateScheduleOpen: (open: boolean) => void;
}) {
	return (
		<Transition.Root show={createScheduleOpen} as={Fragment}>
			<Dialog as="div" className="relative z-40" onClose={() => setCreateScheduleOpen(false)}>
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
							<Dialog.Panel className="relative w-[50%] transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left text-black shadow-xl transition-all dark:bg-gray-800 dark:text-white sm:my-8 sm:max-w-5xl">
								<div>
									<div>Schedule an ...</div>
									{/* <FormField label={"Start Date and Time"} type="date" />
									<FormField label={"End Date and Time"} /> */}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
export default function OrganizationCalendar() {
	const today = new Date(new Date().setUTCHours(0, 0, 0, 0));

	const [currentDay, setCurrentDay] = useState<Date>(today);

	const updateDate = (prevDate: Date, { action, value }: DateUpdate) => {
		if (action) {
			switch (action) {
				case "setDate":
					return value ? value : prevDate;
				case "nextMonth":
					return new Date(prevDate.getFullYear(), prevDate.getMonth() + 1);
				case "previousMonth":
					return new Date(prevDate.getFullYear(), prevDate.getMonth() - 1);
			}
		} else if (value) return value;

		return prevDate;
	};

	const [currentDate, handleDateUpdate] = useReducer(updateDate, today);

	const updateSchedule = (prevScheduleDate: Schedule, newScheduleDate: Schedule) => {
		return newScheduleDate;
	};

	const [newScheduleDate, handleNewScheduleDate] = useReducer(updateSchedule, {
		summary: "",
		description: "",
		start: new Date(),
		end: new Date()
	});

	const [createScheduleOpen, setCreateScheduleOpen] = useState(false);

	const getDays = useCallback((selectedDate: Date) => {
		const dayOffset = selectedDate.getDay();
		const daysOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
		const prevDaysOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDate();

		const prevDaysList = Array.from(Array(dayOffset).keys())
			.map((i) => prevDaysOfMonth - i)
			.reverse();

		const nextMonthDays = Array.from(Array(7 - ((prevDaysList.length + daysOfMonth) % 7)).keys()).map((i) => i + 1);

		const currentMonthDays = Array.from(Array(daysOfMonth).keys()).map((i) => i + 1);

		// console.log({ dayOffset, daysOfMonth, prevDaysList, currentMonthDays, nextMonthDays });

		return [prevDaysList, currentMonthDays, nextMonthDays];
	}, []);

	const [pageDays, setPageDays] = useState<Array<Array<number>>>(getDays(today));

	useEffect(() => {
		setPageDays(getDays(currentDate));
	}, [currentDate, getDays]);

	return (
		<div className="flex">
			<div className="w-[75%] bg-white">
				<div className="flex items-center justify-between px-6 py-4">
					<div>
						<h6 className="font-bold">
							{currentDate.toDateString().split(" ")[1] + ", " + currentDate.toDateString().split(" ")[3]}
						</h6>
						<button
							type="button"
							className="hover:text-gray-600"
							onClick={() => handleDateUpdate({ action: "setDate", value: today })}
						>
							Today
						</button>
					</div>
					<aside className="flex items-center">
						<button
							type="button"
							className="hover:text-gray-600"
							onClick={() => handleDateUpdate({ action: "previousMonth" })}
						>
							<i className="fa-solid fa-circle-chevron-left"></i>
						</button>
						<button
							type="button"
							className="ml-2 hover:text-gray-600"
							onClick={() => handleDateUpdate({ action: "nextMonth" })}
						>
							<i className="fa-solid fa-circle-chevron-right"></i>
						</button>
					</aside>
				</div>
				<div className="flex p-3 pb-0 text-sm">
					<div className="flex h-[60px] w-[calc(100%/6)] items-center justify-center p-2">
						<p className="font-bold">Sun</p>
					</div>
					<div className="flex h-[60px] w-[calc(100%/6)] items-center justify-center p-2">
						<p className="font-bold">Mon</p>
					</div>
					<div className="flex h-[60px] w-[calc(100%/6)] items-center justify-center p-2">
						<p className="font-bold">Tue</p>
					</div>
					<div className="flex h-[60px] w-[calc(100%/6)] items-center justify-center p-2">
						<p className="font-bold">Wed</p>
					</div>
					<div className="flex h-[60px] w-[calc(100%/6)] items-center justify-center p-2">
						<p className="font-bold">Thu</p>
					</div>
					<div className="flex h-[60px] w-[calc(100%/6)] items-center justify-center p-2">
						<p className="font-bold">Fri</p>
					</div>
					<div className="flex h-[60px] w-[calc(100%/6)] items-center justify-center p-2">
						<p className="font-bold">Sat</p>
					</div>
				</div>
				<DaysOfMonth
					currentDate={currentDate}
					currentDay={currentDay}
					setCurrentDay={setCurrentDay}
					handleDateUpdate={handleDateUpdate}
					pageDays={pageDays}
				/>
			</div>
			<div className="w-[25%] bg-lightBlue">
				<div className="p-4">
					<h6 className="font-bold">Events</h6>
				</div>
				<div className="h-[calc(100vh-100px)] overflow-y-auto p-4 pt-0">
					<EventCard
						jobTitle={"Software Developer"}
						jobId={"ID-573219"}
						platform={"Telephonic"}
						participants={[{ name: "Bethany Jackson", role: "Interviewer", userImg: userImg }]}
						date={new Date(2023, 1, 20, 10)}
						meetingLink={"https://meet.google.com/ytk-jphs-dug"}
					/>
					<EventCard
						jobTitle={"Software Developer"}
						jobId={"ID-573219"}
						platform={"Google Meet"}
						participants={[
							{ name: "Bethany Jackson", role: "Interviewer", userImg: userImg },
							{ name: "Bethany Jackson", role: "Interviewer", userImg: userImg }
						]}
						date={new Date(2023, 1, 20, 10)}
						meetingLink={"https://meet.google.com/ytk-jphs-dug"}
					/>
					<div className="mb-4 overflow-hidden rounded-[10px] shadow">
						<div className="flex bg-gradient-to-b from-gradLightBlue to-gradDarkBlue p-3 text-white">
							<div className="flex w-full flex-row items-center justify-between pr-2">
								<h5 className="text-sm font-semibold">Schedule Meeting</h5>
								<button type="button" onClick={() => setCreateScheduleOpen(true)}>
									<i className="fa-solid fa-calendar-plus"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<CreateNewSchedule createScheduleOpen={createScheduleOpen} setCreateScheduleOpen={setCreateScheduleOpen} />
		</div>
	);
}
