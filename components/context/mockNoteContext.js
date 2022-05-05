import data from "../../data/mock_data";

const addNote = (note) => {
	initialState.notes.push(note);
};

const initialState = {
	notes: data,
	addNote,
	changeNote: () => null,
};

export default initialState;
