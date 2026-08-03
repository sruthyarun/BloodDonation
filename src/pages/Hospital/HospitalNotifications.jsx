import {
    FaTint,
    FaCalendarCheck,
    FaCheckCircle,
    FaExclamationTriangle,
    FaBell,
} from "react-icons/fa";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import HospitalPanel from "../../components/HospitalPanel";

function HospitalNotification() {
    const user = useSelector((state) => state.user.currentUser);

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!user) return;

        fetch(`http://localhost:5000/notifications?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => setNotifications(data))
            .catch((err) => console.error(err));
    }, [user]);

    // Mark notification as read
    const markAsRead = async (id) => {
        try {
            await fetch(`http://localhost:5000/notifications/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    read: true,
                }),
            });

            setNotifications((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? { ...item, read: true }
                        : item
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case "appointment":
                return <FaCalendarCheck />;

            case "donation":
                return <FaCheckCircle />;

            case "emergency":
                return <FaTint />;

            case "inventory":
                return <FaTint />;

            case "request":
                return <FaBell />;

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

            case "inventory":
                return "bg-purple-100 text-purple-600";

            case "request":
                return "bg-orange-100 text-orange-600";

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

            {/* Sidebar */}

            <HospitalPanel />

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
                                className={`rounded-xl shadow-md p-5 flex justify-between items-center transition ${item.read
                                    ? "bg-gray-50"
                                    : "bg-white border-l-4 border-red-600"
                                    }`}
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

                                        {!item.read && (
                                            <span className="inline-block mb-2 mt-1 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                                                New
                                            </span>
                                        )}

                                        <p className="text-gray-600">
                                            {item.message}
                                        </p>

                                        <p className="text-sm text-gray-400 mt-2">
                                            {item.time}
                                        </p>

                                    </div>

                                </div>

                                {!item.read ? (
                                    <button
                                        onClick={() => markAsRead(item.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                    >
                                        Mark as Read
                                    </button>
                                ) : (
                                    <button
                                        disabled
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                                    >
                                        Read
                                    </button>
                                )}

                            </div>

                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}

export default HospitalNotification;