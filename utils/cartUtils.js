export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
    // Calculate the items price in whole number (pennies) to avoid issues with
    // floating point number calculations
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0))
    //calculate shipping price // if over 10000 = free else 1000ks
    state.shippingPrice = addDecimals(state.itemsPrice > 5000 ? 0 : 1000)
    //calculate tax price 15% tax
    state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2))
    //calculate total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2)
    localStorage.setItem('cartItems', JSON.stringify(state))

    return state;
};