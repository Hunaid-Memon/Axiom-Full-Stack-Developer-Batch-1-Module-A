// Get DOM Element

const main = document.getElementById('main');
const voiceSelect = document.getElementById('voices');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const customText = document.getElementById('text');
const readBtn = document.getElementById('read');
const customTextDiv = document.getElementById('custom-text');

const data = [
    // For Angry Image
    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },
    // For Drink Image
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
    },
    // For Food Image
    {
        image: './img/food.jpg',
        text: "I'm Hungry"
    },
    // For Grandma Image
    {
        image: './img/grandma.jpg',
        text: "I'm Miss Grandma"
    },
    // For Happy Image
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },
    // For Home Image
    {
        image: './img/home.jpg',
        text: "I want to go home"
    },
    // For Hurt Image
    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },
    // For Outside Image
    {
        image: './img/outside.jpg',
        text: "I like the outdoors"
    },
    // For Sad Image
    {
        image: './img/sad.jpg',
        text: "I don't like being sad"
    },
    // For Scared Image
    {
        image: './img/scared.jpg',
        text: "I'm scary"
    },
    // For School Image
    {
        image: './img/school.jpg',
        text: "Long time since I went to school"
    },
    // For Tired Image
    {
        image: './img/tired.jpg',
        text: "I'm so tired"
    },
];

data.forEach(createBox);

function createBox(imageObj) {
    const box = document.createElement('div');
    const { image, text } = imageObj;
    // console.log(image,text);
    box.classList.add('box');
    box.innerHTML = `
        <img src='${image}' alt='${text}'/>
        <p class='imageInfo'>${text}</p>    
    `;
    box.addEventListener('click', () => {
        setMessage(text);
        speakText();
    })
    main.appendChild(box);
};

const message = new SpeechSynthesisUtterance;

function setMessage(text) {
    message.text = text;
};

function speakText() {
    speechSynthesis.speak(message)
}

// function setVoice(e) {

// }

function populateVoiceList() {
    if (typeof speechSynthesis === 'undefined') {
        return;
    }

    let voices = speechSynthesis.getVoices();

    for (var i = 0; i < voices.length; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

        if (voices[i].default) {
            option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
    }
}

populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

toggleBtn.addEventListener('click', () => {
    customTextDiv.classList.toggle('show');
});

closeBtn.addEventListener('click', () => {
    customTextDiv.classList.remove('show');
});

speechSynthesis.addEventListener('voiceschanged', populateVoiceList)

// voiceSelect.addEventListener('change', setVoice)

readBtn.addEventListener('click', () => {
    setMessage(customText.value);
    speakText();
})