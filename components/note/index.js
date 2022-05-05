const Note = ({ date, title, content }) => {
	return (
		<div className="m-auto p-4 rounded-md border-2 border-gray-50 max-w-xl shadow-md w-full sm:w-2/3 md:w-3/6 ">
			<div className="flex flex-col  ">
				<p className="text-center pb-4 text-2xl font-bold text-gray-500 ">
					{title}
				</p>
				<p className="text-xl text-gray-800 ">{content}</p>
				<p className="self-end mt-12 italic ">{date}</p>
			</div>
		</div>
	);
};

export default Note;
