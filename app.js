const wrapper = document.querySelector('.wrapper');
const main = document.querySelector('.main');
const hoursContainer = document.querySelector('#hours');
const minutesContainer = document.querySelector('#minutes');
const secondsContainer = document.querySelector('#seconds');
const timeSeparators = document.querySelectorAll('.separator');
const fullScreenButton = document.querySelector('#full-screen-on');
const settingsButton = document.querySelector('#settings');
const closeSettingsButton = document.querySelector('#close-settings');
const iconsContainer = document.querySelector('.icons');
const settingContainer = document.querySelector('.settings-container');
const showSeconds = document.querySelector('#show-seconds');


const init = () => {
  uiSettings();

  setTimeout(() => runInterval(), millisecondsTimeout());
}

const millisecondsTimeout = () => {
  const milliseconds = new Date().toString();
  return Number( milliseconds.substr(-3) );
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

const warningTime = '10:30:00';
const dangerTime = '10:35:00';
const alertTime = '10:40:00';
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

const uiSettings = () => {
  if ( !document.documentElement.requestFullscreen && !document.exitFullscreen ) {
    fullScreenButton.style.display = 'none';
  }
}

fullScreenButton.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullScreenButton.id = 'full-screen-off';
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      fullScreenButton.id = 'full-screen-on';
    }
  }
});

const toggleSettings = ( isOpen ) => {
  if ( isOpen ) {
    iconsContainer.style.display = 'none';
    settingContainer.style.display = 'flex';
  } else {
    settingContainer.style.display = 'none';
    iconsContainer.style.display = 'block';
  }
}

settingsButton.addEventListener('click', () => toggleSettings(true) );
closeSettingsButton.addEventListener('click', () => toggleSettings(false) );

showSeconds.addEventListener('click', () => {
  if ( showSeconds.checked ) {    
    timeSeparators[0].style.display = 'none';

    setTimeout(() => {
      timeSeparators[0].style.display = 'block';
      timeSeparators[1].style.display = 'block';
    }, millisecondsTimeout() );

    secondsContainer.style.display = 'block';
  } else {
    secondsContainer.style.display = 'none';
    timeSeparators[1].style.display = 'none';
  }
})


/**APP INITIALIZATION */
init();