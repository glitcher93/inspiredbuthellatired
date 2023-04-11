import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IOrder, RootState } from "../../utils/interfaces";
import axios from "axios";
import apiUrl from "../../utils/common";

const initialState = {
    orders: [] as IOrder[],
    modalStatus: false,
    trackingModalStatus: false,
    deleteModalStatus: false,
    order: {} as IOrder,
    trackingNumber: "",
    trackingError: false,
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

export const addTrackingNumber = createAsyncThunk('orders/addTrackingNumber', async ({token, id, trackingNumber}: {token: string, id: string, trackingNumber: string}) => {
    const headers = {
        headers: {
            authorization: `Bearer ${token}`
        }
    };

    await axios.patch(`${apiUrl}/admin/orders/add-tracking/${id}`, {trackingNumber}, headers);
})

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async ({token, id}: {token: string, id: string}) => {
    const headers = {
        headers: {
            authorization: `Bearer ${token}`
        }
    };

    await axios.delete(`${apiUrl}/admin/orders/delete-order/${id}`, headers);
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
                default:
                    break;
            }
        },
        changeTrackingField: (state, action) => {
            state.trackingNumber = action.payload;
            state.trackingError = false;
        },
        clearTrackingField: (state) => {
            state.trackingNumber = "";
        },
        toggleError: (state) => {
            state.trackingError = true;
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

export const selectTrackingNumber = (state: RootState) => state.orders.trackingNumber;

export const selectTrackingError = (state: RootState) => state.orders.trackingError;

export const { clearOrders, openModal, closeModal, changeTrackingField, clearTrackingField, toggleError } = ordersSlice.actions;

export default ordersSlice.reducer;