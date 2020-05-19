const getUser = async () => {
  const userId = localStorage.getItem('VIBE_USER_ID');

  const res = await fetch(`http://localhost:8080/users/${userId}`, {
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
