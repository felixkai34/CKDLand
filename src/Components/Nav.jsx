import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
    const [searchValue, setSearchValue] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchValue)}`);
            setSearchValue(""); // Clear input after submission
        }
    };

    return (
        <header className="w-full bg-neutral-800">
            <nav className="max-w-screen-xl mx-auto flex items-center justify-between h-16 px-4 text-white">
                <h1 className="text-lg font-bold">CKDLand</h1>

                {/* Hamburger Menu Button */}
                <button
                    className="md:hidden block p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={toggleMenu}
                >
                    <svg
                        className="w-6 h-6 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex cursor-pointer space-x-10">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/pandp">Privacy & Policy</Link>
                </div>

                {/* Search Bar */}
                <form className="relative hidden md:block" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        id="search"
                        className="block w-56 sm:w-64 p-2 ps-4 text-sm border rounded-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search"
                        autoComplete="off"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-400 hover:text-white"
                        aria-label="Search"
                    >
                        <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </button>
                </form>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-neutral-800 text-white">
                    <Link to="/" className="block px-4 py-2" onClick={toggleMenu}>
                        Home
                    </Link>
                    <Link to="/about" className="block px-4 py-2" onClick={toggleMenu}>
                        About
                    </Link>
                    <Link to="/pandp" className="block px-4 py-2" onClick={toggleMenu}>
                        Privacy & Policy
                    </Link>

                    {/* Search Bar in Mobile Menu */}
                    <form className="relative px-5 py-2" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            id="search"
                            className="block w-full p-2 px-3 text-sm border rounded-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search"
                            autoComplete="off"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute inset-y-0 right-5 flex items-center pr-3 text-gray-400 hover:text-white"
                            aria-label="Search"
                        >
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </header>
    );
}