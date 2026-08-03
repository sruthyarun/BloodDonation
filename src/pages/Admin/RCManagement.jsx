import { useEffect, useState } from "react";
import axios from "axios";
import {
    FaSearch,
    FaUserInjured,
    FaTint,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaEye,
    FaCheck,
    FaTrash,
} from "react-icons/fa";
import AdminPanel from "../../components/AdminPanel";
function RecipientManagementADm() {
    const [recipients, setRecipients] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchRecipients();
    }, []);

    const fetchRecipients = async () => {
        try {
            const res = await axios.get("http://localhost:5000/recipients");
            setRecipients(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const recipient = recipients.find((r) => r.id === id);

            await axios.put(
                `http://localhost:5000/recipients/${id}`,
                {
                    ...recipient,
                    status,
                }
            );

            fetchRecipients();
        } catch (err) {
            console.log(err);
        }
    };

    const deleteRecipient = async (id) => {
        if (!window.confirm("Delete this recipient?")) return;

        try {
            await axios.delete(
                `http://localhost:5000/recipients/${id}`
            );

            fetchRecipients();
        } catch (err) {
            console.log(err);
        }
    };

    const filteredRecipients = recipients.filter((recipient) =>
        recipient.fullName
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );



    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* Sidebar */}

            <AdminPanel />
            <div className="min-h-screen bg-gray-100 p-8 flex-1">

                {/* Header */}

                <div className="flex flex-col md:flex-row justify-between items-center mb-8">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Recipient Management
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage all registered blood recipients.
                        </p>
                    </div>

                    <div className="flex items-center bg-white shadow rounded-lg px-4 py-3 mt-4 md:mt-0">
                        <FaSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search recipient..."
                            className="ml-2 outline-none"
                        />
                    </div>

                </div>

                {/* Summary Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-600">
                        <h2 className="text-gray-500">Total Recipients</h2>
                        <p className="text-4xl font-bold text-red-600 mt-2">
                            {recipients.length}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
                        <h2 className="text-gray-500">Pending</h2>
                        <p className="text-4xl font-bold text-yellow-600 mt-2">
                            {
                                recipients.filter(
                                    (r) => r.status === "Pending"
                                ).length
                            }
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
                        <h2 className="text-gray-500">Approved</h2>
                        <p className="text-4xl font-bold text-green-600 mt-2">
                            {
                                recipients.filter(
                                    (r) => r.status === "Approved"
                                ).length
                            }
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
                        <h2 className="text-gray-500">Completed</h2>
                        <p className="text-4xl font-bold text-blue-600 mt-2">
                            {
                                recipients.filter(
                                    (r) => r.status === "Completed"
                                ).length
                            }
                        </p>
                    </div>

                </div>

                {/* Table */}

                <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-red-600 text-white">

                            <tr>
                                <th className="py-4">Recipient ID</th>
                                <th>Name</th>
                                <th>Blood Group</th>
                                <th>Phone</th>
                                <th>City</th>
                                <th>Units Required</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredRecipients.map((recipient) => (

                                <tr
                                    key={recipient.id}
                                    className="border-b hover:bg-gray-50 text-center"
                                >

                                    <td className="py-4 font-semibold">
                                        {recipient.id}
                                    </td>

                                    <td>
                                        <div className="flex justify-center items-center gap-2">
                                            <FaUserInjured className="text-red-600" />
                                            {recipient.fullName}
                                        </div>
                                    </td>

                                    <td>
                                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold">
                                            <FaTint className="inline mr-1" />
                                            {recipient.bloodGroup}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="flex justify-center items-center gap-2">
                                            <FaPhoneAlt className="text-red-600" />
                                            {recipient.phone}
                                        </div>
                                    </td>

                                    <td>
                                        <div className="flex justify-center items-center gap-2">
                                            <FaMapMarkerAlt className="text-red-600" />
                                            {recipient.district}
                                        </div>
                                    </td>

                                    <td>
                                        {recipient.units || 1}
                                    </td>

                                    <td>

                                        <span
                                            className={`px-3 py-1 rounded-full font-medium ${recipient.status === "Approved"
                                                ? "bg-green-100 text-green-700"
                                                : recipient.status === "Completed"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {recipient.status}
                                        </span>

                                    </td>

                                    <td>

                                        <div className="flex justify-center gap-2">

                                            <button
                                                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                                                title="View"
                                            >
                                                <FaEye />
                                            </button>

                                            {recipient.status === "Pending" && (

                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            recipient.id,
                                                            "Approved"
                                                        )
                                                    }
                                                    className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                                                    title="Approve"
                                                >
                                                    <FaCheck />
                                                </button>

                                            )}

                                            <button
                                                onClick={() =>
                                                    deleteRecipient(recipient.id)
                                                }
                                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                                                title="Delete"
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
        </div >
    );
}

export default RecipientManagementADm;