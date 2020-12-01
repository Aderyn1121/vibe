import { backendURL, getUser, logoutUser, changelogo } from './global.js';
const navButtons = document.getElementById('navButtons');
const altButtons = document.getElementsByClassName('alt-buttons');
const demoButton = document.getElementById('demoButton');

changelogo('#0203008');

const updateUser = async () => {
    if (localStorage['VIBE_TOKEN']) {
        const user = await getUser();
        altButtons[0].innerHTML =
            '<a class="logoutButton vibeCheck__button">LOGOUT</a>';
        navButtons.innerHTML = `<a class=logoutButton>Logout</a><a id='username'>${user.username}</a>`;

        const logoutButton = document.getElementsByClassName('logoutButton');

        for (let i = 0; i < logoutButton.length; i++) {
            logoutButton[i].addEventListener('mouseup', logoutUser);
        }
    }
};

updateUser();

demoButton.addEventListener('click', async (e) => {
    const body = { email: 'vibe4@user.com', password: 'Test@1234' };

    const res = await fetch(`/api/login`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error('this is an error');
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
