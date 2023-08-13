const quiz = [
  {
    picture: "img/ulica.jpg",
    question: "What street did Harry Potter live on ?",
    trueAnswer: 1,
    answers: [
      "back street",
      "privet drive",
      "second street",
      "milenium street",
    ],
  },
  {
    picture: "img/zgredek.jpg",
    question: "What was the name of the elf Harry gave the sock to ?",
    trueAnswer: 2,
    answers: ["Cedric", "Lucjusz", "Dobby", "creature"],
  },
  {
    picture: "img/Ron.jpg",
    question: "What is the name of Ron's younger sister ?",
    trueAnswer: 3,
    answers: ["Hermiona", "Maggie", "Luna", "Giny"],
  },
  {
    picture: "img/zaklęcia.jpg",
    question: "Which of these spells is unforgivable ?",
    trueAnswer: 0,
    answers: ["crucio", "expeliarmus", "drentwota", "protego"],
  },
  {
    picture: "img/avadaKedavra.jpg",
    question:
      "what was the name of the defense against the dark arts professor in the sixth part of the adventure ?",
    trueAnswer: 0,
    answers: [
      "Severus Snape",
      "Gilderoy Lockhart",
      "Horacy Slughorn",
      "Remus Lupin",
    ],
  },
  {
    picture: "img/nora.jpg",
    question: "How many brothers did Ron Weasley have ?",
    trueAnswer: 2,
    answers: ["three", "four", "five", "six"],
  },
  {
    picture: "img/czaraOgnia.jpg",
    question: "Which character died in part four ?",
    trueAnswer: 1,
    answers: [
      "severus Snape",
      "Cedric Digory",
      "Albus Dumbledor",
      "Remus Lupin",
    ],
  },
  {
    picture: "img/snape.jpg",
    question: "What was Severus Snape's Patronus ?",
    trueAnswer: 3,
    answers: ["rabbit", "bull", "lion", "doe"],
  },
  {
    picture: "img/tiaraPrzydziału.jpg",
    question: "What was the name of the hat that assigned students houses ?",
    trueAnswer: 2,
    answers: [
      "grey tiara",
      "cap of invisibility ",
      "sorting hat",
      "home tiara",
    ],
  },
  {
    picture: "img/mandragora.jpg",
    question: "what is this plant called ?",
    trueAnswer: 0,
    answers: ["Mandragora", "asfodelus", "poisonous tentacula", "Gillyweed"],
  },
];

const questionNumber = document.querySelector(".question_number");
const question = document.querySelector(".question");
const answers = document.querySelectorAll(".answer");
const nextBtn = document.querySelector(".next_button");
const startBtn = document.querySelector(".start_button");
const picture = document.querySelector(".picture");
const finalScore = document.querySelector(".finalScore");
const audio = new Audio("Harry Potter Theme Song.mp3");
const quizBox = document.querySelector(".quiz");
const finalResoult = document.querySelector(".finalResoult");
const finalImage = document.querySelector(".finalImage");
const body = document.querySelector("body");
const typedText = document.querySelector(".text");
const tryAgainBtn = document.querySelector(".tryAgain");

let counter = -1;
let counter2 = 0;
let counter3 = -1;
let resoult = 0;
let wasClicked = false;

answers.forEach(function (el) {
  el.addEventListener("click", function (e) {
    const index = [...el.parentElement.children].indexOf(el);

    answers.forEach((el) => el.classList.remove("choosen"));
    e.target.classList.toggle("choosen");

    if (index === quiz[counter].trueAnswer && !wasClicked) {
      wasClicked = true;
      resoult++;
    }
    if (index !== quiz[counter].trueAnswer && wasClicked) {
      resoult--;
      wasClicked = false;
    }
  });
});

const showNextQuestion = function () {
  if (counter === 9) {
    showFinalScore();
    return;
  }
  wasClicked = false;
  counter++;
  counter2++;
  questionNumber.innerHTML = `Question Nr.${counter2}`;

  question.innerHTML = quiz[counter].question.toUpperCase();

  answers.forEach(function (el, i) {
    el.innerHTML = quiz[counter].answers[i].toUpperCase();
    el.classList.remove("choosen");
  });

  picture.src = quiz[counter].picture;
};

const showFinalScore = function () {
  quizBox.classList.add("hidden");
  finalResoult.classList.remove("hidden");
  document.querySelector(".next_button").style.display = "none";

  tryAgainBtn.classList.remove("hidden");
  finalResoult.classList.add("animateFinalResoult");
  finalImage.classList.add("animate");
  finalScore.classList.add("animate");

  finalScore.innerHTML =
    resoult === 1
      ? ` ${resoult} point to Gryffindor`
      : `${resoult} points to Gryffindor`;

  finalImage.src = resoult < 5 ? "img/minervaBad.jpg" : "img/minervaGood.jpg";
};

const start = function () {
  quizBox.classList.remove("hidden");
  quizBox.classList.add("animate");
  startBtn.classList.add("hidden");
  document.querySelector(".next_button").style.display = "block";

  body.style.backgroundImage = "url(img/background.jpg)";
  body.style.backgroundSize = "cover";
  body.style.backgroundAttachment = "fixed";
  audio.play();
  audio.loop = true;
  showNextQuestion();
};

nextBtn.addEventListener("click", showNextQuestion);

startBtn.addEventListener("click", function () {
  typedText.classList.remove("hidden");
  typedText.classList.add("typed");

  setTimeout(start, 5000);
});

const startOver = function () {
  quizBox.classList.add("hidden");
  startBtn.classList.remove("hidden");
  document.querySelector(".next_button").style.display = "none";
  finalResoult.classList.add("hidden");
  body.style.backgroundImage = "url(img/back2.jpg)";
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundSize = "70vh";
  typedText.classList.add("hidden");
  typedText.classList.remove("typed");
  counter = -1;
  counter2 = 0;
  resoult = 0;
  wasClicked = false;
  tryAgainBtn.classList.add("hidden");
};

tryAgainBtn.addEventListener("click", startOver);
