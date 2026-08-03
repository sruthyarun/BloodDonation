import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import {
    FaHospital,
    FaUser,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaIdCard,
    FaCamera,
    FaSave,
    FaTint,
    FaBed,
} from "react-icons/fa";

import HospitalPanel from "../../components/HospitalPanel";
import { loginUser } from "../../redux/userSlice";

function ProfileHS() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.currentUser);

    const [profile, setProfile] = useState({
        hospitalName: "",
        hospitalType: "",
        contactPerson: "",
        adminName: "",
        email: "",
        phone: "",
        registrationNumber: "",
        licenseNumber: "",
        address: "",
        district: "",
        state: "",
        pincode: "",
        bloodBank: "",
        totalBeds: "",
        emergencyPhone: "",
        logo: "",
    });

    useEffect(() => {
        if (user) {
            setProfile({
                hospitalName: user.hospitalName || "",
                hospitalType: user.hospitalType || "",
                contactPerson: user.contactPerson || "",
                adminName:
                    user.adminName ||
                    user.contactPerson ||
                    "",

                email: user.email || "",
                phone: user.phone || "",

                registrationNumber:
                    user.registrationNumber ||
                    user.registrationNo ||
                    "",

                licenseNumber:
                    user.licenseNumber ||
                    user.licenseNo ||
                    "",

                address: user.address || "",
                district: user.district || "",
                state: user.state || "",
                pincode: user.pincode || "",

                bloodBank: user.bloodBank || "",
                totalBeds: user.totalBeds || "",
                emergencyPhone: user.emergencyPhone || "",
                logo: user.logo || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };
    const handleLogoChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            setProfile((prev) => ({
                ...prev,
                logo: reader.result,
            }));
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedHospital = {
                ...user,
                ...profile,
            };

            await axios.put(
                `http://localhost:5000/hospitals/${user.id}`,
                updatedHospital
            );

            dispatch(loginUser(updatedHospital));

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(updatedHospital)
            );

            alert("Profile Updated Successfully");
        } catch (error) {
            console.log(error);
            alert("Failed to update profile");
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-2xl font-bold">
                    Please Login First
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">

            <HospitalPanel />

            <div className="flex-1 py-10 px-6">

                <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

                    {/* Header */}

                    <div className="bg-gradient-to-r from-red-200 to-red-100 p-8 text-red-900">

                        <div className="flex flex-col md:flex-row items-center gap-6">

                            <div className="relative">

                                <img
                                    src={
                                        profile.logo
                                            ? profile.logo
                                            : "https://via.placeholder.com/150"
                                    }
                                    alt="Hospital Logo"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white"
                                />

                                <button
                                    type="button"
                                    className="absolute bottom-0 right-0 bg-white text-red-600 p-2 rounded-full shadow"
                                >
                                    <FaCamera />
                                </button>

                            </div>

                            <div>

                                <h1 className="text-3xl font-bold">
                                    {profile.hospitalName}
                                </h1>

                                <p className="mt-2">
                                    {profile.hospitalType}
                                </p>

                            </div>

                        </div>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="grid md:grid-cols-2 gap-6 p-8"
                    >

                        {/* Hospital Name */}

                        <div>

                            <label className="font-semibold flex items-center gap-2 mb-2">
                                <FaHospital className="text-red-600" />
                                Hospital Name
                            </label>

                            <input
                                type="text"
                                name="hospitalName"
                                value={profile.hospitalName}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>

                        {/* Hospital Type */}

                        <div>

                            <label className="font-semibold mb-2 block">
                                Hospital Type
                            </label>

                            <select
                                name="hospitalType"
                                value={profile.hospitalType}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            >
                                <option value="">Select</option>
                                <option>Government Hospital</option>
                                <option>Private Hospital</option>
                                <option>Medical College</option>
                                <option>Speciality Hospital</option>
                                <option>Blood Bank</option>
                            </select>

                        </div>

                        {/* Administrator */}

                        <div>

                            <label className="font-semibold flex items-center gap-2 mb-2">
                                <FaUser className="text-red-600" />
                                Administrator Name
                            </label>

                            <input
                                type="text"
                                name="adminName"
                                value={profile.adminName}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>

                        {/* Contact Person */}

                        <div>

                            <label className="font-semibold flex items-center gap-2 mb-2">
                                <FaUser className="text-red-600" />
                                Contact Person
                            </label>

                            <input
                                type="text"
                                name="contactPerson"
                                value={profile.contactPerson}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>

                        {/* Email */}

                        <div>

                            <label className="font-semibold flex items-center gap-2 mb-2">
                                <FaEnvelope className="text-red-600" />
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>

                        {/* Phone */}

                        <div>

                            <label className="font-semibold flex items-center gap-2 mb-2">
                                <FaPhoneAlt className="text-red-600" />
                                Phone Number
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>
                        {/* Registration Number */}

                        <div>

                            <label className="font-semibold flex items-center gap-2 mb-2">
                                <FaIdCard className="text-red-600" />
                                Registration Number
                            </label>

                            <input
                                type="text"
                                name="registrationNumber"
                                value={profile.registrationNumber}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>
                        {/* License Number */}

                        <div>

                            <label className="font-semibold flex items-center gap-2 mb-2">
                                <FaIdCard className="text-red-600" />
                                License Number
                            </label>

                            <input
                                type="text"
                                name="licenseNumber"
                                value={profile.licenseNumber}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>
                        {/* Address */}

                        <div className="md:col-span-2">

                            <label className="font-semibold flex items-center gap-2 mb-2">
                                <FaMapMarkerAlt className="text-red-600" />
                                Hospital Address
                            </label>

                            <textarea
                                name="address"
                                value={profile.address}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Enter Hospital Address"
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                            />

                        </div>
                        {/* District */}
                        <div>
                            <label className="font-semibold block mb-2">
                                District
                            </label>

                            <input
                                type="text"
                                name="district"
                                value={profile.district}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        {/* State */}
                        <div>
                            <label className="font-semibold block mb-2">
                                State
                            </label>

                            <input
                                type="text"
                                name="state"
                                value={profile.state}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        {/* Pincode */}
                        <div>
                            <label className="font-semibold block mb-2">
                                Pincode
                            </label>

                            <input
                                type="text"
                                name="pincode"
                                value={profile.pincode}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        {/* Blood Bank */}
                        <div>
                            <label className="font-semibold block mb-2">
                                Blood Bank Available
                            </label>

                            <select
                                name="bloodBank"
                                value={profile.bloodBank}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        {/* Total Beds */}
                        <div>
                            <label className="font-semibold block mb-2">
                                Total Beds
                            </label>

                            <input
                                type="number"
                                name="totalBeds"
                                value={profile.totalBeds}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        {/* Emergency Contact */}
                        <div>
                            <label className="font-semibold flex gap-2 mb-2">
                                <FaPhoneAlt className="text-red-600" />
                                Emergency Contact
                            </label>

                            <input
                                type="text"
                                name="emergencyPhone"
                                value={profile.emergencyPhone}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        {/* Logo */}
                        <div>
                            <label className="font-semibold block mb-2">
                                Upload Hospital Logo
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoChange}
                                className="w-full border rounded-lg px-4 py-3"
                            />

                            {profile.logo && (
                                <div className="mt-4">

                                    <img
                                        src={profile.logo}
                                        alt="Hospital Logo"
                                        className="w-36 h-36 rounded-xl object-cover border-2 border-red-500 shadow-lg"
                                    />

                                </div>
                            )}
                        </div>

                        {/* Save Button */}
                        <div className="md:col-span-2 flex justify-center mt-6">

                            <button
                                type="submit"
                                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition"
                            >
                                <FaSave />
                                Save Changes
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default ProfileHS;