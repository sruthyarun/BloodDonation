
import { useEffect, useState } from "react";
import axios from "axios";
import {
    FaUserCircle,
    FaUser,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaBuilding,
    FaCalendarAlt,
    FaLock,
    FaSave,
    FaSyncAlt,
} from "react-icons/fa";
import AdminPanel from "../../components/AdminPanel";

const API_URL = "http://localhost:5000/admins";

function AdminProfile() {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // ==========================================
    // FETCH ADMIN
    // ==========================================

    useEffect(() => {
        fetchAdmin();
    }, []);

    const fetchAdmin = async () => {
        try {
            setLoading(true);

            const response = await axios.get(API_URL);

            if (response.data.length > 0) {
                setAdmin(response.data[0]);
            }
        } catch (error) {
            console.error(
                "Error fetching admin:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setAdmin((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ==========================================
    // SAVE PROFILE
    // ==========================================

    const handleSave = async () => {
        if (!admin?.id) {
            alert("Admin profile not found.");
            return;
        }

        try {
            setSaving(true);

            await axios.put(
                `${API_URL}/${admin.id}`,
                admin
            );

            alert("Profile updated successfully!");
        } catch (error) {
            console.error(
                "Error updating admin:",
                error
            );

            alert(
                "Unable to update profile."
            );
        } finally {
            setSaving(false);
        }
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex">
                <AdminPanel />

                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <FaSyncAlt className="animate-spin text-red-600 text-4xl mx-auto" />

                        <p className="text-gray-500 mt-4">
                            Loading admin profile...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // ==========================================
    // NO ADMIN
    // ==========================================

    if (!admin) {
        return (
            <div className="min-h-screen bg-gray-100 flex">
                <AdminPanel />

                <div className="flex-1 flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow p-8 text-center">
                        <FaUserCircle className="text-gray-300 text-6xl mx-auto" />

                        <h2 className="text-xl font-bold mt-4">
                            Admin profile not found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Please add an admin record
                            to db.json.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* SIDEBAR */}

            <AdminPanel />

            {/* MAIN CONTENT */}

            <div className="flex-1 p-8">

                {/* HEADER */}

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Admin Profile
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View and update administrator
                        profile information.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* ==================================
                        PROFILE CARD
                    ================================== */}

                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

                        <FaUserCircle className="text-red-600 text-8xl mx-auto mb-5" />

                        <h2 className="text-2xl font-bold text-gray-800">
                            {admin.name}
                        </h2>

                        <p className="text-gray-500">
                            {admin.role ||
                                "System Administrator"}
                        </p>

                        <div className="mt-8 space-y-5 text-left">

                            {/* EMAIL */}

                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-red-600" />

                                <span className="text-gray-700 break-all">
                                    {admin.email}
                                </span>
                            </div>

                            {/* PHONE */}

                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="text-red-600" />

                                <span className="text-gray-700">
                                    {admin.phone}
                                </span>
                            </div>

                            {/* DEPARTMENT */}

                            <div className="flex items-center gap-3">
                                <FaBuilding className="text-red-600" />

                                <span className="text-gray-700">
                                    {admin.department}
                                </span>
                            </div>

                            {/* ADDRESS */}

                            <div className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-red-600" />

                                <span className="text-gray-700">
                                    {admin.address}
                                </span>
                            </div>

                            {/* JOINED */}

                            <div className="flex items-center gap-3">
                                <FaCalendarAlt className="text-red-600" />

                                <span className="text-gray-700">
                                    Joined:{" "}
                                    {admin.joined}
                                </span>
                            </div>

                        </div>

                    </div>

                    {/* ==================================
                        EDIT FORM
                    ================================== */}

                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">

                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Edit Profile
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">

                            {/* NAME */}

                            <div>
                                <label className="font-semibold text-gray-700">
                                    Full Name
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-3 focus-within:ring-2 focus-within:ring-red-500">

                                    <FaUser className="text-gray-500" />

                                    <input
                                        type="text"
                                        name="name"
                                        value={admin.name}
                                        onChange={
                                            handleChange
                                        }
                                        className="w-full p-3 outline-none"
                                    />

                                </div>
                            </div>

                            {/* EMAIL */}

                            <div>
                                <label className="font-semibold text-gray-700">
                                    Email
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-3 focus-within:ring-2 focus-within:ring-red-500">

                                    <FaEnvelope className="text-gray-500" />

                                    <input
                                        type="email"
                                        name="email"
                                        value={admin.email}
                                        onChange={
                                            handleChange
                                        }
                                        className="w-full p-3 outline-none"
                                    />

                                </div>
                            </div>

                            {/* PHONE */}

                            <div>
                                <label className="font-semibold text-gray-700">
                                    Phone Number
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-3 focus-within:ring-2 focus-within:ring-red-500">

                                    <FaPhoneAlt className="text-gray-500" />

                                    <input
                                        type="text"
                                        name="phone"
                                        value={admin.phone}
                                        onChange={
                                            handleChange
                                        }
                                        className="w-full p-3 outline-none"
                                    />

                                </div>
                            </div>

                            {/* DEPARTMENT */}

                            <div>
                                <label className="font-semibold text-gray-700">
                                    Department
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-3 focus-within:ring-2 focus-within:ring-red-500">

                                    <FaBuilding className="text-gray-500" />

                                    <input
                                        type="text"
                                        name="department"
                                        value={
                                            admin.department
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="w-full p-3 outline-none"
                                    />

                                </div>
                            </div>

                            {/* ADDRESS */}

                            <div className="md:col-span-2">

                                <label className="font-semibold text-gray-700">
                                    Address
                                </label>

                                <div className="flex items-center border rounded-lg mt-2 px-3 focus-within:ring-2 focus-within:ring-red-500">

                                    <FaMapMarkerAlt className="text-gray-500" />

                                    <input
                                        type="text"
                                        name="address"
                                        value={
                                            admin.address
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="w-full p-3 outline-none"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* ==================================
                            BUTTONS
                        ================================== */}

                        <div className="flex flex-wrap gap-4 mt-8">

                            <button
                                onClick={
                                    handleSave
                                }
                                disabled={saving}
                                className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold"
                            >
                                {saving ? (
                                    <FaSyncAlt className="animate-spin" />
                                ) : (
                                    <FaSave />
                                )}

                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                            <button
                                type="button"
                                className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold"
                                onClick={() =>
                                    alert(
                                        "Change password functionality can be added here."
                                    )
                                }
                            >
                                <FaLock />

                                Change Password
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default AdminProfile;
