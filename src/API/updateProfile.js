const API_URL = "https://blood-donation-backend-olwl.onrender.com/donors";

export const updateProfile = async (id, userData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error("Failed to update profile");
    }

    return await response.json();
};