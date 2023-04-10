import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../utils/common";
import { IOrder, RootState } from "../../utils/interfaces";

const initialState = {
    order: {} as IOrder,
    orderPending: false,
    orderFailed: false
};

export const getOrder = createAsyncThunk('orderSummary/getOrder', async ({orderId}: {orderId: string}) => {
    try {
        const response = await axios.get(`${apiUrl}/orders/${orderId}`);
        return response.data;
    } catch (error: any) {
        const { response } = error;
        window.location.href = response.data.url;
    }
})

const orderSummarySlice = createSlice({
    name: 'orderSummary',
    initialState,
    reducers: {
        clearOrder: (state) => {
            state.order = {} as IOrder;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getOrder.pending, (state) => {
            state.orderPending = true;
            state.orderFailed = false;
        });
        builder.addCase(getOrder.fulfilled, (state, action) => {
            state.orderPending = false;
            state.orderFailed = false;
            state.order = action.payload;
        });
        builder.addCase(getOrder.rejected, (state, action) => {
            state.orderPending = false;
            state.orderFailed = true;
        });
    }
})

export const selectOrder = (state: RootState) => state.orderSummary.order;

export const selectOrderPending = (state: RootState) => state.orderSummary.orderPending;

export const { clearOrder } = orderSummarySlice.actions;

export default orderSummarySlice.reducer;