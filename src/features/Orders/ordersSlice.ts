import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IOrder, RootState } from "../../utils/interfaces";
import axios from "axios";
import apiUrl from "../../utils/common";

const initialState = {
    orders: [] as IOrder[],
    modalStatus: false,
    trackingModalStatus: false,
    deleteModalStatus: false,
    cancelModalStatus: false,
    order: {} as IOrder,
    trackingNumber: "",
    serviceProvider: "",
    trackingError: false,
    serviceProviderError: false,
    ordersPending: false,
    ordersFailed: false,
    orderPending: false,
    orderFailed: false,
    editOrderPending: false,
    editOrderFailed: false,
    deleteOrderPending: false,
    deleteOrderFailed: false
}

export const getRecentOrders = createAsyncThunk('orders/getRecentOrders', async ({token}: {token: string}) => {
    const headers = {
        headers: {
            authorization: `Bearer ${token}`
        }
    };

    const { data } = await axios.get(`${apiUrl}/admin/recent-orders`, headers);

    return data;
});

export const getAllOrders = createAsyncThunk('orders/getAllOrders', async ({token}: {token: string}) => {
    const headers = {
        headers: {
            authorization: `Bearer ${token}`
        }
    };

    const { data } = await axios.get(`${apiUrl}/admin/orders`, headers);

    return data;
})

export const addTrackingNumber = createAsyncThunk('orders/addTrackingNumber', async ({token, id, trackingNumber, serviceProvider}: {token: string, id: string, trackingNumber: string, serviceProvider: string}) => {
    const headers = {
        headers: {
            authorization: `Bearer ${token}`
        }
    };

    await axios.patch(`${apiUrl}/admin/orders/add-tracking/${id}`, {trackingNumber, serviceProvider}, headers);
})

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async ({token, id}: {token: string, id: string}) => {
    const headers = {
        headers: {
            authorization: `Bearer ${token}`
        }
    };

    await axios.delete(`${apiUrl}/admin/orders/delete-order/${id}`, headers);
})

export const cancelOrder = createAsyncThunk('orders/cancelOrder', async ({token, paymentIntentId}: {token: string, paymentIntentId: string}) => {
    const headers = {
        headers: {
            authorization: `Bearer ${token}`
        }
    };

    const requestBody = {
        paymentIntentId
    }

    await axios.post(`${apiUrl}/admin/orders/cancel-order`, requestBody, headers);
})

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrders: (state) => {
            state.orders = [];
        },
        openModal: (state, action) => {
            const { order, modal } = action.payload;

            switch (modal) {
                case 'order':
                    state.modalStatus = true;
                    state.order = order;
                    break;
                case 'tracking':
                    state.trackingModalStatus = true;
                    break;
                case 'delete':
                    state.deleteModalStatus = true;
                    break;
                case 'cancel':
                    state.cancelModalStatus = true;
                    break;
                default:
                    break;
            }
        },
        closeModal: (state, action) => {
            const { modal } = action.payload

            switch (modal) {
                case 'order':
                    state.modalStatus = false;
                    state.order = {} as IOrder;
                    break;
                case 'tracking':
                    state.trackingModalStatus = false;
                    break;
                case 'delete':
                    state.deleteModalStatus = false;
                    break;
                case 'cancel':
                    state.cancelModalStatus = false;
                    break;
                default:
                    break;
            }
        },
        changeField: (state, action) => {
            const { name, value } = action.payload;

            switch (name) {
                case 'trackingNumber':
                    state.trackingNumber = value;
                    state.trackingError = false;
                    break;
                case 'serviceProvider':
                    state.serviceProvider = value;
                    state.serviceProviderError = false;
                    break;
                default:
                    break
            }
        },
        clearFields: (state) => {
            state.trackingNumber = "";
            state.serviceProvider = "";
        },
        toggleError: (state, action) => {
            const { name } = action.payload;
            
            switch (name) {
                case 'trackingNumber':
                    state.trackingError = true;
                    break;
                case 'serviceProvider':
                    state.serviceProviderError = true;
                    break;
                default:
                    break
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRecentOrders.pending, (state, action) => {
                state.ordersPending = true;
                state.ordersFailed = false;
            })
            .addCase(getRecentOrders.fulfilled, (state, action) => {
                state.ordersPending = false;
                state.ordersFailed = false;
                state.orders = action.payload
            })
            .addCase(getRecentOrders.rejected, (state, action) => {
                state.ordersPending = false;
                state.ordersFailed = true;
            })
        builder
            .addCase(getAllOrders.pending, (state, action) => {
                state.ordersPending = true;
                state.ordersFailed = false;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.ordersPending = false;
                state.ordersFailed = false;
                state.orders = action.payload
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.ordersPending = false;
                state.ordersFailed = true;
            })
    } 
})

export const selectOrders = (state: RootState) => state.orders.orders;

export const selectOrdersPending =  (state: RootState) => state.orders.ordersPending;

export const selectOrder = (state: RootState) => state.orders.order;

export const selectOrderPending = (state: RootState) => state.orders.orderPending;

export const selectModalStatus = (state: RootState) => state.orders.modalStatus;

export const selectTrackingModalStatus = (state: RootState) => state.orders.trackingModalStatus;

export const selectDeleteModalStatus = (state: RootState) => state.orders.deleteModalStatus;

export const selectCancelModalStatus = (state: RootState) => state.orders.cancelModalStatus;

export const selectTrackingNumber = (state: RootState) => state.orders.trackingNumber;

export const selectTrackingError = (state: RootState) => state.orders.trackingError;

export const selectServiceProvider = (state: RootState) => state.orders.serviceProvider;

export const selectServiceProviderError = (state: RootState) => state.orders.serviceProviderError;

export const { clearOrders, openModal, closeModal, changeField, clearFields, toggleError } = ordersSlice.actions;

export default ordersSlice.reducer;