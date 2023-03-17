import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICartItem, IItem, RootState } from "../../utils/interfaces";

const initialState = {
    cart: [] as ICartItem[]
}

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
        }
    }
})

export const selectCart = (state: RootState) => state.cart.cart;

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;