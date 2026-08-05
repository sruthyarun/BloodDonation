import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    FaSearch,
    FaHospital,
    FaCalendarAlt,
    FaEye,
    FaTrash,
    FaPlus,
} from "react-icons/fa";

import RecipientPanel from "../../components/RecipientPanel";


function MyRequests() {

    const user = useSelector(
        (state) => state.user.currentUser
    );

    const navigate = useNavigate();


    const [requests, setRequests] = useState([]);
    const [search, setSearch] = useState("");


    useEffect(() => {

        if (user) {
            fetchRequests();
        }

    }, [user]);


    const fetchRequests = async () => {

        try {

            const response = await fetch(
                "https://blood-donation-backend-olwl.onrender.com/bloodRequests"
            );

            const data = await response.json();


            const myRequests = data.filter(
                (request) =>
                    request.email === user.email
            );


            setRequests(myRequests);


        } catch (error) {

            console.log(error);

        }

    };



    const deleteRequest = async (id) => {


        const confirmDelete = window.confirm(
            "Delete this request?"
        );


        if (!confirmDelete)
            return;



        try {

            await fetch(
                `https://blood-donation-backend-olwl.onrender.com/bloodRequests/${id}`,
                {
                    method: "DELETE",
                }
            );


            fetchRequests();


        } catch (error) {

            console.log(error);

        }

    };



    const filteredRequests = requests.filter(
        (request) =>

            request.patientName
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            request.bloodGroup
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            request.hospital
                ?.toLowerCase()
                .includes(search.toLowerCase())

    );



    const total = requests.length;


    const pending = requests.filter(
        (item) =>
            item.status?.toLowerCase() === "pending"
    ).length;


    const approved = requests.filter(
        (item) =>
            item.status?.toLowerCase() === "approved"
    ).length;


    const completed = requests.filter(
        (item) =>
            item.status?.toLowerCase() === "completed"
    ).length;



    const getStatusColor = (status) => {


        switch (status?.toLowerCase()) {


            case "approved":
                return "bg-green-100 text-green-700";


            case "pending":
                return "bg-yellow-100 text-yellow-700";


            case "completed":
                return "bg-blue-100 text-blue-700";


            case "rejected":
                return "bg-red-100 text-red-700";


            default:
                return "bg-gray-100 text-gray-700";

        }

    };



    return (

        <div className="min-h-screen bg-gray-100 flex">


            <RecipientPanel />


            <div className="flex-1 p-8">



                {/* Header */}

                <div className="flex flex-col md:flex-row justify-between items-center mb-8">


                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            My Blood Requests
                        </h1>


                        <p className="text-gray-500 mt-2">
                            Track all your blood requests
                        </p>

                    </div>




                    <div className="flex gap-4 mt-4 md:mt-0">


                        <button

                            onClick={() =>
                                navigate("/blood-request")
                            }

                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg shadow"

                        >

                            <FaPlus />

                            New Request

                        </button>




                        <div className="flex items-center bg-white rounded-lg shadow px-4 py-3">

                            <FaSearch className="text-gray-500" />


                            <input

                                type="text"

                                placeholder="Search..."

                                value={search}

                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }

                                className="ml-2 outline-none"

                            />

                        </div>


                    </div>


                </div>





                {/* Summary Cards */}


                <div className="grid md:grid-cols-4 gap-5 mb-8">


                    <div className="bg-white rounded-xl shadow p-5 text-center text-red-600">

                        <h2 className="text-3xl font-bold">
                            {total}
                        </h2>

                        <p>
                            Total Requests
                        </p>

                    </div>



                    <div className="bg-white rounded-xl shadow p-5 text-center text-yellow-600">

                        <h2 className="text-3xl font-bold">
                            {pending}
                        </h2>

                        <p>
                            Pending
                        </p>

                    </div>




                    <div className="bg-white rounded-xl shadow p-5 text-center text-green-600">

                        <h2 className="text-3xl font-bold">
                            {approved}
                        </h2>

                        <p>
                            Approved
                        </p>

                    </div>




                    <div className="bg-white rounded-xl shadow p-5 text-center text-blue-600">

                        <h2 className="text-3xl font-bold">
                            {completed}
                        </h2>

                        <p>
                            Completed
                        </p>

                    </div>


                </div>






                {/* Request Cards */}


                <div className="space-y-5">


                    {
                        filteredRequests.length === 0 ? (

                            <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">

                                No Blood Requests Found

                            </div>

                        ) : (


                            filteredRequests.map((request) => (


                                <div

                                    key={request.id}

                                    className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"

                                >



                                    <div className="flex flex-col md:flex-row justify-between gap-5">



                                        <div className="space-y-3">


                                            <h2 className="text-xl font-bold text-red-600">

                                                {request.patientName}

                                            </h2>



                                            <p className="flex items-center gap-2">

                                                <FaHospital className="text-red-500" />

                                                {request.hospital}

                                            </p>




                                            <p>

                                                Blood Group :

                                                <span className="ml-2 bg-red-100 text-red-600 px-3 py-1 rounded-full">

                                                    {request.bloodGroup}

                                                </span>

                                            </p>



                                            <p>

                                                Units Required :
                                                {request.units}

                                            </p>




                                            <p className="flex items-center gap-2">

                                                <FaCalendarAlt className="text-red-500" />

                                                {request.requiredDate}

                                            </p>



                                        </div>





                                        <div className="flex flex-col items-end justify-between">


                                            <span

                                                className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(request.status)}`}

                                            >

                                                {request.status}

                                            </span>




                                            <div className="flex gap-3 mt-5">


                                                <button

                                                    className="bg-blue-600 text-white p-3 rounded-lg"

                                                >

                                                    <FaEye />

                                                </button>





                                                {
                                                    request.status?.toLowerCase() === "pending" &&

                                                    <button

                                                        onClick={() =>
                                                            deleteRequest(request.id)
                                                        }

                                                        className="bg-red-600 text-white p-3 rounded-lg"

                                                    >

                                                        <FaTrash />

                                                    </button>

                                                }



                                            </div>


                                        </div>



                                    </div>


                                </div>


                            ))

                        )
                    }


                </div>


            </div>


        </div>

    );

}


export default MyRequests;