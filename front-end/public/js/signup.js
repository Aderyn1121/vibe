const signupForm = document.getElementById('auth-form');

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

  const body = { email, password, confirmEmail, confirmPassword, userName, birthday, gender };
  const res = await fetch(`${backendURL}/sign-up`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const { errors } = await res.json();
    errors.forEach((error) => {
      const errorP = document.createElement('p');
      if (error !== 'Invalid value') {
        errorP.innerHTML = error;
        errorP.classList.add('error');
        errorP.style.color = 'red';
        errorP.style['font-size'] = '.8rem';
        signupForm.prepend(errorP);
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
