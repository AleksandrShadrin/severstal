function shortcut(str, length) {
	return str.slice(0, length) + (str.length > length ? "..." : "");
}

export default shortcut;
