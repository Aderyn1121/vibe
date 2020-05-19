const logInForm = document.getElementById('auth-form');

logInForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(logInForm);
  const email = formData.get('email');
  const password = formData.get('password');
  const body = { email, password };

  const res = await fetch('http://localhost:8080/login', {
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
