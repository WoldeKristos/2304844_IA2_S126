document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('myCart')) || [];
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const finalTotal = (subtotal * 0.90) * 1.15; // Applying disc and tax

    document.getElementById('chk-total').innerText = `$${finalTotal.toFixed(2)}`;
    const amountPaidInput = document.getElementById('amountPaid');

    document.getElementById('checkoutForm').addEventListener('submit', (e) => {
        e.preventDefault();
        if (parseFloat(amountPaidInput.value) >= finalTotal) {
            alert("Payment Successful! Thank you.");
            localStorage.removeItem('myCart');
            window.location.href = 'Homepage.html';
        } else {
            alert("Insufficient amount entered.");
        }
    });
});