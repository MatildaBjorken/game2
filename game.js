document.getElementById('testiframe').addEventListener('load', loaded);
function loaded() {
  setTimeout(function () {
    document.getElementById('loader').style.display = 'none';
    document.querySelector('.main').style.display = 'block';
  }, 1000);
}

let horseProp = [
  {
    no: 1,
    OriginTop: 70,
  },
  {
    no: 2,
    OriginTop: 74,
  },
  {
    no: 3,
    OriginTop: 78,
  },
  {
    no: 4,
    OriginTop: 82,
  },
];

let bethorse, amount, funds; //Global variables

let highScores = localStorage.getItem('theMONEY') || '2500';
console.log(highScores, 'eee');
document.getElementById('funds').innerText = highScores + ' kr';
//Trigger the following when "start" button is clicked
document.getElementById('start').onclick = function () {
  //Get the values from the DOM
  bethorse = document.getElementById('bethorse').value;
  amount = parseInt(document.getElementById('amount').value);
  laps = parseInt(document.getElementById('laps').value);
  funds = parseInt(document.getElementById('funds').innerText);

  localStorage.setItem('theMONEY', funds);
  let highScores = localStorage.getItem('theMONEY');
  console.log(highScores);
  document.getElementById('funds').innerText = highScores  + ' kr';
  //Basic input validation
  if (amount > funds) {
    alert('You do not have enough funds.');
    return 0;
  } else if (laps < 1) {
    alert('Lap must be greater than 0.');
    return 0;
  } else if (amount < 1) {
    alert('Bet amount must be greater than 0.');
    return 0;
  }

  hideResult();
  let horses = document.getElementsByClassName('horse');
  //Running Animation and actual movement for every horse
  let horseNo = 0; //Starting from horse #0
  for (const horse of horses) {
    //Following two class functions are for animation
    horse.classList.add('runRight');
    horse.classList.remove('standRight');
    horseProp[horseNo].left = 40;
    horseProp[horseNo].laps = laps;
    moveRight(horse, horseNo);
    horseNo++;
  }
};

function moveRight(horse, horseNo) {
  setTimeout(() => {
    horseProp[horseNo].left++;
    horse.style.left = horseProp[horseNo].left + 'vw';
    if (horseProp[horseNo].laps > 0) {
      if (horseProp[horseNo].left < 85 + horseNo * 2.5) {
        moveRight(horse, horseNo);
      } else {
        horseProp[horseNo].top = 65 + (horseNo + 1) * 4;
        horse.classList.remove('runRight');
        horse.classList.add('runUp');
        moveUp(horse, horseNo);
      }
    } else {
      if (horseProp[horseNo].left < 40) {
        moveRight(horse, horseNo);
      } else {
        arrival(horse, horseNo);
      }
    }
  }, 1000 / (Math.random() * 20 + 12));
}

function moveUp(horse, horseNo) {
  setTimeout(() => {
    horseProp[horseNo].top--;
    horse.style.top = horseProp[horseNo].top + 'vh';
    if (horseProp[horseNo].top > 15 + horseNo * 4) {
      moveUp(horse, horseNo);
    } else {
      horse.classList.remove('runUp');
      horse.classList.add('runLeft');
      moveLeft(horse, horseNo);
    }
  }, 1000 / (Math.random() * 20 + 12));
}

function moveLeft(horse, horseNo) {
  setTimeout(() => {
    horseProp[horseNo].left--;
    horse.style.left = horseProp[horseNo].left + 'vw';
    if (horseProp[horseNo].left > 25 + horseNo * 2.5) {
      moveLeft(horse, horseNo);
    } else {
      horse.classList.remove('runLeft');
      horse.classList.add('runDown');
      moveDown(horse, horseNo);
    }
  }, 1000 / (Math.random() * 20 + 12));
}

function moveDown(horse, horseNo) {
  setTimeout(() => {
    horseProp[horseNo].top++;
    horse.style.top = horseProp[horseNo].top + 'vh';
    if (horseProp[horseNo].top < 70 + horseNo * 4) {
      moveDown(horse, horseNo);
    } else {
      horseProp[horseNo].laps--;
      horse.classList.remove('runDown');
      horse.classList.add('runRight');
      moveRight(horse, horseNo);
    }
  }, 1000 / (Math.random() * 20 + 12));
}

//Disable 'Start Race' button and hide results during the actual race
function hideResult() {
  document.getElementById('start').disabled = true;
  //
  let resultIcons = document.querySelectorAll('tr td:nth-child(2)');
  for (let i = 0; i < resultIcons.length; i++) {
    resultIcons[i].className = 'results';
  }
}

//window.localStorage.setItem('money', funds);
//window.localStorage.getItem('money');

function arrival(horse, horseNo) {
  horse.classList.remove('runRight');
  horse.classList.add('standRight');
  horseProp[horseNo].top = undefined;
  document.getElementById('start').disabled = false;
  var resultIcons = document.getElementsByClassName('results');
  horseNo++; //Arrays start with index 0, but the class names start with index 1
  resultIcons[0].className = 'horse' + horseNo;
  if (resultIcons.length == 3) {
    if (bethorse == 'horse' + horseNo) {
      funds += amount;
    } else {
      funds -= amount;
    }
    localStorage.setItem('theMONEY', funds);
    const highScores = localStorage.getItem('theMONEY');
    console.log(highScores);
    document.getElementById('funds').innerText = highScores  + ' kr';
    //document.getElementById('funds').innerText = highScores
  }
}

//localStorage.clear();
