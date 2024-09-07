import axios from "axios";
import { login } from "../store/AuthSlice.js";

export const authentication = async (dispatch) => {
    try {
        console.log("Checking authentication status...");
        const response = await axios.get("/user/currentUser", {
            withCredentials: true,
        });

        if (response.data) {
            dispatch(login(response.data)); // Dispatch login action if user data exists
            return response.data;
        } else {
            console.log("No user data found.");
            return null;
        }
    } catch (error) {
        console.log("Error during authentication:", error);
        return null;
    }
};
