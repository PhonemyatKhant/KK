export const addToCartHandler = (item, qty) => {
    // Retrieve cartItems array from localStorage (if it exists)
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);

    if (existingItemIndex !== -1) {
        // If the item is already in the cart, update its quantity
        cartItems[existingItemIndex].quantity += qty;
    } else {
        // If the item is not in the cart, add it with a quantity of qty
        cartItems.push({ ...item, quantity: qty });
    }

    // Save the updated cartItems array to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    console.log(cartItems);
    // Optionally, you can save the cartItems to localStorage or send them to the server
    // localStorage.setItem('cartItems', JSON.stringify(cartItems));

    return cartItems;
}
