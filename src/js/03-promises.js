import { Notify }  from 'notiflix/build/notiflix-notify-aio';

const formData = document.querySelector('.form');


function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
       
      } else {
        reject({ position, delay });
      
      }
    }, delay);
    
  });
  
}


formData.addEventListener('submit', onCreatePromises);

function onCreatePromises(event) {
  event.preventDefault();

  let { delay, step, amount} = getDataValues();

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(onSuccess).catch(onError);

    delay += step;
  }
  formData.reset();
}


formData.addEventListener('input', getDataValues);
function getDataValues() {
  const dataValues = {
    delay: Number(formData.elements[0].value),
    step: Number(formData.elements[1].value),
    amount:Number(formData.elements[2].value),
  };
  // console.log(dataValues);
  return dataValues;
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};