import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IItem, RootState } from "../../utils/interfaces";

const initialState = {
    items: [] as IItem[]
}

const adminProductsGridSlice = createSlice({
    name: 'adminProductsGrid',
    initialState,
    reducers: {
        clearProducts: (state) => {

        }
    },
    extraReducers: (builder) => {

    }
})

export const selectProducts = (state: RootState) => state.adminProductsGrid.items;

export const {} = adminProductsGridSlice.actions;

export default adminProductsGridSlice.reducer;