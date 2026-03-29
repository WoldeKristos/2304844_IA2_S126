document.addEventListener('DOMContentLoaded', () => {
    // 1. LOGIN & SECURITY CHECK
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const currentUser = sessionStorage.getItem('currentUser');
    const path = window.location.pathname;

    if (!isLoggedIn && !path.includes('Homepage.html')) {
        alert("Access Denied. Please Login first.");
        window.location.href = 'Homepage.html';
        return;
    }

    if (isLoggedIn) {
        document.body.classList.add('auth-mode');
        updateHeaderGreeting(currentUser);
    }

    // 2. INITIAL CART COUNTER
    updateCartCounter();

    // 3. REGISTRATION LOGIC
    const regForm = document.getElementById('regForm');
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('regUsername').value;
            const password = document.getElementById('regPassword').value;
            const email = regForm.querySelector('input[type="email"]').value;

            let users = JSON.parse(localStorage.getItem('systemUsers')) || [];
            if (users.find(u => u.username === username)) {
                alert("Username already recorded in system.");
            } else {
                users.push({ username, password, email });
                localStorage.setItem('systemUsers', JSON.stringify(users));
                alert("Registration Successful!");
                regForm.reset();
            }
        });
    }

    // 4. LOGIN LOGIC
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userIn = document.getElementById('logUsername').value;
            const passIn = document.getElementById('logPassword').value;
            const users = JSON.parse(localStorage.getItem('systemUsers')) || [];
            const foundUser = users.find(u => u.username === userIn && u.password === passIn);

            if (foundUser) {
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('currentUser', userIn);
                location.reload();
            } else {
                alert("Credentials not found. Please Register.");
            }
        });
    }

    // 5. ADD TO CART LOGIC
    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!sessionStorage.getItem('isLoggedIn')) {
                alert("Please Login to shop!");
                return;
            }
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            
            let cart = JSON.parse(localStorage.getItem('myCart')) || [];
            const existing = cart.find(i => i.name === name);
            if (existing) { existing.quantity++; } 
            else { cart.push({ name, price, quantity: 1 }); }
            
            localStorage.setItem('myCart', JSON.stringify(cart));
            updateCartCounter();
            alert(`${name} added to cart!`);
        });
    });
});

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('myCart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = count;
}

function updateHeaderGreeting(name) {
    const header = document.querySelector('header h1');
    if (header) header.innerHTML += `<br><span style="font-size:12px; color:#ffcc00;">Welcome, ${name}</span>`;
}

function logout() {
    sessionStorage.clear();
    window.location.href = 'Homepage.html';
}