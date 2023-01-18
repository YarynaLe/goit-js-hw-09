function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerID = null;
buttonStop.toggleAttribute("disabled", true);

buttonStart.addEventListener('click', changeBodyBColor);

function changeBodyBColor() {
    buttonStart.toggleAttribute("disabled");
    buttonStop.toggleAttribute("disabled");

    timerID = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
};

buttonStop.addEventListener('click', stopChangeBodyBColor);

function stopChangeBodyBColor() {
    clearInterval(timerID);
    buttonStart.toggleAttribute("disabled");
    buttonStop.toggleAttribute("disabled");
};