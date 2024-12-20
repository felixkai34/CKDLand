import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { FaArrowLeft } from "react-icons/fa";

export default function Photos() {
    const id = useParams().Id;
    const location = useLocation();
    const navigate = useNavigate();

    const [photos, setPhotos] = useState([]);
    const [movieName, setMovieName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const api_key = "9eb272b130d9d436d542f8fc2662583d";

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const name = params.get("name");
        setMovieName(name || "Unknown Movie");

        const fetchPhotos = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/tv/${id}/images?api_key=${api_key}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const photosData = await response.json();
                setPhotos(photosData.backdrops || []);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError("Failed to fetch data");
            }
        };

        fetchPhotos();
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                        <img
                            key={index}
                            src={`https://image.tmdb.org/t/p/original/${photo.file_path}`}
                            alt={`Backdrop for ${movieName}`}
                            className="rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
