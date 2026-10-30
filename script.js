const serviceList = document.getElementById("service-list");
const searchInput = document.getElementById("search-input");
const categoryTabs = document.querySelectorAll(".tab");
const serviceCount = document.getElementById("service-count");
const noResults = document.getElementById("no-results");

let services = [];
let selectedCategory = "All";
let searchTerm = "";


// Load services from JSON
async function loadServices() {
try {
const response = await fetch("./services.json");

if (!response.ok) {
throw new Error("Could not load services.json");
}

services = await response.json();

renderServices();
} catch (error) {
console.error("Error loading services:", error);

serviceList.innerHTML = `
<p>
Unable to load services. Please run this project
using Live Server.
</p>
`;

serviceCount.textContent = "Loading failed";
}
}

// Display service cards
function renderServices() {
const filteredServices = services.filter(service => {
const matchesCategory =
selectedCategory === "All" ||
service.category === selectedCategory;

const matchesSearch =
service.name.toLowerCase().includes(searchTerm) ||
service.description.toLowerCase().includes(searchTerm) ||
service.category.toLowerCase().includes(searchTerm);

return matchesCategory && matchesSearch;
});

serviceList.innerHTML = "";

serviceCount.textContent =
`${filteredServices.length} services found`;

noResults.hidden = filteredServices.length !== 0;

filteredServices.forEach(service => {
const card = document.createElement("article");
card.className = "service-card";

const category = document.createElement("span");
category.className = "service-category";
category.textContent = service.category;

const title = document.createElement("h3");
title.textContent = service.name;

const description = document.createElement("p");
description.className = "service-description";
description.textContent = service.description;

const bottom = document.createElement("div");
bottom.className = "card-bottom";

const price = document.createElement("p");
price.className = "service-price";
price.textContent = new Intl.NumberFormat("en-PK", {
style: "currency",
currency: "PKR",
maximumFractionDigits: 0
}).format(service.price);

const button = document.createElement("button");
button.className = "add-cart-btn";
button.type = "button";

function updateButton() {
const cartItem = getCart().find(
item => item.id === service.id
);

const quantity = cartItem ? cartItem.quantity : 0;

button.textContent = quantity > 0
? `Added to Cart (${quantity})`
: "Add to Cart";

button.setAttribute(
"aria-label",
`${service.name}, ${quantity} added to cart`
);
}
updateButton();

button.addEventListener("click", () => {
addToCart(service);
updateButton();
});

bottom.append(price, button);
card.append(category, title, description, bottom);
serviceList.appendChild(card);
});
}

// Category tabs
categoryTabs.forEach(tab => {
tab.addEventListener("click", () => {
selectedCategory = tab.dataset.category;

categoryTabs.forEach(item => {
const isActive = item === tab;

item.classList.toggle("active", isActive);
item.setAttribute("aria-pressed", String(isActive));
});

renderServices();
});
});

// Live search
searchInput.addEventListener("input", () => {
searchTerm = searchInput.value.trim().toLowerCase();
renderServices();
});

// Start the app
loadServices();

