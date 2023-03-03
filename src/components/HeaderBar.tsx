export default function HeaderBar({ icon, title, handleBack }: any) {
	return (
		<div className="rounded-t-lg bg-white py-5 drop-shadow-md dark:bg-gray-800">
			<div className="mx-auto w-full max-w-[1100px]">
				<div className="flex flex-wrap items-center justify-start py-2 text-gray-800">
					<button onClick={handleBack} className="justify-self-start">
						<i className="fa-solid fa-arrow-left text-3xl"></i>
					</button>
					<div className="ml-20 text-2xl font-normal text-slate-600">
						<span>{title}</span>
					</div>
				</div>
			</div>
		</div>
	);
}