import { useState } from "react";
import {
    FaUserPlus,
    FaSearch,
    FaEye,
    FaEdit,
    FaTrash,
    FaUsers,
    FaTint,
} from "react-icons/fa";
import BloodBankPanel from "../../components/BBPanel";

function BBDonorManagement() {
    const [search, setSearch] = useState("");

    const donors = [
        {
            id: 1,
            name: "Arun Kumar",
            bloodGroup: "A+",
            age: 28,
            gender: "Male",
            phone: "9876543210",
            lastDonation: "15 Apr 2026",
            status: "Eligible",
        },
        {
            id: 2,
            name: "Anjali Nair",
            bloodGroup: "O+",
            age: 25,
            gender: "Female",
            phone: "9876501234",
            lastDonation: "20 Jul 2026",
            status: "Not Eligible",
        },
        {
            id: 3,
            name: "Rahul Das",
            bloodGroup: "B+",
            age: 31,
            gender: "Male",
            phone: "9876512345",
            lastDonation: "10 Feb 2026",
            status: "Eligible",
        },
        {
            id: 4,
            name: "Sneha Joseph",
            bloodGroup: "AB-",
            age: 27,
            gender: "Female",
            phone: "9876598765",
            lastDonation: "01 Mar 2026",
            status: "Eligible",
        },
    ];

    const filteredDonors = donors.filter((donor) =>
        donor.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 flex">

            <BloodBankPanel />
            <div className="min-h-screen bg-gray-100 p-8 flex-1">

                {/* Header */}

                <div className="flex justify-between items-center mb-8">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Donor Management
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage registered blood donors.
                        </p>
                    </div>

                    <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg flex items-center gap-2">
                        <FaUserPlus />
                        Add Donor
                    </button>

                </div>

                {/* Summary Cards */}

                <div className="grid md:grid-cols-4 gap-6 mb-8">

                    <div className="text-red-600 bg-white rounded-xl shadow-lg p-6">
                        <FaUsers className="text-4xl mb-3" />
                        <h2 className="text-3xl font-bold">520</h2>
                        <p>Total Donors</p>
                    </div>

                    <div className="text-green-600 bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-3xl font-bold">450</h2>
                        <p>Eligible Donors</p>
                    </div>

                    <div className="text-yellow-500 bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-3xl font-bold">70</h2>
                        <p>Not Eligible</p>
                    </div>

                    <div className="text-blue-600 bg-white rounded-xl shadow-lg p-6">
                        <FaTint className="text-4xl mb-3" />
                        <h2 className="text-3xl font-bold">210</h2>
                        <p>Donations Completed</p>
                    </div>

                </div>

                {/* Search */}

                <div className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-3 mb-6">

                    <FaSearch className="text-gray-500" />

                    <input
                        type="text"
                        placeholder="Search donor by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full outline-none"
                    />

                </div>

                {/* Donor Table */}

                <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-red-600 text-white">

                            <tr>
                                <th className="py-4">Name</th>
                                <th>Blood Group</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>Last Donation</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredDonors.map((donor) => (

                                <tr
                                    key={donor.id}
                                    className="text-center border-b hover:bg-gray-50"
                                >

                                    <td className="py-4 font-semibold">
                                        {donor.name}
                                    </td>

                                    <td className="font-bold text-red-600">
                                        {donor.bloodGroup}
                                    </td>

                                    <td>{donor.age}</td>

                                    <td>{donor.gender}</td>

                                    <td>{donor.phone}</td>

                                    <td>{donor.lastDonation}</td>

                                    <td>

                                        <span
                                            className={`px-3 py-1 rounded-full text-white ${donor.status === "Eligible"
                                                ? "bg-green-600"
                                                : "bg-red-600"
                                                }`}
                                        >
                                            {donor.status}
                                        </span>

                                    </td>

                                    <td>

                                        <div className="flex justify-center gap-2">

                                            <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg">
                                                <FaEye />
                                            </button>

                                            <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg">
                                                <FaEdit />
                                            </button>

                                            <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg">
                                                <FaTrash />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Information Box */}

                <div className="mt-8 bg-blue-100 border-l-4 border-blue-600 rounded-lg p-5">

                    <h3 className="font-bold text-blue-700">
                        Donor Eligibility
                    </h3>

                    <p className="text-gray-700 mt-2">
                        Donors can donate blood once every 3 months. Verify age, weight,
                        health status, and previous donation date before approving the next donation.
                    </p>

                </div>

            </div>
        </div>
    );
}

export default BBDonorManagement;