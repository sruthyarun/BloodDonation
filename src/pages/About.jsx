import {
    FaTint,
    FaHeartbeat,
    FaHospital,
    FaUsers,
    FaHandsHelping,
} from "react-icons/fa";
import Navbar from "../components/Navbar";

function About() {
    return (
        <>
            <Navbar />
            {/* Who We Are */}

            <div className="py-20 bg-gradient-to-br from-red-50 via-white to-red-100">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left Image */}

                        <div className="relative">

                            <div className="absolute -top-6 -left-6 w-32 h-32 bg-red-200 rounded-full opacity-40"></div>

                            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-red-100 rounded-full opacity-60"></div>

                            <div className="relative bg-white rounded-3xl shadow-2xl p-8">

                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                                    alt="Blood Donation"
                                    className="w-80 mx-auto"
                                />

                                <div className="absolute bottom-5 right-5 bg-red-600 text-white px-6 py-3 rounded-2xl shadow-xl">

                                    <h2 className="text-2xl font-bold">
                                        1000+
                                    </h2>

                                    <p className="text-sm">
                                        Lives Saved
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Right Content */}

                        <div>

                            <span className="bg-red-100 text-red-600 font-semibold px-5 py-2 rounded-full">
                                WHO WE ARE
                            </span>

                            <h2 className="text-5xl font-bold text-gray-800 mt-6 leading-tight">
                                Connecting
                                <span className="text-red-600">
                                    {" "}Donors
                                </span>,
                                Hospitals &
                                <span className="text-red-600">
                                    {" "}Recipients
                                </span>
                            </h2>

                            <p className="text-gray-600 mt-6 leading-8 text-lg">
                                Our Blood Donation Management System is a secure healthcare
                                platform that simplifies blood donation by connecting donors,
                                recipients, hospitals, blood banks, and administrators in
                                one centralized system.
                            </p>

                            <p className="text-gray-600 mt-4 leading-8">
                                We provide an easy way to register donors, manage blood
                                inventory, schedule appointments, process emergency requests,
                                and ensure blood reaches patients quickly whenever needed.
                            </p>

                            {/* Features */}

                            <div className="grid sm:grid-cols-2 gap-5 mt-8">

                                <div className="flex items-center gap-3 bg-white shadow rounded-xl p-4">
                                    <FaUsers className="text-red-600 text-2xl" />
                                    <div>
                                        <h4 className="font-semibold">
                                            Trusted Donors
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Verified donor database
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 bg-white shadow rounded-xl p-4">
                                    <FaHospital className="text-red-600 text-2xl" />
                                    <div>
                                        <h4 className="font-semibold">
                                            Hospital Network
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Connected healthcare centers
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 bg-white shadow rounded-xl p-4">
                                    <FaHeartbeat className="text-red-600 text-2xl" />
                                    <div>
                                        <h4 className="font-semibold">
                                            Emergency Support
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Quick emergency response
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 bg-white shadow rounded-xl p-4">
                                    <FaHandsHelping className="text-red-600 text-2xl" />
                                    <div>
                                        <h4 className="font-semibold">
                                            Save Lives
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Every donation counts
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default About;