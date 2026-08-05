const API_URL = "https://blood-donation-backend-olwl.onrender.com/appointments";

export const bookAppointment = async (appointmentData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
        throw new Error("Failed to book appointment");
    }

    return await response.json();
};