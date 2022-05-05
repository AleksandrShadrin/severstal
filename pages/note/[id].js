import Note from "../../components/note";
import axios from "axios";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import { useState, useContext } from "react";
import noteContext from "../../components/context/noteContext";
import { useRouter } from "next/router";

export async function getStaticPaths() {
	const uri =
		"https://severstal-7dd9c-default-rtdb.firebaseio.com/Notes.json";
	const response = await axios.get(uri);
	if (response.status !== 200) return;
	const transformedData = Object.keys(response.data).map((key) =>
		!response.data[key]
			? null
			: {
					params: { id: key },
			  }
	);
	const paths = transformedData.filter((entity) => (entity ? true : false));
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const { id } = params;
	const uri = `https://severstal-7dd9c-default-rtdb.firebaseio.com/Notes/${id}.json`;
	const response = await axios.get(uri);
	if (response.status !== 200)
		return {
			notFound: true,
		};

	return {
		props: {
			note: {
				...response.data,
				date: new Date(response.data.date).toISOString().split("T")[0],
				id: id,
			},
		},
	};
}

export default function SingleNote({ note: { title, content, date, id } }) {
	const [titleField, setTitleField] = useState(title);
	const [contentField, setContentField] = useState(content);
	const [dateField, setDateField] = useState(date);
	const router = useRouter();
	const context = useContext(noteContext);
	const onSubmitHandler = async (e) => {
		e.preventDefault();
		const valid = await context.changeNote({
			title: titleField,
			content: contentField,
			date: new Date(dateField),
			id,
		});
		if (valid) {
			router.push("/");
		}
	};

	return (
		<>
			<div className="pt-12">
				<Note
					title={titleField}
					date={dateField}
					content={contentField}
				></Note>
			</div>
			<div className="mt-12 max-w-xl m-auto p-4 border-2 border-gray-100 rounded-md shadow-md">
				<form onSubmit={onSubmitHandler}>
					<div className="flex flex-col gap-6">
						<label className="Label" htmlFor="title">
							Заголовок
						</label>
						<Input
							id="title"
							onChange={(e) => setTitleField(e.target.value)}
							value={titleField}
						/>
						<label className="Label" htmlFor="content">
							Содержимое
						</label>
						<TextArea
							id="content"
							onChange={(e) => setContentField(e.target.value)}
							value={contentField}
						></TextArea>
						<label className="Label" htmlFor="date">
							Дата
						</label>
						<Input
							type="date"
							id="date"
							onChange={(e) => setDateField(e.target.value)}
							value={dateField}
						></Input>
						<button className="px-2 py-2 transition-all duration-150 bg-amber-400 rounded-full text-center text-2xl text-white self-end hover:bg-amber-500">
							Обновить заметку
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
