const API_URL = "http://localhost:5000/appointments";

export const getAppointmentsByEmail = async (email) => {
    const response = await fetch(`${API_URL}?email=${email}`);

    if (!response.ok) {
        throw new Error("Failed to fetch appointments");
    }

    return await response.json();
};