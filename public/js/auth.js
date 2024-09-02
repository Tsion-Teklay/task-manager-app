document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const role = document.getElementById('signup-role').value;

    try {
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, role })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Signup successful!');
            if (role === 'user') {
                window.location.href = 'user-dashboard.html';
            } else if (role === 'admin') {
                window.location.href = 'admin-dashboard.html';
            }
        } else {
            alert(`Signup failed: ${data.error}`);
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Something went wrong!');
    }
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            const role = data.role;
            if (role === 'user') {
                window.location.href = 'user-dashboard.html';
            } else if (role === 'admin') {
                window.location.href = 'admin-dashboard.html';
            }
        } else {
            alert(`Login failed: ${data.error}`);
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Something went wrong!');
    }
});









 