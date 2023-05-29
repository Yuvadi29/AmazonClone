import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Actions 
        addtoCart: (state, action) => {
            state.items = [...state.items, action.payload] //Keep what it is inside it which are the state.items. Payload contains the product which we want to add to cart
        },
        removeFromCart: (state, action) => { },
    },
});

export const { addtoCart, removeFromCart } = cartSlice.actions;

//Selectors = This is how we pull information from Global store slice
export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;