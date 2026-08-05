import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    FaTint,
    FaHospital,
    FaCalendarAlt,
    FaCertificate,
    FaSearch,
} from "react-icons/fa";
import DonorPanel from "../../components/donorPanel";

function DonationHistory() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    const [donations, setDonations] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!user) return;

        fetch("https://blood-donation-backend-olwl.onrender.com/appointments")
            .then((res) => res.json())
            .then((data) => {
                console.log("Logged User:", user);
                console.log("Appointments:", data);

                const completed = data.filter(
                    (item) =>
                        item.email === user.email &&
                        item.status?.toLowerCase() === "completed"
                );

                console.log("Completed Donations:", completed);

                setDonations(completed);
            })

            .catch((err) => console.log(err));
    }, [user]);

    const filtered = donations
        .filter(
            (item) =>
                item.hospital
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                item.bloodGroup
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const totalDonations = filtered.length;

    const hospitalsVisited = [
        ...new Set(filtered.map((item) => item.hospital)),
    ].length;

    const lastDonation =
        totalDonations > 0
            ? filtered[0].date
            : "No Donations";

    const certificates = totalDonations;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <DonorPanel />

            <div className="flex-1 p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Donation History
                        </h1>
                        <p className="text-gray-500">
                            Your completed blood donations
                        </p>
                    </div>

                    <div className="flex items-center bg-white rounded-lg shadow px-4 py-2">
                        <FaSearch className="text-gray-500" />

                        <input
                            type="text"
                            placeholder="Search Hospital / Blood Group"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="ml-2 outline-none"
                        />
                    </div>
                </div>

                {/* Summary Cards */}

                <div className="grid md:grid-cols-4 gap-6 mb-8">

                    <div className="bg-white rounded-xl shadow p-6 text-center text-red-600">
                        <FaTint className="text-3xl mx-auto mb-3" />
                        <h2 className="text-3xl font-bold">
                            {totalDonations}
                        </h2>
                        <p>Total Donations</p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6 text-center text-red-600">
                        <FaHospital className="text-3xl mx-auto mb-3" />
                        <h2 className="text-3xl font-bold">
                            {hospitalsVisited}
                        </h2>
                        <p>Hospitals Visited</p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6 text-center text-red-600">
                        <FaCalendarAlt className="text-3xl mx-auto mb-3" />
                        <h2 className="text-lg font-bold">
                            {lastDonation !== "No Donations"
                                ? new Date(
                                    lastDonation
                                ).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })
                                : lastDonation}
                        </h2>
                        <p>Last Donation</p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6 text-center text-red-600">
                        <FaCertificate className="text-3xl mx-auto mb-3" />
                        <h2 className="text-3xl font-bold">
                            {certificates}
                        </h2>
                        <p>Certificates</p>
                    </div>

                </div>

                {/* Donation Table */}

                <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-red-600 text-white">

                            <tr>
                                <th className="py-4 px-4 text-left">
                                    Date
                                </th>

                                <th className="px-4 text-left">
                                    Hospital
                                </th>

                                <th className="px-4 text-left">
                                    Blood Group
                                </th>

                                <th className="px-4 text-left">
                                    Units
                                </th>

                                <th className="px-4 text-left">
                                    Status
                                </th>

                                <th className="px-4 text-center">
                                    Certificate
                                </th>
                            </tr>

                        </thead>

                        <tbody>

                            {filtered.length > 0 ? (
                                filtered.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="py-4 px-4">
                                            {new Date(
                                                item.date
                                            ).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )}
                                        </td>

                                        <td className="px-4">
                                            {item.hospital}
                                        </td>

                                        <td className="px-4">
                                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                                                {item.bloodGroup}
                                            </span>
                                        </td>

                                        <td className="px-4">
                                            {item.units || 1}
                                        </td>

                                        <td className="px-4">
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full capitalize">
                                                {item.status}
                                            </span>
                                        </td>

                                        <td className="text-center">
                                            <button
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg my-2"
                                                onClick={() =>
                                                    console.log(
                                                        "Download Certificate",
                                                        item
                                                    )
                                                }
                                            >
                                                Download
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-8 text-gray-500"
                                    >
                                        No completed donations found.
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>
            </div>
        </div>
    );
}

export default DonationHistory;