const sidebarLinks = document.getElementById('sidebarLinks');
const mainContent = document.getElementById('mainContent');
const sidebarPlaylists = document.getElementById('sidebarPlaylists');

sidebarLinks.addEventListener('click', async (event) => {
  if (!['home', 'search', 'library'].includes(event.target.id)) return;
  const res = await fetch(`/music/${event.target.id}/ajax`);
  const data = await res.json();
  history.pushState(
    { mainContent: 'home' },
    'home',
    `/music/${event.target.id}`
  );
  mainContent.innerHTML = data;
  updateHome();
});

sidebarPlaylists.addEventListener('click', async (event) => {
  playPlaylist();
});
