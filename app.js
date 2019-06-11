

const btn__reset = document.querySelector('.btn__reset');

const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
let missed = 0;

const phrases = [
  'For Whom the Bell Tolls',
  'Siddartha',
  'White Fang',
  'The Alchemist',
  'Love and Death in the Time of Cholera',
  'The Book of Five Rings',
  'One Hundred Years of Solitude',
];


function getRandomPhraseAsArray(arr) {
  let x = arr[(Math.floor(Math.random() * 6))];
  let randomPhrase = x.split("");
  return randomPhrase;
}

function addPhraseToDisplay(arr) {
  const phraseArray = getRandomPhraseAsArray(arr);
  console.log(phraseArray);
  for (i=0; i < phraseArray.length; i += 1) {
    let li = document.createElement('LI');
    li.innerHTML = phraseArray[i];
      if (li.innerHTML !== " ") {
        li.classList.add('letter');
      } else {
        li.classList.add('space');
      }
    document.querySelector("#phrase ul").appendChild(li);
  }
}

function checkLetter(bttn) {
  let letter = document.getElementsByClassName('letter');
  let match = 0;
  for (i=0; i < letter.length; i += 1) {
    if (bttn.toLowerCase() === letter[i].innerHTML.toLowerCase()) {
      letter[i].classList.add('show');
      match += 1;
    }
  }
    if (match === 0) {
      missed += 1;
    }
}

function checkWin() {
  const show = document.getElementsByClassName('show');
  const letter = document.getElementsByClassName('letter');

  const overlay = document.getElementById('overlay');
  const title = document.querySelector('.title');
  const btn = document.querySelector('.btn__reset');

    if (show.length === letter.length) {
      overlay.classList.remove('start');
      overlay.classList.add('win');
      overlay.style.display ='flex';
      title.innerHTML = 'VICTORY!!!';
      btn.innerHTML = 'Play Again?';
      console.log('win');
    } else if (missed === 5) {
      overlay.classList.remove('start');
      overlay.classList.add('lose');
      overlay.style.display ='flex';
      title.innerHTML = 'Game Over';
      btn.innerHTML = 'Play Again?';
      console.log('lose')
    }

}

btn__reset.addEventListener('click', () => {
  btn__reset.parentNode.style.display = "none";
  document.querySelector("#phrase ul").innerHTML = '';
  missed = 0;
  let button = document.getElementsByTagName('BUTTON');
    for (i=0; i < button.length; i += 1) {
      button[i].removeAttribute('disabled'); 
    }
  addPhraseToDisplay(phrases);
});



document.getElementById('qwerty').addEventListener('click', () => {
  if (event.target.innerHTML.length === 1) {
    checkLetter(event.target.innerHTML);
    event.target.setAttribute('disabled', 'true');
  }
  checkWin();
});
