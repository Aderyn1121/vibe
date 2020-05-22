const sidebarLinks = document.getElementById('sidebarLinks');
const sidebarPlaylists = document.getElementById('sidebarPlaylists');
const plusIcon = document.getElementById('plusIcon');

sidebarLinks.addEventListener('click', async (event) => {
  if (!['home', 'search', 'library'].includes(event.target.id)) return;
  const res = await fetch(`/music/${event.target.id}/ajax`);
  const data = await res.json();
  history.pushState(
    { mainContent: event.target.id },
    event.target.id,
    `/music/${event.target.id}`
  );
  mainContent.innerHTML = data;
  if (event.target.id === 'home') {
    updateHome();
  } else if (event.target.id === 'search') {
    updateSearch();
  } else {
    // updateLibrary()
  }
});

// sidebarPlaylists.addEventListener('click', async (event) => {
//   playPlaylist();
// });

sidebarPlaylists.addEventListener('click', async (event) => {

});


plusIcon.addEventListener('click', () => {
  const newPLform = document.createElement('form');
  newPLform.innerHTML =
    '<input id = newPlaylist class= "newPlaylist", name= "newPlaylist", type="text">';
  sidebarPlaylists.prepend(newPLform);
  const playlistInput = document.getElementById('newPlaylist');
  playlistInput.focus();
  newPLform.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(newPLform);
    const playlistName = formData.get('newPlaylist');
    const body = { playlistName };
    const user = await getUser();

    await fetch(`${backendURL}/users/${user.userId}/playlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('VIBE_TOKEN')}`,
      },
      body: JSON.stringify(body),
    });
    sidebarPlaylists.innerHTML = '';
    updatePlaylists();
  });
});
