import Notiflix from 'notiflix';

const refs = {
  firstDelayEl: document.querySelector('input[name="delay"]'),
  delayStepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
  btnEl: document.querySelector('button[type="submit"]'),
  form: document.querySelector(".form"),
}

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  
  let delay = Number(refs.firstDelayEl.value);
  const step = Number(refs.delayStepEl.value);
  const amount = Number(refs.amountEl.value);
  if (delay < 0 || step < 0 || amount <= 0) {
    Notiflix.Notify.warning(`Please input correct data`);
    refs.form.reset();
    return;
  }
  for (let i = 1; i <= amount; i += 1) {
    const position = i;
   createPromise(position, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
  }); 
    delay += step;
  };
   refs.form.reset();
 
  
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({ position, delay });
      }
    }, delay);
  }); 
}
