let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = 0;

function addItemToCart(product, price) {
    const existingItem = cart.find(item => item.name === product);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: product, price: price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));  // Persist cart to localStorage
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsTable = document.getElementById('cart-items');
    cartItemsTable.innerHTML = ''; // Clear existing cart items

    totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        cartItemsTable.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>
                    <button onclick="decreaseQuantity(${index})">-</button>
                    ${item.quantity}
                    <button onclick="increaseQuantity(${index})">+</button>
                </td>
                <td><button onclick="removeItem(${index})">Remove</button></td>
            </tr>
        `;
    });

    document.getElementById('total-price').innerText = totalPrice;
    localStorage.setItem('totalPrice', totalPrice);  // Persist total price to localStorage
}

function increaseQuantity(index) {
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        removeItem(index);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function proceedToCheckout() {
    window.location.href = 'billing.html';  // Redirect to billing page
}

window.onload = function() {
    if (window.location.pathname.includes('cart.html')) {
        updateCartDisplay();  // Only update cart display on the cart page
    }
};
