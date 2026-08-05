const API_URL = "https://blood-donation-backend-olwl.onrender.com/appointments";

export const cancelAppointment = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            status: "Cancelled",
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to cancel appointment");
    }

    return response.json();
};