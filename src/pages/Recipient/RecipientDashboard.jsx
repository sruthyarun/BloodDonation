import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    FaTint,
    FaHospital,
    FaCheckCircle,
    FaClock,
    FaPhone,
    FaMapMarkerAlt
} from "react-icons/fa";

import RecipientPanel from "../../components/RecipientPanel";


function RecipientDashboard() {


    const user = useSelector(
        (state) => state.user.currentUser
    );


    const [requests, setRequests] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [inventory, setInventory] = useState([]);



    useEffect(() => {

        if (!user) return;


        fetch(
            `https://blood-donation-backend-olwl.onrender.com/bloodRequests?email=${user.email}`
        )
            .then(res => res.json())
            .then(data => setRequests(data));


        fetch(
            "https://blood-donation-backend-olwl.onrender.com/hospitals"
        )
            .then(res => res.json())
            .then(data => setHospitals(data));


        fetch(
            "https://blood-donation-backend-olwl.onrender.com/bloodInventory"
        )
            .then(res => res.json())
            .then(data => setInventory(data));


    }, [user]);



    if (!user) {
        return (
            <h2 className="text-center mt-20 text-2xl">
                Please Login First
            </h2>
        )
    }



    const totalRequests = requests.length;


    const activeRequests =
        requests.filter(
            item => item.status === "Pending"
        ).length;



    const approvedRequests =
        requests.filter(
            item => item.status === "Approved"
        ).length;



    const latestRequest =
        requests.length > 0
            ?
            requests[requests.length - 1]
            :
            null;




    return (

        <div className="min-h-screen bg-gray-100 flex">


            <RecipientPanel />


            <main className="flex-1 p-8">


                <h1 className="text-3xl font-bold">

                    Welcome, {user.fullName}

                </h1>


                <p className="text-gray-500 mt-2">
                    Manage your blood requests and availability
                </p>




                {/* Statistics */}


                <div className="grid md:grid-cols-4 gap-6 mt-8">


                    <div className="bg-white rounded-xl shadow p-6">

                        <FaTint className="text-red-600 text-3xl" />

                        <h2 className="text-3xl font-bold mt-3">
                            {user.bloodGroup}
                        </h2>

                        <p className="text-gray-500">
                            Blood Group
                        </p>

                    </div>




                    <div className="bg-white rounded-xl shadow p-6">

                        <FaClock className="text-blue-600 text-3xl" />

                        <h2 className="text-3xl font-bold mt-3">
                            {activeRequests}
                        </h2>

                        <p>
                            Active Requests
                        </p>

                    </div>





                    <div className="bg-white rounded-xl shadow p-6">

                        <FaCheckCircle className="text-green-600 text-3xl" />

                        <h2 className="text-3xl font-bold mt-3">
                            {approvedRequests}
                        </h2>

                        <p>
                            Approved Requests
                        </p>

                    </div>





                    <div className="bg-white rounded-xl shadow p-6">

                        <FaHospital className="text-red-600 text-3xl" />

                        <h2 className="text-3xl font-bold mt-3">
                            {inventory.length}
                        </h2>

                        <p>
                            Available Blood Groups
                        </p>

                    </div>


                </div>




                {/* Latest Request */}


                <div className="bg-white rounded-xl shadow p-6 mt-8">


                    <h2 className="text-xl font-bold mb-5">
                        Latest Blood Request
                    </h2>


                    {

                        latestRequest ?

                            <div className="border rounded-xl p-5">


                                <h3 className="text-xl font-bold text-red-600">
                                    {latestRequest.hospital}
                                </h3>


                                <p className="mt-2">
                                    Blood Group :
                                    <b> {latestRequest.bloodGroup}</b>
                                </p>


                                <p>
                                    Units Required :
                                    <b> {latestRequest.units}</b>
                                </p>



                                <span className="inline-block mt-3 bg-green-100 text-green-700 px-4 py-2 rounded-full">

                                    {latestRequest.status}

                                </span>


                            </div>


                            :

                            <p className="text-gray-500">
                                No requests found
                            </p>

                    }



                </div>






                {/* Nearby Hospitals */}



                <div className="mt-8">


                    <h2 className="text-xl font-bold mb-5">
                        Nearby Hospitals
                    </h2>



                    <div className="grid md:grid-cols-2 gap-6">


                        {
                            hospitals.map(hospital => (


                                <div
                                    key={hospital.id}
                                    className="bg-white rounded-xl shadow p-6"
                                >


                                    <h3 className="text-xl font-bold text-red-600">

                                        {hospital.hospitalName}

                                    </h3>


                                    <p className="flex gap-2 mt-3">

                                        <FaMapMarkerAlt />

                                        {hospital.district}

                                    </p>


                                    <p className="flex gap-2 mt-2">

                                        <FaPhone />

                                        {hospital.phone}

                                    </p>



                                    <button className="mt-5 bg-red-600 text-white px-5 py-2 rounded-lg">

                                        Contact

                                    </button>



                                </div>


                            ))
                        }


                    </div>


                </div>




            </main>

        </div>

    )

}


export default RecipientDashboard;