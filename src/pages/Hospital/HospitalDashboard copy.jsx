import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    FaHospital,
    FaTint,
    FaUsers,
    FaClipboardList,
    FaCalendarAlt,
    FaBell,
    FaExclamationTriangle,
} from "react-icons/fa";
import HospitalPanel from "../../components/HospitalPanel";

function HospitalDashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Logged-in user from Redux
    const user = useSelector((state) => state.user.currentUser);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-2xl font-semibold">
                    Please Login First
                </h2>
            </div>
        );
    }
    const requests = [
        {
            id: 1,
            patient: "Rahul Kumar",
            bloodGroup: "A+",
            units: 2,
            status: "Pending",
        },
        {
            id: 2,
            patient: "Anjali Nair",
            bloodGroup: "O-",
            units: 1,
            status: "Approved",
        },
        {
            id: 3,
            patient: "Joseph Mathew",
            bloodGroup: "B+",
            units: 3,
            status: "Emergency",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* Sidebar */}

            <HospitalPanel />

            {/* Main Content */}

            <main className="flex-1 p-8">

                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome, {user.hospitalName}
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage blood inventory, donors, requests, and appointments.
                </p>

                {/* Dashboard Cards */}

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <FaTint className="text-red-600 text-3xl mb-4" />
                        <h2 className="text-3xl font-bold">250</h2>
                        <p className="text-gray-500">Blood Units</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <FaUsers className="text-blue-600 text-3xl mb-4" />
                        <h2 className="text-3xl font-bold">520</h2>
                        <p className="text-gray-500">Registered Donors</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <FaClipboardList className="text-green-600 text-3xl mb-4" />
                        <h2 className="text-3xl font-bold">18</h2>
                        <p className="text-gray-500">Pending Requests</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <FaCalendarAlt className="text-purple-600 text-3xl mb-4" />
                        <h2 className="text-3xl font-bold">12</h2>
                        <p className="text-gray-500">Today's Appointments</p>
                    </div>

                </div>



                <div className="bg-white rounded-xl shadow-lg mt-10 overflow-hidden">

                    <div className="bg-red-600 text-white px-6 py-4">
                        <h2 className="text-xl font-semibold">
                            Recent Blood Requests
                        </h2>
                    </div>

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>
                                <th className="py-4">Patient</th>
                                <th>Blood Group</th>
                                <th>Units</th>
                                <th>Status</th>
                            </tr>

                        </thead>

                        <tbody>

                            {requests.map((item) => (

                                <tr key={item.id} className="text-center border-b">

                                    <td className="py-4">{item.patient}</td>

                                    <td>
                                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                                            {item.bloodGroup}
                                        </span>
                                    </td>

                                    <td>{item.units}</td>

                                    <td>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${item.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : item.status === "Approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Emergency Alert */}

                <div className="mt-8 bg-red-50 border-l-4 border-red-600 p-5 rounded-lg flex items-center gap-4">

                    <FaExclamationTriangle className="text-red-600 text-3xl" />

                    <div>
                        <h3 className="font-bold text-red-700">
                            Emergency Alert
                        </h3>

                        <p className="text-gray-700">
                            There are <strong>3 emergency blood requests</strong> awaiting immediate action.
                        </p>
                    </div>

                    <Link
                        to="/emergency-requests"
                        className="ml-auto bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                    >
                        View
                    </Link>

                </div>

            </main >

        </div >
    );
}

export default HospitalDashboard;