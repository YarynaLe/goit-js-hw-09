import  Notify  from "notiflix/build/notiflix-notify-aio";

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('[name=delay]'),
  inputStep: document.querySelector('[name=step]'),
  inputAmount: document.querySelector('[name=amount]'),
};

function onSubmitFct(e) {
  e.preventDefault();

  let delay = Number(refs.inputDelay.value);
  const step = Number(refs.inputStep.value);
  const amount = Number(refs.inputAmount.value);

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay })
        } else
          reject({ position, delay })
      }, delay)
    })
    return promise;
  }

  for (let promiseID = 0; promiseID < amount; promiseID++) {

    createPromise(promiseID + 1, delay).then(({ position, delay }) => {
      //
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }).catch(({ position, delay }) => {
      // 
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay = delay + step
  }
}

refs.form.addEventListener('submit', onSubmitFct);


console.log()