import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { FaArrowLeft } from "react-icons/fa";

export default function Casts() {
    const id = useParams().Id;
    const location = useLocation();
    const navigate = useNavigate();

    const [credit, setCredit] = useState([]);
    const [movieName, setMovieName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const api_key = "9eb272b130d9d436d542f8fc2662583d";

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const name = params.get("name");
        setMovieName(name || "Unknown Movie");

        const fetchCasts = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US&api_key=${api_key}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const castData = await response.json();
                setCredit(castData || []);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError("Failed to fetch data");
            }
        };

        fetchCasts();
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
                <p className="text-red-500">{error}</p>
            </main>
        );
    }

    return (
        <main className="w-full min-h-screen bg-neutral-900 text-white">
            <Nav />
            <div className="max-w-screen-xl mx-auto py-10 px-5 sm:px-10">
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-lg text-gray-300 hover:text-white transition"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back
                    </button>
                </div>
                <h1 className="text-3xl font-bold text-center mb-8">{movieName}</h1>

                <h1 className=" text-xl font-semibold my-5">Cast</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {credit.cast.map((castMember, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition duration-300"
                        >
                            <img
                                src={
                                    castMember.profile_path
                                        ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${castMember.profile_path}`
                                        : "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
                                }
                                alt={castMember.name || "No Name"}
                                className="object-cover w-24 h-full"
                            />
                            <div className="p-4">
                                <p className="text-lg font-semibold">
                                    {castMember.name || "Unknown Name"}
                                </p>
                                <p className="text-sm text-slate-400 mt-1">
                                    {castMember.character || "Unknown Character"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <h1 className=" text-xl font-semibold my-5">Crew</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {credit.crew.map((crewMember, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition duration-300"
                        >
                            <img
                                src={
                                    crewMember.profile_path
                                        ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${crewMember.profile_path}`
                                        : "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
                                }
                                alt={crewMember.name || "No Name"}
                                className="object-cover w-24 h-full"
                            />
                            <div className="p-4">
                                <p className="text-lg font-semibold">{crewMember.name}</p>
                                <p className="text-sm text-slate-400 mt-1">{crewMember.job}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
