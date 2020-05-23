const navButtons = document.getElementById('navButtons');
const demoButton = document.getElementById('demoButton');

changelogo('#0203008');

const updateUser = async () => {
  if (localStorage['VIBE_TOKEN']) {
    const user = await getUser();

    navButtons.innerHTML = `<a id=logoutButton>Logout</a><a>${user.username}</a>`;
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('mouseup', logoutUser);
  }
};
updateUser();

demoButton.addEventListener('click', async (e) => {
  const body = { email: 'vibe4@user.com', password: 'Test@1234' };

  const res = await fetch(`${backendURL}/login`, {
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
