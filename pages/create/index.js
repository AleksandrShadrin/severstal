import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import { useRef, useState, useContext } from "react";
import noteContext from "../../components/context/noteContext";
import { useRouter } from "next/router";

export default function CreatePage() {
	const [validTitle, setValidTitle] = useState(true);
	const [validContent, setValidContent] = useState(true);
	const [validDate, setValidDate] = useState(true);
	const router = useRouter();
	const context = useContext(noteContext);

	const titleInputRef = useRef();
	const contentInputRef = useRef();
	const dateRef = useRef();

	const data = context.notes;

	const checkContentField = () => {
		if (contentInputRef.current.value.length > 20) {
			setValidContent(true);
			return;
		}
		setValidContent(false);
	};
	const checkTitleField = () => {
		if (titleInputRef.current.value.length > 10) {
			setValidTitle(true);
			return;
		}
		setValidTitle(false);
	};
	const onSubmitHandler = (event) => {
		event.preventDefault();
		checkContentField();
		checkTitleField();
		setValidDate(!!dateRef.current.value);
		if (validTitle && setValidContent && dateRef.current.value) {
			context.addNote({
				date: new Date(dateRef.current.value),
				title: titleInputRef.current.value,
				content: contentInputRef.current.value,
			});
			router.push("/");
		}
	};
	return (
		<>
			<div className="mt-12 max-w-xl m-auto p-4 border-2 border-gray-100 rounded-md shadow-md">
				<form onSubmit={onSubmitHandler}>
					<div className="flex flex-col gap-6">
						<label className="Label" htmlFor="title">
							Заголовок
						</label>
						<Input
							onBlur={checkTitleField}
							id="title"
							ref={titleInputRef}
							valid={validTitle}
						></Input>
						<label className="Label" htmlFor="content">
							Содержимое
						</label>
						<TextArea
							onBlur={checkContentField}
							id="content"
							ref={contentInputRef}
							valid={validContent}
						></TextArea>
						<label className="Label" htmlFor="date">
							Дата
						</label>
						<Input
							onChange={() =>
								setValidDate(!!dateRef.current.value)
							}
							valid={validDate}
							type="date"
							id="date"
							ref={dateRef}
						></Input>
						<button className="px-2 py-2 transition-all duration-150 bg-sky-400 rounded-full text-center text-2xl text-white self-end hover:bg-sky-500">
							Создать заметку
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
