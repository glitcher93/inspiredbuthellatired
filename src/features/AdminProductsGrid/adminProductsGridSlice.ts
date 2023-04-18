import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IItem, RootState } from "../../utils/interfaces";
import axios from "axios";
import apiUrl from "../../utils/common";

const initialState = {
    items: [] as IItem[],
    item: {} as IItem,
    title: "",
    image: "",
    size: "",
    price: 0,
    type: "",
    inStock: "",
    titleError: false,
    imageError: false,
    sizeError: false,
    priceError: false,
    typeError: false,
    inStockError: false,
    getProductsPending: false,
    getProductsFailed: false,
    addModalStatus: false,
    editModalStatus: false,
    deleteModalStatus: false,
    addProductPending: false,
    addProductFailed: false,
    editProductPending: false,
    editProductFailed: false,
    deleteProductPending: false,
    deleteProductFailed: false
}

export const getProducts = createAsyncThunk('adminProductsGrid/getProducts', async ({token}: {token: string}) => {
    const headers = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const { data } = await axios.get(`${apiUrl}/admin/products`, headers);

    return data;
});

export const addProduct = createAsyncThunk('adminProductsGrid/addProduct', async ({token, formData}: {token: string, formData: FormData}) => {
    const headers = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    await axios.post(`${apiUrl}/admin/products`, formData, headers);
});

export const editProduct = createAsyncThunk('adminProductsGrid/editProduct', async ({token, id, formData}: {token: string, id: string, formData: FormData}) => {
    const headers = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    await axios.patch(`${apiUrl}/admin/products/edit-product/${id}`, formData, headers);
});

export const deleteProduct = createAsyncThunk('adminProductsGrid/deleteProduct', async ({token, id}: {token: string, id: string}) => {
    const headers = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    await axios.delete(`${apiUrl}/admin/products/delete-product/${id}`, headers);
});

const adminProductsGridSlice = createSlice({
    name: 'adminProductsGrid',
    initialState,
    reducers: {
        clearItems: (state) => {
            state.items = [] as IItem[]
        },
        openModal: (state, action) => {
            const { modal, item } = action.payload;

            switch (modal) {
                case "add":
                    state.addModalStatus = true;
                    break;
                case "edit":
                    state.editModalStatus = true;
                    state.item = item;
                    break;
                case "delete":
                    state.deleteModalStatus = true;
                    state.item = item;
                    break;
                default:
                    break;
            }
        },
        closeModal: (state, action) => {
            const { modal } = action.payload;

            switch (modal) {
                case "add":
                    state.addModalStatus = false;
                    break;
                case "edit":
                    state.editModalStatus = false;
                    state.item = {} as IItem;
                    break;
                case "delete":
                    state.deleteModalStatus = false;
                    state.item = {} as IItem;
                    break;
                default:
                    break;
            }
        },
        changeField: (state, action) => {
            const { name, value } = action.payload;

            switch (name) {
                case "title":
                    state.title = value;
                    state.titleError = false;
                    break;
                case "image":
                    state.image = value;
                    state.imageError = false;
                    break;
                case "size":
                    state.size = value;
                    state.sizeError = false;
                    break;
                case "price":
                    state.price = value;
                    state.priceError = false;
                    break;
                case "type":
                    state.type = value;
                    state.typeError = false;
                    break;
                case "inStock":
                    state.inStock = value;
                    state.inStockError = false;
                    break;
                default:
                    break;
            }
        },
        clearFields: (state) => {
            state.title = "";
            state.image = "";
            state.size = "";
            state.price = 0;
            state.type = "";
            state.inStock = "";
        },
        toggleError: (state, action) => {
            const { name } = action.payload;

            switch (name) {
                case "title":
                    state.titleError = true;
                    break;
                case "image":
                    state.imageError = true;
                    break;
                case "size":
                    state.sizeError = true;
                    break;
                case "price":
                    state.priceError = true;
                    break;
                case "type":
                    state.typeError = true;
                    break;
                case "inStock":
                    state.inStockError = true;
                    break;
                default:
                    break;
            }
        },
        loadFields: (state, action) => {
            const { item } = action.payload

            state.title = item.title;
            state.size = item.size;
            state.price = item.priceInCents / 100;
            state.type = item.type;
            state.inStock = item.inStock;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.getProductsPending = true;
                state.getProductsFailed = false;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.getProductsPending = false;
                state.getProductsFailed = false;
                state.items = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.getProductsPending = false;
                state.getProductsFailed = true;
            })
        builder
            .addCase(addProduct.pending, (state, action) => {
                state.addProductPending = true;
                state.addProductFailed = false;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.addProductPending = false;
                state.addProductFailed = false;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.addProductPending = false;
                state.addProductFailed = true;
            })
        builder
            .addCase(editProduct.pending, (state, action) => {
                state.editProductPending = true;
                state.editProductFailed = false;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.editProductPending = false;
                state.editProductFailed = false;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.editProductPending = false;
                state.editProductFailed = true;
            })
        builder
            .addCase(deleteProduct.pending, (state, action) => {
                state.deleteProductPending = true;
                state.deleteProductFailed = false;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.deleteProductPending = false;
                state.deleteProductFailed = false;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.deleteProductPending = false;
                state.deleteProductFailed = true;
            })
    }
})

export const selectItems = (state: RootState) => state.adminProductsGrid.items;

export const selectItem = (state: RootState) => state.adminProductsGrid.item;

export const selectTitle = (state: RootState) => state.adminProductsGrid.title;

export const selectTitleError = (state: RootState) => state.adminProductsGrid.titleError;

export const selectImage = (state: RootState) => state.adminProductsGrid.image;

export const selectImageError = (state: RootState) => state.adminProductsGrid.imageError;

export const selectSize = (state: RootState) => state.adminProductsGrid.size;

export const selectSizeError = (state: RootState) => state.adminProductsGrid.sizeError;

export const selectPrice = (state: RootState) => state.adminProductsGrid.price;

export const selectPriceError = (state: RootState) => state.adminProductsGrid.priceError;

export const selectType = (state: RootState) => state.adminProductsGrid.type;

export const selectTypeError = (state: RootState) => state.adminProductsGrid.typeError;

export const selectInStock = (state: RootState) => state.adminProductsGrid.inStock;

export const selectInStockError = (state: RootState) => state.adminProductsGrid.inStockError;

export const selectAddModalStatus = (state: RootState) => state.adminProductsGrid.addModalStatus;

export const selectEditModalStatus = (state: RootState) => state.adminProductsGrid.editModalStatus;

export const selectDeleteModalStatus = (state: RootState) => state.adminProductsGrid.deleteModalStatus;

export const { openModal, closeModal, clearItems, changeField, loadFields, clearFields, toggleError } = adminProductsGridSlice.actions;

export default adminProductsGridSlice.reducer;