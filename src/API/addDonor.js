const API_URL = "https://blood-donation-backend-olwl.onrender.com/donors";

export const registerDonor = async (donorData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(donorData),
    });

    if (!response.ok) {
        throw new Error("Failed to save donor");
    }

    return await response.json();
};