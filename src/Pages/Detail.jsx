import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "../Components/Nav";
import { FaArrowRight } from "react-icons/fa";
import datas from "../Data.json";

export default function Detail() {
	const id = useParams().Id; // Retrieve the series ID from URL
	const [tvDetails, setTvDetails] = useState(null);
	const [cast, setCast] = useState([]);
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const api_key = "9eb272b130d9d436d542f8fc2662583d";

	useEffect(() => {
		// Fetch TV series details, cast, and photos
		const fetchTvData = async () => {
			try {
				// Fetch TV details
				const tvResponse = await fetch(
					`https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=en-US`
				);
				const tvData = await tvResponse.json();
				setTvDetails(tvData);

				// Fetch cast
				const castResponse = await fetch(
					`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${api_key}&language=en-US`
				);
				const castData = await castResponse.json();
				setCast(castData.cast.slice(0, 6)); // Take top 6 cast members

				// Fetch photos
				const photosResponse = await fetch(
					`https://api.themoviedb.org/3/tv/${id}/images?api_key=${api_key}`
				);
				const photosData = await photosResponse.json();
				setPhotos(photosData.backdrops.slice(0, 6)); // Take top 6 photos

				setLoading(false);
			} catch (error) {
				setLoading(false);
				setError("Failed to fetch data: Movie Not Found");
			}
		};
		fetchTvData();
	}, [id]);

	if (loading) {
		return (
			<main className="w-full min-h-screen bg-neutral-900 text-white flex items-center justify-center">
				<p>Loading...</p>
			</main>
		);
	}

	if (error) {
		return (
			<main className="w-full min-h-screen bg-neutral-900 text-white flex items-center justify-center">
				<p>{error}</p>
			</main>
		);
	}

	return (
		<main className="w-full min-h-screen bg-neutral-900 text-white">
			<Nav />
			<div>
				{/* Background Image */}
				<div
					style={{
						backgroundImage: tvDetails.backdrop_path
							? `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${tvDetails.backdrop_path})`
							: "url('https://via.placeholder.com/1920x800?text=No+Image+Available')",
					}}
					className="relative w-full bg-center bg-cover bg-no-repeat h-auto"
				>
					{/* Gradient Overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

					{/* Content Wrapper */}
					<div className="relative w-full bg-black/40 backdrop-blur-sm">
						<div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-8 py-10 px-5">
							{/* Poster Image */}
							<div className="flex-shrink-0">
								<div className="rounded-md overflow-hidden shadow-lg">
									<img
										className="w-72 h-auto object-cover"
										src={
											tvDetails.poster_path
												? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${tvDetails.poster_path}`
												: "https://via.placeholder.com/300x450?text=No+Poster+Available"
										}
										alt={tvDetails.name || "No title available"}
									/>
								</div>
							</div>

							{/* Movie Details */}
							<div className="flex-1">
								<h1 className="text-4xl md:text-5xl font-bold mb-3">
									{tvDetails.name || "Unknown Title"} (
									{tvDetails.first_air_date
										? tvDetails.first_air_date.split("-")[0]
										: "N/A"}
									)
								</h1>
								<p className="text-lg font-light mb-6 text-blue-300">
									{tvDetails.genres && tvDetails.genres.length > 0
										? tvDetails.genres.map((genre) => genre.name).join(", ")
										: "No genres available"}
								</p>

								<div>
									<h2 className="text-2xl font-semibold mb-2">
										Personal Rating
									</h2>
									<p className="text-lg mb-5 font-light text-yellow-400">
										★{" "}
										{datas.find((d) => d.Name === tvDetails.name)?.Rating ??
											"Not Rated Yet"}
									</p>
								</div>

								<div>
									<h2 className="text-2xl font-semibold mb-2">Overview</h2>
									<p className="font-light leading-relaxed text-gray-300">
										{tvDetails.overview || "No overview available for this TV show."}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Section 2 */}
				<div className="max-w-screen-xl mx-auto">
					{/* Review */}
					<div className="py-10 px-5">
						<h1 className=" inline-block text-3xl font-bold mb-6 border-b-2 pb-2">
							My Personal Review
						</h1>
						<p className=" leading-8 text-lg">
							{datas.find((d) => d.Name === tvDetails.name)?.Review ??
								"No review available"}
						</p>
					</div>

					<div className="flex flex-col lg:flex-row gap-8 py-10 px-5">
						{/* Top Cast Section */}
						<div className="w-full lg:w-3/4">
							<h1 className="text-3xl font-bold mb-6 border-b-2 pb-2">
								Top Cast
							</h1>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
								{cast.length > 0 ? (
									cast.map((castMember, index) => (
										<div
											key={index}
											className="flex items-center bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition duration-300"
										>
											<img
												src={
													castMember.profile_path
														? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${castMember.profile_path}`
														: "https://via.placeholder.com/300x450?text=No+Image+Available"
												}
												alt={castMember.name || "Unknown Cast"}
												className="object-cover w-24"
											/>
											<div className="p-4">
												<p className="text-lg font-semibold">
													{castMember.name || "Unknown Name"}
												</p>
												<p className="text-sm text-slate-400 mt-1">
													{castMember.character || "No character info"}
												</p>
											</div>
										</div>
									))
								) : (
									<p className="text-gray-400">No cast information available.</p>
								)}
							</div>
							<div className=" flex justify-end mt-5">
								<Link to={`/${id}/Casts?name=${tvDetails.name}`} className=" flex items-center text-xl">
									View More <FaArrowRight className="pt-1 ml-3" />
								</Link>
							</div>
						</div>

						{/* Facts Section */}
						<div className="w-full lg:w-1/4 bg-gray-800 rounded-lg shadow-lg p-6">
							<h1 className="text-2xl font-bold mb-4 border-b-2 pb-2">Facts</h1>
							<div className="space-y-4">
								<div>
									<p className="text-sm font-semibold text-gray-300">
										Episodes
									</p>
									<p className="text-base text-white">
										{tvDetails.number_of_episodes ?? "N/A"}
									</p>
								</div>
								<div>
									<p className="text-sm font-semibold text-gray-300">
										Original Name
									</p>
									<p className="text-base text-white">
										{tvDetails.original_name ?? "N/A"}
									</p>
								</div>
								<div>
									<p className="text-sm font-semibold text-gray-300">Status</p>
									<p className="text-base text-white">
										{tvDetails.status ?? "N/A"}
									</p>
								</div>
								<div>
									<p className="text-sm font-semibold text-gray-300">
										Networks
									</p>
									<p className="text-base text-white">
										{tvDetails.networks
											? tvDetails.networks.map((network) => network.name).join(", ")
											: "N/A"}
									</p>
								</div>
								<div>
									<p className="text-sm font-semibold text-gray-300">Type</p>
									<p className="text-base text-white">
										{tvDetails.type ?? "N/A"}
									</p>
								</div>
								<div>
									<p className="text-sm font-semibold text-gray-300">
										Original Language
									</p>
									<p className="text-base text-white">
										{tvDetails.original_language
											? tvDetails.original_language.toUpperCase()
											: "N/A"}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Photos Section */}
					<div className="py-10 px-5">
						<h1 className="inline-block text-3xl font-bold mb-6 border-b-2 pb-2">
							Photos
						</h1>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{photos.length > 0 ? (
								photos.map((photo, index) => (
									<img
										key={index}
										src={`https://image.tmdb.org/t/p/w500${photo.file_path}`}
										alt="Backdrop"
										className="rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
									/>
								))
							) : (
								<p className="text-gray-400">No photos available for this TV show.</p>
							)}
						</div>
						<div className=" flex justify-end mt-5">
							<Link to={`/${id}/Photos?name=${tvDetails.name}`} className=" flex items-center text-xl">
								View More <FaArrowRight className="pt-1 ml-3" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
