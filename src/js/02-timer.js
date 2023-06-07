// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";


const refs = {
  input: document.getElementById('datetime-picker'),
  btn: document.querySelector('button[data-start]'),
  day: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  btnReset: document.querySelector('button[data-reset]')
};

refs.input.addEventListener(
    'input',
    e => {
        const selectedDate = new Date('e.currentTarget.value');
        console.log("selectedDate", selectedDate);       
    }
);
refs.btn.addEventListener('click', onTimerStart);  
refs.btnReset.addEventListener('click', onResetTimer);

const currentTime = new Date();
let selectedDate;
refs.btn.disabled = true;
let timer;




const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.dir(selectedDates[0]);
      selectedDate = selectedDates[0];
      if (selectedDate <= currentTime) {
          refs.btn.disabled = true;
          alert('Please choose a date in the future')
      } else {
          refs.btn.disabled = false;
      }
      },
};

flatpickr("#datetime-picker", options);



function onTimerStart() {
    if (refs.input.value === "") {
        alert('Please choose a date in the future');
        return;
    }
    clearInterval(timer);
    timer = setInterval(handleTime, 1000);
    refs.input.disabled = true;
    refs.btn.disabled = true;

};

function handleTime() {
    const now = new Date();
    const timeDifference = selectedDate - now;
    if (timeDifference <= 0) {
        alert('Please choose a date in the future');
        clearInterval(timer);
        return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
   
    const stopWatch = `${days}:${hours}:${minutes}:${seconds}`;
    if (stopWatch === '00:00:00:00') {
        clearInterval(timer);
        return;
    };

    refs.day.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero( Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onResetTimer() {
       clearInterval(timer);
    refs.input.disabled = false;
    refs.btn.disabled = false;
    refs.day.textContent = "";
    refs.hours.textContent = "";
    refs.minutes.textContent ="";
    refs.seconds.textContent = "";
    refs.input.value="";
}