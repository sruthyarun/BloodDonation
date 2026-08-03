import { useState, useEffect } from "react";
import {
    FaBell,
    FaTint,
    FaHospital,
    FaCalendarAlt,
    FaExclamationTriangle,
    FaCheckCircle,
    FaTrash,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import RecipientPanel from "../../components/RecipientPanel";

function Rnotifications() {
    const user = useSelector((state) => state.user.currentUser);

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetchNotifications();
        }
    }, [user]);

    const fetchNotifications = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/notifications?email=${user.email}`
            );

            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error(error);
        }
    };

    const markAsRead = async (id) => {
        try {
            const notification = notifications.find((item) => item.id === id);

            await fetch(`http://localhost:5000/notifications/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    read: true,
                }),
            });

            setNotifications(
                notifications.map((item) =>
                    item.id === id ? { ...item, read: true } : item
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const deleteNotification = async (id) => {
        try {
            await fetch(`http://localhost:5000/notifications/${id}`, {
                method: "DELETE",
            });

            setNotifications(
                notifications.filter((item) => item.id !== id)
            );
        } catch (error) {
            console.error(error);
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case "success":
                return <FaCheckCircle className="text-green-600 text-2xl" />;

            case "alert":
                return (
                    <FaExclamationTriangle className="text-red-600 text-2xl" />
                );

            case "granted":
                return <FaCalendarAlt className="text-blue-600 text-2xl" />;

            case "hospital":
                return <FaHospital className="text-purple-600 text-2xl" />;

            default:
                return <FaTint className="text-red-600 text-2xl" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">


            <RecipientPanel />
            <div className="min-h-screen bg-gray-100 p-8 flex-1">

                <div className="flex items-center gap-3 mb-8">
                    <FaBell className="text-3xl text-red-600" />

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Notifications
                        </h1>

                        <p className="text-gray-500">
                            Stay updated with your latest activities.
                        </p>
                    </div>
                </div>

                <div className="space-y-5">

                    {notifications.length === 0 ? (
                        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
                            No notifications found.
                        </div>
                    ) : (
                        notifications.map((item) => (
                            <div
                                key={item.id}
                                className={`bg-white rounded-xl shadow-md p-6 flex justify-between items-start ${!item.read
                                    ? "border-l-4 border-red-600"
                                    : ""
                                    }`}
                            >
                                <div className="flex gap-4">

                                    <div className="mt-1">
                                        {getIcon(item.type)}
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            {item.title}
                                        </h2>

                                        <p className="text-gray-600 mt-1">
                                            {item.message}
                                        </p>

                                        <p className="text-sm text-gray-400 mt-2">
                                            {item.time}
                                        </p>

                                        {!item.read && (
                                            <span className="inline-block mt-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
                                                New
                                            </span>
                                        )}
                                    </div>

                                </div>

                                <div className="flex gap-3">

                                    {!item.read && (
                                        <button
                                            onClick={() => markAsRead(item.id)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                                        >
                                            Mark as Read
                                        </button>
                                    )}

                                    <button
                                        onClick={() => deleteNotification(item.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg"
                                    >
                                        <FaTrash />
                                    </button>

                                </div>
                            </div>
                        ))
                    )}

                </div>

            </div>
        </div>
    );
}

export default Rnotifications;