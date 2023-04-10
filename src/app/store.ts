import {configureStore} from '@reduxjs/toolkit';
import appContentSlice from '../features/AppContent/appContentSlice';
import cartSlice from '../features/Cart/cartSlice';
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import productsGridSlice from '../features/ProductsGrid/productsGridSlice';
import orderSummarySlice from '../features/OrderSummary/orderSummarySlice';
import adminLoginSlice from '../features/AdminLogin/adminLoginSlice';
import adminContentSlice from '../features/AdminContent/adminContentSlice';
import ordersSlice from '../features/Orders/ordersSlice';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, cartSlice);

const reducer = {
    appContent: appContentSlice,
    cart: persistedReducer,
    productsGrid: productsGridSlice,
    orderSummary: orderSummarySlice,
    adminLogin: adminLoginSlice,
    adminContent: adminContentSlice,
    orders: ordersSlice
}

const store = configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['appContent/setAnchor', 'adminContent/setAnchor', FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                ignoredPaths: ['appContent.anchorEl', 'adminContent.anchorEl']
            }
        })
    }
})

export const persistor = persistStore(store);

export default store;