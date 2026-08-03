import { useState } from "react";
import {
    FaSearch,
    FaCheck,
    FaTimes,
    FaEye,
    FaExclamationTriangle,
    FaHospital,
    FaTint,
    FaClock,
} from "react-icons/fa";
import BloodBankPanel from "../../components/BBPanel";

function BBEmergencyRequests() {
    const [search, setSearch] = useState("");

    const requests = [
        {
            id: 1,
            patient: "Rahul Kumar",
            hospital: "City Hospital",
            bloodGroup: "O-",
            units: 3,
            requestTime: "09:30 AM",
            contact: "9876543210",
            status: "Pending",
        },
        {
            id: 2,
            patient: "Anjali Nair",
            hospital: "Medical College",
            bloodGroup: "A-",
            units: 2,
            requestTime: "10:15 AM",
            contact: "9876501234",
            status: "Approved",
        },
        {
            id: 3,
            patient: "Akhil Raj",
            hospital: "General Hospital",
            bloodGroup: "AB-",
            units: 1,
            requestTime: "11:00 AM",
            contact: "9876512345",
            status: "Pending",
        },
        {
            id: 4,
            patient: "Sneha Joseph",
            hospital: "Life Care Hospital",
            bloodGroup: "B-",
            units: 2,
            requestTime: "12:20 PM",
            contact: "9876598765",
            status: "Rejected",
        },
    ];

    const filteredRequests = requests.filter((item) =>
        item.patient.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 flex">

            <BloodBankPanel />
            <div className="min-h-screen bg-gray-100 p-8 flex-1">

                {/* Header */}

                <div className="flex justify-between items-center mb-8">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Emergency Blood Requests
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage urgent blood requests from hospitals.
                        </p>
                    </div>

                </div>

                {/* Summary Cards */}

                <div className="grid md:grid-cols-4 gap-6 mb-8">

                    <div className="text-red-600 bg-white rounded-xl shadow-lg p-6">
                        <FaExclamationTriangle className="text-4xl mb-3" />
                        <h2 className="text-3xl font-bold">12</h2>
                        <p>Total Emergency Requests</p>
                    </div>

                    <div className="text-yellow-500 bg-white rounded-xl shadow-lg p-6">
                        <FaClock className="text-4xl mb-3" />
                        <h2 className="text-3xl font-bold">5</h2>
                        <p>Pending</p>
                    </div>

                    <div className="text-green-600 bg-white rounded-xl shadow-lg p-6">
                        <FaCheck className="text-4xl mb-3" />
                        <h2 className="text-3xl font-bold">6</h2>
                        <p>Approved</p>
                    </div>

                    <div className="text-blue-600 bg-white rounded-xl shadow-lg p-6">
                        <FaHospital className="text-4xl mb-3" />
                        <h2 className="text-3xl font-bold">8</h2>
                        <p>Hospitals Served</p>
                    </div>

                </div>

                {/* Search */}

                <div className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-3 mb-6">

                    <FaSearch className="text-gray-500" />

                    <input
                        type="text"
                        placeholder="Search Patient..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full outline-none"
                    />

                </div>

                {/* Emergency Request Table */}

                <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-red-600 text-white">

                            <tr>
                                <th className="py-4">Patient</th>
                                <th>Hospital</th>
                                <th>Blood Group</th>
                                <th>Units</th>
                                <th>Time</th>
                                <th>Contact</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredRequests.map((item) => (

                                <tr
                                    key={item.id}
                                    className="text-center border-b hover:bg-gray-50"
                                >

                                    <td className="py-4 font-semibold">
                                        {item.patient}
                                    </td>

                                    <td>{item.hospital}</td>

                                    <td className="font-bold text-red-600">
                                        {item.bloodGroup}
                                    </td>

                                    <td>{item.units}</td>

                                    <td>{item.requestTime}</td>

                                    <td>{item.contact}</td>

                                    <td>

                                        <span
                                            className={`px-3 py-1 rounded-full text-white ${item.status === "Approved"
                                                ? "bg-green-600"
                                                : item.status === "Rejected"
                                                    ? "bg-gray-600"
                                                    : "bg-yellow-500"
                                                }`}
                                        >
                                            {item.status}
                                        </span>

                                    </td>

                                    <td>

                                        <div className="flex justify-center gap-2">

                                            <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg">
                                                <FaEye />
                                            </button>

                                            <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg">
                                                <FaCheck />
                                            </button>

                                            <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg">
                                                <FaTimes />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Alert */}

                <div className="mt-8 bg-red-100 border-l-4 border-red-600 rounded-lg p-5 flex gap-4">

                    <FaExclamationTriangle className="text-red-600 text-3xl mt-1" />

                    <div>

                        <h3 className="font-bold text-red-700">
                            Emergency Alert
                        </h3>

                        <p className="text-gray-700 mt-2">
                            Emergency requests should be processed immediately. Verify blood
                            availability and compatibility before approving the request to
                            ensure timely treatment.
                        </p>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default BBEmergencyRequests;