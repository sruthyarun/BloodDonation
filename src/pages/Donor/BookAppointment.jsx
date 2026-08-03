import { useState, useEffect } from "react";
import {
    FaCalendarAlt,
    FaClock,
    FaHospital,
    FaMapMarkerAlt,
    FaUser,
    FaTint,
    FaPhone,
    FaLocationArrow,
    FaEnvelope,
} from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/userSlice";
import DonorPanel from "../../components/donorPanel";
import { bookAppointment } from "../../API/addAppointment";
import { validateAppointment } from "../../validation/appointmentValidation";



function BookAppointment() {
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.currentUser);


    const initialFormData = {
        donorName: user?.fullName || "",
        bloodGroup: user?.bloodGroup || "",
        district: "",
        hospital: "",
        email: user?.email || "",
        date: "",
        time: "",
        phone: "",
        notes: "",
        status: "Pending",
    };
    const [hospitals, setHospitals] = useState([]);
    const [filteredHospitals, setFilteredHospitals] = useState([]);
    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await fetch("http://localhost:5000/hospitals");
                const data = await response.json();
                setHospitals(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchHospitals();
    }, []);

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "district" ? { hospital: "" } : {})
        }));

        if (name === "district") {
            const result = hospitals.filter(
                (item) => item.district === value
            );

            setFilteredHospitals(result);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const validationErrors = validateAppointment(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }


        setErrors({});


        try {
            const data = await bookAppointment(formData);

            alert("Appointment Booked Successfully!");

            console.log(data);

            setFormData(initialFormData);


            setErrors({});

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex">

            <DonorPanel />

            <div className="min-h-screen bg-gray-100 py-10 px-4 flex-1">

                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-l overflow-hidden">

                    <div className="bg-gradient-to-r from-red-800 to-red-400 text-white p-6">
                        <h1 className="text-3xl font-bold">
                            Book Blood Donation Appointment
                        </h1>
                        <p className="mt-2 text-red-100">
                            Schedule your blood donation with your preferred hospital.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="grid md:grid-cols-2 gap-6 p-8"
                    >

                        <div>
                            <label className="font-semibold flex items-center gap-2 mb-2">
                                <FaUser className="text-red-600" />
                                Donor Name
                            </label>

                            <input
                                type="text"
                                name="donorName"
                                value={user.fullName}
                                onChange={handleChange}
                                disabled
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none text-gray-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="font-semibold flex items-center gap-2 mb-2">
                                <FaTint className="text-red-600" />
                                Blood Group
                            </label>

                            <input
                                type="text"
                                name="bloodGroup"
                                value={user.bloodGroup}
                                onChange={handleChange}
                                disabled
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none text-gray-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="font-semibold flex items-center gap-2 mb-2">
                                <FaEnvelope className="text-red-600" />
                                Email ID
                            </label>

                            <input
                                type="text"
                                name="center"
                                value={user.email}
                                onChange={handleChange}
                                disabled
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none text-gray-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="font-semibold flex items-center gap-2 mb-2">
                                <FaMapMarkerAlt className="text-red-600" />
                                District
                            </label>

                            <select
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                required
                            >
                                <option value="">Select District</option>
                                <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                                <option value="Kollam">Kollam</option>
                                <option value="Pathanamthitta">Pathanamthitta</option>
                                <option value="Alappuzha">Alappuzha</option>
                                <option value="Kottayam">Kottayam</option>
                                <option value="Idukki">Idukki</option>
                                <option value="Ernakulam">Ernakulam</option>
                                <option value="Thrissur">Thrissur</option>
                                <option value="Palakkad">Palakkad</option>
                                <option value="Malappuram">Malappuram</option>
                                <option value="Kozhikode">Kozhikode</option>
                                <option value="Wayanad">Wayanad</option>
                                <option value="Kannur">Kannur</option>
                                <option value="Kasaragod">Kasaragod</option>
                            </select>
                        </div>

                        <div>
                            <label className="font-semibold flex items-center gap-2 mb-2">
                                <FaHospital className="text-red-600" />
                                Hospital
                            </label>

                            <select
                                name="hospital"
                                value={formData.hospital}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                disabled={!formData.district}
                                required
                            >
                                <option value="">Select Hospital</option>

                                {filteredHospitals.map((hospital) => (
                                    <option
                                        key={hospital.id}
                                        value={hospital.hospitalName}
                                    >
                                        {hospital.hospitalName}
                                    </option>
                                ))}
                            </select>
                        </div>



                        <div>
                            <label className="font-semibold flex items-center gap-2 mb-2">
                                <FaCalendarAlt className="text-red-600" />
                                Appointment Date
                            </label>

                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                required
                            />
                            {errors.date && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.date}
                                </p>
                            )}
                        </div>


                        <div>
                            <label className="font-semibold flex items-center gap-2 mb-2">
                                <FaClock className="text-red-600" />
                                Time Slot
                            </label>

                            <select
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                required
                            >
                                <option value="">Select Time</option>
                                <option>09:00 AM</option>
                                <option>10:00 AM</option>
                                <option>11:00 AM</option>
                                <option>12:00 PM</option>
                                <option>02:00 PM</option>
                                <option>03:00 PM</option>
                                <option>04:00 PM</option>
                            </select>
                        </div>

                        <div >
                            <label className="font-semibold flex items-center gap-2 mb-2">
                                <FaPhone className="text-red-600" />
                                Contact Number
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your mobile number"
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                required
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="font-semibold mb-2 block">
                                Additional Notes
                            </label>

                            <textarea
                                rows="4"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Enter any additional information..."
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                            />
                            {errors.notes && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.notes}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                                Cancel
                            </button>
                        </div>

                    </form>

                </div>

            </div>
        </div>
    );
}

export default BookAppointment;