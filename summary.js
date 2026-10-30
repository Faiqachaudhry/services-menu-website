const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const emptyCart = document.getElementById("empty-cart");
const whatsappBtn = document.getElementById("whatsapp-btn");

// Add your WhatsApp number here
// Example: 923001234567 (without +)
const WHATSAPP_NUMBER = "923127853210";

// Currency formatter
const currency = new Intl.NumberFormat("en-PK", {
style: "currency",
currency: "PKR",
maximumFractionDigits: 0
});

// Display cart items
function renderSummary() {
const cart = getCart();

cartItems.innerHTML = "";

let total = 0;

emptyCart.hidden = cart.length !== 0;
whatsappBtn.disabled = cart.length === 0;

cart.forEach(item => {
const subtotal = item.price * item.quantity;
total += subtotal;

const card = document.createElement("div");
card.className = "cart-item";

const details = document.createElement("div");

const name = document.createElement("h3");
name.textContent = item.name;

const price = document.createElement("p");
price.textContent =
`${currency.format(item.price)} × ${item.quantity}`;

const subtotalText = document.createElement("p");
subtotalText.textContent =
`Subtotal: ${currency.format(subtotal)}`;

const removeBtn = document.createElement("button");
removeBtn.className = "remove-btn";
removeBtn.textContent = "Remove";
removeBtn.type = "button";

removeBtn.addEventListener("click", () => {
removeFromCart(item.id);
renderSummary();
});

details.append(name, price, subtotalText);
card.append(details, removeBtn);

cartItems.appendChild(card);
});

cartTotal.textContent = currency.format(total);
}

// WhatsApp order message
whatsappBtn.addEventListener("click", () => {
const cart = getCart();

if (cart.length === 0) return;

const total = cart.reduce(
(sum, item) => sum + item.price * item.quantity,
0
);

let message = "Hello! I want to place an order:\n\n";

cart.forEach(item => {
message +=
`${item.name} x ${item.quantity} = ${currency.format(item.price * item.quantity)}\n`;
});

message += `\nTotal Amount: ${currency.format(total)}`;
message += "\n\nPlease confirm my order.";

const whatsappURL =
`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

window.open(whatsappURL, "_blank");
});

// Initial display
renderSummary();

