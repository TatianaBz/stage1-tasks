const months = {
  monthsRu: [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сенябрь', 'Октябрь', 'Ноябь', 'Декабрь'
  ],
  monthsEn: ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],

  monthsBr: ['Студзень', 'Люты', 'Сакавік', 'Красавік', 'Мая', 'Чэрвеня',
    'Ліпеня', 'Жнівень', 'Сенября', 'Кастрычнік', 'Ноябь', 'Сьнежня'
  ]
};
const dateText = document.querySelector('.date');
//let days = ['Воскресенье', 'Понедельник', 'Bтopник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const time = document.querySelector('.time');
console.log(time);

const date = new Date();

function showTime() {
  const date = new Date();
  const options = {
    timeZone: 'UTC'
  };
  time.textContent = date.toLocaleTimeString('Ru-ru', options);
  console.log(time.textContent);
  setTimeout(showTime, 1000);

}
showTime();
dateText.innerHTML = date.getDate() + ' ' + months.monthsRu[date.getMonth()] + ', ' + days[date.getDay()];
console.log(dateText.innerHTML);
/*Greeting*/
const greeting = document.querySelector('.greeting');

let getTime = ['night', 'morning', 'afternoon', 'evening'];

function getTimeOfDay() {
  const hours = date.getHours()-7;

  return getTime[Math.floor(hours / 6)];

}
greeting.innerHTML = `Good ${getTimeOfDay()},`;
console.log(greeting.innerHTML);
let nn = Number(getTimeOfDay());

/*LocalStorage*/

const input = document.querySelector('#inputName');

function setLocalStorage() {
  localStorage.setItem('name', input.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    input.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage);

/*Slider */
/*
 let bgNum;

 function getRandomNum(){
  return (Math.random()*20).toFixed(0);
 }
bgNum = getRandomNum();
 if (bgNum.length < 2) bgNum = '0'+ bgNum;


function setBg() {
const img = new Image();
  img.src = 'https://github.com/TatianaBz/stage1-tasks/tree/assets/images/morning/10.jpg';

img.onload = () => {
  body.style.backgroundImage = "url('https://github.com/TatianaBz/stage1-tasks/tree/assets/images/morning/10.jpg')";
};
}
setBg();
*/
let bgNum;

function getRandomNum() {
  return (Math.random() * 20 + 1).toFixed(0);
}
bgNum = getRandomNum();
if (bgNum.length < 2) bgNum = '0' + bgNum;

let body = document.querySelector('.body');
let link = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum}.jpg`;
body.style.backgroundImage = `url(${link})`;

let hh;
 let slidePrev = document.querySelector('.slide-prev');
 let slideNext = document.querySelector('.slide-next');

 slidePrev.addEventListener('click', function(){
    bgNum--;
    if (bgNum == 0) bgNum = 20;
 hh = String(bgNum).padStart(2, '0');
    let link = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${hh}.jpg`;
  body.style.backgroundImage = `url(${link})`;
  console.log("n - ", hh);
 });

 slideNext.addEventListener('click', function(){
  bgNum++;
  if (bgNum === 21) bgNum = 1;
  hh = String(bgNum).padStart(2, '0');
  let link = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${hh}.jpg`;
body.style.backgroundImage = `url(${link})`;

});
/* weather  */
// https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=e9dc0f0fb2fd54cc72431699edf89fef&units=metric

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('#city');


async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=e9dc0f0fb2fd54cc72431699edf89fef&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;

  console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);


/* Quotes */
const changeQuote = document.querySelector('.change-quote');
let quotes = document.querySelector('#quote');
let author = document.querySelector('#author');

function getQuotes() {
  let rem = (Math.random() * 3).toFixed(0);
  fetch("/js/data.json")
    .then(res => res.json())
    .then(data => {

      quotes.textContent = data[rem].text;
      author.textContent = data[rem].author;
    });

}
getQuotes();
changeQuote.addEventListener('click', getQuotes);