const navButtons = document.getElementById('navButtons');



const updateUser = async () => {
  if (localStorage['VIBE_TOKEN']) {
    const user = await getUser();

    navButtons.innerHTML = `<a id=logoutButton>Logout</a><a>${user.username}</a>`;
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('mouseup', logoutUser);
  }
};
updateUser();
