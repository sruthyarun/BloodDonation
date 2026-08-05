const API_URL = "https://blood-donation-backend-olwl.onrender.com/hospitals";

export const registerHospital = async (hospitalData) => {

    // Check email already exists
    const checkResponse = await fetch(
        `${API_URL}?email=${hospitalData.email}`
    );

    const existingHospital = await checkResponse.json();

    if (existingHospital.length > 0) {
        throw new Error("Hospital already registered with this email.");
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(hospitalData),
    });

    if (!response.ok) {
        throw new Error("Failed to register hospital.");
    }

    return await response.json();
};