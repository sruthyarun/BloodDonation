import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
    FaSearch,
    FaUser,
    FaTint,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaEye,
    FaCheck,
    FaBan,
    FaTrash,
} from "react-icons/fa";
import AdminPanel from "../../components/AdminPanel";

function DonorManagementADm() {
    const [donors, setDonors] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedDonor, setSelectedDonor] = useState(null);

    useEffect(() => {
        fetchDonors();
    }, []);

    const fetchDonors = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/donors"
            );

            setDonors(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const filteredDonors = useMemo(() => {
        return donors.filter(
            (donor) =>
                donor.fullName
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                donor.email
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                donor.bloodGroup
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                donor.phone?.includes(search)
        );
    }, [donors, search]);

    const totalDonors = donors.length;

    const approvedCount = donors.filter(
        (d) => d.status === "Approved"
    ).length;

    const pendingCount = donors.filter(
        (d) => d.status === "Pending"
    ).length;

    const blockedCount = donors.filter(
        (d) => d.status === "Blocked"
    ).length;

    const updateStatus = async (id, status) => {
        try {
            const donor = donors.find((d) => d.id === id);

            await axios.put(
                `http://localhost:5000/donors/${id}`,
                {
                    ...donor,
                    status,
                }
            );

            fetchDonors();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteDonor = async (id) => {
        if (!window.confirm("Delete this donor?")) return;

        try {
            await axios.delete(
                `http://localhost:5000/donors/${id}`
            );

            fetchDonors();
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* Sidebar */}

            <AdminPanel />
            <div className="min-h-screen bg-gray-100 p-8 flex-1">

                {/* Header */}

                <div className="flex flex-col md:flex-row justify-between items-center mb-8">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Donor Management
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage all registered blood donors.
                        </p>
                    </div>

                    <div className="flex items-center bg-white rounded-lg shadow px-4 py-3 mt-4 md:mt-0">
                        <FaSearch className="text-gray-500" />

                        <input
                            type="text"
                            placeholder="Search donor..."
                            className="ml-2 outline-none"
                        />
                    </div>

                </div>
                {/* Dashboard Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-600">
                        <h2 className="text-gray-500">Total Donors</h2>
                        <p className="text-4xl font-bold text-red-600 mt-2">
                            {donors.length}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
                        <h2 className="text-gray-500">Approved</h2>
                        <p className="text-4xl font-bold text-green-600 mt-2">
                            {
                                donors.filter(
                                    (d) => d.status === "Approved"
                                ).length
                            }
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
                        <h2 className="text-gray-500">Pending</h2>
                        <p className="text-4xl font-bold text-yellow-600 mt-2">
                            {
                                donors.filter(
                                    (d) => d.status === "Pending"
                                ).length
                            }
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
                        <h2 className="text-gray-500">Blocked</h2>
                        <p className="text-4xl font-bold text-red-500 mt-2">
                            {
                                donors.filter(
                                    (d) => d.status === "Blocked"
                                ).length
                            }
                        </p>
                    </div>

                </div>

                {/* Donor Table */}

                <div className="space-y-4">

                    {filteredDonors.map((donor) => (

                        <div
                            key={donor.id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5"
                        >

                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                                {/* Left */}

                                <div className="flex items-center gap-4">

                                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                                        <FaUser className="text-red-600 text-2xl" />
                                    </div>

                                    <div>

                                        <h2 className="text-lg font-bold text-gray-800">
                                            {donor.fullName}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Donor ID : {donor.id}
                                        </p>

                                        <div className="flex flex-wrap gap-3 mt-2 text-sm">

                                            <span className="flex items-center gap-1">
                                                <FaPhoneAlt className="text-red-600" />
                                                {donor.phone}
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <FaMapMarkerAlt className="text-red-600" />
                                                {donor.district}
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <FaCalendarAlt className="text-red-600" />
                                                {donor.lastDonation || "Never"}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                                {/* Middle */}

                                <div className="flex flex-wrap gap-3">

                                    <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">
                                        🩸 {donor.bloodGroup}
                                    </span>

                                    <span
                                        className={`px-4 py-2 rounded-full font-semibold ${donor.eligibility === "Eligible"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {donor.eligibility}
                                    </span>

                                    <span
                                        className={`px-4 py-2 rounded-full font-semibold ${donor.status === "Approved"
                                            ? "bg-green-100 text-green-700"
                                            : donor.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {donor.status}
                                    </span>

                                </div>



                                {/* Actions */}
                                <div className="flex justify-end lg:justify-end w-full lg:w-auto">

                                    <div className="flex items-center gap-2">

                                        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition">
                                            <FaEye />
                                        </button>

                                        {donor.status === "Pending" && (
                                            <button
                                                onClick={() => updateStatus(donor.id, "Approved")}
                                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition"
                                            >
                                                <FaCheck />
                                            </button>
                                        )}

                                        {donor.status !== "Blocked" && (
                                            <button
                                                onClick={() => updateStatus(donor.id, "Blocked")}
                                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white transition"
                                            >
                                                <FaBan />
                                            </button>
                                        )}

                                        <button
                                            onClick={() => deleteDonor(donor.id)}
                                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition"
                                        >
                                            <FaTrash />
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>


            </div>
        </div>
    );
}

export default DonorManagementADm;

