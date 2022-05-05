import { forwardRef } from "react";

function TextArea(props, ref) {
	return (
		<textarea
			ref={ref}
			placeholder="Введите текст"
			className={`text-lg border-2 border-gray-200 rounded-md outline-none p-1 text-gray-700 resize-y ${
				props.valid === undefined ? "" : props.valid ? "" : "invalid"
			}`}
			{...props}
		></textarea>
	);
}

export default forwardRef(TextArea);
