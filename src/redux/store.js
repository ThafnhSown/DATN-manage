import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import companyReducer from "./slices/companySlice"
import newsReducer from './slices/newsSlice'
import routeReducer from './slices/routeSlice'
import officeReducer from './slices/officeSlice'
import scheduleReducer from './slices/scheduleSlice'
import staffReducer from './slices/staffSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['authReducer', 'scheduleReducer']
}
const rootReducer = combineReducers({
    authState: authReducer,
    companyState: companyReducer,
    newsState: newsReducer,
    routeState: routeReducer,
    officeState: officeReducer,
    scheduleState: scheduleReducer,
    staffState: staffReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddle) => getDefaultMiddle({ serializableCheck: false }),
});

export const persistor = persistStore(store)
