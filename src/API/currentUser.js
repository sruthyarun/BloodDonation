
import axios from "axios";

export const currentUser = async () => {
    try {
        const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

        if (!loggedUser) return;

        const response = await fetch(
            `http://localhost:5000/donors/${loggedUser.id}`
        );

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
