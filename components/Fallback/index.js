export default function Fallback(props) {
	return (
		<>
			<div
				onClick={() => {
					props.setShowFallback(false);
				}}
				className="flex justify-center items-center absolute z-50 top-0 left-0 h-screen w-full bg-black bg-opacity-30"
			></div>
			<div className=" min-w-fit fixed top-1/2 right-1/2 -translate-y-full translate-x-1/2 z-50 flex flex-col gap-8 bg-white border-2 p-8 rounded-md border-slate-200">
				<div className="text-2xl ">
					Вы действительно хотите удалить заметку ?
				</div>
				<div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
					<button
						onClick={() => {
							props.del();
							props.setShowFallback(false);
						}}
						className="text-lg w-3/4 text-white py-4 transition-all duration-150 px-12 rounded-full border-red-600 bg-rose-600 hover:bg-rose-700"
					>
						Да
					</button>
					<button
						onClick={() => {
							props.setShowFallback(false);
						}}
						className="text-lg w-3/4 text-white py-4 transition-all duration-150 px-12 rounded-full bg-emerald-500  hover:bg-emerald-600"
					>
						Нет
					</button>
				</div>
			</div>
		</>
	);
}
