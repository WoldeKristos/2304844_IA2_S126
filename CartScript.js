document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('myCart')) || [];
    const display = document.getElementById('cart-display');
    let subtotal = 0;

    cart.forEach(item => {
        const total = item.price * item.quantity;
        subtotal += total;
        display.innerHTML += `<tr><td>${item.name}</td><td>$${item.price}</td><td>${item.quantity}</td><td>$${total.toFixed(2)}</td></tr>`;
    });

    const discount = subtotal * 0.10;
    const tax = (subtotal - discount) * 0.15;
    const final = (subtotal - discount) + tax;

    document.getElementById('st-val').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('ds-val').innerText = `-$${discount.toFixed(2)}`;
    document.getElementById('tx-val').innerText = `$${tax.toFixed(2)}`;
    document.getElementById('total-val').innerText = `$${final.toFixed(2)}`;
});