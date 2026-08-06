import {
    FaHome,
    FaUsers,
    FaUserInjured,
    FaHospital,
    FaTint,
    FaClipboardList,
    FaCalendarAlt,
    FaHeartbeat,
    FaBell,
    FaChartBar,
    FaUser,
    FaSignOutAlt,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";

function AdminPanel() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem("loggedInUser");
        navigate("/login");
    };

    return (
        <aside className="w-64 min-h-screen bg-red-800 text-white shadow-xl">

            {/* Logo */}
            <div className="p-6 border-b border-red-700">
                <h1 className="text-2xl font-bold text-center">
                    Admin Panel
                </h1>
            </div>

            {/* Menu */}
            <nav className="p-3 space-y-1">

                <Link
                    to="/admin-dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-700 transition"
                >
                    <FaHome />
                    Dashboard
                </Link>

                <Link
                    to="/donor-managementAD"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-700 transition"
                >
                    <FaUsers />
                    Donors
                </Link>

                <Link
                    to="/recipient-managementAD"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-700 transition"
                >
                    <FaUserInjured />
                    Recipients
                </Link>

                <Link
                    to="/hospital-managementAD"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-700 transition"
                >
                    <FaHospital />
                    Hospitals
                </Link>

                <Link
                    to="/bloodbank-managementAD"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-700 transition"
                >
                    <FaHeartbeat />
                    Blood Banks
                </Link>

                <Link
                    to="/blood-stock-managementAD"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-700 transition"
                >
                    <FaTint />
                    Blood Stocks
                </Link>

                <Link
                    to="/emergency-requestsAD"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-700 transition"
                >
                    <FaHeartbeat />
                    Emergency Requests
                </Link>

                <Link
                    to="/notificationsAD"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-700 transition"
                >
                    <FaBell />
                    Notifications
                </Link>

                <Link
                    to="/reports"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-700 transition"
                >
                    <FaChartBar />
                    Reports
                </Link>

                <Link
                    to="/admin-profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-700 transition"
                >
                    <FaUser />
                    Profile
                </Link>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-700 transition text-left"
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </nav>

        </aside>
    );
}

export default AdminPanel;