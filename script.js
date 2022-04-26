const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.showModal');
const eventName = document.getElementById('eventName');
const save = document.querySelector('.save');
const title = document.getElementById('titleInput');
const bgImage = document.getElementById('bgImage');
const h1Days = document.getElementById('h1Days');
const h1Hours = document.getElementById('h1Hours');
const h1Minutes = document.getElementById('h1Minutes');
const h1Seconds = document.getElementById('h1Seconds');
const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');

function showModal(){
    modal.style.display == 'none' ? modal.style.display = 'flex' : modal.style.display = 'none';
}

function changeEventName(){
    eventName.textContent = `${title.value} za:`;
}

function changeImage(){
    const root = document.querySelector(':root');
    if(bgImage.value != '')
        root.style.setProperty('--bgimage',`url("${bgImage.value}")`);
}

var minutesInterval, hoursInterval, daysInterval;

function clearIntervals(min, hour, day){
    clearInterval(min);
    clearInterval(hour);
    clearInterval(day);
}

function calculateTheDate(){
    clearIntervals(minutesInterval, hoursInterval, daysInterval);

    const passedDate = new Date(year.value, month.value-1, day.value);
    const today = new Date();
    var milisecondsBetween = passedDate - today;

    const daysLeft = Math.floor(milisecondsBetween / 86400000);
    const hoursLeft = Math.floor(milisecondsBetween / (86400000 / 24)) % 24;
    const minutesLeft = Math.floor(milisecondsBetween / (86400000 / 24 / 60)) % 60;
    const secondsLeft = Math.floor(milisecondsBetween / (86400000 / 24 / 60 / 60)) % 60;

    h1Days.textContent = daysLeft;
    h1Hours.textContent = hoursLeft;
    h1Minutes.textContent = minutesLeft;
    h1Seconds.textContent = secondsLeft;

    daysInterval = setInterval(() => {
        if(h1Seconds.textContent == 0 && h1Minutes.textContent == 0 && h1Hours.textContent == 0 && h1Days.textContent > 0){
            h1Days.textContent--;
            h1Hours.textContent = 24;
        }
    }, 1000);

    hoursInterval = setInterval(() => {
        if(h1Seconds.textContent == 0 && h1Minutes.textContent == 0 && h1Hours.textContent > 0){
            h1Hours.textContent--;
            h1Minutes.textContent = 60;
        } 
    }, 1000)

    minutesInterval = setInterval(() => {
        if(h1Seconds.textContent > 0)
            h1Seconds.textContent--;
        else if(h1Minutes.textContent > 0){
            h1Seconds.textContent = 59;
            h1Minutes.textContent--;
        }
    }, 1000)
}

calculateTheDate();

function setNewSettings(){
    changeEventName();
    changeImage();
    calculateTheDate();
}

function validateModal(){
    const inputsArr = [title, day, month, year];

    for(let i=0; i<inputsArr.length; i++){
        if(inputsArr[i].value == ''){
            alert('Uzupełnij wymagane pola!')
            window.location.reload(true);
            return;
        } else {
            setNewSettings();
        }
    }
}

modalBtn.addEventListener('click', showModal);
save.addEventListener('click', validateModal);