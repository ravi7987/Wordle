import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import contentReducer from './slices/contents'

/*
 * This file is responsible for configuration of the redux store for central state management
 * Individual portions (slices) of the store are declared in their slices files
 * Each slice is then introduced into the central store as key value pair
 * for example dashboard slice is introduced into store in reducer, in configureStore function
 */

const store = configureStore({
    reducer: {
        contents: contentReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

/* store type */
export type RootState = ReturnType<typeof store.getState>;

/* wrapper dispatch to accomodate store return type */
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
