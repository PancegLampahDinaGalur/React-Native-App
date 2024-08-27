import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../ReactotronConfig";
// npm i @reduxjs/toolkit react-redux
import carSlice from "./reducers/car/carSlice";
import carDetailSlice from "./reducers/car/carDetailSlice"
import { DefaultNavigator } from "expo-router/build/views/Navigator";


export const store = configureStore({
    reducer: {
        car: carSlice,
        carDetail: carDetailSlice,
    },
    enhancers: 
    (getDefaultEnchancers) =>
    __DEV__ ? getDefaultEnchancers().concat(reactotron.createEnhancer()) : getDefaultEnchancers() 
})
