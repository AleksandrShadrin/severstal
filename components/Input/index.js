import { forwardRef } from "react";

function Input(props, ref) {
	return (
		<input
			ref={ref}
			placeholder="Введите текст"
			className={`text-lg border-2 border-gray-200 rounded-md outline-none p-1 text-gray-700 ${
				props.valid === undefined ? "" : props.valid ? "" : "invalid"
			}`}
			{...props}
		></input>
	);
}

export default forwardRef(Input);
