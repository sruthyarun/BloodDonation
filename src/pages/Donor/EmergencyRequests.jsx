import { useEffect, useState } from "react";
import {
    FaTint,
    FaHospital,
    FaUser,
    FaMapMarkerAlt,
    FaPhone,
    FaSearch,
    FaClock,
} from "react-icons/fa";
import DonorPanel from "../../components/donorPanel";


function DonorEmergencyRequests() {

    const [requests, setRequests] = useState([]);

    const [search, setSearch] = useState("");



    useEffect(() => {

        loadEmergencyRequests();

    }, []);



    const loadEmergencyRequests = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/emergencyRequests"
            );


            const data = await response.json();


            const activeRequests = data.filter(
                (item) =>
                    item.status === "Active"
            );


            setRequests(activeRequests);


        } catch (error) {

            console.log(error);

        }

    };




    const filteredRequests = requests.filter(
        (item) =>

            item.bloodGroup
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            item.district
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            item.hospital
                ?.toLowerCase()
                .includes(search.toLowerCase())

    );



    return (

        <div className="min-h-screen bg-gray-100 flex">


            <DonorPanel />


            <div className="flex-1 p-8">


                {/* Header */}

                <div className="mb-8">


                    <h1 className="text-3xl font-bold text-gray-800">

                        Emergency Blood Requests

                    </h1>


                    <p className="text-gray-500 mt-2">

                        Help patients by responding to urgent blood needs.

                    </p>


                </div>





                {/* Search */}

                <div className="bg-white rounded-lg shadow px-4 py-3 flex items-center mb-8">


                    <FaSearch
                        className="text-gray-500"
                    />


                    <input

                        type="text"

                        placeholder="Search Blood Group / Hospital / District"

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                        className="ml-3 outline-none w-full"

                    />


                </div>





                {/* Requests */}

                <div className="grid lg:grid-cols-2 gap-6">


                    {
                        filteredRequests.length > 0 ? (


                            filteredRequests.map((request) => (


                                <div

                                    key={request.id}

                                    className="bg-white rounded-2xl shadow-lg p-6"

                                >


                                    <div className="flex justify-between items-center">


                                        <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">


                                            <FaTint />

                                            {request.bloodGroup}


                                        </h2>



                                        <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full">

                                            {request.status}

                                        </span>


                                    </div>





                                    <div className="mt-5 space-y-3">


                                        <p className="flex gap-2 items-center">

                                            <FaUser className="text-red-600" />

                                            Patient:

                                            <b>
                                                {request.patientName}
                                            </b>

                                        </p>





                                        <p className="flex gap-2 items-center">

                                            <FaHospital className="text-red-600" />

                                            {request.hospital}

                                        </p>





                                        <p className="flex gap-2 items-center">

                                            <FaMapMarkerAlt className="text-red-600" />

                                            {request.district}

                                        </p>





                                        <p>

                                            Required Units:

                                            <b>
                                                {" "}
                                                {request.units}
                                            </b>

                                        </p>





                                        <p>

                                            Request By:

                                            <b>
                                                {" "}
                                                {request.requestedBy}
                                            </b>

                                        </p>





                                        <p>

                                            Reason:

                                            <b>
                                                {" "}
                                                {request.reason}
                                            </b>

                                        </p>





                                        <p className="flex gap-2 items-center text-gray-500">

                                            <FaClock />

                                            {new Date(
                                                request.createdAt
                                            ).toLocaleDateString(
                                                "en-IN"
                                            )}

                                        </p>


                                    </div>






                                    <div className="mt-6 flex justify-between items-center">


                                        <div className="flex gap-2 items-center text-gray-700">

                                            <FaPhone
                                                className="text-green-600"
                                            />

                                            {request.contact}

                                        </div>





                                        <button

                                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"

                                            onClick={() =>
                                                alert(
                                                    `Contact ${request.contact}`
                                                )
                                            }

                                        >

                                            Respond

                                        </button>


                                    </div>



                                </div>


                            ))


                        ) : (


                            <div className="col-span-2 bg-white rounded-xl shadow p-10 text-center">


                                <h2 className="text-xl font-semibold">

                                    No Emergency Requests Found

                                </h2>


                                <p className="text-gray-500 mt-2">

                                    There are no active blood requests.

                                </p>


                            </div>


                        )
                    }



                </div>


            </div>


        </div>

    );

}


export default DonorEmergencyRequests;