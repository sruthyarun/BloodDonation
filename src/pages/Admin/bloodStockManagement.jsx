import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
    FaSearch,
    FaTint,
    FaEdit,
    FaTrash,
    FaExclamationTriangle,
    FaPlus,
    FaMinus,
    FaDownload,
    FaPrint,
    FaSyncAlt,
    FaCheckCircle,
    FaTimesCircle,
    FaHospital,
    FaCalendarAlt,
    FaChartBar,
    FaFileAlt,
} from "react-icons/fa";

import AdminPanel from "../../components/AdminPanel";

const API_URL =
    "https://blood-donation-backend-olwl.onrender.com/bloodStocks";

const BLOOD_GROUPS = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
];

function BloodStockManagementADm() {
    const [inventory, setInventory] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const [reportType, setReportType] = useState("current");

    const [formData, setFormData] = useState({
        bloodGroup: "",
        units: "",
        reservedUnits: "",
        expiredUnits: "",
        hospital: "",
        sourceType: "Blood Bank",
        lastUpdated: new Date()
            .toISOString()
            .split("T")[0],
    });

    // =====================================================
    // FETCH INVENTORY
    // =====================================================

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            setLoading(true);

            const res = await axios.get(API_URL);

            setInventory(res.data);
        } catch (error) {
            console.log(
                "Error fetching blood inventory:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // SEARCH
    // =====================================================

    const filteredInventory = useMemo(() => {
        const value = search.toLowerCase().trim();

        return inventory.filter(
            (item) =>
                item.bloodGroup
                    ?.toLowerCase()
                    .includes(value) ||
                item.hospital
                    ?.toLowerCase()
                    .includes(value) ||
                item.sourceType
                    ?.toLowerCase()
                    .includes(value)
        );
    }, [inventory, search]);

    // =====================================================
    // STATUS
    // =====================================================

    const getStatus = (units) => {
        const value = Number(units || 0);

        if (value === 0) {
            return "Out of Stock";
        }

        if (value <= 5) {
            return "Critical";
        }

        if (value <= 15) {
            return "Low Stock";
        }

        return "Available";
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Available":
                return "bg-green-100 text-green-700";

            case "Low Stock":
                return "bg-yellow-100 text-yellow-700";

            case "Critical":
                return "bg-red-100 text-red-700";

            case "Out of Stock":
                return "bg-gray-200 text-gray-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // =====================================================
    // DASHBOARD CALCULATIONS
    // =====================================================

    const totalUnits = inventory.reduce(
        (sum, item) =>
            sum + Number(item.units || 0),
        0
    );

    const reservedUnits = inventory.reduce(
        (sum, item) =>
            sum + Number(item.reservedUnits || 0),
        0
    );

    const expiredUnits = inventory.reduce(
        (sum, item) =>
            sum + Number(item.expiredUnits || 0),
        0
    );

    const lowStock = inventory.filter(
        (item) =>
            getStatus(item.units) === "Low Stock"
    ).length;

    const critical = inventory.filter(
        (item) =>
            getStatus(item.units) === "Critical"
    ).length;

    const outOfStock = inventory.filter(
        (item) =>
            getStatus(item.units) === "Out of Stock"
    ).length;

    // =====================================================
    // BLOOD GROUP TOTALS
    // =====================================================

    const bloodGroupStock = BLOOD_GROUPS.map(
        (group) => {
            const items = inventory.filter(
                (item) =>
                    item.bloodGroup === group
            );

            const units = items.reduce(
                (sum, item) =>
                    sum + Number(item.units || 0),
                0
            );

            const reserved = items.reduce(
                (sum, item) =>
                    sum +
                    Number(
                        item.reservedUnits || 0
                    ),
                0
            );

            const expired = items.reduce(
                (sum, item) =>
                    sum +
                    Number(
                        item.expiredUnits || 0
                    ),
                0
            );

            return {
                bloodGroup: group,
                units,
                reserved,
                expired,
                status: getStatus(units),
            };
        }
    );

    // =====================================================
    // RECEIVED BLOOD
    // =====================================================

    const receivedUnits = inventory
        .filter(
            (item) =>
                item.type === "Received" ||
                item.sourceType === "Blood Bank"
        )
        .reduce(
            (sum, item) =>
                sum + Number(item.receivedUnits || 0),
            0
        );

    // =====================================================
    // ISSUED BLOOD
    // =====================================================

    const issuedUnits = inventory
        .reduce(
            (sum, item) =>
                sum + Number(item.issuedUnits || 0),
            0
        );

    // =====================================================
    // FORM CHANGE
    // =====================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =====================================================
    // OPEN ADD
    // =====================================================

    const openAddModal = () => {
        setEditingItem(null);

        setFormData({
            bloodGroup: "",
            units: "",
            reservedUnits: "",
            expiredUnits: "",
            hospital: "",
            sourceType: "Blood Bank",
            lastUpdated: new Date()
                .toISOString()
                .split("T")[0],
        });

        setShowModal(true);
    };

    // =====================================================
    // OPEN EDIT
    // =====================================================

    const openEditModal = (item) => {
        setEditingItem(item);

        setFormData({
            bloodGroup:
                item.bloodGroup || "",
            units: item.units || "",
            reservedUnits:
                item.reservedUnits || "",
            expiredUnits:
                item.expiredUnits || "",
            hospital:
                item.hospital || "",
            sourceType:
                item.sourceType ||
                "Blood Bank",
            lastUpdated:
                item.lastUpdated ||
                new Date()
                    .toISOString()
                    .split("T")[0],
        });

        setShowModal(true);
    };

    // =====================================================
    // ADD / UPDATE STOCK
    // =====================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const units = Number(
                formData.units || 0
            );

            const status = getStatus(units);

            const stockData = {
                bloodGroup:
                    formData.bloodGroup,
                units,
                reservedUnits: Number(
                    formData.reservedUnits || 0
                ),
                expiredUnits: Number(
                    formData.expiredUnits || 0
                ),
                hospital:
                    formData.hospital,
                sourceType:
                    formData.sourceType,
                status,
                lastUpdated:
                    formData.lastUpdated,
            };

            if (editingItem) {
                await axios.put(
                    `${API_URL}/${editingItem.id}`,
                    {
                        ...editingItem,
                        ...stockData,
                    }
                );
            } else {
                await axios.post(
                    API_URL,
                    stockData
                );
            }

            setShowModal(false);

            fetchInventory();
        } catch (error) {
            console.log(
                "Error saving stock:",
                error
            );

            alert(
                "Unable to save blood stock."
            );
        }
    };

    // =====================================================
    // DELETE
    // =====================================================

    const deleteStock = async (id) => {
        if (
            !window.confirm(
                "Delete this stock?"
            )
        ) {
            return;
        }

        try {
            await axios.delete(
                `${API_URL}/${id}`
            );

            fetchInventory();
        } catch (error) {
            console.log(
                "Error deleting stock:",
                error
            );
        }
    };

    // =====================================================
    // CSV REPORT
    // =====================================================

    const generateReport = () => {
        let data = [];

        if (reportType === "current") {
            data = inventory;
        }

        if (reportType === "bloodGroup") {
            data = bloodGroupStock;
        }

        if (reportType === "lowStock") {
            data = inventory.filter(
                (item) =>
                    getStatus(item.units) ===
                    "Low Stock" ||
                    getStatus(item.units) ===
                    "Critical"
            );
        }

        if (reportType === "expired") {
            data = inventory.filter(
                (item) =>
                    Number(
                        item.expiredUnits || 0
                    ) > 0
            );
        }

        if (reportType === "collection") {
            data = inventory.filter(
                (item) =>
                    item.type === "Received" ||
                    item.sourceType ===
                    "Blood Bank"
            );
        }

        if (reportType === "issued") {
            data = inventory.filter(
                (item) =>
                    Number(
                        item.issuedUnits || 0
                    ) > 0
            );
        }

        if (reportType === "monthly") {
            const currentMonth =
                new Date().getMonth();

            data = inventory.filter((item) => {
                if (!item.lastUpdated)
                    return false;

                return (
                    new Date(
                        item.lastUpdated
                    ).getMonth() ===
                    currentMonth
                );
            });
        }

        if (data.length === 0) {
            alert(
                "No data available for this report."
            );

            return;
        }

        const headers = Object.keys(data[0]);

        const csvRows = [
            headers.join(","),
            ...data.map((item) =>
                headers
                    .map(
                        (header) =>
                            `"${String(
                                item[header] ??
                                ""
                            ).replace(
                                /"/g,
                                '""'
                            )}"`
                    )
                    .join(",")
            ),
        ];

        const blob = new Blob(
            [csvRows.join("\n")],
            {
                type: "text/csv",
            }
        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            `${reportType}-blood-stock-report.csv`;

        link.click();

        URL.revokeObjectURL(url);
    };

    // =====================================================
    // PRINT
    // =====================================================

    const printReport = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">

            <AdminPanel />

            <div className="flex-1 p-8">

                {/* =========================================
                    HEADER
                ========================================= */}

                <div className="flex flex-col lg:flex-row justify-between gap-5 mb-8">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Blood Stock Management
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Monitor blood stock,
                            collection, issued units
                            and inventory reports.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">

                        <div className="flex items-center bg-white rounded-lg shadow px-4 py-3">

                            <FaSearch className="text-gray-500" />

                            <input
                                type="text"
                                placeholder="Search blood group..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target
                                            .value
                                    )
                                }
                                className="ml-2 outline-none w-52"
                            />

                        </div>

                        <button
                            onClick={fetchInventory}
                            className="flex items-center justify-center gap-2 bg-gray-700 text-white px-4 py-3 rounded-lg hover:bg-gray-800"
                        >
                            <FaSyncAlt />
                            Refresh
                        </button>

                    </div>

                </div>

                {/* =========================================
                    SUMMARY
                ========================================= */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 mb-8">

                    <SummaryCard
                        title="Available Units"
                        value={totalUnits}
                        icon={<FaTint />}
                        color="red"
                    />

                    <SummaryCard
                        title="Reserved Units"
                        value={reservedUnits}
                        icon={<FaHospital />}
                        color="blue"
                    />

                    <SummaryCard
                        title="Expired Units"
                        value={expiredUnits}
                        icon={<FaTimesCircle />}
                        color="gray"
                    />

                    <SummaryCard
                        title="Low Stock"
                        value={lowStock}
                        icon={
                            <FaExclamationTriangle />
                        }
                        color="yellow"
                    />

                    <SummaryCard
                        title="Critical"
                        value={critical}
                        icon={
                            <FaExclamationTriangle />
                        }
                        color="red"
                    />

                    <SummaryCard
                        title="Out of Stock"
                        value={outOfStock}
                        icon={<FaTimesCircle />}
                        color="gray"
                    />

                </div>

                {/* =========================================
                    RECEIVED / ISSUED
                ========================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-gray-500">
                                    Blood Received
                                </p>

                                <p className="text-4xl font-bold text-green-600 mt-2">
                                    {receivedUnits}
                                </p>

                                <p className="text-sm text-gray-400 mt-1">
                                    Units received from
                                    blood banks
                                </p>
                            </div>

                            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">

                                <FaPlus className="text-green-600 text-xl" />

                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-gray-500">
                                    Blood Issued
                                </p>

                                <p className="text-4xl font-bold text-blue-600 mt-2">
                                    {issuedUnits}
                                </p>

                                <p className="text-sm text-gray-400 mt-1">
                                    Units issued to
                                    recipients
                                </p>
                            </div>

                            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">

                                <FaMinus className="text-blue-600 text-xl" />

                            </div>

                        </div>

                    </div>

                </div>

                {/* =========================================
                    BLOOD GROUP STOCK
                ========================================= */}

                <div className="mb-8">

                    <div className="flex justify-between items-center mb-5">

                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                Blood Group-wise Stock
                            </h2>

                            <p className="text-gray-500">
                                Current availability
                                by blood group.
                            </p>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">

                        {bloodGroupStock.map(
                            (group) => (

                                <div
                                    key={
                                        group.bloodGroup
                                    }
                                    className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition"
                                >

                                    <div className="flex justify-between items-center">

                                        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">

                                            <FaTint className="text-red-600 text-xl" />

                                        </div>

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                group.status
                                            )}`}
                                        >
                                            {
                                                group.status
                                            }
                                        </span>

                                    </div>

                                    <h3 className="text-3xl font-bold text-gray-800 mt-5">
                                        {
                                            group.bloodGroup
                                        }
                                    </h3>

                                    <p className="text-gray-500 mt-1">
                                        Available Units
                                    </p>

                                    <p className="text-4xl font-bold text-red-600 mt-2">
                                        {group.units}
                                    </p>

                                    <div className="grid grid-cols-2 gap-2 mt-4">

                                        <div className="bg-blue-50 rounded-lg p-2">

                                            <p className="text-xs text-gray-500">
                                                Reserved
                                            </p>

                                            <p className="font-bold text-blue-600">
                                                {
                                                    group.reserved
                                                }
                                            </p>

                                        </div>

                                        <div className="bg-gray-100 rounded-lg p-2">

                                            <p className="text-xs text-gray-500">
                                                Expired
                                            </p>

                                            <p className="font-bold text-gray-600">
                                                {
                                                    group.expired
                                                }
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </div>

                {/* =========================================
                    ALERTS
                ========================================= */}

                {(lowStock > 0 ||
                    critical > 0 ||
                    outOfStock > 0) && (

                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-8">

                            <div className="flex gap-3">

                                <FaExclamationTriangle className="text-yellow-600 text-xl mt-1" />

                                <div>

                                    <h3 className="font-bold text-yellow-800">
                                        Blood Stock Alerts
                                    </h3>

                                    <p className="text-yellow-700 text-sm mt-1">

                                        {lowStock} low-stock
                                        group(s),{" "}
                                        {critical} critical
                                        group(s), and{" "}
                                        {outOfStock} out-of-stock
                                        group(s).

                                    </p>

                                </div>

                            </div>

                        </div>

                    )}

                {/* =========================================
                    REPORTS
                ========================================= */}

                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

                    <div className="flex items-center gap-3 mb-5">

                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">

                            <FaFileAlt className="text-red-600 text-xl" />

                        </div>

                        <div>

                            <h2 className="text-xl font-bold text-gray-800">
                                Blood Stock Reports
                            </h2>

                            <p className="text-gray-500 text-sm">
                                Generate and export
                                inventory reports.
                            </p>

                        </div>

                    </div>

                    <div className="flex flex-col md:flex-row gap-3">

                        <select
                            value={reportType}
                            onChange={(e) =>
                                setReportType(
                                    e.target.value
                                )
                            }
                            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                        >

                            <option value="current">
                                Current Blood Stock Report
                            </option>

                            <option value="bloodGroup">
                                Blood Group-wise Stock Report
                            </option>

                            <option value="lowStock">
                                Low Stock Report
                            </option>

                            <option value="expired">
                                Expired Stock Report
                            </option>

                            <option value="collection">
                                Blood Collection Report
                            </option>

                            <option value="issued">
                                Blood Issued Report
                            </option>

                            <option value="monthly">
                                Monthly Stock Report
                            </option>

                        </select>

                        <button
                            onClick={
                                generateReport
                            }
                            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold"
                        >
                            <FaDownload />
                            Export Report
                        </button>

                        <button
                            onClick={printReport}
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold"
                        >
                            <FaPrint />
                            Print
                        </button>

                    </div>

                </div>

                {/* =========================================
                    RECENT STOCK UPDATES
                ========================================= */}

                <div className="mb-8">

                    <div className="flex items-center gap-3 mb-5">

                        <FaCalendarAlt className="text-red-600 text-xl" />

                        <div>

                            <h2 className="text-2xl font-bold text-gray-800">
                                Recent Stock Updates
                            </h2>

                            <p className="text-gray-500">
                                Latest inventory changes.
                            </p>

                        </div>

                    </div>

                    <div className="space-y-4">

                        {inventory
                            .slice()
                            .sort(
                                (a, b) =>
                                    new Date(
                                        b.lastUpdated ||
                                        0
                                    ) -
                                    new Date(
                                        a.lastUpdated ||
                                        0
                                    )
                            )
                            .slice(0, 5)
                            .map((item) => (

                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl shadow p-5"
                                >

                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                        <div className="flex items-center gap-4">

                                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">

                                                <FaTint className="text-red-600" />

                                            </div>

                                            <div>

                                                <h3 className="font-bold text-gray-800">
                                                    {
                                                        item.bloodGroup
                                                    }
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    {
                                                        item.hospital ||
                                                        "Blood Bank"
                                                    }
                                                </p>

                                            </div>

                                        </div>

                                        <div className="flex items-center gap-5">

                                            <div>
                                                <p className="text-xs text-gray-400">
                                                    Units
                                                </p>

                                                <p className="font-bold">
                                                    {
                                                        item.units
                                                    }
                                                </p>
                                            </div>

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                                                    getStatus(
                                                        item.units
                                                    )
                                                )}`}
                                            >
                                                {getStatus(
                                                    item.units
                                                )}
                                            </span>

                                            <p className="text-sm text-gray-400">
                                                {
                                                    item.lastUpdated
                                                }
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            ))}

                    </div>

                </div>

                {/* =========================================
                    INVENTORY LIST
                ========================================= */}

                <div>

                    <div className="flex justify-between items-center mb-5">

                        <div>

                            <h2 className="text-2xl font-bold text-gray-800">
                                Inventory Records
                            </h2>

                            <p className="text-gray-500">
                                Manage individual stock
                                records.
                            </p>

                        </div>

                        <button
                            onClick={openAddModal}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-semibold"
                        >
                            <FaPlus />
                            Add Stock
                        </button>

                    </div>

                    {loading ? (

                        <div className="bg-white rounded-xl p-10 text-center">

                            <FaSyncAlt className="animate-spin mx-auto text-red-600 text-3xl" />

                            <p className="text-gray-500 mt-3">
                                Loading inventory...
                            </p>

                        </div>

                    ) : filteredInventory.length ===
                        0 ? (

                        <div className="bg-white rounded-xl p-10 text-center">

                            <FaTint className="mx-auto text-gray-300 text-5xl" />

                            <p className="text-gray-500 mt-3">
                                No inventory records
                                found.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {filteredInventory.map(
                                (item) => {

                                    const status =
                                        getStatus(
                                            item.units
                                        );

                                    return (

                                        <div
                                            key={
                                                item.id
                                            }
                                            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition"
                                        >

                                            <div className="flex flex-col xl:flex-row xl:items-center gap-6">

                                                {/* Blood */}

                                                <div className="flex items-center gap-4 flex-1">

                                                    <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">

                                                        <FaTint className="text-red-600 text-xl" />

                                                    </div>

                                                    <div>

                                                        <h3 className="text-xl font-bold text-gray-800">
                                                            {
                                                                item.bloodGroup
                                                            }
                                                        </h3>

                                                        <p className="text-sm text-gray-500">
                                                            ID:{" "}
                                                            {
                                                                item.id
                                                            }
                                                        </p>

                                                    </div>

                                                </div>

                                                {/* Units */}

                                                <div className="flex gap-3">

                                                    <div className="bg-red-50 rounded-lg px-5 py-3 text-center">

                                                        <p className="text-xs text-gray-500">
                                                            Available
                                                        </p>

                                                        <p className="text-2xl font-bold text-red-600">
                                                            {
                                                                item.units
                                                            }
                                                        </p>

                                                    </div>

                                                    <div className="bg-blue-50 rounded-lg px-5 py-3 text-center">

                                                        <p className="text-xs text-gray-500">
                                                            Reserved
                                                        </p>

                                                        <p className="text-2xl font-bold text-blue-600">
                                                            {
                                                                item.reservedUnits ||
                                                                0
                                                            }
                                                        </p>

                                                    </div>

                                                    <div className="bg-gray-100 rounded-lg px-5 py-3 text-center">

                                                        <p className="text-xs text-gray-500">
                                                            Expired
                                                        </p>

                                                        <p className="text-2xl font-bold text-gray-600">
                                                            {
                                                                item.expiredUnits ||
                                                                0
                                                            }
                                                        </p>

                                                    </div>

                                                </div>

                                                {/* Source */}

                                                <div className="min-w-48">

                                                    <p className="text-xs text-gray-400">
                                                        Source
                                                    </p>

                                                    <p className="font-semibold text-gray-700">
                                                        {
                                                            item.hospital ||
                                                            "Blood Bank"
                                                        }
                                                    </p>

                                                </div>

                                                {/* Status */}

                                                <span
                                                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                                                        status
                                                    )}`}
                                                >
                                                    {
                                                        status
                                                    }
                                                </span>

                                                {/* Actions */}

                                                <div className="flex gap-2">

                                                    <button
                                                        onClick={() =>
                                                            openEditModal(
                                                                item
                                                            )
                                                        }
                                                        className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg"
                                                        title="Edit"
                                                    >
                                                        <FaEdit />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            deleteStock(
                                                                item.id
                                                            )
                                                        }
                                                        className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 hover:bg-red-600 hover:text-white rounded-lg"
                                                        title="Delete"
                                                    >
                                                        <FaTrash />
                                                    </button>

                                                    {Number(
                                                        item.units
                                                    ) <=
                                                        10 && (

                                                            <button
                                                                onClick={() =>
                                                                    alert(
                                                                        `Low stock alert for ${item.bloodGroup}`
                                                                    )
                                                                }
                                                                className="w-10 h-10 flex items-center justify-center bg-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white rounded-lg"
                                                                title="Send Alert"
                                                            >
                                                                <FaExclamationTriangle />
                                                            </button>

                                                        )}

                                                </div>

                                            </div>

                                        </div>

                                    );
                                }
                            )}

                        </div>

                    )}

                </div>

            </div>

            {/* =========================================
                ADD / EDIT MODAL
            ========================================= */}

            {showModal && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">

                        <div className="flex justify-between items-center p-6 border-b">

                            <div>

                                <h2 className="text-2xl font-bold text-gray-800">

                                    {editingItem
                                        ? "Edit Blood Stock"
                                        : "Add Blood Stock"}

                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Update blood inventory
                                    information.
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    setShowModal(
                                        false
                                    )
                                }
                                className="text-gray-500 hover:text-red-600 text-xl"
                            >
                                ✕
                            </button>

                        </div>

                        <form
                            onSubmit={
                                handleSubmit
                            }
                            className="p-6 space-y-5"
                        >

                            {/* Blood Group */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Blood Group
                                </label>

                                <select
                                    name="bloodGroup"
                                    value={
                                        formData.bloodGroup
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                                >

                                    <option value="">
                                        Select Blood Group
                                    </option>

                                    {BLOOD_GROUPS.map(
                                        (group) => (

                                            <option
                                                key={
                                                    group
                                                }
                                                value={
                                                    group
                                                }
                                            >
                                                {
                                                    group
                                                }
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            {/* Units */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Available Units
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    name="units"
                                    value={
                                        formData.units
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Enter available units"
                                />

                            </div>

                            {/* Reserved */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Reserved Units
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    name="reservedUnits"
                                    value={
                                        formData.reservedUnits
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Enter reserved units"
                                />

                            </div>

                            {/* Expired */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Expired Units
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    name="expiredUnits"
                                    value={
                                        formData.expiredUnits
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Enter expired units"
                                />

                            </div>

                            {/* Source */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Hospital / Blood Bank
                                </label>

                                <input
                                    type="text"
                                    name="hospital"
                                    value={
                                        formData.hospital
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Enter source name"
                                />

                            </div>

                            {/* Source Type */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Source Type
                                </label>

                                <select
                                    name="sourceType"
                                    value={
                                        formData.sourceType
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                                >

                                    <option value="Blood Bank">
                                        Blood Bank
                                    </option>

                                    <option value="Hospital">
                                        Hospital
                                    </option>

                                    <option value="Donation">
                                        Donation
                                    </option>

                                </select>

                            </div>

                            {/* Date */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Last Updated
                                </label>

                                <input
                                    type="date"
                                    name="lastUpdated"
                                    value={
                                        formData.lastUpdated
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                                />

                            </div>

                            {/* Buttons */}

                            <div className="flex justify-end gap-3 pt-3">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowModal(
                                            false
                                        )
                                    }
                                    className="px-5 py-3 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-5 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                                >
                                    {editingItem
                                        ? "Update Stock"
                                        : "Add Stock"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

// =====================================================
// SUMMARY CARD
// =====================================================

function SummaryCard({
    title,
    value,
    icon,
    color,
}) {
    const colors = {
        red: {
            border: "border-red-600",
            text: "text-red-600",
            bg: "bg-red-100",
        },

        green: {
            border: "border-green-600",
            text: "text-green-600",
            bg: "bg-green-100",
        },

        yellow: {
            border: "border-yellow-500",
            text: "text-yellow-600",
            bg: "bg-yellow-100",
        },

        blue: {
            border: "border-blue-600",
            text: "text-blue-600",
            bg: "bg-blue-100",
        },

        gray: {
            border: "border-gray-500",
            text: "text-gray-600",
            bg: "bg-gray-100",
        },
    };

    const style =
        colors[color] || colors.red;

    return (
        <div
            className={`bg-white rounded-xl shadow-md p-5 border-l-4 ${style.border}`}
        >

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500 text-sm">
                        {title}
                    </p>

                    <p
                        className={`text-3xl font-bold mt-2 ${style.text}`}
                    >
                        {value}
                    </p>

                </div>

                <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${style.bg}`}
                >
                    <span className={style.text}>
                        {icon}
                    </span>
                </div>

            </div>

        </div>
    );
}

export default BloodStockManagementADm;