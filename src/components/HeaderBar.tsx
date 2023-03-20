export default function HeaderBar({ icon, title, handleBack }: any) {
	return (
		<div className="bg-lightBlue dark:bg-gray-600 py-1 px-8">
			<div className="mx-auto w-full max-w-[1100px]">
				<div className="flex flex-wrap items-center justify-start py-2">
					<button onClick={handleBack} className="justify-self-start text-darkGray dark:text-whit mr-5e">
						<i className="fa-solid fa-arrow-left text-2xl"></i>
					</button>
					<h2 className="text-xl font-bold">
						<span>{title}</span>
					</h2>
				</div>
			</div>
		</div>
	);
}
