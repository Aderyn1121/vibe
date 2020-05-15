const sidebarLinks = document.getElementById('sidebarLinks');
const mainContent = document.getElementById('mainContent');

sidebarLinks.addEventListener('click', async (event) => {
  if (!['home', 'search', 'library'].includes(event.target.id)) return;
  const res = await fetch(
    `http://localhost:8081/music/${event.target.id}/ajax`
  );
  const data = await res.json();
  history.pushState(
    { mainContent: 'home' },
    'home',
    `http://localhost:8081/music/${event.target.id}`
  );
  mainContent.innerHTML = data;
});
