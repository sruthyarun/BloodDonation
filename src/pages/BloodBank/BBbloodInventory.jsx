import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    FaTint,
    FaPlus,
    FaEdit,
    FaTrash,
    FaSearch,
    FaExclamationTriangle,
} from "react-icons/fa";

import BloodBankPanel from "../../components/BBPanel";

function BBBloodInventory() {

    const user = useSelector((state) => state.user.currentUser);

    const [inventory, setInventory] = useState([]);
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);

    const initialForm = {
        bloodGroup: "",
        units: "",
    };

    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        if (user) {
            fetchInventory();
        }
    }, [user]);

    // Fetch Blood Inventory
    const fetchInventory = async () => {

        try {

            const response = await fetch(
                `https://blood-donation-backend-olwl.onrender.com/bloodInventory?bloodBankEmail=${user.email}`
            );

            const data = await response.json();

            setInventory(Array.isArray(data) ? data : []);

        } catch (error) {

            console.log(error);
            setInventory([]);

        }

    };

    // Input Change
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    // Open Add Modal
    const openAddModal = () => {

        setEditId(null);
        setFormData(initialForm);
        setShowModal(true);

    };

    // Open Edit Modal
    const openEditModal = (item) => {

        setEditId(item.id);

        setFormData({
            bloodGroup: item.bloodGroup,
            units: item.units,
        });

        setShowModal(true);

    };

    // Add / Update Blood Stock
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.bloodGroup || !formData.units) {
            alert("Please fill all fields");
            return;
        }

        const bloodData = {

            bloodBankEmail: user.email,

            bloodBankName:
                user.bloodBankName || user.fullName,

            bloodGroup: formData.bloodGroup,

            units: Number(formData.units),

            lastUpdated:
                new Date().toISOString().split("T")[0],

        };

        try {

            if (editId) {

                await fetch(
                    `https://blood-donation-backend-olwl.onrender.com/bloodInventory/${editId}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify(bloodData),
                    }
                );

                alert("Blood stock updated successfully");

            } else {

                await fetch(
                    "https://blood-donation-backend-olwl.onrender.com/bloodInventory",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify(bloodData),
                    }
                );

                alert("Blood stock added successfully");

            }

            fetchInventory();

            setShowModal(false);

            setEditId(null);

            setFormData(initialForm);

        } catch (error) {

            console.log(error);

            alert("Something went wrong");

        }

    };

    // Delete Blood Stock
    const deleteBlood = async (id) => {

        if (!window.confirm("Delete this blood stock?"))
            return;

        try {

            await fetch(
                `https://blood-donation-backend-olwl.onrender.com/bloodInventory/${id}`,
                {
                    method: "DELETE",
                }
            );

            fetchInventory();

        } catch (error) {

            console.log(error);

        }

    };

    // Search
    const filteredInventory = inventory.filter((item) =>
        item.bloodGroup
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // Summary Cards
    const totalUnits = inventory.reduce(
        (sum, item) => sum + Number(item.units),
        0
    );

    const bloodGroups = inventory.length;

    const lowStock = inventory.filter(
        (item) => item.units <= 10
    ).length;

    const available = inventory.filter(
        (item) => item.units > 10
    ).length;

    if (!user) {

        return (
            <div className="text-center mt-20 text-2xl">
                Please Login First
            </div>
        );

    }

    return (

        <div className="min-h-screen bg-gray-100 flex">

            <BloodBankPanel />
            <div className="min-h-screen bg-gray-100 p-8 flex-1">

                {/* Header */}

                <div className="flex flex-col md:flex-row justify-between items-center mb-8">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Blood Bank Inventory
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage blood units available in your blood bank.
                        </p>

                    </div>

                    <button
                        onClick={openAddModal}
                        className="mt-4 md:mt-0 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg shadow-lg"
                    >
                        <FaPlus />
                        Add Blood Unit
                    </button>

                </div>

                {/* Summary Cards */}

                <div className="grid md:grid-cols-4 gap-6 mb-8">

                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">

                        <FaTint className="text-4xl text-red-600 mx-auto mb-3" />

                        <h2 className="text-3xl font-bold text-red-600">
                            {totalUnits}
                        </h2>

                        <p className="text-gray-500">
                            Total Units
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">

                        <FaTint className="text-4xl text-blue-600 mx-auto mb-3" />

                        <h2 className="text-3xl font-bold text-blue-600">
                            {bloodGroups}
                        </h2>

                        <p className="text-gray-500">
                            Blood Groups
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">

                        <FaExclamationTriangle className="text-4xl text-yellow-500 mx-auto mb-3" />

                        <h2 className="text-3xl font-bold text-yellow-600">
                            {lowStock}
                        </h2>

                        <p className="text-gray-500">
                            Low Stock
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">

                        <FaTint className="text-4xl text-green-600 mx-auto mb-3" />

                        <h2 className="text-3xl font-bold text-green-600">
                            {available}
                        </h2>

                        <p className="text-gray-500">
                            Available
                        </p>

                    </div>

                </div>

                {/* Search */}

                <div className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-3 mb-8">

                    <FaSearch className="text-gray-500" />

                    <input
                        type="text"
                        placeholder="Search Blood Group..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full outline-none"
                    />

                </div>

                {/* Inventory Cards */}

                <div className="grid lg:grid-cols-2 gap-6">

                    {filteredInventory.length === 0 ? (

                        <div className="col-span-2 bg-white rounded-xl shadow-lg p-10 text-center text-gray-500">

                            No Blood Inventory Found

                        </div>

                    ) : (

                        filteredInventory.map((item) => (

                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
                            >

                                <div className="flex justify-between items-center mb-5">

                                    <div className="flex items-center gap-3">

                                        <div className="bg-red-100 p-3 rounded-full">

                                            <FaTint className="text-red-600 text-2xl" />

                                        </div>

                                        <div>

                                            <h2 className="text-2xl font-bold text-red-600">
                                                {item.bloodGroup}
                                            </h2>

                                            <p className="text-gray-500">
                                                Blood Group
                                            </p>

                                        </div>

                                    </div>

                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-semibold ${item.units <= 10
                                            ? "bg-red-100 text-red-600"
                                            : "bg-green-100 text-green-600"
                                            }`}
                                    >
                                        {item.units <= 10
                                            ? "Low Stock"
                                            : "Available"}
                                    </span>

                                </div>

                                <div className="grid grid-cols-2 gap-5">

                                    <div>

                                        <p className="text-gray-500 text-sm">
                                            Available Units
                                        </p>

                                        <h3 className="text-3xl font-bold">
                                            {item.units}
                                        </h3>

                                    </div>

                                    <div>

                                        <p className="text-gray-500 text-sm">
                                            Last Updated
                                        </p>

                                        <h3 className="font-semibold">
                                            {item.lastUpdated}
                                        </h3>

                                    </div>

                                </div>

                                <div className="flex justify-end gap-3 mt-6">

                                    <button
                                        onClick={() => openEditModal(item)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                    >
                                        <FaEdit />
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteBlood(item.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                    >
                                        <FaTrash />
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>
                {/* Add / Edit Blood Unit Modal */}

                {showModal && (

                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

                        <div className="bg-white rounded-2xl shadow-xl w-[420px] p-6">

                            <h2 className="text-2xl font-bold mb-6 text-gray-800">

                                {editId
                                    ? "Edit Blood Unit"
                                    : "Add Blood Unit"}

                            </h2>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >

                                <div>

                                    <label className="font-semibold block mb-2">
                                        Blood Group
                                    </label>

                                    <select
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-500"
                                        required
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

                                <div>

                                    <label className="font-semibold block mb-2">
                                        Available Units
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        name="units"
                                        value={formData.units}
                                        onChange={handleChange}
                                        placeholder="Enter Blood Units"
                                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-500"
                                        required
                                    />

                                </div>

                                <div className="flex justify-end gap-3 pt-4">

                                    <button
                                        type="button"
                                        onClick={() => {

                                            setShowModal(false);

                                            setEditId(null);

                                            setFormData(initialForm);

                                        }}
                                        className="px-5 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                                    >

                                        {editId
                                            ? "Update Blood Unit"
                                            : "Save Blood Unit"}

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}

                {/* Low Stock Alert */}

                {lowStock > 0 && (

                    <div className="mt-8 bg-yellow-100 border-l-4 border-yellow-500 rounded-xl p-5 flex gap-4 items-start">

                        <FaExclamationTriangle className="text-yellow-600 text-3xl mt-1" />

                        <div>

                            <h3 className="font-bold text-yellow-700 text-lg">
                                Low Stock Alert
                            </h3>

                            <p className="text-gray-700 mt-1">
                                Some blood groups have fewer than
                                <strong> 10 units </strong>
                                available. Please arrange blood collection
                                or donation campaigns to replenish the stock.
                            </p>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

}

export default BBBloodInventory;




