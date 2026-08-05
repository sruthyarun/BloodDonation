import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    FaTint,
    FaUsers,
    FaHospital,
    FaClipboardList,
    FaExclamationTriangle,
    FaCalendarCheck,
    FaArrowUp,
    FaArrowDown,
} from "react-icons/fa";


import BloodBankPanel from "../../components/BBPanel";


function BloodBankDashboard() {


    const user = useSelector(
        (state) => state.user.currentUser
    );


    const [inventory, setInventory] = useState([]);
    const [requests, setRequests] = useState([]);
    const [emergency, setEmergency] = useState([]);
    const [appointments, setAppointments] = useState([]);



    useEffect(() => {

        if (user) {

            fetchData();

        }

    }, [user]);



    const fetchData = async () => {

        try {


            const inventoryRes =
                await fetch(
                    `https://blood-donation-backend-olwl.onrender.com/bloodInventory?bank=${user.email}`
                );


            const requestRes =
                await fetch(
                    `https://blood-donation-backend-olwl.onrender.com/bloodRequests?hospital=${user.bankName}`
                );


            const emergencyRes =
                await fetch(
                    `https://blood-donation-backend-olwl.onrender.com/emergencyRequests`
                );


            const appointmentRes =
                await fetch(
                    `https://blood-donation-backend-olwl.onrender.com/appointments?hospital=${user.bankName}`
                );



            setInventory(
                await inventoryRes.json()
            );


            setRequests(
                await requestRes.json()
            );


            setEmergency(
                await emergencyRes.json()
            );


            setAppointments(
                await appointmentRes.json()
            );


        }
        catch (error) {

            console.log(error);

        }

    };



    const totalUnits =
        inventory.reduce(
            (sum, item) => sum + Number(item.units),
            0
        );



    return (

        <div className="min-h-screen bg-gray-100 flex">


            <BloodBankPanel />



            <main className="flex-1 p-8">



                {/* Welcome Section */}

                <div className="bg-gradient-to-r from-red-700 to-red-300 text-white rounded-2xl p-8 shadow-lg">


                    <h1 className="text-3xl font-bold">

                        Welcome,
                        {
                            user?.bankName ||
                            user?.fullName
                        }

                    </h1>


                    <p className="mt-2 text-red-100">

                        Manage blood inventory, requests and emergency services

                    </p>



                    <div className="mt-5">

                        <p>

                            {user?.email}

                        </p>



                    </div>


                </div>





                {/* Statistics */}


                <div className="grid md:grid-cols-4 gap-6 mt-8">



                    <div className="bg-white rounded-xl shadow p-6">

                        <FaTint className="text-red-600 text-3xl" />

                        <h2 className="text-3xl font-bold mt-3">

                            {totalUnits}

                        </h2>

                        <p className="text-gray-500">

                            Total Blood Units

                        </p>

                    </div>




                    <div className="bg-white rounded-xl shadow p-6">

                        <FaClipboardList className="text-blue-600 text-3xl" />


                        <h2 className="text-3xl font-bold mt-3">

                            {requests.length}

                        </h2>

                        <p>

                            Blood Requests

                        </p>

                    </div>





                    <div className="bg-white rounded-xl shadow p-6">


                        <FaExclamationTriangle
                            className="text-red-600 text-3xl"
                        />


                        <h2 className="text-3xl font-bold mt-3">

                            {emergency.length}

                        </h2>


                        <p>

                            Emergency Requests

                        </p>


                    </div>





                    <div className="bg-white rounded-xl shadow p-6">


                        <FaCalendarCheck
                            className="text-green-600 text-3xl"
                        />


                        <h2 className="text-3xl font-bold mt-3">

                            {appointments.length}

                        </h2>


                        <p>

                            Appointments

                        </p>


                    </div>



                </div>







                {/* Inventory */}

                <div className="bg-white rounded-xl shadow mt-8 p-6">


                    <h2 className="text-xl font-bold mb-5">

                        Blood Stock

                    </h2>



                    <div className="grid md:grid-cols-4 gap-5">


                        {
                            inventory.map((item) => (


                                <div
                                    key={item.id}
                                    className="border rounded-xl p-5 text-center"
                                >


                                    <FaTint
                                        className="text-red-600 text-3xl mx-auto"
                                    />


                                    <h3 className="text-2xl font-bold mt-3">

                                        {item.group}

                                    </h3>


                                    <p className="text-gray-600">

                                        {item.units} Units

                                    </p>



                                    <span
                                        className={`inline-block mt-3 px-3 py-1 rounded-full text-sm
${item.units < 10
                                                ?
                                                "bg-red-100 text-red-700"
                                                :
                                                "bg-green-100 text-green-700"
                                            }
`}
                                    >


                                        {
                                            item.units < 10
                                                ?
                                                "Low Stock"
                                                :
                                                "Available"
                                        }


                                    </span>


                                </div>


                            ))
                        }



                    </div>


                </div>



            </main>


        </div>


    );

}


export default BloodBankDashboard;