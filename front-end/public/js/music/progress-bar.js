const startTime = document.getElementById('startTime');
const endTime = document.getElementById('endTime');
const progressCircle = document.getElementById('circle');
const bar = document.getElementById('bar');

function updateTime() {
  const currentTime = Math.ceil(track.audio.currentTime);
  const duration = Math.floor(track.audio.duration) - currentTime;
  const percent = currentTime / track.audio.duration;

  const hours =
    Math.floor(currentTime / 3600) < 10
      ? `0${Math.floor(currentTime / 3600)}`
      : Math.floor(currentTime / 3600);
  const mins =
    Math.floor(currentTime / 60) < 10
      ? `0${Math.floor(currentTime / 60)}`
      : Math.floor(currentTime / 60);
  const seconds =
    currentTime % 60 < 10 ? `0${currentTime % 60}` : currentTime % 60;

  startTime.innerHTML = `${hours}:${mins}:${seconds}`;

  if (duration) {
    const durationHours =
      Math.floor(duration / 3600) < 10
        ? `0${Math.floor(duration / 3600)}`
        : Math.floor(duration / 3600);
    const durationMins =
      Math.floor(duration / 60) < 10
        ? `0${Math.floor(duration / 60)}`
        : Math.floor(duration / 60);
    const durationSeconds =
      duration % 60 < 10 ? `0${duration % 60}` : duration % 60;

    endTime.innerHTML = `${durationHours}:${durationMins}:${durationSeconds}`;
  } else {
    endTime.innerHTML = '00:00:00';
  }

  progressCircle.style['left'] = `${percent * 94.25}%`;

}
let interval = setInterval(updateTime, 1000);

progressCircle.onmousedown = function (event) {

  if (!track.audio.src) return;
  clearInterval(interval);
  let newLeft;

  event.preventDefault(); // prevent selection start (browser action)

  let shiftX = event.clientX - progressCircle.getBoundingClientRect().left;
  // shiftY not needed, the progressCircle moves only horizontally


  function onMouseMove(event) {
    if (!track.audio.src) return;
    newLeft = event.clientX - shiftX - bar.getBoundingClientRect().left;

    // the pointer is out of bar => lock the progressCircle within the bounaries
    if (newLeft < 0) {
      newLeft = 0;
    }
    let rightEdge = bar.offsetWidth - progressCircle.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    progressCircle.style.left = newLeft + 'px';
  }

  function onMouseUp() {

    if (!track.audio.src) return;
    const percent = newLeft / (screen.width * 0.24084919);
    track.audio.currentTime = Math.floor(percent * track.audio.duration);

    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(updateTime, 1000);

    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

};

progressCircle.ondragstart = function () {
  return false;
};
