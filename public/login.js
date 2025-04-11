const baseUrl = 'https://rt-weather.onrender.com/api/'; 
// https://rt-weather.onrender.com/api/
// http://localhost:5001/api/

document.getElementById('signupTab').addEventListener('click', async function (e) {
    e.preventDefault();
    document.getElementById('loginFormContainer').classList.add('hidden');
    document.getElementById('signupFormContainer').classList.remove('hidden');
    document.getElementById('loginTab').classList.remove('active');
    document.getElementById('signupTab').classList.add('active');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
});

document.getElementById('loginTab').addEventListener('click', async function (e) {
    e.preventDefault();
    document.getElementById('signupFormContainer').classList.add('hidden');
    document.getElementById('loginFormContainer').classList.remove('hidden');
    document.getElementById('signupTab').classList.remove('active');
    document.getElementById('loginTab').classList.add('active');
    document.getElementById('newUsername').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    document.getElementById('confirmPassword').style.border = '';
    document.getElementById('confirmPassword').style.color = '';
});

async function loginUser(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }

    try {
        let response = await fetch(`${baseUrl}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            window.location.href = 'index.html';
        } else if (response.status === 401) {
            alert("Invalid username or password");
        } else {
            alert("Failed to login");
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('The server is not running.');
    }
}

async function signupUser(e) {
    e.preventDefault();
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!username || !password || !confirmPassword) {
        alert('Please enter all fields');
        return;
    }

    if (!await checkPassword()) {
        alert('Passwords do not match');
        return;
    }

    try {
        let response = await fetch(`${baseUrl}signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.status === 201) {
            alert("User created successfully! You can login now.");
            document.getElementById('newUsername').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
        } else if (response.status === 409) {
            alert("Username already exists. Please choose another one.");
        } else {
            alert("Failed to create user");
        }
    } catch (error) {
        console.error('Error creating user:', error);
        alert('The server is not running.');
    }
}

document.getElementById('loginForm').addEventListener('submit', loginUser);
document.getElementById('signupForm').addEventListener('submit', signupUser);

async function checkPassword() {
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password.length === 0 || confirmPassword.length === 0) {
        document.getElementById('confirmPassword').style.border = '';
        document.getElementById('confirmPassword').style.color = '';
        return false;
    }
    if (password !== confirmPassword) {
        document.getElementById('confirmPassword').style.border = '1px solid red';
        document.getElementById('confirmPassword').style.color = 'red';
        return false;
    } else {
        document.getElementById('confirmPassword').style.border = '';
        document.getElementById('confirmPassword').style.color = '';
        return true;
    }
}