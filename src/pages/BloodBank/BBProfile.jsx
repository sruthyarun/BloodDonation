import {
    FaHospital,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaUser,
    FaEdit,
    FaSave,
    FaTint,
} from "react-icons/fa";
import BloodBankPanel from "../../components/BBPanel";

function BloodBankProfile() {
    return (
        <div className="min-h-screen bg-gray-100 flex">

            <BloodBankPanel />
            <div className="min-h-screen bg-gray-100 p-8 flex-1">

                {/* Header */}

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Blood Bank Profile
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your blood bank information and contact details.
                    </p>

                </div>

                {/* Profile Card */}

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    {/* Top Banner */}

                    <div className="bg-gradient-to-r from-red-700 to-pink-600 h-40 flex justify-center items-end">

                        <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg mb-[-60px] border-4 border-white">

                            <FaHospital className="text-6xl text-red-600" />

                        </div>

                    </div>

                    {/* Profile Details */}

                    <div className="pt-20 px-10 pb-10">

                        <div className="text-center mb-8">

                            <h2 className="text-3xl font-bold text-gray-800">
                                LifeCare Blood Bank
                            </h2>

                            <p className="text-gray-500">
                                Registered Blood Bank
                            </p>

                        </div>

                        <div className="grid md:grid-cols-2 gap-8">

                            <div>

                                <label className="font-semibold text-gray-700">
                                    Blood Bank Name
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-4 py-3">

                                    <FaHospital className="text-red-600 mr-3" />

                                    <input
                                        type="text"
                                        defaultValue="LifeCare Blood Bank"
                                        className="w-full outline-none"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="font-semibold text-gray-700">
                                    Contact Person
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-4 py-3">

                                    <FaUser className="text-red-600 mr-3" />

                                    <input
                                        type="text"
                                        defaultValue="Dr. Arun Kumar"
                                        className="w-full outline-none"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="font-semibold text-gray-700">
                                    Email Address
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-4 py-3">

                                    <FaEnvelope className="text-red-600 mr-3" />

                                    <input
                                        type="email"
                                        defaultValue="lifecare@gmail.com"
                                        className="w-full outline-none"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="font-semibold text-gray-700">
                                    Phone Number
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-4 py-3">

                                    <FaPhoneAlt className="text-red-600 mr-3" />

                                    <input
                                        type="text"
                                        defaultValue="+91 9876543210"
                                        className="w-full outline-none"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="font-semibold text-gray-700">
                                    Address
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-4 py-3">

                                    <FaMapMarkerAlt className="text-red-600 mr-3" />

                                    <input
                                        type="text"
                                        defaultValue="MG Road, Kochi, Kerala"
                                        className="w-full outline-none"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="font-semibold text-gray-700">
                                    License Number
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-4 py-3">

                                    <FaTint className="text-red-600 mr-3" />

                                    <input
                                        type="text"
                                        defaultValue="BBKL202600145"
                                        className="w-full outline-none"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* Buttons */}

                        <div className="flex justify-end gap-4 mt-10">

                            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">

                                <FaEdit />

                                Edit Profile

                            </button>

                            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">

                                <FaSave />

                                Save Changes

                            </button>

                        </div>

                    </div>

                </div>

                {/* Statistics */}

                <div className="grid md:grid-cols-4 gap-6 mt-8">

                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">

                        <h2 className="text-3xl font-bold text-red-600">
                            1240
                        </h2>

                        <p className="text-gray-500">
                            Blood Units
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">

                        <h2 className="text-3xl font-bold text-green-600">
                            520
                        </h2>

                        <p className="text-gray-500">
                            Registered Donors
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">

                        <h2 className="text-3xl font-bold text-blue-600">
                            210
                        </h2>

                        <p className="text-gray-500">
                            Blood Requests
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">

                        <h2 className="text-3xl font-bold text-purple-600">
                            18
                        </h2>

                        <p className="text-gray-500">
                            Donation Camps
                        </p>

                    </div>

                </div>
            </div>

        </div>
    );
}

export default BloodBankProfile;