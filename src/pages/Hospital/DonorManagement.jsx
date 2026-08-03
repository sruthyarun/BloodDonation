import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    FaSearch,
    FaUser,
    FaTint,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaCheck,
    FaTimes,
} from "react-icons/fa";

import HospitalPanel from "../../components/HospitalPanel";


function DonorManagement() {

    const user = useSelector(
        (state) => state.user.currentUser
    );


    const [donors, setDonors] = useState([]);

    const [search, setSearch] = useState("");



    useEffect(() => {

        if (user) {
            fetchDonors();
        }

    }, [user]);




    const fetchDonors = async () => {

        try {

            const response = await fetch(
                `http://localhost:5000/appointments?hospital=${encodeURIComponent(
                    user.hospitalName
                )}`
            );


            const data = await response.json();

            setDonors(data);


        } catch (error) {

            console.log(error);

        }

    };





    const filteredDonors = donors.filter(
        (donor) =>

            donor.donorName
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )

    );



    const updateStatus = async (
        appointment,
        status
    ) => {


        try {


            await fetch(
                `http://localhost:5000/appointments/${appointment.id}`,
                {

                    method: "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        status
                    })

                }
            );



            // notification to donor

            await fetch(
                "http://localhost:5000/notifications",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        title:
                            `Appointment ${status}`,

                        type:
                            "appointment",


                        emailTo:
                            appointment.donorEmail,


                        emailBy:
                            user.email,


                        message:
                            `Your blood donation appointment at ${appointment.hospital} is ${status}.`,

                        time:
                            "Just now",

                        read: false

                    })

                }
            );



            alert(
                `Appointment ${status}`
            );


            fetchDonors();



        }
        catch (error) {

            console.log(error);

        }

    };





    return (

        <div className="min-h-screen bg-gray-100 flex">


            <HospitalPanel />


            <div className="flex-1 p-8">


                <h1 className="text-3xl font-bold mb-2">
                    Donor Management
                </h1>

                <p className="text-gray-500 mb-8">
                    Manage donation appointments
                </p>




                {/* Search */}

                <div className="bg-white p-3 rounded-lg shadow flex items-center mb-8">

                    <FaSearch />

                    <input

                        className="ml-3 outline-none w-full"

                        placeholder="Search donor"

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                    />

                </div>





                {/* Cards */}

                <div className="space-y-6">


                    {
                        filteredDonors.map((donor) => (


                            <div

                                key={donor.id}

                                className="bg-white rounded-xl shadow p-6"

                            >


                                <div className="flex justify-between">


                                    <div>


                                        <h2 className="text-xl font-bold text-red-600 flex gap-2 items-center">

                                            <FaUser />

                                            {donor.donorName}

                                        </h2>


                                        <p className="mt-2 flex gap-2">

                                            <FaTint className="text-red-600" />

                                            {donor.bloodGroup}

                                        </p>


                                        <p className="flex gap-2">

                                            <FaPhoneAlt className="text-red-600" />

                                            {donor.phone}

                                        </p>


                                        <p className="flex gap-2">

                                            <FaMapMarkerAlt className="text-red-600" />

                                            {donor.district}

                                        </p>


                                    </div>




                                    <span
                                        className={`
px-4 py-2 rounded-full h-fit

${donor.status === "Confirmed"

                                                ?
                                                "bg-green-100 text-green-700"

                                                :
                                                donor.status === "Rejected"

                                                    ?
                                                    "bg-red-100 text-red-700"

                                                    :
                                                    "bg-yellow-100 text-yellow-700"

                                            }

`}
                                    >

                                        {donor.status}

                                    </span>



                                </div>





                                <div className="mt-5 grid md:grid-cols-3 gap-4">


                                    <div>
                                        <b>Date</b>
                                        <p>{donor.date}</p>
                                    </div>


                                    <div>
                                        <b>Time</b>
                                        <p>{donor.time}</p>
                                    </div>


                                    <div>
                                        <b>Hospital</b>
                                        <p>{donor.hospital}</p>
                                    </div>


                                </div>






                                {
                                    donor.status === "Pending" &&

                                    <div className="flex gap-3 mt-6">


                                        <button

                                            onClick={() =>
                                                updateStatus(
                                                    donor,
                                                    "Confirmed"
                                                )
                                            }

                                            className="bg-green-600 text-white px-5 py-2 rounded-lg flex gap-2 items-center"

                                        >

                                            <FaCheck />

                                            Confirm

                                        </button>




                                        <button

                                            onClick={() =>
                                                updateStatus(
                                                    donor,
                                                    "Rejected"
                                                )
                                            }

                                            className="bg-red-600 text-white px-5 py-2 rounded-lg flex gap-2 items-center"

                                        >

                                            <FaTimes />

                                            Reject

                                        </button>


                                    </div>

                                }




                            </div>


                        ))

                    }



                </div>


            </div>


        </div>

    );

}


export default DonorManagement;