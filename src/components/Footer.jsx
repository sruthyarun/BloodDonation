
function Footer() {
    return (
        <footer className="bg-gray-600 text-white">
            <div className="max-w-7xl mx-auto px-8 py-14">
                <div className="grid lg:grid-cols-4 gap-10">
                    <div>
                        <h2 className="text-3xl font-bold text-red-400">
                            Give Life Today
                        </h2>
                        <p className="text-gray-400 mt-5">
                            Join thousands of donors helping save lives every day.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-xl">
                            Quick Links
                        </h3>
                        <ul className="space-y-3 mt-5 text-gray-400">
                            <li>Home</li>
                            <li>About</li>
                            <li>Donate</li>
                            <li>Find Donors</li>
                            <li>Blood Banks</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-xl">
                            Contact
                        </h3>
                        <div className="space-y-4 mt-5 text-gray-400">
                            <p className="flex items-center gap-2">
                                +91 9876543210
                            </p>
                            <p className="flex items-center gap-2">
                                support@givelife.com
                            </p>
                            <p className="flex items-center gap-2">
                                Kerala, India
                            </p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-xl">
                            Follow Us
                        </h3>
                        <div className="flex gap-5 mt-5">
                        </div>
                    </div>
                </div>
                <hr className="border-gray-700 my-5" />
                <p className="text-center text-gray-400">
                    © 2026 Give Life Today. All Rights Reserved.
                </p>

            </div>

        </footer>

    );
}

export default Footer;