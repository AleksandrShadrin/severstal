import "../styles/globals.css";
import Header from "../components/Header";
import NoteContext from "../components/context/noteContext";
import { useEffect, useState } from "react";
import axios from "axios";

function MyApp({ Component, pageProps }) {
	const [data, setData] = useState([]);
	const addNote = async (note) => {
		const uri =
			"https://severstal-7dd9c-default-rtdb.firebaseio.com/Notes.json";
		const response = await axios.post(uri, {
			title: note.title,
			content: note.content,
			date: note.date.toDateString(),
		});
		if (response.status === 200) {
			setData((prevState) => [...prevState, note]);
		}
	};
	const changeNote = async (note) => {
		const uri = `https://severstal-7dd9c-default-rtdb.firebaseio.com/Notes/${note.id}.json`;
		const response = await axios.put(uri, {
			title: note.title,
			content: note.content,
			date: note.date.toDateString(),
		});
		if (response.status === 200) {
			const selectedNote = data.find((entity) => entity.id === note.id);
			selectedNote.title = note.title;
			selectedNote.content = note.content;
			selectedNote.date = note.date;
			return true;
		}
	};

	const deleteNote = async (id) => {
		const uri = `https://severstal-7dd9c-default-rtdb.firebaseio.com/Notes/${id}.json`;
		const response = await axios.delete(uri);
		if (response.status === 200) {
			setData((prevState) => {
				const newState = prevState.filter((entity) => entity.id != id);
				return newState;
			});
			return true;
		}
	};

	useEffect(() => {
		const uri =
			"https://severstal-7dd9c-default-rtdb.firebaseio.com/Notes.json";

		(async () => {
			const response = await axios.get(uri);

			if (response.status !== 200) return;
			const transformedData = Object.keys(response.data).map((key) =>
				!response.data[key]
					? null
					: {
							...response.data[key],
							date: new Date(response.data[key]?.date),
							id: key,
					  }
			);
			const filteredData = transformedData.filter((entity) =>
				entity ? true : false
			);
			setData(filteredData);
		})();
	}, [data.length]);

	return (
		<NoteContext.Provider
			value={{ notes: data, addNote, changeNote, deleteNote }}
		>
			<Header />
			<Component {...pageProps} />
		</NoteContext.Provider>
	);
}

export default MyApp;
