const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const btBotar = document.querySelector("#botar");
const btSumir = document.querySelector("#sumir");
const game = document.querySelector("#game");


// valor que define a quantidade de marmotas que vão aparecer
let amoutShow = 15

// valor que define o tempo que a marmota vai ficar visível
let timeView = 1500

const sorteiaBuraco = () => Math.floor(Math.random() * 6)

let numbersHide = []
let numberShow = []

function validateNumberShow() {
  let newNumber = sorteiaBuraco()

  if (numberShow.length === 6) {
    numberShow = []
  }

  if (!numberShow.includes(newNumber)) {
    numberShow.push(newNumber)
    botaMarmota(newNumber);
  } else {
    validateNumberShow()
  }
}

function validateNumberHide() {
  let newNumber = sorteiaBuraco()

  if (numbersHide.length === 6) {
    numbersHide = []
  }

  if (!numbersHide.includes(newNumber)) {
    numbersHide.push(newNumber)
    sumirMarmota(newNumber);
  } else {
    validateNumberHide()
  }
}


function botaMarmota(numeroBuraco) {
  const buraco = holes[numeroBuraco]
  buraco.classList.add("up");
}


function sumirMarmota(numeroBuraco) {
  const buraco = holes[numeroBuraco]
  buraco.classList.remove("up");
}

btBotar.addEventListener('click', () => {
  validateNumberShow()
})


btSumir.addEventListener('click', () => {
  validateNumberHide()
})


function loopComTimeout(i) {
  const currentNumber = sorteiaBuraco()

  if (i < amoutShow) {
    // mostra a marmota
    botaMarmota(currentNumber)

    // espera 1 segundo e esconde a marmota
    setTimeout(function () {
      sumirMarmota(currentNumber)
      loopComTimeout(i + 1);
    }, timeView);
  }
}

let points = 0
function updatePoints (){
  points = points + 1
  scoreBoard.innerHTML = `${points}`
  console.log(points)
  
}
// botão de start do game
const buttonStartGamer = document.querySelector('#startGame')
buttonStartGamer.addEventListener('click', startGamer)

function startGamer() {
  points = 0
  scoreBoard.innerHTML = `${points}`
  loopComTimeout(0);
  // zerar o placar

  for (let i = 0; i < holes.length; i++) {
    holes[i].addEventListener("click", () => {
      if (holes[i].classList.contains("up")) {
        updatePoints()
        // esconder a marmota quando acerta para não contar mais de uma vez o mesmo buraco
        holes[i].classList.remove("up");
      }
    })
  }
}