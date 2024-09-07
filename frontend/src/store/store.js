import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice.js"; // Make sure to import the default export

const store = configureStore({
    reducer: {
        authentication: AuthSlice // The key should match how you access it in `useSelector`
    }
});

export default store;
