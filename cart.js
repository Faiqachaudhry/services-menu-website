// Get cart from localStorage
function getCart() {
return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage
function saveCart(cart) {
localStorage.setItem("cart", JSON.stringify(cart));
}

// Add service to cart
function addToCart(service) {
const cart = getCart();

const existingItem = cart.find(
item => item.id === service.id
);

if (existingItem) {
existingItem.quantity++;
} else {
cart.push({
...service,
quantity: 1
});
}

saveCart(cart);
}

// Remove service from cart
function removeFromCart(serviceId) {
const cart = getCart().filter(
item => item.id !== serviceId
);

saveCart(cart);
}

// Clear cart
function clearCart() {
localStorage.removeItem("cart");
}

