"use strict";
// Array to store all products
let products = [];
// Function to add a new product
function addProduct(name, price, quantity, tags) {
    // Local variable demonstrating function scope
    const productId = products.length + 1;
    const product = {
        id: productId,
        name: name,
        price: price,
        quantity: quantity,
        tags: tags
    };
    products.push(product);
    displayProducts();
}
// Function to display products in the inventory table
function displayProducts() {
    const tableBody = document.getElementById("productTableBody");
    const productCount = document.getElementById("productCount");
    if (!tableBody || !productCount) {
        return;
    }
    // Clear the existing table rows
    tableBody.innerHTML = "";
    // Update the total product count
    productCount.textContent =
        products.length.toString();
    // Loop through all products
    // 'product' has block scope
    for (const product of products) {
        const row = document.createElement("tr");
        // Determine product stock status
        const status = product.quantity > 0
            ? "In Stock"
            : "Out of Stock";
        // CSS class based on product status
        const statusClass = product.quantity > 0
            ? "in-stock"
            : "out-stock";
        // Convert product tags into tag elements
        const tagHTML = product.tags
            .map((tag) => `<span class="tag">${tag}</span>`)
            .join("");
        // Create the table row
        row.innerHTML = `
            <td>
                <div class="product-name">

                    <div class="product-icon">
                        ${product.name
            .charAt(0)
            .toUpperCase()}
                    </div>

                    <strong>
                        ${product.name}
                    </strong>

                </div>
            </td>

            <td class="price">
                ₹${product.price.toLocaleString("en-IN")}
            </td>

            <td>
                ${product.quantity}
            </td>

            <td>
                <div class="tags-container">
                    ${tagHTML}
                </div>
            </td>

            <td>
                <span class="status ${statusClass}">
                    ${status}
                </span>
            </td>
        `;
        tableBody.appendChild(row);
    }
}
// Get the Add Product button
const addProductButton = document.getElementById("addProductBtn");
if (addProductButton) {
    addProductButton.addEventListener("click", () => {
        // Get input elements
        const nameInput = document.getElementById("productName");
        const priceInput = document.getElementById("price");
        const quantityInput = document.getElementById("quantity");
        const tagsInput = document.getElementById("tags");
        // Check that all input elements exist
        if (!nameInput ||
            !priceInput ||
            !quantityInput ||
            !tagsInput) {
            return;
        }
        // Read product name
        const name = nameInput
            .value
            .trim();
        // Read and convert price
        const price = Number(priceInput.value);
        // Read and convert quantity
        const quantity = Number(quantityInput.value);
        // Convert comma-separated tags into an array
        const tags = tagsInput
            .value
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "");
        // Validate product details
        if (name === "" ||
            price <= 0 ||
            quantity < 0 ||
            tags.length === 0) {
            alert("Please enter valid product details and at least one tag.");
            return;
        }
        // Add the product
        addProduct(name, price, quantity, tags);
        // Clear input fields
        nameInput.value = "";
        priceInput.value = "";
        quantityInput.value = "";
        tagsInput.value = "";
        // Scroll smoothly to the inventory section
        const inventorySection = document.getElementById("inventory");
        if (inventorySection) {
            inventorySection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
}
