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

const runInterval = () => {
  setInterval(() => currentTime(), 1000);
}

const setColor = ( hour ) => {
  if (hour[2] >= '00' && hour[2] < 30) {
    return wrapper.classList.remove('warning', 'danger', 'alert');
  }

  if (hour[2] >= '30' && hour[2] < 40) {
    if (wrapper.classList.value.includes('warning')) return;
    wrapper.classList.remove('danger', 'alert');
    return wrapper.classList.add('warning');
  }

  if (hour[2] >= '40' && hour[2] < 50) {
    if (wrapper.classList.value.includes('danger')) return;
    wrapper.classList.remove('warning', 'alert');
    return wrapper.classList.add('danger');
  }

  if (hour[2] >= '50') {
    if (wrapper.classList.value.includes('alert')) return;

    wrapper.classList.remove('warning', 'danger');
    return wrapper.classList.add('alert');
  }
}


/**APP INITIALIZATION */
init();