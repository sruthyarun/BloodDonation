import {
    FaBell,
    FaTint,
    FaCalendarCheck,
    FaCheckCircle,
    FaExclamationTriangle,
    FaHospital,
} from "react-icons/fa";
import BloodBankPanel from "../../components/BBPanel";

function BloodBankNotifications() {
    const notifications = [
        {
            id: 1,
            icon: <FaTint />,
            title: "Low Blood Stock",
            message: "O- blood stock is critically low. Only 5 units are available.",
            time: "10 minutes ago",
            color: "bg-red-100 text-red-600",
        },
        {
            id: 2,
            icon: <FaHospital />,
            title: "Emergency Blood Request",
            message: "City Hospital urgently requested 4 units of O+ blood.",
            time: "30 minutes ago",
            color: "bg-orange-100 text-orange-600",
        },
        {
            id: 3,
            icon: <FaCalendarCheck />,
            title: "Blood Collection Scheduled",
            message: "15 donor appointments are scheduled for today's collection.",
            time: "1 hour ago",
            color: "bg-blue-100 text-blue-600",
        },
        {
            id: 4,
            icon: <FaCheckCircle />,
            title: "Blood Issue Completed",
            message: "2 units of A+ blood have been issued to General Hospital.",
            time: "2 hours ago",
            color: "bg-green-100 text-green-600",
        },
        {
            id: 5,
            icon: <FaTint />,
            title: "Inventory Updated",
            message: "Blood inventory has been updated after today's donation camp.",
            time: "Yesterday",
            color: "bg-purple-100 text-purple-600",
        },
        {
            id: 6,
            icon: <FaExclamationTriangle />,
            title: "Blood Expiry Alert",
            message: "5 units of AB- blood will expire within the next 48 hours.",
            time: "Yesterday",
            color: "bg-yellow-100 text-yellow-600",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">

            <BloodBankPanel />
            <div className="min-h-screen bg-gray-100 p-8 flex-1">

                {/* Header */}

                <div className="flex items-center gap-3 mb-8">

                    <FaBell className="text-4xl text-red-600" />

                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">
                            Blood Bank Notifications
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Stay updated with blood inventory alerts, emergency requests,
                            donation schedules and system updates.
                        </p>
                    </div>

                </div>

                {/* Notifications */}

                <div className="space-y-6">

                    {notifications.map((item) => (

                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 p-6 flex justify-between items-center"
                        >

                            <div className="flex items-start gap-5">

                                <div
                                    className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${item.color}`}
                                >
                                    {item.icon}
                                </div>

                                <div>

                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        {item.title}
                                    </h2>

                                    <p className="text-gray-600 mt-2 text-lg">
                                        {item.message}
                                    </p>

                                    <p className="text-gray-400 mt-3 text-sm">
                                        {item.time}
                                    </p>

                                </div>

                            </div>

                            <button className="bg-red-600 hover:bg-red-700 transition text-white px-6 py-3 rounded-xl font-semibold">
                                Mark as Read
                            </button>

                        </div>

                    ))}

                </div>

            </div>
        </div>
    );
}

export default BloodBankNotifications;