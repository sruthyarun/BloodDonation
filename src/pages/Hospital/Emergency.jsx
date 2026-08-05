import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaHospital,
    FaUserInjured,
    FaTint,
    FaMapMarkerAlt,
    FaPhone,
    FaNotesMedical,
    FaPaperPlane,
} from "react-icons/fa";
import HospitalPanel from "../../components/HospitalPanel";

const initialForm = {
    patientName: "",
    bloodGroup: "",
    units: "",
    district: "",
    contact: "",
    reason: "",
    status: "Active",
};

function HospitalEmergencyRequest() {
    const navigate = useNavigate();
    const hospital = JSON.parse(localStorage.getItem("loggedInUser"));

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
            !formData.contact ||
            !formData.reason
        ) {
            alert("Please fill all fields.");
            return;
        }

        const emergencyRequest = {
            requestedBy: "Hospital",
            requesterId: hospital.id,
            requesterName:
                hospital.hospitalName || hospital.name,
            email: hospital.email,

            patientName: formData.patientName,
            bloodGroup: formData.bloodGroup,
            units: Number(formData.units),
            district: formData.district,
            hospital:
                hospital.hospitalName || hospital.name,
            contact: formData.contact,
            reason: formData.reason,

            status: "Active",
            createdAt: new Date().toISOString(),
        };

        try {
            setLoading(true);

            const response = await fetch(
                "https://blood-donation-backend-olwl.onrender.com/emergencyRequests",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(emergencyRequest),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit request");
            }

            alert("Emergency request submitted successfully.");
            navigate(
                "/hospital-emergency"
            )
            setFormData(initialForm);

        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">

            <HospitalPanel />

            <div className="flex-1 p-8">

                <div className="bg-white rounded-2xl shadow-xl max-w-4xl mx-auto">

                    <div className="bg-red-600 text-white p-6 rounded-t-2xl">
                        <h1 className="text-3xl font-bold">
                            Emergency Blood Request
                        </h1>

                        <p className="mt-2 text-red-100">
                            Create an emergency blood request for donors.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="p-8 space-y-6"
                    >

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <label className="font-medium">
                                    Patient Name
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-3">
                                    <FaUserInjured className="text-red-600" />

                                    <input
                                        type="text"
                                        name="patientName"
                                        value={formData.patientName}
                                        onChange={handleChange}
                                        className="w-full p-3 outline-none"
                                        placeholder="Patient Name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-medium">
                                    Blood Group
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-3">
                                    <FaTint className="text-red-600" />

                                    <select
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        className="w-full p-3 outline-none"
                                    >
                                        <option value="">
                                            Select Blood Group
                                        </option>

                                        {[
                                            "A+",
                                            "A-",
                                            "B+",
                                            "B-",
                                            "AB+",
                                            "AB-",
                                            "O+",
                                            "O-",
                                        ].map((group) => (
                                            <option
                                                key={group}
                                                value={group}
                                            >
                                                {group}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="font-medium">
                                    Units Required
                                </label>

                                <input
                                    type="number"
                                    name="units"
                                    min="1"
                                    value={formData.units}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3 mt-2"
                                />
                            </div>

                            <div>
                                <label className="font-medium">
                                    District
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-3">
                                    <FaMapMarkerAlt className="text-red-600" />

                                    <input
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        className="w-full p-3 outline-none"
                                        placeholder="District"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-medium">
                                    Contact Number
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-3">
                                    <FaPhone className="text-red-600" />

                                    <input
                                        type="text"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        className="w-full p-3 outline-none"
                                        placeholder="Contact Number"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-medium">
                                    Hospital
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-3 bg-gray-100">
                                    <FaHospital className="text-red-600" />

                                    <input
                                        type="text"
                                        value={
                                            hospital.hospitalName ||
                                            hospital.name
                                        }
                                        readOnly
                                        className="w-full p-3 bg-transparent outline-none"
                                    />
                                </div>
                            </div>

                        </div>

                        <div>
                            <label className="font-medium">
                                Reason
                            </label>

                            <div className="flex border rounded-lg mt-2 px-3">
                                <FaNotesMedical className="text-red-600 mt-4" />

                                <textarea
                                    name="reason"
                                    rows="4"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    className="w-full p-3 outline-none resize-none"
                                    placeholder="Reason for emergency blood request"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg flex items-center gap-2"
                        >
                            <FaPaperPlane />

                            {loading
                                ? "Submitting..."
                                : "Submit Emergency Request"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default HospitalEmergencyRequest;