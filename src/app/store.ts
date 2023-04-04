import {configureStore} from '@reduxjs/toolkit';
import appContentSlice from '../features/AppContent/appContentSlice';
import cartSlice from '../features/Cart/cartSlice';
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import productsGridSlice from '../features/ProductsGrid/productsGridSlice';
import orderSummarySlice from '../features/OrderSummary/orderSummarySlice';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, cartSlice);

const reducer = {
    appContent: appContentSlice,
    cart: persistedReducer,
    productsGrid: productsGridSlice,
    orderSummary: orderSummarySlice
}

const store = configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['appContent/setAnchor', FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                ignoredPaths: ['appContent.anchorEl']
            }
        })
    }
})

export const persistor = persistStore(store);

export default store;