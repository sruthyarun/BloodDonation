import { useEffect, useState } from "react";
import {
    FaCalendarAlt,
    FaHospital,
    FaMapMarkerAlt,
    FaClock,
    FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAppointmentsByEmail } from "../../API/getAppointment";
import DonorPanel from "../../components/donorPanel";
import { cancelAppointment } from "../../API/cancelAppointment";

function Appointment() {
    const navigate = useNavigate();


    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        loadAppointments();
    }, []);

    const loadAppointments = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("loggedInUser"));

            if (!user) return;

            const data = await getAppointmentsByEmail(user.email);

            const activeAppointments = data.filter(
                (appointment) =>
                    appointment.status?.toLowerCase() !== "completed"
            );

            setAppointments(activeAppointments);

        } catch (error) {
            console.error(error);
        }
    };
    const handleCancel = async (id) => {
        console.log("Cancelling appointment:", id);

        try {
            await cancelAppointment(id);
            alert("Appointment cancelled successfully!");
            loadAppointments();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">


            <DonorPanel />


            <div className="min-h-screen bg-gray-100 p-8 flex-1">


                <div className="flex justify-between items-center mb-8">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            My Appointments
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage your blood donation appointments
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/bookappointment")}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"
                    >
                        <FaPlus />
                        Book Appointment
                    </button>

                </div>

                {/* Appointments */}

                <div className="space-y-6">

                    {appointments.length === 0 ? (

                        <div className="bg-white rounded-xl p-8 shadow text-center">
                            <h2 className="text-xl font-semibold">
                                No Appointments Found
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Book your first blood donation appointment.
                            </p>
                        </div>

                    ) : (

                        appointments.map((appointment) => (

                            <div
                                key={appointment.id}
                                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
                            >

                                <div className="flex flex-col md:flex-row justify-between gap-6">

                                    <div className="space-y-3">

                                        <h2 className="text-2xl font-semibold text-red-600 flex items-center gap-2">
                                            <FaHospital />
                                            {appointment.hospital}
                                        </h2>

                                        <p className="flex items-center gap-2 text-gray-700">
                                            <FaMapMarkerAlt className="text-red-500" />
                                            {appointment.district}
                                        </p>

                                        <p className="flex items-center gap-2 text-gray-700">
                                            <FaCalendarAlt className="text-red-500" />
                                            {appointment.date}
                                        </p>

                                        <p className="flex items-center gap-2 text-gray-700">
                                            <FaClock className="text-red-500" />
                                            {appointment.time}
                                        </p>

                                    </div>

                                    <div className="flex flex-col justify-between items-end">

                                        <span
                                            className={`px-4 py-2 rounded-full text-sm font-semibold ${appointment.status === "Confirmed"
                                                ? "bg-green-100 text-green-700"
                                                : appointment.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {appointment.status}
                                        </span>

                                        <div className="flex gap-3 mt-6">
                                            <button
                                                onClick={() => handleCancel(appointment.id)}
                                                disabled={
                                                    appointment.status?.toLowerCase() === "completed" ||
                                                    appointment.status?.toLowerCase() === "cancelled"
                                                }
                                                className={`px-4 py-2 rounded-lg text-white ${appointment.status?.toLowerCase() === "completed" ||
                                                    appointment.status?.toLowerCase() === "cancelled"
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-red-600 hover:bg-red-700"
                                                    }`}
                                            >
                                                {appointment.status?.toLowerCase() === "cancelled"
                                                    ? "Cancelled"
                                                    : "Cancel"}
                                            </button>




                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>
        </div >
    );
}

export default Appointment;