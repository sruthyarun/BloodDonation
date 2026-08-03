import { useState } from "react";
import {
    FaSearch,
    FaCheck,
    FaTimes,
    FaEye,
    FaTint,
    FaHospital,
    FaExclamationTriangle,
} from "react-icons/fa";
import BloodBankPanel from "../../components/BBPanel";

function BBBloodRequests() {
    const [search, setSearch] = useState("");

    const requests = [
        {
            id: 1,
            patient: "Rahul Kumar",
            hospital: "City Hospital",
            bloodGroup: "A+",
            units: 2,
            requestDate: "26 Jul 2026",
            priority: "Normal",
            status: "Pending",
        },
        {
            id: 2,
            patient: "Anjali Nair",
            hospital: "Medical College",
            bloodGroup: "O-",
            units: 4,
            requestDate: "26 Jul 2026",
            priority: "Emergency",
            status: "Approved",
        },
        {
            id: 3,
            patient: "Akhil Raj",
            hospital: "General Hospital",
            bloodGroup: "B+",
            units: 1,
            requestDate: "25 Jul 2026",
            priority: "Normal",
            status: "Pending",
        },
        {
            id: 4,
            patient: "Sneha Joseph",
            hospital: "Life Care Hospital",
            bloodGroup: "AB-",
            units: 2,
            requestDate: "25 Jul 2026",
            priority: "Emergency",
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
                            Blood Requests
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage incoming blood requests.
                        </p>
                    </div>

                </div>

                {/* Summary Cards */}

                <div className="grid md:grid-cols-4 gap-6 mb-8">

                    <div className="text-red-600 bg-white rounded-xl shadow-lg p-6">
                        <FaTint className="text-4xl mb-3" />
                        <h2 className="text-3xl font-bold">28</h2>
                        <p>Total Requests</p>
                    </div>

                    <div className="text-yellow-500 bg-white rounded-xl shadow-lg p-6">
                        <FaExclamationTriangle className="text-4xl mb-3" />
                        <h2 className="text-3xl font-bold">8</h2>
                        <p>Pending</p>
                    </div>

                    <div className="text-green-600 bg-white rounded-xl shadow-lg p-6">
                        <FaCheck className="text-4xl mb-3" />
                        <h2 className="text-3xl font-bold">15</h2>
                        <p>Approved</p>
                    </div>

                    <div className="text-blue-600 bg-white rounded-xl shadow-lg p-6">
                        <FaHospital className="text-4xl mb-3" />
                        <h2 className="text-3xl font-bold">12</h2>
                        <p>Hospitals</p>
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

                {/* Requests Table */}

                <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-red-600 text-white">

                            <tr>
                                <th className="py-4">Patient</th>
                                <th>Hospital</th>
                                <th>Blood Group</th>
                                <th>Units</th>
                                <th>Request Date</th>
                                <th>Priority</th>
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

                                    <td>{item.requestDate}</td>

                                    <td>
                                        <span
                                            className={`px-3 py-1 rounded-full text-white ${item.priority === "Emergency"
                                                ? "bg-red-600"
                                                : "bg-blue-600"
                                                }`}
                                        >
                                            {item.priority}
                                        </span>
                                    </td>

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

                {/* Information Box */}

                <div className="mt-8 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg p-5">

                    <h3 className="font-bold text-yellow-700">
                        Important
                    </h3>

                    <p className="text-gray-700 mt-2">
                        Emergency requests should be processed immediately. Verify blood
                        compatibility and available stock before approving any request.
                    </p>

                </div>

            </div>
        </div >
    );
}

export default BBBloodRequests;