const API_URL = "http://localhost:5000/bloodBanks";

export const registerBloodBank = async (bbData) => {

    // Check email already exists
    const checkResponse = await fetch(
        `${API_URL}?email=${bbData.email}`
    );

    const existingbb = await checkResponse.json();

    if (existingbb.length > 0) {
        throw new Error("Blood Bank already registered with this email.");
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bbData),
    });

    if (!response.ok) {
        throw new Error("Failed to register blood bank.");
    }

    return await response.json();
};