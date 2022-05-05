import Link from "next/link";

const Header = () => {
	return (
		<header className="flex bg-green-600 py-2">
			<Link href="/">
				<div className="ml-8 text-white text-2xl font-bold cursor-pointer">
					Мои заметки
				</div>
			</Link>
		</header>
	);
};

export default Header;
