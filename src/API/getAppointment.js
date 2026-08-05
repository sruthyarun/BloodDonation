const API_URL = "https://blood-donation-backend-olwl.onrender.com/appointments";

export const getAppointmentsByEmail = async (email) => {
    const response = await fetch(`${API_URL}?email=${email}`);

    if (!response.ok) {
        throw new Error("Failed to fetch appointments");
    }

    return await response.json();
};