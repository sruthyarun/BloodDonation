import {
    FaHospital,
    FaTint,
    FaUsers,
    FaClipboardList,
    FaCalendarAlt,
    FaBell,
    FaExclamationTriangle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
function HospitalPanel() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem("loggedInUser");
        navigate("/login");
    };
    return (

        <aside className="w-64 bg-red-800 text-white p-6">

            <h1 className="text-2xl font-bold flex items-center gap-2 mb-10">
                <FaHospital />
                Hospital
            </h1>

            <nav className="space-y-5">

                <Link to="/hospital-dashboard" className="block hover:text-yellow-300">
                    Dashboard
                </Link>

                <Link to="/blood-inventory" className="block hover:text-yellow-300">
                    Blood Inventory
                </Link>

                <Link to="/blood-requests" className="block hover:text-yellow-300">
                    Blood Requests
                </Link>

                <Link to="/donor-management" className="block hover:text-yellow-300">
                    Donor's Appointments
                </Link>

                <Link to="/hospital-emergency" className="block hover:text-yellow-300">
                    Emergency Requests
                </Link>

                <Link to="/notifications-hospital" className="block hover:text-yellow-300">
                    Notifications
                </Link>

                <Link to="/hospital-profile" className="block hover:text-yellow-300">
                    Profile
                </Link>

                <Link to="/" className="block hover:text-yellow-300">
                    Logout
                </Link>

            </nav>

        </aside>
    );
}

export default HospitalPanel;