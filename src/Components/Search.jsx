import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { FaArrowLeft } from "react-icons/fa";

export default function Search() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search).get("query");

    useEffect(() => {
        if (query) {
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
                            query
                        )}&api_key=9eb272b130d9d436d542f8fc2662583d`
                    );
                    const data = await response.json();
                    setResults(data.results || []);
                } catch (err) {
                    setError("Failed to fetch search results.");
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [query]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <main className=" bg-neutral-800 text-white min-h-screen">
            <Nav />

            <div className="max-w-screen-xl mx-auto py-10 px-5 sm:px-10">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-lg text-gray-300 hover:text-white transition mb-5"
                >
                    <FaArrowLeft className="mr-2" />
                    Back
                </button>
                <h1 className="text-3xl font-bold text-yellow-300 mb-6">
                    Search Results for "{query}"
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {results.map((result, index) => (
                        <div key={index} className="shadow-lg rounded-lg overflow-hidden">
                            <img
                                src={
                                    result.backdrop_path
                                        ? `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${result.backdrop_path}`
                                        : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                                }
                                alt={result.title || "No title available"}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-4">
                                <h2 className="font-semibold text-lg">{result.name}</h2>
                                <p className="text-neutral-500 text-sm">
                                    ({result.first_air_date?.slice(0, 4)} TV Series)
                                </p>
                                <Link
                                    to={`/${result.id}`}
                                    className="text-blue-500 hover:underline mt-2 block"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
