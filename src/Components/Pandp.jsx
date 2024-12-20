import Nav from "./Nav";

export default function Pandp() {
    return (
        <main className="bg-neutral-900 text-white">

            <Nav/>

            <div className="max-w-screen-xl mx-auto py-10 px-5 sm:px-10">
                <h1 className="text-3xl font-bold mb-6">Privacy & Policy</h1>
                <p className="text-gray-300 mb-4">
                    <strong>Effective Date:</strong> 15/12/2024
                </p>
                <p className="text-gray-300 leading-7 mb-6">
                    Welcome to CKDLand! Your privacy is important to us. Below is
                    our Privacy and Policy statement outlining the key points of our
                    commitment to protecting your data and intellectual property.
                </p>

                <hr className="my-6" />

                <h2 className="text-2xl font-semibold mb-4">1. Data Collection</h2>
                <p className="text-gray-300 leading-7 mb-6">
                    We respect your privacy and do not collect, store, or share any personal
                    data or activity logs. Your interaction with this application remains
                    private and secure.
                </p>

                <h2 className="text-2xl font-semibold mb-4">
                    2. Content Ownership and Credits
                </h2>
                <p className="text-gray-300 leading-7 mb-6">
                    All data, including movie information, images, and details, are sourced
                    from credible platforms such as TNDB. Full credit is given to the
                    rightful owners of the data. If you believe there has been an error in
                    attribution, please contact us for correction.
                </p>

                <h2 className="text-2xl font-semibold mb-4">3. Reviews Disclaimer</h2>
                <p className="text-gray-300 leading-7 mb-6">
                    All reviews and opinions expressed within this app are my personal
                    thoughts and feelings. These reviews are subjective and meant for
                    entertainment purposes only. Please do not use them as a basis for
                    criticism or judgment of others.
                </p>

                <h2 className="text-2xl font-semibold mb-4">4. Copyright Policy</h2>
                <p className="text-gray-300 leading-7 mb-6">
                    All content, including reviews, is protected under copyright. Copying,
                    distributing, or republishing any part of this content without explicit
                    permission is strictly prohibited.
                </p>

                <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
                <p className="text-gray-300 leading-7 mb-6">
                    If you have any questions, concerns, or feedback, please contact us at:
                </p>

                <hr className="my-6" />

                <p className="text-gray-300 leading-7">
                    Thank you for respecting these policies and enjoying the content
                    responsibly!
                </p>
            </div>
        </main>
    );
}
