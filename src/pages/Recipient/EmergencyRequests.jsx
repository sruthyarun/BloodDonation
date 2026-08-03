import { useState } from "react";
import {
    FaUserInjured,
    FaTint,
    FaMapMarkerAlt,
    FaPhone,
    FaHospital,
    FaNotesMedical,
    FaPaperPlane,
} from "react-icons/fa";

import RecipientPanel from "../../components/RecipientPanel";


const initialForm = {
    patientName: "",
    bloodGroup: "",
    units: "",
    district: "",
    hospital: "",
    contact: "",
    reason: "",
};


function RecipientEmergencyRequest() {

    const recipient = JSON.parse(
        localStorage.getItem("loggedInUser")
    );


    const [formData, setFormData] = useState(initialForm);

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        if (
            !formData.patientName ||
            !formData.bloodGroup ||
            !formData.units ||
            !formData.district ||
            !formData.hospital ||
            !formData.contact ||
            !formData.reason
        ) {

            alert("Please fill all fields");

            return;
        }


        const emergencyData = {

            requestedBy: "Recipient",

            requesterId: recipient.id,

            requesterName:
                recipient.fullName,

            email:
                recipient.email,


            patientName:
                formData.patientName,

            bloodGroup:
                formData.bloodGroup,

            units:
                Number(formData.units),


            district:
                formData.district,


            hospital:
                formData.hospital,


            contact:
                formData.contact,


            reason:
                formData.reason,


            status:
                "Active",


            createdAt:
                new Date().toISOString(),

        };


        try {

            setLoading(true);


            const response = await fetch(
                "http://localhost:5000/emergencyRequests",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body:
                        JSON.stringify(
                            emergencyData
                        ),
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to submit request"
                );

            }


            alert(
                "Emergency request submitted successfully"
            );


            setFormData(initialForm);


        } catch (error) {

            console.log(error);

            alert(error.message);


        } finally {

            setLoading(false);

        }

    };



    return (

        <div className="min-h-screen bg-gray-100 flex">


            <RecipientPanel />


            <div className="flex-1 p-8">


                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl">


                    {/* Header */}

                    <div className="bg-red-600 text-white p-6 rounded-t-2xl">

                        <h1 className="text-3xl font-bold">

                            Emergency Blood Request

                        </h1>


                        <p className="mt-2 text-red-100">

                            Request urgent blood support

                        </p>

                    </div>



                    <form
                        onSubmit={handleSubmit}
                        className="p-8 space-y-6"
                    >


                        <div className="grid md:grid-cols-2 gap-6">


                            {/* Patient Name */}

                            <div>

                                <label className="font-semibold">

                                    Patient Name

                                </label>


                                <div className="flex items-center border rounded-lg mt-2 px-3">

                                    <FaUserInjured
                                        className="text-red-600"
                                    />


                                    <input

                                        type="text"

                                        name="patientName"

                                        value={
                                            formData.patientName
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        placeholder="Patient name"

                                        className="w-full p-3 outline-none"

                                    />

                                </div>

                            </div>




                            {/* Blood Group */}

                            <div>

                                <label className="font-semibold">

                                    Blood Group

                                </label>


                                <div className="flex items-center border rounded-lg mt-2 px-3">

                                    <FaTint
                                        className="text-red-600"
                                    />


                                    <select

                                        name="bloodGroup"

                                        value={
                                            formData.bloodGroup
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        className="w-full p-3 outline-none"

                                    >

                                        <option value="">
                                            Select Blood Group
                                        </option>


                                        {
                                            [
                                                "A+",
                                                "A-",
                                                "B+",
                                                "B-",
                                                "AB+",
                                                "AB-",
                                                "O+",
                                                "O-",
                                            ].map(
                                                (group) => (
                                                    <option
                                                        key={group}
                                                        value={group}
                                                    >
                                                        {group}
                                                    </option>
                                                )
                                            )
                                        }


                                    </select>

                                </div>

                            </div>




                            {/* Units */}

                            <div>

                                <label className="font-semibold">

                                    Units Required

                                </label>


                                <input

                                    type="number"

                                    name="units"

                                    min="1"

                                    value={
                                        formData.units
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    className="w-full border rounded-lg mt-2 p-3"

                                />

                            </div>




                            {/* District */}

                            <div>

                                <label className="font-semibold">

                                    District

                                </label>


                                <div className="flex items-center border rounded-lg mt-2 px-3">


                                    <FaMapMarkerAlt
                                        className="text-red-600"
                                    />


                                    <input

                                        type="text"

                                        name="district"

                                        value={
                                            formData.district
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        placeholder="District"

                                        className="w-full p-3 outline-none"

                                    />


                                </div>



                            </div>

                            <div>

                                <label className="font-semibold">
                                    Hospital
                                </label>


                                <div className="flex items-center border rounded-lg mt-2 px-3">

                                    <FaHospital
                                        className="text-red-600"
                                    />


                                    <input

                                        type="text"

                                        name="hospital"

                                        value={
                                            formData.hospital
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        placeholder="Hospital Name"

                                        className="w-full p-3 outline-none"

                                    />

                                </div>

                            </div>



                            {/* Contact */}

                            <div>

                                <label className="font-semibold">
                                    Contact Number
                                </label>


                                <div className="flex items-center border rounded-lg mt-2 px-3">

                                    <FaPhone
                                        className="text-red-600"
                                    />


                                    <input

                                        type="text"

                                        name="contact"

                                        value={
                                            formData.contact
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        placeholder="Phone Number"

                                        className="w-full p-3 outline-none"

                                    />

                                </div>

                            </div>


                        </div>



                        {/* Reason */}

                        <div>

                            <label className="font-semibold">
                                Emergency Reason
                            </label>


                            <div className="flex border rounded-lg mt-2 px-3">


                                <FaNotesMedical
                                    className="text-red-600 mt-4"
                                />


                                <textarea

                                    name="reason"

                                    rows="4"

                                    value={
                                        formData.reason
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    placeholder="Reason for blood requirement"

                                    className="w-full p-3 outline-none resize-none"

                                />


                            </div>


                        </div>




                        {/* Submit Button */}

                        <button

                            type="submit"

                            disabled={loading}

                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg flex items-center gap-2"

                        >


                            <FaPaperPlane />


                            {
                                loading
                                    ? "Submitting..."
                                    : "Submit Emergency Request"
                            }


                        </button>


                    </form>


                </div>


            </div>


        </div>
    );
}

export default RecipientEmergencyRequest;