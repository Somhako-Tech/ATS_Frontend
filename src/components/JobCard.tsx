import { useState } from "react";

export default function JobCard({ job, handleView }: any) {
	const [starred, setStarred] = useState(false);

	return (
		<div className="max-h-[250px] w-auto max-w-md rounded-xl bg-white p-5 shadow-xl dark:bg-slate-700 dark:text-white">
			<div className="mb-5 flex flex-row justify-between">
				<div className="flex flex-row items-center justify-between gap-5">
					<i
						className={starred ? "fa-solid fa-star text-yellow-400" : "fa-solid fa-star text-slate-400"}
						onClick={() => setStarred((prev) => !prev)}
					/>
					<h1 className="text-md font-bold ">{job.job_title}</h1>
				</div>
				<div className="flex flex-row items-center justify-between gap-6 text-slate-400">
					<i className="fa-solid fa-copy" />
					<i className="fa-solid fa-ellipsis-vertical" />
				</div>
			</div>
			<div className="mb-5 flex flex-row items-center justify-start gap-2 text-gray-500 dark:text-white">
				<h1>{job.worktype}</h1>
				{" • "}
				<h1>{job.employment_type}</h1>
			</div>
			<div className="mb-5 flex flex-row items-center justify-start gap-10 ">
				<div className="flex flex-col">
					<h1 className="text-gray-500 dark:text-white">Total Candidates</h1>
					<h1 className="text-md font-bold">0</h1>
				</div>
				<h1 className="text-5xl font-thin text-gray-600">|</h1>
				<div className="flex flex-col">
					<h1 className="text-gray-500 dark:text-white">Active Candidates</h1>
					<h1 className="text-md font-bold">0</h1>
				</div>
				<h1 className="text-5xl font-thin text-gray-600">|</h1>
				<div className="flex flex-col">
					<h1 className="text-gray-500 dark:text-white">Job ID</h1>
					<h1 className="text-md font-bold">0</h1>
				</div>
			</div>
			<div className="flex flex-row items-center justify-end">
				<button
					className="rounded-lg border p-2 text-gray-700 dark:text-white"
					type="button"
					onClick={() => handleView(job)}
				>
					View Job
				</button>
			</div>
		</div>
	);
}
