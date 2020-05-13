const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const bodyContent = document.getElementById('bodyContent');
const header = document.querySelector('body h1');

button1.addEventListener('click', () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8081/body1');

  xhr.onload = () => {
    if (xhr.status === 200) {
      bodyContent.innerHTML = xhr.responseText;
    } else {
      alert('it did not work');
    }
  };
  xhr.send();
});

button2.addEventListener('click', () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8081/body2');

  xhr.onload = () => {
    if (xhr.status === 200) {
      bodyContent.innerHTML = xhr.responseText;
    } else {
      alert('it did not work');
    }
  };
  xhr.send();
});
