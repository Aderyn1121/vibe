import { getUser, logoutUser, changelogo } from './global.js';
const logInForm = document.getElementById('auth-form');
const errorsDiv = document.getElementById('errors');

changelogo('#e0e0e0');

logInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(logInForm);
    const email = formData.get('email');
    const password = formData.get('password');
    const body = { email, password };
    const res = await fetch(`/api/login`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        errorsDiv.innerHTML = '';
        const { errors } = await res.json();
        errors.forEach((error) => {
            if (error !== 'Invalid value') {
                errorsDiv.classList.remove('hidden');
                const errorText = document.createElement('div');
                errorText.innerHTML += `${error}`;
                errorText.classList.add('errorText');
                errorsDiv.appendChild(errorText);
            }
        });
    }

    const {
        token,
        user: { id },
    } = await res.json();
    // storage access_token in localStorage:
    localStorage.setItem('VIBE_TOKEN', token);
    localStorage.setItem('VIBE_USER_ID', id);
    // redirect to music player
    window.location.href = '/music';
});
