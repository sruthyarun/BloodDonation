import {
    FaTint,
    FaHome,
    FaWarehouse,
    FaUsers,
    FaClipboardList,
    FaCalendarAlt,
    FaHeartbeat,
    FaBell,
    FaUser,
    FaSignOutAlt,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";


function BloodBankPanel() {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    // Logged in blood bank user

    const user = useSelector(
        (state) => state.user.currentUser
    );



    const handleLogout = () => {

        dispatch(logoutUser());

        localStorage.removeItem(
            "loggedInUser"
        );

        navigate("/login");

    };



    return (

        <aside className="w-64 min-h-screen bg-red-800 text-white p-6">


            {/* Header */}

            <div className="mb-8">


                <h1 className="text-2xl font-bold flex items-center gap-2">

                    <FaTint />

                    Blood Bank

                </h1>



                {
                    user && (

                        <div className="mt-5 bg-red-700 rounded-lg p-3">


                            <p className="font-semibold">

                                {
                                    user.bankName ||
                                    user.bloodBankName ||
                                    user.fullName
                                }

                            </p>


                            <p className="text-sm text-red-200">

                                {user.email}

                            </p>


                        </div>

                    )
                }


            </div>





            <nav className="space-y-5">


                {/* Dashboard */}

                <Link

                    to="/bloodbank-dashboard"

                    className="flex items-center gap-3 hover:text-yellow-300"

                >

                    <FaHome />

                    Dashboard

                </Link>





                {/* Inventory */}

                <Link

                    to="/bloodbank-inventory"

                    className="flex items-center gap-3 hover:text-yellow-300"

                >

                    <FaWarehouse />

                    Blood Inventory

                </Link>





                {/* Blood Requests */}

                <Link

                    to="/bloodbank-bloodrequests"

                    className="flex items-center gap-3 hover:text-yellow-300"

                >

                    <FaClipboardList />

                    Blood Requests

                </Link>


                {/* Donor Management */}

                <Link

                    to="/bloodbank-donor-management"

                    className="flex items-center gap-3 hover:text-yellow-300"

                >

                    <FaCalendarAlt />

                    Donor Appointments

                </Link>


                {/* Emergency */}

                <Link

                    to="/bloodbank-emergency"

                    className="flex items-center gap-3 hover:text-yellow-300"

                >

                    <FaHeartbeat />

                    Emergency Requests

                </Link>





                {/* Notifications */}

                <Link

                    to="/bloodbank-notifications"

                    className="flex items-center gap-3 hover:text-yellow-300"

                >

                    <FaBell />

                    Notifications

                </Link>





                {/* Profile */}

                <Link

                    to="/bloodbank-profile"

                    className="flex items-center gap-3 hover:text-yellow-300"

                >

                    <FaUser />

                    Profile

                </Link>





                {/* Logout */}

                <button

                    onClick={handleLogout}

                    className="flex items-center gap-3 hover:text-yellow-300"

                >

                    <FaSignOutAlt />

                    Logout

                </button>



            </nav>


        </aside>

    );

}


export default BloodBankPanel;