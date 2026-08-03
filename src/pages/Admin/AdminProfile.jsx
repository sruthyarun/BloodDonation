import { useState } from "react";
import {
    FaUserCircle,
    FaUser,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaBuilding,
    FaCalendarAlt,
    FaLock,
    FaSave,
} from "react-icons/fa";
import AdminPanel from "../../components/AdminPanel";

function AdminProfile() {
    const [admin, setAdmin] = useState({
        name: "System Administrator",
        email: "admin@bloodbank.com",
        phone: "+91 9876543210",
        department: "Blood Bank Administration",
        address: "Kochi, Kerala",
        joined: "15 January 2025",
    });

    const handleChange = (e) => {
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* Sidebar */}

            <AdminPanel />
            <div className="min-h-screen bg-gray-100 p-8 flex-1">


                {/* Header */}

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Admin Profile
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View and update administrator profile information.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Profile Card */}

                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

                        <FaUserCircle className="text-red-600 text-8xl mx-auto mb-5" />

                        <h2 className="text-2xl font-bold">
                            {admin.name}
                        </h2>

                        <p className="text-gray-500">
                            System Administrator
                        </p>

                        <button className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg">
                            Change Photo
                        </button>

                        <div className="mt-8 space-y-4 text-left">

                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-red-600" />
                                <span>{admin.email}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="text-red-600" />
                                <span>{admin.phone}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaBuilding className="text-red-600" />
                                <span>{admin.department}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-red-600" />
                                <span>{admin.address}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaCalendarAlt className="text-red-600" />
                                <span>Joined: {admin.joined}</span>
                            </div>

                        </div>

                    </div>

                    {/* Edit Form */}

                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">

                        <h2 className="text-2xl font-bold mb-6">
                            Edit Profile
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <label className="font-semibold">
                                    Full Name
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-3">
                                    <FaUser className="text-gray-500" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={admin.name}
                                        onChange={handleChange}
                                        className="w-full p-3 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-semibold">
                                    Email
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-3">
                                    <FaEnvelope className="text-gray-500" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={admin.email}
                                        onChange={handleChange}
                                        className="w-full p-3 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-semibold">
                                    Phone Number
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-3">
                                    <FaPhoneAlt className="text-gray-500" />
                                    <input
                                        type="text"
                                        name="phone"
                                        value={admin.phone}
                                        onChange={handleChange}
                                        className="w-full p-3 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-semibold">
                                    Department
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-3">
                                    <FaBuilding className="text-gray-500" />
                                    <input
                                        type="text"
                                        name="department"
                                        value={admin.department}
                                        onChange={handleChange}
                                        className="w-full p-3 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="font-semibold">
                                    Address
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-3">
                                    <FaMapMarkerAlt className="text-gray-500" />
                                    <input
                                        type="text"
                                        name="address"
                                        value={admin.address}
                                        onChange={handleChange}
                                        className="w-full p-3 outline-none"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Buttons */}

                        <div className="flex gap-4 mt-8">

                            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                                <FaSave />
                                Save Changes
                            </button>

                            <button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                                <FaLock />
                                Change Password
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default AdminProfile;