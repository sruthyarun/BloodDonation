import { useState, useEffect } from "react";
import axios from "axios";
import {
    FaSearch,
    FaHospital,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaEye,
    FaTrash,
    FaCheck,
    FaTimes,
    FaBuilding,
} from "react-icons/fa";

import AdminPanel from "../../components/AdminPanel";

const API_URL = "http://localhost:5000/hospitals";

function HospitalManagementADm() {
    const [hospitals, setHospitals] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        fetchHospitals();
    }, []);

    const fetchHospitals = async () => {
        try {
            const response = await axios.get(API_URL);
            setHospitals(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const filteredHospitals = hospitals.filter((hospital) =>
        hospital.hospitalName
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );
    const updateStatus = async (id, status) => {
        try {
            const hospital = hospitals.find((h) => h.id === id);

            await axios.put(`${API_URL}/${id}`, {
                ...hospital,
                status,
            });

            fetchHospitals();
        } catch (error) {
            console.log(error);
        }
    };
    const deleteHospital = async (id) => {
        if (!window.confirm("Delete this hospital?")) return;

        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchHospitals();
        } catch (error) {
            console.log(error);
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case "Approved":
                return "bg-green-100 text-green-700";
            case "Pending":
                return "bg-yellow-100 text-yellow-700";
            case "Rejected":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
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
                            Hospital Management
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Manage registered hospitals.
                        </p>
                    </div>

                    <div className="flex items-center bg-white shadow rounded-lg px-4 py-3 mt-4 md:mt-0">
                        <FaSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search hospital..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="ml-2 outline-none w-64"
                        />
                    </div>

                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-600">
                        <h2 className="text-gray-500">Total Hospitals</h2>
                        <p className="text-4xl font-bold text-red-600 mt-2">
                            {hospitals.length}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
                        <h2 className="text-gray-500">Approved</h2>
                        <p className="text-4xl font-bold text-green-600 mt-2">
                            {hospitals.filter(h => h.status === "Approved").length}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
                        <h2 className="text-gray-500">Pending</h2>
                        <p className="text-4xl font-bold text-yellow-600 mt-2">
                            {hospitals.filter(h => h.status === "Pending").length}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
                        <h2 className="text-gray-500">Rejected</h2>
                        <p className="text-4xl font-bold text-red-500 mt-2">
                            {hospitals.filter(h => h.status === "Rejected").length}
                        </p>
                    </div>

                </div>

                {/* Hospital Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-red-600 text-white">
                            <tr>
                                <th className="py-4">Hospital ID</th>
                                <th>Hospital Name</th>
                                <th>Type</th>
                                <th>City</th>
                                <th>Phone</th>
                                <th>License No.</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredHospitals.map((hospital) => (
                                <tr
                                    key={hospital.id}
                                    className="text-center border-b hover:bg-gray-50"
                                >

                                    <td className="py-4 font-semibold">
                                        {hospital.id}
                                    </td>

                                    <td>
                                        <div className="flex justify-center items-center gap-2">
                                            <FaHospital className="text-red-600" />
                                            {hospital.hospitalName}
                                        </div>
                                    </td>

                                    <td>
                                        <div className="flex justify-center items-center gap-2">
                                            <FaBuilding className="text-red-600" />
                                            {hospital.hospitalType}
                                        </div>
                                    </td>

                                    <td>
                                        <div className="flex justify-center items-center gap-2">
                                            <FaMapMarkerAlt className="text-red-600" />
                                            {hospital.district}
                                        </div>
                                    </td>

                                    <td>
                                        <div className="flex justify-center items-center gap-2">
                                            <FaPhoneAlt className="text-red-600" />
                                            {hospital.phone}
                                        </div>
                                    </td>

                                    <td>
                                        {hospital.registrationNumber}
                                    </td>

                                    <td>
                                        <span
                                            className={`px-3 py-1 rounded-full font-medium ${hospital.status === "Approved"
                                                ? "bg-green-100 text-green-700"
                                                : hospital.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {hospital.status}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="flex justify-center gap-2">

                                            <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
                                                <FaEye />
                                            </button>

                                            {hospital.status === "Pending" && (
                                                <>
                                                    <button
                                                        onClick={() => updateStatus(hospital.id, "Approved")}
                                                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                                                    >
                                                        <FaCheck />
                                                    </button>

                                                    <button
                                                        onClick={() => updateStatus(hospital.id, "Rejected")}
                                                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </>
                                            )}

                                            <button
                                                onClick={() => deleteHospital(hospital.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                                            >
                                                <FaTrash />
                                            </button>

                                        </div>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>
        </div>
    );
}

export default HospitalManagementADm;