const wrapper = document.querySelector('.wrapper');
const hoursContainer = document.querySelector('#hours');
const minutesContainer = document.querySelector('#minutes');
const secondsContainer = document.querySelector('#seconds');

const init = () => {
  const milliseconds = new Date().toString();
  const timeout = Number( milliseconds.substr(-3) );

  setTimeout(() => runInterval(), timeout);
}

const currentTime = () => {
  const date = new Date();

  const hour = date.toLocaleString('es-MX', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  });

  printHour( hour.split(':') );
}

const printHour = ( hour ) => {
  if ( wrapper.classList.value.includes('hidden') ) {
    wrapper.classList.remove('hidden');
  }

  secondsContainer.innerText = hour[2];
  
  if ( minutesContainer.innerText !== hour[1].toString() ) {
    minutesContainer.innerText = hour[1];
  }
  
  if ( hoursContainer.innerText !== hour[0].toString() ) {
    hoursContainer.innerText = hour[0];
  }

  setColor( hour );
}

const setColor = ( hour ) => {
  const seconds = Number( hour[2] );

  if (seconds >= 0 && seconds < 30) {
    wrapper.classList.remove('warning', 'danger', 'alert');
    return wrapper.classList.add('initial');
  }

  if (seconds >= 30 && seconds < 40) {
    if (wrapper.classList.value.includes('warning')) return;
    wrapper.classList.remove('initial', 'danger', 'alert');
    return wrapper.classList.add('warning');
  }

  if (seconds >= 40 && seconds < 50) {
    if (wrapper.classList.value.includes('danger')) return;
    wrapper.classList.remove('initial', 'warning', 'alert');
    return wrapper.classList.add('danger');
  }

  if (seconds >= 50) {
    if (wrapper.classList.value.includes('alert')) return;

    wrapper.classList.remove('initial', 'warning', 'danger');
    return wrapper.classList.add('alert');
  }
}


const runInterval = () => {
  setInterval(() => currentTime(), 1000);
}

/**APP INITIALIZATION */
init();