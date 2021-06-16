const word = document.getElementById('word');
const incorrectLetters = document.getElementById('incorrect-letters');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const playBtn = document.getElementById('play-btn');
const notification = document.getElementById('notification-container');

const figureParts = document.querySelectorAll('.figure-part');

const randomWords = ["grass", "brush", "press", "came", "cent", "variety",
    "perfectly", "sold", "idea", "start", "felt", "hurry",
    "escape", "excited", "silence", "scene", "discuss", "interior",
    "mud", "soft", "disease", "larger", "put", "gold",
    "learn", "clay", "contrast", "spoken", "object", "storm",
    "tight", "spell", "price", "snow", "consider", "important",
    "engine", "use", "noise", "surface", "missing", "opposite"];


let selectedWord = randomWords[Math.floor(Math.random() * randomWords.length)];
// console.log(selectedWord);

const correctLettersArray = [];
const incorrectLettersArray = [];


function displayWord() {
    word.innerHTML = `${selectedWord
        .split('')
        .map(letter =>
            `<span class='letter'> ${correctLettersArray.includes(letter) ? letter : ''} </span> `)
        .join('')
        }`;
        
        // console.log(word.innerHTML)
    const innerWord = word.innerText.replace(/\n/g, '')
        // console.log(innerWord)
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulation! You Won';
        popup.style.display = 'flex'
    }
};

window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        // console.log(e.keyCode,e.key);
        const letter = e.key;
        // console.log(letter);
        if (selectedWord.includes(letter)) {
            if (!correctLettersArray.includes(letter)) {
                correctLettersArray.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        }else {
            if(!incorrectLettersArray.includes(letter)){
                incorrectLettersArray.push(letter);
                updateIncorrectLetters()
            }else{
                showNotification();
            }
        }

    } 
});

function showNotification(){
    notification.classList.add('show');
    setTimeout(() =>{
        notification.classList.remove('show')
    }, 2000)
}

function updateIncorrectLetters(){
   incorrectLetters.innerHTML = `
        ${incorrectLettersArray.length > 0 ? '<p>Incorrect Letters </p>' : ''}
        ${incorrectLettersArray.map(letter => `<span>${letter}</span>`)}
   `
    figureParts.forEach((part,index) => {
        const errors = incorrectLettersArray.length
        // console.log(errors);
        if(index < errors){
            part.style.display = 'block';
        }else {
            part.style.display = 'none'
        }
    });
    if(incorrectLettersArray.length === figureParts.length){
        finalMessage.innerText = 'You Lost!';
        popup.style.display = 'flex';
    }
}

playBtn.addEventListener('click', ()=>{
    incorrectLettersArray.splice(0)
    correctLettersArray.splice(0)
    selectedWord = randomWords[Math.floor(Math.random() * randomWords.length)];
    updateIncorrectLetters();
    popup.style.display = 'none'
    displayWord();
})


displayWord();