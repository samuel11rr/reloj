const wrapper = document.querySelector('.wrapper');
const main = document.querySelector('.main');
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

  setColor( hour.map( number => Number(number) ) );
}

const warningTime = '23:48:00';
const dangerTime = '23:49:00';
const alertTime = '23:50:00';
const warningTimeArray = warningTime.split(':').map( number => Number( number ) );
const dangerTimeArray = dangerTime.split(':').map( number => Number( number ) );
const alertTimeArray = alertTime.split(':').map( number => Number( number ) );

const setColor = ( currentTime ) => {
  if ( itsTime(currentTime, warningTimeArray, dangerTimeArray) ) {
    if (main.classList.value.includes('warning')) return;
    main.classList.remove('initial', 'danger', 'alert');
    return main.classList.add('warning');
  }

  if ( itsTime(currentTime, dangerTimeArray, alertTimeArray) ) {
    if (main.classList.value.includes('danger')) return;
    main.classList.remove('initial', 'warning', 'alert');
    return main.classList.add('danger');
  }

  if ( itsTime(currentTime, alertTimeArray) ) {
    if (main.classList.value.includes('alert')) return;
    main.classList.remove('initial', 'warning', 'danger');
    return main.classList.add('alert');
  }
}

const itsTime = ( currentTime, limitTime, overTime = null ) => {
  return !!overTime 
    ? ((currentTime[0] >= limitTime[0] && currentTime[1] >= limitTime [1]) 
      && (currentTime[0] <= overTime[0] && currentTime[1] < overTime[1])) 
    : (currentTime[0] >= limitTime[0] && currentTime[1] >= limitTime [1]);
}


const runInterval = () => {
  setInterval(() => currentTime(), 1000);
}

/**APP INITIALIZATION */
init();