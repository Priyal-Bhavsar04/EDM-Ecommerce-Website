window.onload = function() {
    const totalPrice = localStorage.getItem('totalPrice');
    if (totalPrice) {
        document.getElementById('amount').value = `$${totalPrice}`;
    } else {
        alert('Error: Unable to retrieve total price.');
        window.location.href = 'index.html';  // Redirect back to home if no price is found
    }
};

document.getElementById('billing-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    alert('Payment Successful!');
    localStorage.removeItem('cart');  // Clear cart after payment
    localStorage.removeItem('totalPrice');  // Clear totalPrice after payment
    window.location.href = 'index.html';  // Redirect to home
});
