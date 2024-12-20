import { Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import myDatas from "../Data.json";
import { Link } from "react-router-dom";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredTopRatedMovies, setFilteredTopRatedMovies] = useState([]);
    const [visibleMovies, setVisibleMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const topRatedMovies = [
        { movieName: "Love Next Door", Rating: 8.5 },
        { movieName: "Queen of Tears", Rating: 8.5 },
        { movieName: "The Love You Give Me", Rating: 8.5 },
        { movieName: "Doctor Slump", Rating: 8.5 },
        { movieName: "Go Go Squid 2: Dt.Appledog's Time", Rating: 9 },
    ];

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const promises = myDatas.map(async (mydata) => {
                    const response = await fetch(
                        `https://api.themoviedb.org/3/search/tv?query=${mydata.Name}&include_adult=true&language=en-US&page=1&api_key=9eb272b130d9d436d542f8fc2662583d`
                    );
                    const data = await response.json();
                    const result = data.results?.[0];
                    return result ? { ...result } : null;
                });

                const results = await Promise.all(promises);
                const filteredResults = results.filter((movie) => movie !== null);

                const topRated = filteredResults.filter((movie) =>
                    topRatedMovies.some((topMovie) => topMovie.movieName === movie.name)
                );

                setMovies(filteredResults);
                setFilteredTopRatedMovies(topRated);
                setVisibleMovies(topRated.slice(0, 3));
            } catch (err) {
                console.error("Error fetching movies:", err);
                setError("Failed to fetch movies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        if (filteredTopRatedMovies.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => {
                    const nextIndex = (prevIndex + 1) % filteredTopRatedMovies.length;
                    const nextMovies = [
                        filteredTopRatedMovies[nextIndex],
                        filteredTopRatedMovies[
                        (nextIndex + 1) % filteredTopRatedMovies.length
                        ],
                        filteredTopRatedMovies[
                        (nextIndex + 2) % filteredTopRatedMovies.length
                        ],
                    ];
                    setVisibleMovies(nextMovies);
                    return nextIndex;
                });
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [filteredTopRatedMovies]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="max-w-screen-xl mx-auto py-10 px-5 sm:px-10">
            {/* Carousel Section */}
            <div className="flex flex-col lg:flex-row gap-10">
                <div className="w-full lg:w-2/3 aspect-video">
                    <Carousel slideInterval={3000}>
                        {filteredTopRatedMovies.map((movie, index) => (
                            <img
                                key={index}
                                src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`}
                                alt={movie.name}
                                className="object-cover w-full h-full"
                            />
                        ))}
                    </Carousel>
                </div>

                {/* Top Rated Movies Section */}
                <div className="w-full lg:w-1/3">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-4">
                        All-Time Favorite Movies
                    </h2>
                    <div className="space-y-5">
                        {visibleMovies.map((movie, index) => (
                            <div className="flex mb-3" key={index}>
                                <div className="bg-gray-500 w-20 h-32 rounded-lg">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        alt={movie.name}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                                <div className="ml-5">
                                    <p className="text-white">{movie.name}</p>
                                    <p className="text-neutral-400">
                                        {movie.first_air_date?.slice(0, 4)} - TV Series
                                    </p>
                                    <p className="text-neutral-400">
                                        { topRatedMovies.find((topMovie) => topMovie.movieName === movie.name).Rating } ★ 
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* All Movies Section */}
            <div className="mt-10">
                <h1 className="text-4xl font-semibold text-yellow-300 mb-10">
                    All Movies
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {movies.map((movie, index) => (
                        <div key={index} className="shadow-lg rounded-lg overflow-hidden">
                            <img
                                src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`}
                                alt="Poster"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="font-semibold text-lg">{movie.name}</h2>
                                <p className="text-neutral-500 text-sm">
                                    ({movie.first_air_date?.slice(0, 4)} TV Series)
                                </p>
                                <Link
                                    to={`/${movie.id}`}
                                    className="text-blue-500 hover:underline mt-2 block"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
