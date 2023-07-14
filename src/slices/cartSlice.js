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
        removeFromCart: (state, action) => {
            // Find the index of items
            const index = state.items.findIndex(cartItem => cartItem.id === action.payload.id);

            // Changing current cart
            let newCart = [...state.items];

            if (index >= 0) {
                // The items exists in basket ==> remove it
                newCart.splice(index, 1);
            } else {
                console.warn('Cannot Remove Product');
            }

            state.items = newCart;
        },
    },
});

export const { addtoCart, removeFromCart } = cartSlice.actions;

//Selectors = This is how we pull information from Global store slice
export const selectItems = (state) => state.cart.items;

// Find out the total value of items
export const selectTotal = (state) => state.cart.items.reduce((total, item) => total + item.price, 0);

export default cartSlice.reducer;