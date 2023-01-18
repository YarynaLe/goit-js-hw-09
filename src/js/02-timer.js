import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import  Notify  from 'notiflix';



const myInput = document.querySelector("input[type='text']");
const buttonStart = document.querySelector('button[data-start]');

buttonStart.disabled = true;

const clockFace = document.querySelector('.timer');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
  onClose(selectedDates) {
     
      if (selectedDates[0] < new Date()) {
       
          Notify.failure('Please choose a date in the future');
          buttonStart.disabled = true;
      } else {
          buttonStart.disabled = false;
          buttonStart.addEventListener('click', () => { startTiming(selectedDates[0]) });
      }
      
    },
};

const fp = flatpickr(myInput, options);  // функція flatpickr(selector, options)

function startTiming(selectedTime) {
    const timer  = {
        start() {
        buttonStart.disabled = true;
        myInput.disabled = true;

        const startTime = selectedTime;
        

    const timerID = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = startTime - currentTime;
        
        if (deltaTime >= 0) {
            const { days, hours, minutes, seconds } = convertMs(deltaTime);
            
            updateCkockFace({ days, hours, minutes, seconds });
        } else {
            clearInterval(timerID);
            buttonStart.disabled = false;
            myInput.disabled = false;
        }
    }, 1000);

        }
    }

    timer.start();
};

function updateCkockFace({ days, hours, minutes, seconds }) {
    clockFace.children[0].firstElementChild.textContent = days;
    clockFace.children[1].firstElementChild.textContent = hours;
    clockFace.children[2].firstElementChild.textContent = minutes;
    clockFace.children[3].firstElementChild.textContent = seconds;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
 
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = addLeadingZero(Math.floor(ms / day));
 
  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}