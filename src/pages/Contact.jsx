import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
} from "react-icons/fa";
import Navbar from "../components/Navbar";

function Contact() {
    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100">

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-red-900 to-red-400 text-white py-16">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <h1 className="text-4xl font-bold mb-3">
                            Contact Us
                        </h1>

                        <p className="text-lg">
                            We'd love to hear from you. Feel free to contact us anytime.
                        </p>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-10">

                    {/* Contact Information */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">

                        <h2 className="text-2xl font-bold text-red-600 mb-6">
                            Get In Touch
                        </h2>

                        <div className="space-y-6">

                            <div className="flex items-center gap-4">
                                <div className="bg-red-100 p-4 rounded-full">
                                    <FaPhoneAlt className="text-red-600 text-xl" />
                                </div>

                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-gray-600">
                                        +91 98765 43210
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-red-100 p-4 rounded-full">
                                    <FaEnvelope className="text-red-600 text-xl" />
                                </div>

                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-gray-600">
                                        support@givelife.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-red-100 p-4 rounded-full">
                                    <FaMapMarkerAlt className="text-red-600 text-xl" />
                                </div>

                                <div>
                                    <h3 className="font-semibold">Address</h3>
                                    <p className="text-gray-600">
                                        Kochi, Kerala, India
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-red-100 p-4 rounded-full">
                                    <FaClock className="text-red-600 text-xl" />
                                </div>

                                <div>
                                    <h3 className="font-semibold">Working Hours</h3>
                                    <p className="text-gray-600">
                                        Monday - Saturday <br />
                                        9:00 AM - 6:00 PM
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">

                        <h2 className="text-2xl font-bold text-red-600 mb-6">
                            Send a Message
                        </h2>

                        <form className="space-y-5">

                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                            />

                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                            />

                            <input
                                type="text"
                                placeholder="Subject"
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                            />

                            <textarea
                                rows="5"
                                placeholder="Your Message"
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full bg-red-800 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
                            >
                                Send Message
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Contact;