const backendURL = document
  .getElementsByTagName('script')[0]
  .getAttribute('backend');

const getUser = async () => {
  const userId = localStorage.getItem('VIBE_USER_ID');

  const res = await fetch(`${backendURL}/users/${userId}`, {
    method: 'GET',
  });
  const user = await res.json();
  return user;
};

const logoutUser = () => {
  localStorage.removeItem('VIBE_TOKEN');
  localStorage.removeItem('VIBE_USER_ID');
  window.location.replace('http://localhost:8081/');
};
