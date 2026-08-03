
const data = [
    {
        icon: 0,
        title: "Save Lives",
        text: "Every donation can save up to three lives."
    },
    {
        icon: 0,
        title: "Safe Process",
        text: "Donation is completely safe and monitored."
    },
    {
        icon: 0,
        title: "Community Support",
        text: "Help hospitals and patients in emergencies."
    },
    {
        icon: 0,
        title: "Healthy Habit",
        text: "Regular donation helps maintain good health."
    }
];

function WhyDonate() {
    return (
        <section className="py-24 bg-red-50">
            <div className="max-w-7xl mx-auto px-8">
                <h2 className="text-4xl font-bold text-center">
                    Why Donate Blood?
                </h2>
                <p className="text-gray-500 text-center mt-4">
                    Every drop counts. Your kindness gives someone another chance to live.
                </p>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-14">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-3 transition duration-300"
                        >
                            <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-bold mt-5">
                                {item.title}
                            </h3>

                            <p className="text-gray-500 mt-3">
                                {item.text}
                            </p>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default WhyDonate;