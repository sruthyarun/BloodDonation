import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaUser,
    FaTint,
    FaHospital,
    FaCalendarAlt,
    FaPhoneAlt,
    FaNotesMedical,
    FaEnvelope,
} from "react-icons/fa";

import { useSelector } from "react-redux";
import RecipientPanel from "../../components/RecipientPanel";
import { bloodRequest } from "../../API/addbloodRequest";


function BloodRequest() {

    const navigate = useNavigate();
    const user = useSelector(
        (state) => state.user.currentUser
    );


    const createInitialForm = () => ({

        recipientId: user?.id || "",

        recipientName:
            user?.fullName || "",

        patientName:
            user?.fullName || "",

        bloodGroup:
            user?.bloodGroup || "",

        units: "",

        hospital: "",

        requiredDate: "",

        priority: "",

        email:
            user?.email || "",

        phone: "",

        notes: "",

        status: "Pending",

        createdAt:
            new Date().toISOString()

    });



    const [formData, setFormData] =
        useState(createInitialForm());



    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

    };




    const handleSubmit = async (e) => {

        e.preventDefault();


        try {


            const data =
                await bloodRequest(formData);



            alert(
                "Blood Request Submitted Successfully!"
            );


            console.log(data);



            setFormData(
                createInitialForm()
            );
            navigate("/my-requests")


        } catch (error) {

            console.log(error);

            alert(
                error.message
            );

        }

    };



    return (

        <div className="min-h-screen bg-gray-100 flex">


            <RecipientPanel />


            <div className="flex-1 p-8">


                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">



                    <div className="bg-gradient-to-r from-red-800 to-red-500 text-white p-6">


                        <h1 className="text-3xl font-bold">
                            Request Blood
                        </h1>


                        <p className="mt-2">
                            Submit your blood requirement
                        </p>


                    </div>





                    <form
                        onSubmit={handleSubmit}
                        className="grid md:grid-cols-2 gap-6 p-8"
                    >




                        {/* Patient */}

                        <div>

                            <label className="font-semibold flex gap-2 mb-2">

                                <FaUser className="text-red-600" />

                                Patient Name

                            </label>


                            <input

                                value={formData.patientName}

                                disabled

                                className="w-full border rounded-lg p-3 bg-gray-100"

                            />

                        </div>





                        {/* Blood Group */}


                        <div>

                            <label className="font-semibold flex gap-2 mb-2">

                                <FaTint className="text-red-600" />

                                Blood Group

                            </label>


                            <input

                                value={formData.bloodGroup}

                                disabled

                                className="w-full border rounded-lg p-3 bg-gray-100"

                            />

                        </div>





                        {/* Units */}


                        <div>

                            <label className="font-semibold mb-2 block">

                                Units Required

                            </label>


                            <input

                                type="number"

                                name="units"

                                min="1"

                                value={formData.units}

                                onChange={handleChange}

                                className="w-full border rounded-lg p-3"

                                required

                            />

                        </div>






                        {/* Hospital */}


                        <div>


                            <label className="font-semibold flex gap-2 mb-2">

                                <FaHospital className="text-red-600" />

                                Hospital

                            </label>



                            <select

                                name="hospital"

                                value={formData.hospital}

                                onChange={handleChange}

                                className="w-full border rounded-lg p-3"

                                required

                            >

                                <option value="">
                                    Select Hospital
                                </option>

                                <option>
                                    City Hospital
                                </option>

                                <option>
                                    Medical College
                                </option>

                                <option>
                                    District Hospital
                                </option>


                            </select>


                        </div>






                        {/* Date */}


                        <div>

                            <label className="font-semibold flex gap-2 mb-2">

                                <FaCalendarAlt className="text-red-600" />

                                Required Date

                            </label>


                            <input

                                type="date"

                                name="requiredDate"

                                value={formData.requiredDate}

                                onChange={handleChange}

                                className="w-full border rounded-lg p-3"

                                required

                            />


                        </div>






                        {/* Priority */}


                        <div>


                            <label className="font-semibold mb-2 block">

                                Priority

                            </label>


                            <select

                                name="priority"

                                value={formData.priority}

                                onChange={handleChange}

                                className="w-full border rounded-lg p-3"

                                required

                            >

                                <option value="">
                                    Select Priority
                                </option>

                                <option>
                                    Critical
                                </option>

                                <option>
                                    High
                                </option>

                                <option>
                                    Normal
                                </option>


                            </select>


                        </div>






                        {/* Email */}


                        <div>


                            <label className="font-semibold flex gap-2 mb-2">

                                <FaEnvelope className="text-red-600" />

                                Email

                            </label>


                            <input

                                value={formData.email}

                                disabled

                                className="w-full border rounded-lg p-3 bg-gray-100"

                            />


                        </div>







                        {/* Phone */}


                        <div>


                            <label className="font-semibold flex gap-2 mb-2">

                                <FaPhoneAlt className="text-red-600" />

                                Contact Number

                            </label>


                            <input

                                type="tel"

                                name="phone"

                                value={formData.phone}

                                onChange={handleChange}

                                className="w-full border rounded-lg p-3"

                                required

                            />


                        </div>






                        {/* Notes */}


                        <div className="md:col-span-2">


                            <label className="font-semibold flex gap-2 mb-2">

                                <FaNotesMedical className="text-red-600" />

                                Notes

                            </label>


                            <textarea

                                rows="4"

                                name="notes"

                                value={formData.notes}

                                onChange={handleChange}

                                className="w-full border rounded-lg p-3"

                            />

                        </div>






                        <div className="md:col-span-2">


                            <button

                                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"

                            >

                                Submit Blood Request

                            </button>


                        </div>



                    </form>


                </div>


            </div>


        </div>

    );

}


export default BloodRequest;