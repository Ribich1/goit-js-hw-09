const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    bodyEl: document.querySelector('body'),
};

let timerId = null;
refs.btnStop.disabled = true;


refs.btnStart.addEventListener('click', onhandleStart);
refs.btnStop.addEventListener('click', onhandleStop);


function onhandleStart() {
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;

timerId = setInterval(onBcgndColor, 1000);
};


function onhandleStop() {
    clearInterval(timerId);
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
    // refs.bodyEl.style.backgroundColor = '';
}


function onBcgndColor() {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


