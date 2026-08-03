const API_URL = "http://localhost:5000/recipients";

export const registerRecipient = async (recipientData) => {

    // Check whether email already exists
    const checkResponse = await fetch(
        `${API_URL}?email=${encodeURIComponent(recipientData.email)}`
    );

    if (!checkResponse.ok) {
        throw new Error("Unable to verify email.");
    }

    const existingUsers = await checkResponse.json();

    if (existingUsers.length > 0) {
        throw new Error("Email already exists. Cannot register.");
    }

    // Save recipient
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recipientData),
    });

    if (!response.ok) {
        throw new Error("Registration failed.");
    }

    return await response.json();
};