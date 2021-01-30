const words = {
    "wordcontent": [
        { "word": "krokodyl", "category": "zwierzęta" },
        { "word": "anakonda", "category": "zwierzęta" },
        { "word": "pantera", "category": "zwierzęta" },
        { "word": "lampart", "category": "zwierzęta" },
        { "word": "pies", "category": "zwierzęta" },
        { "word": "mysz", "category": "zwierzęta" },
        { "word": "chomik", "category": "zwierzęta" },
        { "word": "agrest", "category": "owoc" },
        { "word": "banan", "category": "owoc" },
        { "word": "malina", "category": "owoc" },
        { "word": "arbus", "category": "owoc" },
        { "word": "truskawka", "category": "owoc" },
        { "word": "gruszka", "category": "owoc" },
        { "word": "schabowy", "category": "jedzenie" },
        { "word": "pizza", "category": "jedzenie" },
        { "word": "kebab", "category": "jedzenie" },
        { "word": "pierogi", "category": "jedzenie" },
        { "word": "spaghetti", "category": "jedzenie" },
        { "word": "hamburger", "category": "jedzenie" },
        { "word": "marchewka", "category": "warzywo" },
        { "word": "papryka", "category": "warzywo" },
        { "word": "cebula", "category": "warzywo" },
        { "word": "czosnek", "category": "warzywo" },
        { "word": "kalafior", "category": "warzywo" },
        { "word": "pomidor", "category": "warzywo" },
        { "word": "bilet", "category": "podróże" },
        { "word": "lotnisko", "category": "podróże" },
        { "word": "plecak", "category": "podróże" },
        { "word": "wycieczka", "category": "podróże" },
        { "word": "transport", "category": "podróże" },
        { "word": "tramwaj", "category": "podróże" },
        { "word": "polska", "category": "Państwo Europejskie" },
        { "word": "portugalia", "category": "Państwo Europejskie" },
        { "word": "szwajcaria", "category": "European country" },
        { "word": "hiszpania", "category": "Państwo Europejskie" },
        { "word": "norwegia", "category": "Państwo Europejskie" },
        { "word": "austria", "category": "Państwo Europejskie" },
    ]
};
const audioLost = new Audio('audio/mous_laugh.mp3');
const audioGame = new Audio('audio/my_english_song_mous.mp3');
let yourScore = document.querySelector("#max_score").textContent;
let wheelScore = document.querySelector("#first_score").textContent;
let counter = 0;
const form = document.querySelector("form");
let firstNick = document.querySelector("#first_nick");
const avatar1 = document.querySelectorAll(".user-1 img");
const newGameBtn = document.querySelector("#new-game");
const exitBtn = document.querySelector("#exit");
const categoryDisplay = document.querySelector(".category");
let alert = document.querySelector(".alert");

function randomQuestion() {
    const index = Math.floor(Math.random() * words.wordcontent.length);
    word = words.wordcontent[index].word;
    category = words.wordcontent[index].category;
    categoryDisplay.innerHTML = `Category: ${category.toUpperCase()}`;
    const wordLength = word.length;
    console.log(wordLength);
    cloneCard(word, wordLength);
}

function cloneCard(txt, nb) {
    let j = 0;
    const tab = [...txt];
    console.log(tab);
    while (j < tab.length) {
        const card = document.querySelector("#card-template");
        const clone = card.content.cloneNode(true);
        clone.querySelector(".letter").innerHTML = tab[j];
        document.querySelector(".cards").appendChild(clone);
        j++;
    }
    clickLetter();
}

function clickLetter() {
    document.addEventListener("keyup", e => {
        const letter = [];
        console.log(e.key);
        letter.push(e.key);
        searchLetter(e.key);
    })
}

function searchLetter(txt) {
    const cardsContent = document.querySelectorAll(".letter");
    let guessedCards = Object.values(cardsContent).filter(card => card.innerHTML === txt);
    for (let card of guessedCards) {
        getCard(card);
        addScore();
        scaleFunction();
    }
    if (guessedCards == "") {
        falseLetter(txt);
    }
    checkWin();
}

function checkWin() {
    const cardsContent = document.querySelectorAll(".letter");
    let goodAnswer = [];
    for (let card of cardsContent) {
        card.classList.contains("show") === true ? goodAnswer.push("1") : goodAnswer;
        if (goodAnswer.length == cardsContent.length) {
            alert.style.display = "inherit";
            alert.querySelector("img").src = "IMAGES/adrian-win.bmp";
            alert.querySelector("p").innerText = "CONGRATULATIONS!";
            $('.demo').fireworks({ sound: true, opacity: 0.9, width: '100%', height: '100%' });
            setTimeout(function () {
                document.querySelector(".demo").classList.add("hide");
            }, 8000)
        }
    }
}

function falseLetter(txt) {
    const chances = document.querySelectorAll(".chance");
    chances[counter].innerHTML = txt.toUpperCase();
    chances[counter].style.backgroundColor = "black";
    counter++;

    if (counter === 3) {
        setTimeout(function () {
            document.querySelector(".alert").style.display = "inherit";
            audioGame.muted=true;
            audioLost.play();
        }, 500)
    }
}

function getCard(nb) {
    const foundCard = nb.parentElement;
    foundCard.style.backgroundColor = "gold";
    nb.innerHTML=nb.innerHTML.toUpperCase();
    foundCard.classList.add("flip");
    foundCard.querySelector(".letter").classList.add("show");
    foundCard.querySelector(".back").classList.add("hide");
}

function addScore() {
    yourScore = document.querySelector("#max_score").textContent;
    wheelScore = document.querySelector("#first_score").textContent;
    wheelScore = parseInt(wheelScore);
    let yourScoreNb = parseInt(yourScore);
    yourScoreNb += wheelScore;
    document.querySelector("#max_score").textContent = `${yourScoreNb}`;
}

function scaleFunction() {
    document.querySelector("#max_score").style.animation = "animation-score 2s linear";
}

newGameBtn.addEventListener("click", function (e) {
    location.reload();
});

exitBtn.addEventListener("click", function (e) {
    location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
});

avatar1.forEach(avatar => avatar.addEventListener("click", function (e) {
    selectAvatar("first", this);
    this.style.border = "2px solid blue";
    this.style.opacity = "1";
}));

function selectAvatar(txt, element) {
    document.querySelector(`#${txt}_img`).src = element.src
}

form.addEventListener("submit", function (e) {
    login(e);
    randomQuestion();
});

function login(e) {
    e.preventDefault();
    audioGame.play();
    audioGame.loop = true;
    const name = form.name1.value;
    firstNick.innerHTML = `${name}`;
    document.querySelector(".log-container").style.display = "none";
}
// function initGame() {

//     // Your game can start here, but define separate functions, don't write everything in here :)

// }

