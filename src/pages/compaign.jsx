import Navbar from "../components/Navbar";
import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaUsers,
    FaTint,
    FaHeart,
    FaArrowRight,
} from "react-icons/fa";

function Campaigns() {
    const campaigns = [
        {
            id: 1,
            title: "World Blood Donor Day",
            location: "Government Medical College, Kochi",
            date: "14 June 2026",
            time: "9:00 AM - 4:00 PM",
            target: "300 Donors",
            status: "Completed",
        },
        {
            id: 2,
            title: "Independence Day Blood Camp",
            location: "District Hospital, Thrissur",
            date: "15 August 2026",
            time: "9:00 AM - 3:00 PM",
            target: "250 Donors",
            status: "Upcoming",
        },
        {
            id: 3,
            title: "College Blood Donation Drive",
            location: "CUSAT, Kochi",
            date: "25 August 2026",
            time: "10:00 AM - 2:00 PM",
            target: "200 Donors",
            status: "Upcoming",
        },
        {
            id: 4,
            title: "Emergency Blood Camp",
            location: "Medical College, Calicut",
            date: "10 September 2026",
            time: "8:30 AM - 5:00 PM",
            target: "400 Donors",
            status: "Upcoming",
        },
    ];

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100">

                {/* Hero */}

                <div className="bg-gradient-to-r from-red-800 to-red-400 text-white py-20">

                    <div className="max-w-7xl mx-auto px-6 text-center">

                        <FaTint className="text-6xl mx-auto mb-5" />

                        <h1 className="text-5xl font-bold mb-4">
                            Blood Donation Campaigns
                        </h1>

                        <p className="max-w-3xl mx-auto text-lg">
                            Participate in blood donation campaigns and become
                            someone's hero. Together we can build a healthier
                            community by ensuring blood is available whenever it
                            is needed.
                        </p>

                        <button className="mt-8 bg-white text-red-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
                            Join a Campaign
                        </button>

                    </div>

                </div>

                {/* Statistics */}

                <div className="max-w-7xl mx-auto px-6 py-14">

                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <h2 className="text-4xl font-bold text-red-600">
                                12
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Active Campaigns
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <h2 className="text-4xl font-bold text-red-600">
                                3500+
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Registered Donors
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <h2 className="text-4xl font-bold text-red-600">
                                120+
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Partner Hospitals
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <h2 className="text-4xl font-bold text-red-600">
                                6500+
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Lives Saved
                            </p>
                        </div>

                    </div>

                    {/* Campaign Cards */}

                    <div className="mt-16">

                        <h2 className="text-3xl font-bold text-center text-red-600 mb-10">
                            Upcoming Campaigns
                        </h2>

                        <div className="grid lg:grid-cols-2 gap-8">

                            {campaigns.map((campaign) => (

                                <div
                                    key={campaign.id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition duration-300"
                                >

                                    <div className="bg-red-800 text-white p-6">

                                        <div className="flex justify-between">

                                            <h2 className="text-2xl font-bold">
                                                {campaign.title}
                                            </h2>

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm ${campaign.status === "Upcoming"
                                                    ? "bg-green-500"
                                                    : "bg-blue-500"
                                                    }`}
                                            >
                                                {campaign.status}
                                            </span>

                                        </div>

                                    </div>

                                    <div className="p-6 space-y-4">

                                        <div className="flex items-center gap-3">
                                            <FaMapMarkerAlt className="text-red-600" />
                                            {campaign.location}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <FaCalendarAlt className="text-red-600" />
                                            {campaign.date}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <FaUsers className="text-red-600" />
                                            {campaign.target}
                                        </div>

                                        <p className="text-gray-600">
                                            Time : {campaign.time}
                                        </p>


                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* Why Join */}

                    <div className="mt-20">

                        <h2 className="text-3xl font-bold text-center text-red-600 mb-10">
                            Why Participate?
                        </h2>

                        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

                            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                                <FaHeart className="text-red-600 text-5xl mx-auto mb-4" />
                                <h3 className="font-bold text-xl">
                                    Save Lives
                                </h3>
                                <p className="text-gray-600 mt-3">
                                    One blood donation can save up to three lives.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                                <FaTint className="text-red-600 text-5xl mx-auto mb-4" />
                                <h3 className="font-bold text-xl">
                                    Free Health Check
                                </h3>
                                <p className="text-gray-600 mt-3">
                                    Get a free health screening before donating.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                                <FaUsers className="text-red-600 text-5xl mx-auto mb-4" />
                                <h3 className="font-bold text-xl">
                                    Community Service
                                </h3>
                                <p className="text-gray-600 mt-3">
                                    Support hospitals and people in need.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                                <FaCalendarAlt className="text-red-600 text-5xl mx-auto mb-4" />
                                <h3 className="font-bold text-xl">
                                    Regular Events
                                </h3>
                                <p className="text-gray-600 mt-3">
                                    Participate in donation camps throughout the year.
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* CTA */}

                    <div className="bg-red-800 text-white rounded-3xl mt-20 p-14 text-center">

                        <h2 className="text-4xl font-bold">
                            Be Someone's Lifeline
                        </h2>

                        <p className="mt-5 max-w-3xl mx-auto text-lg">
                            Your blood donation can give hope to patients fighting
                            for their lives. Join our next campaign and become a
                            real-life hero.
                        </p>

                        <button className="mt-8 bg-white text-red-600 px-10 py-3 rounded-xl font-bold hover:bg-gray-100">
                            Become a Donor
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Campaigns;