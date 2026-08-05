const API_URL = "https://blood-donation-backend-olwl.onrender.com/bloodRequests";

export const bloodRequest = async (requestData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    });

    if (!response.ok) {
        throw new Error("Failed to request blood");
    }

    return await response.json();
};