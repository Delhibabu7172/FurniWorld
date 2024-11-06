import basicInformationSlice from "./slices/delivery"

import { configureStore } from "@reduxjs/toolkit"
// import plcRegister from "./slices/plcRegister"
// import ftaRegister from "./slices/ftaRegister"

export const store = configureStore({
    reducer : {
        basicInformation : basicInformationSlice,
        // plcRegister : plcRegister,
        // ftaRegister : ftaRegister
    }
})