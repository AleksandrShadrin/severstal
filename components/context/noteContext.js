import { createContext } from "react";

const initialState = {
	notes: [],
	addNote: () => null,
	changeNote: () => null,
	update: () => null,
	deleteNote: () => null,
};
const noteContext = createContext(initialState);

export default noteContext;
