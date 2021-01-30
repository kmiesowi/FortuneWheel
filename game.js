const words = {
    "wordcontent": [
        { "word": "elephant", "category": "animal" },
        { "word": "tortoise", "category": "animal" },
        { "word": "anaconda", "category": "animal" },
        { "word": "chipmunk", "category": "animal" },
        { "word": "snake", "category": "animal" },
        { "word": "mouse", "category": "animal" },
        { "word": "hamster", "category": "animal" },
        { "word": "apple", "category": "fruit" },
        { "word": "banana", "category": "fruit" },
        { "word": "pear", "category": "fruit" },
        { "word": "watermelon", "category": "fruit" },
        { "word": "blackberry", "category": "fruit" },
        { "word": "strawberry", "category": "fruit" },
        { "word": "dumplings", "category": "food" },
        { "word": "pizza", "category": "food" },
        { "word": "kebab", "category": "food" },
        { "word": "lasagne", "category": "food" },
        { "word": "spaghetti", "category": "food" },
        { "word": "hamburger", "category": "food" },
        { "word": "carrot", "category": "vegetable" },
        { "word": "cucumber", "category": "vegetable" },
        { "word": "onion", "category": "vegetable" },
        { "word": "garlic", "category": "vegetable" },
        { "word": "cauliflower", "category": "vegetable" },
        { "word": "tomatoes", "category": "vegetable" },
        { "word": "ticket", "category": "travel" },
        { "word": "airport", "category": "travel" },
        { "word": "backpack", "category": "travel" },
        { "word": "journey", "category": "travel" },
        { "word": "transport", "category": "travel" },
        { "word": "train", "category": "travel" },
        { "word": "poland", "category": "European country" },
        { "word": "portugal", "category": "European country" },
        { "word": "switzerland", "category": "European country" },
        { "word": "italy", "category": "European country" },
        { "word": "norway", "category": "European country" },
        { "word": "austria", "category": "European country" },
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

