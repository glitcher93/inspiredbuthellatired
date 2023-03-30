import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../utils/common";
import { IItem, RootState } from "../../utils/interfaces";

const initialState = {
    items: [] as IItem[],
    allItemsPending: false,
    allItemsFailed: false,
    paintingsPending: false,
    paintingsFailed: false,
    printsPending: false,
    printsFailed: false,
    featuredPending: false,
    featuredFailed: false
}

export const getAllItems = createAsyncThunk('productsGrid/getAllItems', async () => {
    try {
        const response = await axios.get(`${apiUrl}/products`)
        return response.data;
    } catch (err) {
        console.log(err);
    }
});

export const getPaintings = createAsyncThunk('productsGrid/getPaintings', async () => {
    try {
        const response = await axios.get(`${apiUrl}/products/paintings`)
        return response.data;
    } catch (err) {
        console.log(err);
    }
});

export const getPrints = createAsyncThunk('productsGrid/getPrints', async () => {
    try {
        const response = await axios.get(`${apiUrl}/products/prints`)
        return response.data;
    } catch (err) {
        console.log(err);
    }
});

export const getFeatured = createAsyncThunk('productsGrid/getFeatured', async () => {
    try {
        const response = await axios.get(`${apiUrl}/products/featured`)
        return response.data;
    } catch (err) {
        console.log(err);
    }
});

const productsGridSlice = createSlice({
    name: 'productsGrid',
    initialState,
    reducers: {
        clearItems: (state) => {
            state.items = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllItems.pending, (state, action) => {
                state.allItemsPending = true;
                state.allItemsFailed = false;
            })
            .addCase(getAllItems.fulfilled, (state, action) => {
                state.allItemsPending = false;
                state.allItemsFailed = false;
                state.items = action.payload;
                
            })
            .addCase(getAllItems.rejected, (state, action) => {
                state.allItemsPending = false;
                state.allItemsFailed = true;
            });
        builder
            .addCase(getPaintings.pending, (state, action) => {
                state.paintingsPending = true;
                state.paintingsFailed = false;
            })
            .addCase(getPaintings.fulfilled, (state, action) => {
                state.paintingsPending = false;
                state.paintingsFailed = false;
                state.items = action.payload;
            })
            .addCase(getPaintings.rejected, (state, action) => {
                state.paintingsPending = false;
                state.paintingsFailed = true;
            });
        builder
            .addCase(getPrints.pending, (state, action) => {
                state.printsPending = true;
                state.printsFailed = false;
            })
            .addCase(getPrints.fulfilled, (state, action) => {
                state.printsPending = false;
                state.printsFailed = false;
                state.items = action.payload;
            })
            .addCase(getPrints.rejected, (state, action) => {
                state.printsPending = false;
                state.printsFailed = true;
            })
        builder
            .addCase(getFeatured.pending, (state, action) => {
                state.featuredPending = true;
                state.featuredFailed = false;
            })
            .addCase(getFeatured.fulfilled, (state, action) => {
                state.featuredPending = false;
                state.featuredFailed = false;
                state.items = action.payload;
            })
            .addCase(getFeatured.rejected, (state, action) => {
                state.featuredPending = false;
                state.featuredFailed = true;
            })
    }
})

export const selectItems = (state: RootState) => state.productsGrid.items;

export const { clearItems } = productsGridSlice.actions;

export default productsGridSlice.reducer;