import {configureStore} from '@reduxjs/toolkit';
import appContentSlice from '../features/AppContent/appContentSlice';

const reducer = {
    appContent: appContentSlice,
}

const store = configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['appContent/setAnchor'],
                ignoredPaths: ['appContent.anchor']
            }
        })
    }
})

export default store;