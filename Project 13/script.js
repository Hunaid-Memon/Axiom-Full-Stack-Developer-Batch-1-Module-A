// Get DOM Elements
const addCardBtn = document.getElementById('add-card');
const clearCardsBtn = document.getElementById('clear-cards');
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev-btn');
const currentCardNav = document.getElementById('current-card');
const nextBtn = document.getElementById('next-btn');
const cancelBtn = document.getElementById('cancel-btn');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const addCardSubmitBtn = document.getElementById('add-card-btn');
const addCardContainer = document.getElementById('add-card-container');

let currentCardID = 0;

const cards = [];

const cardData = getCardData();

// const cardData = [
//     {   // 0
//         question: 'What is React?',
//         answer: 'React is a free and open-source front-end JavaScript library for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.'
//     },
//     {   // 1
//         question: 'What is HTML?',
//         answer: 'The HyperText Markup Language, or HTML is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript.'
//     },
//     {   // 2
//         question: 'What is MongoDB?',
//         answer: 'MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License.'
//     }
// ];

function getCardData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

function saveCardData(cardData) {
    localStorage.setItem('cards', JSON.stringify(cardData));
    window.location.reload();
}

function generateCards() {
    cardData.forEach((data, index) => generateCard(data, index));
}

function updateCurrentCardNav() {
    currentCardNav.innerText = `${currentCardID + 1} / ${cardData.length}`
}

function generateCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    if (index === 0) {
        card.classList.add('active');
    }
    card.innerHTML = `
        <div class='inside-card'>
            <div class='card-front'>
                <p>${data.question}</p>
            </div>
            <div class='card-back'>
                <p>${data.answer}</p>
            </div>
        </div>
    `;
    card.addEventListener('click', () => card.classList.toggle('show-answer'))
    cards.push(card);
    cardsContainer.appendChild(card);
    updateCurrentCardNav();
}

nextBtn.addEventListener('click', () => {
    cards[currentCardID].className = 'card left';
    currentCardID++;
    if (currentCardID > cards.length - 1) {
        currentCardID = 0;
    }
    cards[currentCardID].className = 'card active';
    updateCurrentCardNav();
});

prevBtn.addEventListener('click', () => {
    cards[currentCardID].className = 'card right';
    currentCardID--;
    if (currentCardID < 0) {
        currentCardID = cards.length - 1;
    }
    cards[currentCardID].className = 'card active';
    updateCurrentCardNav();
});

addCardBtn.addEventListener('click', () => addCardContainer.classList.add('active'))
cancelBtn.addEventListener('click', () => addCardContainer.classList.remove('active'))
addCardSubmitBtn.addEventListener('click', () => {
    const question = questionInput.value;
    const answer = answerInput.value;
    if (question.trim() && answer.trim()) {
        const nextCard = { question, answer };
        // console.log(nextCard);
        generateCard(nextCard);
        question.value = '';
        question.value = '';
        addCardContainer.classList.remove('active');
        cardData.push(nextCard);
        saveCardData(cardData);
    }
});

clearCardsBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
})
generateCards();