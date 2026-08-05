import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSearch,
  FaTint,
  FaEdit,
  FaTrash,
  FaExclamationTriangle,
} from "react-icons/fa";
import AdminPanel from "../../components/AdminPanel";

const API_URL = "https://blood-donation-backend-olwl.onrender.com/bloodInventory";

function BloodInventoryADm() {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get(API_URL);
      setInventory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStock = async (id) => {
    if (!window.confirm("Delete this stock?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchInventory();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (item) => {
    let status = "Available";

    if (item.units <= 5) {
      status = "Critical";
    } else if (item.units <= 15) {
      status = "Low Stock";
    }

    try {
      await axios.patch(`${API_URL}/${item.id}`, {
        status,
      });

      fetchInventory();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredInventory = inventory.filter((item) =>
    item.bloodGroup.toLowerCase().includes(search.toLowerCase())
  );

  const totalUnits = inventory.reduce(
    (sum, item) => sum + Number(item.units),
    0
  );

  const bloodGroups = new Set(
    inventory.map((item) => item.bloodGroup)
  ).size;

  const lowStock = inventory.filter(
    (item) => item.status === "Low Stock"
  ).length;

  const critical = inventory.filter(
    (item) => item.status === "Critical"
  ).length;

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700";

      case "Low Stock":
        return "bg-yellow-100 text-yellow-700";

      case "Critical":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      <AdminPanel />

      <div className="flex-1 p-8">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Blood Inventory
            </h1>

            <p className="text-gray-500 mt-2">
              Manage blood stock from all hospitals and blood banks.
            </p>
          </div>

          <div className="flex items-center bg-white rounded-lg shadow px-4 py-3 mt-4 md:mt-0">

            <FaSearch className="text-gray-500" />

            <input
              type="text"
              placeholder="Search Blood Group..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ml-2 outline-none"
            />

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-600">
            <h2 className="text-gray-500">Total Units</h2>

            <p className="text-4xl font-bold text-red-600 mt-2">
              {totalUnits}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
            <h2 className="text-gray-500">Blood Groups</h2>

            <p className="text-4xl font-bold text-green-600 mt-2">
              {bloodGroups}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <h2 className="text-gray-500">Low Stock</h2>

            <p className="text-4xl font-bold text-yellow-500 mt-2">
              {lowStock}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <h2 className="text-gray-500">Critical</h2>

            <p className="text-4xl font-bold text-red-500 mt-2">
              {critical}
            </p>
          </div>

        </div>

        {/* Table */}

        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gradient-to-r from-red-600 to-red-700 text-white">
              <tr>
                <th className="py-4 px-4">Blood Group</th>
                <th>Units</th>
                <th>Hospital / Blood Bank</th>
                <th>Last Updated</th>
                <th>Status</th>
                <th>Low Stock</th>
                <th>Emergency</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredInventory.map((item) => (

                <tr
                  key={item.id}
                  className="text-center border-b hover:bg-red-50 transition"
                >

                  {/* Blood Group */}

                  <td className="py-4">

                    <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">

                      <FaTint className="inline mr-1" />

                      {item.bloodGroup}

                    </span>

                  </td>

                  {/* Units */}

                  <td>

                    <span className="font-bold text-lg">

                      {item.units}

                    </span>

                  </td>

                  {/* Hospital */}

                  <td className="font-medium">

                    {item.hospital}

                  </td>

                  {/* Last Updated */}

                  <td>

                    {item.lastUpdated}

                  </td>

                  {/* Status */}

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${item.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  {/* Low Stock */}

                  <td>

                    {item.units <= 10 ? (

                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">
                        Yes
                      </span>

                    ) : (

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        No
                      </span>

                    )}

                  </td>

                  {/* Emergency */}

                  <td>

                    {item.units <= 5 ? (

                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold animate-pulse">
                        Emergency
                      </span>

                    ) : (

                      <span className="text-gray-400">
                        —
                      </span>

                    )}

                  </td>

                  {/* Actions */}

                  <td>

                    <div className="flex justify-center gap-2">

                      <button
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"
                        title="Edit Stock"
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>

                      {item.units <= 10 && (

                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
                          title="Send Alert"
                        >
                          <FaExclamationTriangle />
                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>
          </table>

        </div>

      </div>

    </div>
  );
}

export default BloodInventoryADm;