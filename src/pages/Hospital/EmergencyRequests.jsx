import { useEffect, useState } from "react";
import {
    FaPlus,
    FaSearch,
    FaTint,
    FaHospital,
    FaMapMarkerAlt,
    FaPhone,
    FaTrash,
    FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HospitalPanel from "../../components/HospitalPanel";

function ViewEmergencyRequests() {

    const navigate = useNavigate();

    const hospital = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    const [requests, setRequests] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        try {

            const response = await fetch(
                "https://blood-donation-backend-olwl.onrender.com/emergencyRequests"
            );

            const data = await response.json();

            const hospitalRequests = data.filter(
                (item) =>
                    item.email === hospital.email
            );

            setRequests(hospitalRequests);

        } catch (error) {
            console.log(error);
        }
    };

    const deleteRequest = async (id) => {

        if (
            !window.confirm(
                "Delete this emergency request?"
            )
        )
            return;

        try {

            await fetch(
                `https://blood-donation-backend-olwl.onrender.com/emergencyRequests/${id}`,
                {
                    method: "DELETE",
                }
            );

            loadRequests();

        } catch (error) {
            console.log(error);
        }
    };

    const filtered = requests.filter(
        (item) =>
            item.patientName
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            item.bloodGroup
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            item.district
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 flex">

            <HospitalPanel />

            <div className="flex-1 p-8">

                {/* Header */}

                <div className="flex justify-between items-center mb-8">

                    <div>
                        <h1 className="text-3xl font-bold">
                            Emergency Requests
                        </h1>

                        <p className="text-gray-500">
                            Manage emergency blood requests
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            navigate(
                                "/new-emergency"
                            )
                        }
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"
                    >
                        <FaPlus />
                        New Request
                    </button>

                </div>

                {/* Search */}

                <div className="bg-white rounded-lg shadow px-4 py-3 flex items-center mb-8">

                    <FaSearch className="text-gray-500" />

                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="ml-3 outline-none w-full"
                    />

                </div>

                {/* Summary */}

                <div className="grid md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-white rounded-xl shadow p-6 text-center">
                        <h2 className="text-4xl font-bold text-red-600">
                            {filtered.length}
                        </h2>

                        <p>Total Requests</p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6 text-center">
                        <h2 className="text-4xl font-bold text-green-600">
                            {
                                filtered.filter(
                                    (item) =>
                                        item.status ===
                                        "Active"
                                ).length
                            }
                        </h2>

                        <p>Active</p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6 text-center">
                        <h2 className="text-4xl font-bold text-blue-600">
                            {
                                filtered.filter(
                                    (item) =>
                                        item.status ===
                                        "Completed"
                                ).length
                            }
                        </h2>

                        <p>Completed</p>
                    </div>

                </div>

                {/* Cards */}

                <div className="grid lg:grid-cols-2 gap-6">

                    {filtered.length > 0 ? (

                        filtered.map((item) => (

                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow-lg p-6"
                            >

                                <div className="flex justify-between">

                                    <h2 className="text-xl font-bold text-red-600">
                                        {item.patientName}
                                    </h2>

                                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                                        {item.status}
                                    </span>

                                </div>

                                <div className="space-y-3 mt-5">

                                    <p className="flex items-center gap-2">
                                        <FaTint />
                                        {item.bloodGroup}
                                    </p>

                                    <p>
                                        Units :
                                        <b>
                                            {" "}
                                            {item.units}
                                        </b>
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <FaHospital />
                                        {item.hospital}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <FaMapMarkerAlt />
                                        {item.district}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <FaPhone />
                                        {item.contact}
                                    </p>

                                    <p>
                                        <b>Reason:</b>{" "}
                                        {item.reason}
                                    </p>

                                    <p className="flex items-center gap-2 text-gray-500">
                                        <FaClock />
                                        {item.createdAt}
                                    </p>

                                </div>

                                <div className="mt-6 flex justify-end">

                                    <button
                                        onClick={() =>
                                            deleteRequest(
                                                item.id
                                            )
                                        }
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                    >
                                        <FaTrash />
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="col-span-2 bg-white rounded-xl shadow p-10 text-center">

                            <h2 className="text-2xl font-semibold">
                                No Emergency Requests Found
                            </h2>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default ViewEmergencyRequests;