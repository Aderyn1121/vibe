import { backendURL, getUser, logoutUser, changelogo } from './global.js';
const signupForm = document.getElementById('auth-form');
const errorsDiv = document.getElementById('errors');

changelogo('#e0e0e0');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(signupForm);
    const email = formData.get('email').toLowerCase();
    const confirmEmail = formData.get('confirmEmail').toLowerCase();
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const userName = formData.get('userName');
    const birthday = formData.get('birthday');
    const gender = formData.get('gender');

    const body = {
        email,
        password,
        confirmEmail,
        confirmPassword,
        userName,
        birthday,
        gender,
    };
    const res = await fetch(`/api/sign-up`, {
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
