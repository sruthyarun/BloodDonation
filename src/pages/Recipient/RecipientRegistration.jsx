import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaVenusMars,
    FaBirthdayCake,
    FaTint,
    FaHospital,
    FaMapMarkerAlt,
    FaLock,
    FaNotesMedical,
    FaSave,
} from "react-icons/fa";
import { registerRecipient } from "../../api/addRecipient";
import { toast } from "react-toastify";

function RecipientRegistration() {
    const navigate = useNavigate();


    const initialFormData = {
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        bloodGroup: "",
        hospital: "",
        medicalCondition: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        password: "",
        confirmPassword: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validateForm = () => {
        let newErrors = {};

        // Full Name
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full Name is required";
        } else if (formData.fullName.trim().length < 3) {
            newErrors.fullName =
                "Full Name must contain at least 3 characters";
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid Email Address";
        }

        // Phone
        if (!/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone Number must be 10 digits";
        }

        // Gender
        if (!formData.gender) {
            newErrors.gender = "Select Gender";
        }

        // DOB
        if (!formData.dob) {
            newErrors.dob = "Date of Birth is required";
        } else {
            const today = new Date();
            const dob = new Date(formData.dob);

            let age = today.getFullYear() - dob.getFullYear();
            const month = today.getMonth() - dob.getMonth();

            if (
                month < 0 ||
                (month === 0 && today.getDate() < dob.getDate())
            ) {
                age--;
            }

            if (age < 18) {
                newErrors.dob = "Recipient must be at least 18 years old";
            }
        }

        // Blood Group
        if (!formData.bloodGroup) {
            newErrors.bloodGroup = "Select Blood Group";
        }

        // Hospital
        if (!formData.hospital.trim()) {
            newErrors.hospital = "Hospital Name is required";
        }

        // Medical Condition
        if (!formData.medicalCondition.trim()) {
            newErrors.medicalCondition =
                "Medical Condition is required";
        }

        // Address
        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }

        // City
        if (!formData.city.trim()) {
            newErrors.city = "City is required";
        }

        // State
        if (!formData.state.trim()) {
            newErrors.state = "State is required";
        }

        // Pincode
        if (!/^[0-9]{6}$/.test(formData.pincode)) {
            newErrors.pincode = "Pincode must be 6 digits";
        }

        // Password
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,}$/;

        if (!passwordRegex.test(formData.password)) {
            newErrors.password =
                "Password must contain uppercase, lowercase, number and special character";
        }

        // Confirm Password
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const { confirmPassword, ...recipientData } = formData;

            await registerRecipient(recipientData);

            setFormData(initialFormData);
            setErrors({});

            navigate("/success", { replace: true });

        } catch (error) {
            if (
                error.message.toLowerCase().includes("email") ||
                error.message.toLowerCase().includes("exists")
            ) {
                setErrors((prev) => ({
                    ...prev,
                    email: "Email already exists. Cannot register.",
                }));
            } else {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (

        < div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-10 px-4" >
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

                <div className="bg-red-700 text-white text-center py-6">
                    <h1 className="text-4xl font-bold">
                        Recipient Registration
                    </h1 >

                    <p className="mt-2">
                        Register to request blood from verified donors and hospitals.
                    </p>
                </div >

                <form onSubmit={handleSubmit} className="p-8">

                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Full Name */}

                        <div>
                            <label className="font-semibold">
                                Full Name
                            </label>

                            <div className="flex items-center border rounded-lg mt-2 px-3">
                                <FaUser className="text-red-500" />

                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter Full Name"
                                    className="w-full p-3 outline-none"
                                />
                            </div>

                            {errors.fullName && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.fullName}
                                </p>
                            )}
                        </div>

                        {/* Email */}

                        <div>
                            <label className="font-semibold">
                                Email
                            </label>

                            <div className="flex items-center border rounded-lg mt-2 px-3">
                                <FaEnvelope className="text-red-500" />

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter Email"
                                    className="w-full p-3 outline-none"
                                />
                            </div>

                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Phone */}

                        <div>
                            <label className="font-semibold">
                                Phone Number
                            </label>

                            <div className="flex items-center border rounded-lg mt-2 px-3">
                                <FaPhone className="text-red-500" />

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter Phone Number"
                                    className="w-full p-3 outline-none"
                                />
                            </div>

                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* Gender */}

                        <div>
                            <label className="font-semibold">
                                Gender
                            </label>

                            <div className="flex items-center border rounded-lg mt-2 px-3">
                                <FaVenusMars className="text-red-500" />

                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full p-3 outline-none"
                                >
                                    <option value="">
                                        Select Gender
                                    </option>

                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            {errors.gender && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.gender}
                                </p>
                            )}
                        </div>

                        {/* Date of Birth */}

                        <div>
                            <label className="font-semibold">
                                Date of Birth
                            </label>

                            <div className="flex items-center border rounded-lg mt-2 px-3">
                                <FaBirthdayCake className="text-red-500" />

                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="w-full p-3 outline-none"
                                />
                            </div>

                            {errors.dob && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.dob}
                                </p>
                            )}
                        </div>

                        {/* Blood Group */}

                        <div>
                            <label className="font-semibold">
                                Required Blood Group
                            </label>

                            <div className="flex items-center border rounded-lg mt-2 px-3">
                                <FaTint className="text-red-500" />

                                <select
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                    className="w-full p-3 outline-none"
                                >
                                    <option value="">
                                        Select Blood Group
                                    </option>

                                    <option>A+</option>
                                    <option>A-</option>
                                    <option>B+</option>
                                    <option>B-</option>
                                    <option>AB+</option>
                                    <option>AB-</option>
                                    <option>O+</option>
                                    <option>O-</option>
                                </select>
                            </div>

                            {errors.bloodGroup && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.bloodGroup}
                                </p>
                            )}
                        </div>
                        {/* Hospital */}

                        <div>
                            <label className="font-semibold">
                                Hospital Name
                            </label>

                            <div className="flex items-center border rounded-lg mt-2 px-3">
                                <FaHospital className="text-red-500" />

                                <input
                                    type="text"
                                    name="hospital"
                                    value={formData.hospital}
                                    onChange={handleChange}
                                    placeholder="Enter Hospital Name"
                                    className="w-full p-3 outline-none"
                                />
                            </div>

                            {errors.hospital && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.hospital}
                                </p>
                            )}
                        </div>

                        {/* Medical Condition */}

                        <div>
                            <label className="font-semibold">
                                Medical Condition
                            </label>

                            <div className="flex items-center border rounded-lg mt-2 px-3">
                                <FaNotesMedical className="text-red-500" />

                                <input
                                    type="text"
                                    name="medicalCondition"
                                    value={formData.medicalCondition}
                                    onChange={handleChange}
                                    placeholder="Reason for Blood Requirement"
                                    className="w-full p-3 outline-none"
                                />
                            </div>

                            {errors.medicalCondition && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.medicalCondition}
                                </p>
                            )}
                        </div>

                        {/* Address */}

                        <div className="md:col-span-2">
                            <label className="font-semibold">
                                Address
                            </label>

                            <div className="flex items-start border rounded-lg mt-2 px-3">
                                <FaMapMarkerAlt className="text-red-500 mt-4" />

                                <textarea
                                    name="address"
                                    rows="3"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter Full Address"
                                    className="w-full p-3 outline-none resize-none"
                                />
                            </div>

                            {errors.address && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.address}
                                </p>
                            )}
                        </div>

                        {/* City */}

                        <div>
                            <label className="font-semibold">
                                City
                            </label>

                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 mt-2"
                            />

                            {errors.city && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.city}
                                </p>
                            )}
                        </div>

                        {/* State */}

                        <div>
                            <label className="font-semibold">
                                State
                            </label>

                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 mt-2"
                            />

                            {errors.state && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.state}
                                </p>
                            )}
                        </div>

                        {/* Pincode */}

                        <div>
                            <label className="font-semibold">
                                Pincode
                            </label>

                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 mt-2"
                            />

                            {errors.pincode && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.pincode}
                                </p>
                            )}
                        </div>

                        {/* Password */}

                        <div>
                            <label className="font-semibold">
                                Password
                            </label>

                            <div className="flex items-center border rounded-lg mt-2 px-3">
                                <FaLock className="text-red-500" />

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                    className="w-full p-3 outline-none"
                                />
                            </div>

                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}

                        <div>
                            <label className="font-semibold">
                                Confirm Password
                            </label>

                            <div className="flex items-center border rounded-lg mt-2 px-3">
                                <FaLock className="text-red-500" />

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                    className="w-full p-3 outline-none"
                                />
                            </div>

                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-10 py-3 rounded-lg flex items-center gap-2 mx-auto text-white transition duration-300 ${loading
                                ? "bg-gray-600 cursor-not-allowed"
                                : "bg-red-700 hover:bg-red-800"
                                }`}
                        >
                            <FaSave />

                            {loading ? "Registering..." : "Register as Recipient"}
                        </button>
                    </div>

                </form>

            </div >
        </div >


    );
}
export default RecipientRegistration;