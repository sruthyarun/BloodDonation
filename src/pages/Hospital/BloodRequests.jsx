import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
    FaSearch,
    FaUser,
    FaTint,
    FaCalendarAlt,
    FaCheck,
    FaTimes,
} from "react-icons/fa";

import HospitalPanel from "../../components/HospitalPanel";


function BloodRequests() {


    const user =
        useSelector(
            (state) => state.user.currentUser
        );



    const [requests, setRequests] =
        useState([]);


    const [search, setSearch] =
        useState("");





    useEffect(() => {

        if (user)
            fetchRequests();

    }, [user]);





    const fetchRequests = async () => {

        try {


            const response =
                await fetch(

                    `https://blood-donation-backend-olwl.onrender.com/bloodRequests?hospital=${encodeURIComponent(
                        user.hospitalName
                    )}`

                );


            const data =
                await response.json();


            setRequests(data);


        }
        catch (error) {

            console.log(error);

        }

    };





    const updateStatus = async (
        request,
        status
    ) => {


        try {


            // update request status

            await fetch(

                `https://blood-donation-backend-olwl.onrender.com/bloodRequests/${request.id}`,

                {

                    method: "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        status
                    })

                });


            // send notification

            await fetch(

                "https://blood-donation-backend-olwl.onrender.com/notifications",

                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },


                    body: JSON.stringify({

                        title:
                            `Blood Request ${status}`,

                        type:
                            "bloodRequest",


                        emailTo:
                            request.email,


                        emailBy:
                            user.email,


                        message:
                            `Your blood request for ${request.bloodGroup} has been ${status}.`,

                        time:
                            "Just now",

                        read: false

                    })

                });



            alert(
                `Request ${status}`
            );


            fetchRequests();



        }
        catch (error) {

            console.log(error);

        }


    };







    const filteredRequests =
        requests.filter(

            (item) =>

                item.patientName
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                item.bloodGroup
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

        );





    return (


        <div className="min-h-screen bg-gray-100 flex">


            <HospitalPanel />



            <div className="flex-1 p-8">



                <h1 className="text-3xl font-bold mb-2">

                    Blood Requests

                </h1>


                <p className="text-gray-500 mb-8">

                    Manage recipient blood requests

                </p>






                {/* Search */}


                <div className="bg-white shadow rounded-lg p-3 flex items-center mb-8">


                    <FaSearch className="text-gray-500" />


                    <input

                        className="ml-3 outline-none w-full"

                        placeholder="Search patient / blood group"

                        value={search}

                        onChange={
                            (e) => setSearch(
                                e.target.value
                            )
                        }

                    />


                </div>







                {/* Summary */}


                <div className="grid md:grid-cols-4 gap-6 mb-8">


                    <div className="bg-white rounded-xl shadow p-6 text-center">

                        <h2 className="text-3xl font-bold text-red-600">

                            {requests.length}

                        </h2>

                        <p>Total Requests</p>

                    </div>




                    <div className="bg-white rounded-xl shadow p-6 text-center">

                        <h2 className="text-3xl font-bold text-yellow-600">

                            {
                                requests.filter(
                                    r => r.status === "Pending"
                                ).length
                            }

                        </h2>

                        <p>Pending</p>

                    </div>




                    <div className="bg-white rounded-xl shadow p-6 text-center">

                        <h2 className="text-3xl font-bold text-green-600">

                            {
                                requests.filter(
                                    r => r.status === "Approved"
                                ).length
                            }

                        </h2>

                        <p>Approved</p>

                    </div>





                    <div className="bg-white rounded-xl shadow p-6 text-center">

                        <h2 className="text-3xl font-bold text-red-600">

                            {
                                requests.filter(
                                    r => r.priority === "Emergency"
                                ).length
                            }

                        </h2>

                        <p>Emergency</p>

                    </div>



                </div>







                {/* Request Cards */}


                <div className="space-y-6">


                    {

                        filteredRequests.length > 0 ?

                            filteredRequests.map(
                                (request) => (


                                    <div

                                        key={request.id}

                                        className="bg-white rounded-xl shadow-lg p-6"

                                    >



                                        <div className="flex justify-between">


                                            <div>


                                                <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">


                                                    <FaUser />

                                                    {request.patientName}


                                                </h2>



                                                <p className="mt-3 flex gap-2">

                                                    <FaTint className="text-red-600" />

                                                    Blood Group:

                                                    <b>
                                                        {request.bloodGroup}
                                                    </b>

                                                </p>



                                                <p>

                                                    Units Required:

                                                    <b>
                                                        {request.units}
                                                    </b>

                                                </p>



                                                <p className="flex gap-2">

                                                    <FaCalendarAlt className="text-red-600" />

                                                    {request.date}

                                                </p>



                                            </div>




                                            <span
                                                className={`
px-4 py-2 rounded-full h-fit

${request.status === "Approved"

                                                        ?
                                                        "bg-green-100 text-green-700"

                                                        :

                                                        request.status === "Rejected"

                                                            ?
                                                            "bg-red-100 text-red-700"

                                                            :
                                                            "bg-yellow-100 text-yellow-700"

                                                    }

`}
                                            >

                                                {request.status}

                                            </span>



                                        </div>







                                        <div className="mt-5">


                                            <p>
                                                Priority :

                                                <span className="font-semibold">

                                                    {request.priority}

                                                </span>

                                            </p>



                                            <p>
                                                Reason :

                                                <span className="font-semibold">

                                                    {request.reason}

                                                </span>

                                            </p>


                                        </div>








                                        {
                                            request.status === "Pending" &&

                                            <div className="flex gap-4 mt-6">


                                                <button

                                                    onClick={() =>
                                                        updateStatus(
                                                            request,
                                                            "Approved"
                                                        )
                                                    }

                                                    className="bg-green-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"

                                                >

                                                    <FaCheck />

                                                    Approve

                                                </button>




                                                <button

                                                    onClick={() =>
                                                        updateStatus(
                                                            request,
                                                            "Rejected"
                                                        )
                                                    }

                                                    className="bg-red-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"

                                                >

                                                    <FaTimes />

                                                    Reject

                                                </button>


                                            </div>

                                        }



                                    </div>


                                )

                            )


                            :

                            <div className="bg-white p-10 rounded-xl text-center">

                                No Blood Requests Found

                            </div>


                    }



                </div>



            </div>


        </div>


    );


}


export default BloodRequests;