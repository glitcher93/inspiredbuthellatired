import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../utils/common";
import { ICartItem, RootState } from "../../utils/interfaces";

const initialState = {
    cart: [] as ICartItem[],
    checkoutPending: false,
    checkoutFailed: false
}

export const checkout = createAsyncThunk('cart/checkout', async ({cart}: {cart: ICartItem[]}) => {
    try {
        const response = await axios.post(`${apiUrl}/checkout`, {
            items: cart
        });
        return response.data.url;
        
    } catch (err) {
        console.log(err);
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const foundItem = state.cart.find(item => item.id === action.payload.id);
            if (foundItem) {
                switch (foundItem.type) {
                    case 'Painting':
                        alert('This item is already in your cart');
                        break;
                    case 'Print':
                        foundItem.quantity!++;
                        break;
                    default:
                        return;
                }
            } else {
                state.cart.push({...action.payload, quantity: 1});
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload.id);
            if (item) {
                switch (item.type) {
                    case 'Painting':
                        alert('This item is already in your cart');
                        break;
                    case 'Print':
                        item.quantity!++;
                        break;
                    default:
                        return;
                }
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload.id);
            if (item) {
                if (item.quantity! === 1) {
                    item.quantity = 1;
                } else {
                    item.quantity!--;
                }
            } 
        },
        removeFromCart: (state, action) => {
            const updatedCart = state.cart.filter(item => item.id !== action.payload.id);
            state.cart = updatedCart;
        },
        clearCart: (state) => {
            state.cart = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkout.pending, (state, action) => {
                state.checkoutPending = true;
                state.checkoutFailed = false;
            })
            .addCase(checkout.fulfilled, (state, action) => {
                state.checkoutPending = false;
                state.checkoutFailed = false;
                window.location.href = action.payload;
            })
            .addCase(checkout.rejected, (state, action) => {
                state.checkoutPending = false;
                state.checkoutFailed = true;
            })
    }
})

export const selectCart = (state: RootState) => state.cart.cart;

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;