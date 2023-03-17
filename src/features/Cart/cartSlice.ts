import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICartItem, RootState } from "../../utils/interfaces";

const initialState = {
    cart: [] as ICartItem[]
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            if (state.cart.find(item => item.id === action.payload.id)) {
                alert('This item is already in your cart');
                return;
            } else {
                state.cart.push(action.payload);
            }
        },
        removeFromCart: (state, action) => {
            const updatedCart = state.cart.filter(item => item.id !== action.payload.id);
            state.cart = updatedCart;
        }
    }
})

export const selectCart = (state: RootState) => state.cart.cart;

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;