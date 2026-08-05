import {
    FaTint,
    FaCalendarCheck,
    FaCheckCircle,
    FaExclamationTriangle,
    FaBell,
} from "react-icons/fa";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DonorPanel from "../../components/donorPanel";
function Notifications() {
    const user = useSelector((state) => state.user.currentUser);

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!user) return;

        const loadNotifications = async () => {
            try {
                const response = await fetch(
                    "https://blood-donation-backend-olwl.onrender.com/notifications"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch notifications");
                }

                const data = await response.json();

                const userNotifications = data.filter(
                    (notification) =>
                        notification.emailTo?.toLowerCase() ===
                        user.email?.toLowerCase()
                );

                setNotifications(userNotifications);

            } catch (error) {
                console.error(error);
            }
        };

        loadNotifications();
    }, [user]);

    const getIcon = (type) => {
        switch (type) {
            case "appointment":
                return <FaCalendarCheck />;

            case "donation":
                return <FaCheckCircle />;

            case "emergency":
                return <FaTint />;

            default:
                return <FaExclamationTriangle />;
        }
    };

    const getColor = (type) => {
        switch (type) {
            case "appointment":
                return "bg-blue-100 text-blue-600";

            case "donation":
                return "bg-green-100 text-green-600";

            case "emergency":
                return "bg-red-100 text-red-600";

            default:
                return "bg-yellow-100 text-yellow-600";
        }
    };

    if (!user) {
        return (
            <div className="text-center mt-20 text-xl">
                Please Login
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">

            <DonorPanel />
            <div className="min-h-screen bg-gray-100 p-8 flex-1">

                <div className="flex items-center gap-3 mb-8">
                    <FaBell className="text-3xl text-red-600" />
                    <h1 className="text-3xl font-bold">
                        Notifications
                    </h1>
                </div>

                {notifications.length === 0 ? (
                    <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
                        No Notifications Found
                    </div>
                ) : (
                    <div className="space-y-5">

                        {notifications.map((item) => (

                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center"
                            >

                                <div className="flex gap-4">

                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${getColor(item.type)}`}
                                    >
                                        {getIcon(item.type)}
                                    </div>

                                    <div>

                                        <h2 className="font-semibold text-lg">
                                            {item.title}
                                        </h2>

                                        <p className="text-gray-600">
                                            {item.message}
                                        </p>

                                        <p className="text-sm text-gray-400">
                                            {item.time}
                                        </p>

                                    </div>

                                </div>

                                <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
                                    Mark as Read
                                </button>

                            </div>

                        ))}

                    </div>
                )}

            </div>
        </div >
    );
}

export default Notifications;