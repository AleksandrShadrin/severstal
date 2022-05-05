import Link from "next/link";
import { useContext, useState } from "react";
import noteContext from "../components/context/noteContext";
import Fallback from "../components/Fallback";
export default function Home() {
	const context = useContext(noteContext);
	const data = context.notes;
	const [showFallback, setShowFallback] = useState(false);
	const [id, setId] = useState(null);
	const del = () => {
		if (!id) return;
		context.deleteNote(id);
	};
	const onButtonClickHandler = (id) => {
		return () => {
			setShowFallback(true);
			setId(id);
		};
	};

	return (
		<>
			<div className="mb-12 grid grid-cols-1 px-6 mt-6 align-center gap-6 sm:gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
				<Link href="/create" passHref>
					<a className="block min-w-fit text-center bottom-12 right-12 z-50 cursor-pointer p-6 bg-green-500 text-white rounded-full text-xl font-bold hover:bg-green-600 sm:fixed">
						Добавить заметку
					</a>
				</Link>
				{data.map(({ title, date, content, id }) => {
					return (
						<div key={id}>
							<button
								onClick={onButtonClickHandler(id)}
								className="relative left-full top-4 -translate-x-[120%] translate-y-full z-50 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full"
							>
								[X]
							</button>
							<div
								key={id}
								className="flex overflow-hidden flex-col border-2 p-4 border-slate-100 rounded-md shadow-md transition-all duration-150 group hover:bg-blue-500 hover:border-indigo-500"
							>
								<Link href={`/note/${id}`} passHref>
									<a>
										<div className="flex justify-between items-center">
											<p className="text-center pb-4 text-2xl font-bold text-gray-500 group-hover:text-white">
												{title}
											</p>
										</div>
										<p className="text-xl truncate text-gray-800 group-hover:text-white">
											{content}
										</p>
										<p className="self-end mt-12 italic group-hover:text-white">
											{date.toLocaleDateString()}
										</p>
									</a>
								</Link>
							</div>
						</div>
					);
				})}
			</div>
			{showFallback && (
				<Fallback setShowFallback={setShowFallback} del={del} />
			)}
		</>
	);
}
