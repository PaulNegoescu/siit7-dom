function counter(step = 1, initialValue = 0) {
  // selectam toate elementele si le stocam intr-o variabila
  // vom defini valoare counterului ca si variabila
  // cand apasam pe un buton sa incrementam sau sa decrementam valoarea din display
  //    adaugam event listeners la cele doua butoane
  //    atunci cand valoarea counterului se modifica sa actualizam displayul
  const display = document.querySelector('[data-counter-display]');
  const incButton = document.querySelector('[data-counter-button=increment]');
  const decButton = document.querySelector('[data-counter-button=decrement]');
  let counterValue = initialValue;
  updateDisplay();

  incButton.addEventListener('click', handleClick);
  decButton.addEventListener('click', handleClick);

  function handleClick(e) {
    // pe care dintre cele doua butoane s-a dat click?
    //  trebuie sa punem mana pe butonul pe care s-a dat click
    //  trebuie sa vedem care e valoarea atribului data-counter-button a acestuia
    //  if in functie de aceasta valoare
    const but = e.target;
    const val = but.dataset.counterButton;

    switch (val) {
      case 'increment':
        counterValue = counterValue + step;
        break;
      case 'decrement':
        counterValue = counterValue - step;
        break;
    }

    updateDisplay();
  }

  function updateDisplay() {
    display.innerText = counterValue;
    // if (counterValue < 0) {
    //   display.style.color = '#c00';
    // } else if (counterValue > 0) {
    //   display.style.color = '#bada55';
    // } else {
    //   display.style.color = 'inherit';
    // }

    display.classList.remove(
      'positive-counter-value',
      'negative-counter-value'
    );

    if (counterValue < 0) {
      display.classList.add('negative-counter-value');
    } else if (counterValue > 0) {
      display.classList.add('positive-counter-value');
    }
  }
}

counter(5, 0);

function bmiCalculator() {
  // Luam valoarea greutatii
  // Luam valoarea inaltimii
  // Facem calculul BMI g/i^2
  // Afisam rezultatul
  const bmiForm = document.querySelector('[data-bmi-form]');

  //   bmiForm.elements.inaltime.addEventListener('input', (e) =>
  //     console.log(e.target.value)
  //   );
  //bmiForm.elements.greutate.value
  bmiForm.addEventListener('submit', handleSubmit);

  function handleSubmit(e) {
    e.preventDefault();

    const greutate = Number(bmiForm.elements.greutate.value);
    const inaltime = Number(bmiForm.elements.inaltime.value);
    const bmi = greutate / inaltime ** 2;

    document.querySelector('[data-bmi-display]').innerText = bmi.toFixed(2);

    // 'adsasdas'.replace 'dadsa'.split('') 'adasdas'[0]
  }
}

bmiCalculator();
