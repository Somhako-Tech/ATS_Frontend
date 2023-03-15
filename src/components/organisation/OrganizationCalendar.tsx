import Image from "next/image";
import Link from "next/link";
import userImg from "/public/images/user-image.png";

export default function OrganizationCalendar() {
	return (
		<div className="flex">
			<div className="w-[75%] bg-white">
				<div className="flex items-center justify-between px-6 py-4">
					<h6 className="font-bold">January 19, 2023</h6>
					<aside className="flex items-center">
						<button type="button" className="hover:text-gray-600">
							<i className="fa-solid fa-circle-chevron-left"></i>
						</button>
						<button type="button" className="ml-2 hover:text-gray-600">
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
				<div className="flex flex-wrap p-3 pt-0">
					{Array(30).fill(
						<div className="group h-[100px] w-[calc(100%/7)] cursor-pointer border border-slate-100">
							<div className="flex h-full w-full items-center justify-center rounded-[35px] p-2 text-lg font-semibold group-hover:bg-primary group-hover:text-white">
								01
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="w-[25%] bg-lightBlue">
				<div className="p-4">
					<h6 className="font-bold">Events</h6>
				</div>
				<div className="max-h-[580px] overflow-y-auto p-4 pt-0">
					<div className="mb-4 overflow-hidden rounded-[10px] shadow">
						<div className="flex bg-gradient-to-b from-gradLightBlue to-gradDarkBlue p-3 text-white">
							<div className="w-[50%] pr-2">
								<h5 className="text-sm font-semibold">Software Developer</h5>
							</div>
							<div className="w-[50%]">
								<p className="mb-1 text-sm font-semibold">ID-573219</p>
								<span className="flex h-[16px] w-[16px] items-center justify-center rounded border border-violet-400 bg-gradient-to-b from-gradLightBlue to-gradDarkBlue text-[8px] text-white">
									<i className="fa-solid fa-phone"></i>
								</span>
							</div>
						</div>
						<div className="bg-white p-3">
							<div className="mb-3">
								{Array(2).fill(
									<div className="flex items-center py-3 last:border-b">
										<Image
											src={userImg}
											alt="User"
											width={40}
											height={40}
											className="h-[40px] rounded-full object-cover"
										/>
										<div className="w-[calc(100%-40px)] pl-3 text-sm">
											<h6 className="font-semibold">Bethany Jackson</h6>
											<p className="text-darkGray">Interviewer</p>
										</div>
									</div>
								)}
							</div>
							<h4 className="mb-1 font-bold">Platform</h4>
							<div className="flex">
								<span className="mt-1 flex h-[16px] w-[16px] items-center justify-center rounded border border-violet-400 bg-gradient-to-b from-gradLightBlue to-gradDarkBlue text-[8px] text-white">
									<i className="fa-solid fa-phone"></i>
								</span>
								<div className="w-[calc(100%-16px)] pl-2 text-darkGray">
									<h6 className="font-semibold">Telephonic</h6>
									<p className="my-1 text-sm">20-Jan-2023, 10:00 AM</p>
								</div>
							</div>
						</div>
					</div>
					<div className="mb-4 overflow-hidden rounded-[10px] shadow">
						<div className="flex bg-gradient-to-b from-gradLightBlue to-gradDarkBlue p-3 text-white">
							<div className="w-[50%] pr-2">
								<h5 className="text-sm font-semibold">Software Developer</h5>
							</div>
							<div className="w-[50%]">
								<p className="mb-1 text-sm font-semibold">ID-573219</p>
								<span className="flex h-[16px] w-[16px] items-center justify-center rounded border border-violet-400 bg-gradient-to-b from-gradLightBlue to-gradDarkBlue text-[8px] text-white">
									<i className="fa-solid fa-video"></i>
								</span>
							</div>
						</div>
						<div className="bg-white p-3">
							<div className="mb-3">
								{Array(2).fill(
									<div className="flex items-center py-3 last:border-b">
										<Image
											src={userImg}
											alt="User"
											width={40}
											height={40}
											className="h-[40px] rounded-full object-cover"
										/>
										<div className="w-[calc(100%-40px)] pl-3 text-sm">
											<h6 className="font-semibold">Bethany Jackson</h6>
											<p className="text-darkGray">Interviewer</p>
										</div>
									</div>
								)}
							</div>
							<h4 className="mb-1 font-bold">Platform</h4>
							<div className="flex">
								<span className="mt-1 flex h-[16px] w-[16px] items-center justify-center rounded border border-violet-400 bg-gradient-to-b from-gradLightBlue to-gradDarkBlue text-[8px] text-white">
									<i className="fa-solid fa-video"></i>
								</span>
								<div className="w-[calc(100%-16px)] pl-2 text-darkGray">
									<h6 className="font-semibold">Google Meet</h6>
									<p className="my-1 text-sm">20-Jan-2023, 10:00 AM</p>
									<Link
										href="https://meet.google.com/ytk-jphs-dug"
										target="_blank"
										className="inline-block rounded bg-gradient-to-b from-gradLightBlue to-gradDarkBlue py-[3px] px-3 text-[12px] leading-normal text-primary text-white"
									>
										Meet
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}