import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DonorPanel from "../../components/donorPanel";
import { useEffect, useState } from "react";


function DonorDashboard() {
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

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/appointments")
            .then((res) => res.json())
            .then((data) => setAppointments(data))
            .catch((err) => console.log(err));
    }, []);
    const totalDonations = appointments.filter(
        (appointment) =>
            appointment.donorEmail === user.email &&
            appointment.status === "completed"
    ).length;
    const now = new Date();

    const nextAppointment = appointments
        .filter((appointment) => {
            const appointmentDateTime = new Date(
                `${appointment.date}T${appointment.time}`
            );

            return (
                appointment.email === user.email &&
                appointment.status === "Confirmed" &&
                appointmentDateTime >= now
            );
        })
        .sort(
            (a, b) =>
                new Date(`${a.date}T${a.time}`) -
                new Date(`${b.date}T${b.time}`)
        )[0];

    const recentDonations = appointments
        .filter(
            (appointment) =>
                appointment.email === user.email &&
                appointment.status === "completed"
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    const [emergencyRequestss, setEmergencyRequestss] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/emergencyRequests")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setEmergencyRequestss(data);
            });
    }, []);

    const matchingRequests = emergencyRequestss
        .filter(
            (request) =>
                request.bloodGroup === user.bloodGroup &&
                request.status === "pending"
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (

        <div className="min-h-screen bg-gray-100 flex">

            <DonorPanel />

            <div className="flex-1 p-8">

                <h2 className="text-3xl font-bold mb-6">
                    Welcome, {user.fullName}
                </h2>

                {/* Stats */}

                <div className="grid md:grid-cols-4 gap-6 mb-8">

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-gray-500">Blood Group</h3>
                        <p className="text-3xl font-bold text-red-600 mt-2">
                            {user.bloodGroup}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-gray-500">Total Donations</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {totalDonations}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-gray-500">Next Appointment</h3>

                        <p className="font-semibold mt-2">
                            {nextAppointment
                                ? `${nextAppointment.date} ${nextAppointment.time}`
                                : "No Upcoming Appointment"}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-gray-500">Eligibility</h3>
                        <p className="text-green-600 font-bold mt-2">
                            Eligible
                        </p>
                    </div>

                </div>


                {/* Upcoming Appointment */}

                <div className="grid md:grid-cols-2 gap-6">

                    <div className="bg-white rounded-xl shadow-lg p-6">

                        <h3 className="text-xl font-bold mb-5 text-red-600">
                            Upcoming Appointment
                        </h3>

                        <h4 className="text-lg font-semibold text-gray-700"> {nextAppointment?.hospital || "-"}</h4>

                        <h4 className="text-lg font-semibold text-gray-700"> {nextAppointment?.date || "-"}</h4>

                        <h4 className="text-lg font-semibold text-gray-700"> {nextAppointment?.time || "-"}</h4>


                    </div>

                    {/* Donation History */}

                    <div className="bg-white rounded-xl shadow-lg p-6">

                        <h3 className="text-xl font-bold mb-5 text-red-600">
                            Recent Donations
                        </h3>

                        {recentDonations.length > 0 ? (
                            <div className="space-y-4">

                                {recentDonations.map((donation) => (

                                    <div
                                        key={donation.id}
                                        className="flex items-center justify-between bg-red-50 border border-red-100 rounded-xl p-4 hover:shadow-md transition"
                                    >

                                        <div>

                                            <h4 className="font-semibold text-gray-800">
                                                {donation.hospital}
                                            </h4>

                                            <p className="text-gray-500 text-sm mt-1">
                                                Donation Date
                                            </p>

                                            <p className="font-medium">
                                                {donation.date}
                                            </p>

                                        </div>

                                        <div className="text-right">

                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                Completed
                                            </span>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        ) : (

                            <div className="text-center py-10">



                                <h4 className="text-lg font-semibold text-gray-700">
                                    No Donations Yet
                                </h4>

                                <p className="text-gray-500 mt-2">
                                    Your completed donations will appear here.
                                </p>

                            </div>

                        )}

                    </div>

                </div >

                {/* Emergency Requests */}


                < div className="bg-white rounded-xl shadow-lg p-6 mt-8" >

                    <h3 className="text-xl font-bold mb-5 text-red-600">
                        Emergency Blood Requests
                    </h3>

                    {
                        matchingRequests.length > 0 ? (
                            matchingRequests.map((request) => (
                                <div
                                    key={request.id}
                                    className="flex justify-between items-center border-b py-4 last:border-b-0"
                                >
                                    <div>
                                        <p className="font-semibold text-lg text-red-600">
                                            {request.bloodGroup} Blood Needed
                                        </p>

                                        <p className="text-gray-600">
                                            {request.hospital}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {request.city}, {request.state}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Units Required : {request.units}
                                        </p>
                                    </div>

                                    <button
                                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                                        onClick={() => navigate(`/donate/${request.id}`)}
                                    >
                                        Donate Now
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">
                                    No emergency requests matching your blood group.
                                </p>
                            </div>
                        )
                    }

                </div >

            </div >

        </div >

    );
}

export default DonorDashboard;