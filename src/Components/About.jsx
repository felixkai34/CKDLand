import { FaEnvelope, FaGithub, FaTelegram } from "react-icons/fa";
import Nav from "./Nav";

export default function About() {
    return (
        <main className="bg-neutral-900 text-white h-screen">

            <Nav/>

            <div className="max-w-screen-xl mx-auto py-10 px-5 sm:px-10">
                {/* About Section */}
                <section className="mb-10">
                    <h1 className="text-3xl font-bold mb-4">About This Page</h1>
                    <p className="text-gray-300 leading-7">
                        This movie review app is designed for fans of K-dramas and C-dramas.
                        The movie data is fetched from the TNDB API, and reviews are purely
                        based on my personal feelings. Please enjoy and remember not to
                        judge or offend anyone based on the reviews!
                    </p>
                </section>

                {/* Contact Section */}
                <section className="mt-10">
                    <h1 className="text-3xl font-bold mb-4">Contact to Developer</h1>
                    <div className="flex items-center gap-5">
                        {/* Email */}
                        <a
                            href="mailto:felixkai2310@gmail.com"
                            className="flex items-center gap-2 text-lg text-blue-400 hover:text-blue-600"
                        >
                            <FaEnvelope className="text-2xl" />
                            Email
                        </a>

                        {/* GitHub */}
                        <a
                            href="https://github.com/felixkai34"
                            target="_blank"
                            className="flex items-center gap-2 text-lg text-blue-400 hover:text-blue-600"
                        >
                            <FaGithub className="text-2xl" />
                            GitHub
                        </a>

                        {/* Telegram */}
                        <a
                            href="https://t.me/DT23010"
                            target="_blank"
                            className="flex items-center gap-2 text-lg text-blue-400 hover:text-blue-600"
                        >
                            <FaTelegram className="text-2xl" />
                            Telegram
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
}
