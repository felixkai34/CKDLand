import Home from "../Components/Home";
import Nav from "../Components/Nav";

export default function Main() {

	return (
		<main className="w-full min-h-screen bg-neutral-900 text-white">
			{/* Navigation */}
			<Nav />

			<Home/>

		</main>
	);
}
