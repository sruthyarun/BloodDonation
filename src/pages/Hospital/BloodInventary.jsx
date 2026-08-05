
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    FaTint,
    FaPlus,
    FaEdit,
    FaTrash,
    FaSearch,
} from "react-icons/fa";
import HospitalPanel from "../../components/HospitalPanel";

function BloodInventory() {

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

    const fetchInventory = async () => {
        try {
            const response = await fetch(
                `https://blood-donation-backend-olwl.onrender.com/bloodInventory?hospitalEmail=${user.email}`
            );

            const data = await response.json();

            setInventory(data);

        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const openAddModal = () => {
        setEditId(null);
        setFormData(initialForm);
        setShowModal(true);
    };

    const openEditModal = (item) => {
        setEditId(item.id);

        setFormData({
            bloodGroup: item.bloodGroup,
            units: item.units,
        });

        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.bloodGroup || !formData.units) {
            alert("Please fill all fields");
            return;
        }

        const bloodData = {
            hospitalEmail: user.email,
            bloodGroup: formData.bloodGroup,
            units: Number(formData.units),
            lastUpdated: new Date().toISOString().split("T")[0],
        };

        try {

            if (editId) {

                await fetch(
                    `https://blood-donation-backend-olwl.onrender.com/bloodInventory/${editId}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(bloodData),
                    }
                );

                alert("Blood stock updated successfully!");

            } else {

                await fetch(
                    "https://blood-donation-backend-olwl.onrender.com/bloodInventory",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(bloodData),
                    }
                );

                alert("Blood stock added successfully!");
            }

            fetchInventory();

            setFormData(initialForm);

            setEditId(null);

            setShowModal(false);

        } catch (error) {
            console.log(error);
        }
    };

    const deleteBlood = async (id) => {

        if (!window.confirm("Delete this blood stock?")) return;

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

    const filteredInventory = inventory.filter((item) =>
        item.bloodGroup
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const totalUnits = inventory.reduce(
        (sum, item) => sum + Number(item.units),
        0
    );

    const bloodGroups = inventory.length;

    const lowStock = inventory.filter(
        (item) => item.units <= 10
    ).length;

    if (!user) {
        return (
            <div className="text-center mt-20 text-xl">
                Please Login
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* Sidebar */}

            <HospitalPanel />

            <div className="min-h-screen bg-gray-100 p-8 flex-1">

                <div className="flex flex-col md:flex-row justify-between items-center mb-8">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Blood Inventory
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage available blood stock in your hospital.
                        </p>
                    </div>

                    <button
                        onClick={openAddModal}
                        className="mt-4 md:mt-0 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"
                    >
                        <FaPlus />
                        Add Blood Stock
                    </button>

                </div>

                <div className="grid md:grid-cols-4 gap-6 mb-8">

                    <div className="bg-white text-red-700 rounded-xl p-6 text-center">

                        <h2 className="text-3xl font-bold">{totalUnits}</h2>
                        <p>Total Units</p>
                    </div>

                    <div className="bg-white text-red-700 rounded-xl p-6 text-center">
                        <h2 className="text-3xl font-bold">{bloodGroups}</h2>
                        <p>Blood Groups</p>
                    </div>

                    <div className="bg-white text-red-700 rounded-xl p-6 text-center">
                        <h2 className="text-3xl font-bold">{lowStock}</h2>
                        <p>Low Stock</p>
                    </div>

                    <div className="bg-white text-red-700 rounded-xl p-6 text-center">
                        <h2 className="text-3xl font-bold">15</h2>
                        <p>Today's Donations</p>
                    </div>

                </div>

                <div className="flex items-center bg-white shadow rounded-lg px-4 py-3 mb-6 max-w-md">
                    <FaSearch className="text-gray-500" />

                    <input
                        type="text"
                        placeholder="Search Blood Group..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="ml-3 w-full outline-none"
                    />
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-red-700 text-white">

                            <tr>
                                <th className="py-4">Blood Group</th>
                                <th>Available Units</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredInventory.length === 0 ? (

                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-gray-500">
                                        No blood stock found
                                    </td>
                                </tr>

                            ) : (

                                filteredInventory.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="text-center border-b hover:bg-gray-50"
                                    >

                                        <td className="py-4">

                                            <div className="flex justify-center items-center gap-2">

                                                <FaTint className="text-red-600" />

                                                <span className="font-semibold">
                                                    {item.bloodGroup}
                                                </span>

                                            </div>

                                        </td>

                                        <td>{item.units}</td>

                                        <td>

                                            {item.units <= 10 ? (
                                                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                                                    Low Stock
                                                </span>
                                            ) : (
                                                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
                                                    Available
                                                </span>
                                            )}

                                        </td>

                                        <td>

                                            <div className="flex justify-center gap-3">

                                                <button
                                                    onClick={() => openEditModal(item)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
                                                >
                                                    <FaEdit />
                                                </button>

                                                <button
                                                    onClick={() => deleteBlood(item.id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                                                >
                                                    <FaTrash />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

                {showModal && (

                    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

                        <div className="bg-white rounded-xl p-6 w-[400px]">

                            <h2 className="text-2xl font-bold mb-5">
                                {editId ? "Edit Blood Stock" : "Add Blood Stock"}
                            </h2>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-4">

                                    <label className="font-semibold">
                                        Blood Group
                                    </label>

                                    <select
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3 mt-2"
                                        required
                                    >
                                        <option value="">Select</option>
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

                                <div className="mb-6">

                                    <label className="font-semibold">
                                        Units
                                    </label>

                                    <input
                                        type="number"
                                        name="units"
                                        value={formData.units}
                                        onChange={handleChange}
                                        placeholder="Enter Units"
                                        className="w-full border rounded-lg p-3 mt-2"
                                        required
                                    />

                                </div>

                                <div className="flex justify-end gap-3">

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowModal(false);
                                            setEditId(null);
                                            setFormData(initialForm);
                                        }}
                                        className="px-5 py-2 bg-gray-400 text-white rounded-lg"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-5 py-2 bg-red-600 text-white rounded-lg"
                                    >
                                        {editId ? "Update" : "Save"}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}

export default BloodInventory;
