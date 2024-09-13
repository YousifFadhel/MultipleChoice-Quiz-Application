const questions = [
    {
        question: "Is this Question 1?",
        answers: [
            { text: "Option A", correct: false},
            { text: "Option B", correct: false},
            { text: "Option C", correct: true},
            { text: "Option D", correct: false},
        ]
    },
    {
        question: "Is this Question 2?",
        answers: [
            { text: "Option A", correct: false},
            { text: "Option B", correct: true},
            { text: "Option C", correct: false},
            { text: "Option D", correct: false},
        ]

    },
    {
        question: "Is this Question 3?",
        answers: [
            { text: "Option A", correct: false},
            { text: "Option B", correct: false},
            { text: "Option C", correct: false},
            { text: "Option D", correct: true},
        ]
    },
    {
        question: "Is this Question 4?",
        answers: [
            { text: "Option A", correct: true},
            { text: "Option B", correct: false},
            { text: "Option C", correct: false},
            { text: "Option D", correct: false},
        ]
    }
];

const questionElement = document.getElementById("questions");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const backButton = document.getElementById("back-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    backButton.innerHTML = "Back";
    showQuestion();
}

function showQuestion()
{
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer); 

    });

    

    if (currentQuestionIndex === 0) {
        backButton.style.display = "none";
    }
    else
    {
        backButton.style.display = "block";
    }
}

function resetState(){
    nextButton.style.display = "none";
    backButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

    if (currentQuestionIndex === 0)
    {
        backButton.style.display = "none"; 

    }else
    {
    backButton.style.display = "block";
    }

}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again :D";
    nextButton.style.display = 'block';
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }else{
        showScore();
    }
}

function handleBackButton(){
    currentQuestionIndex--;
    if(currentQuestionIndex >= 0)
    {
        showQuestion();
        if (currentQuestionIndex === 0) {
            backButton.style.display = "none";
        }
    } 
    else{
        showScore();
    }
}

backButton.addEventListener("click", () => {
    if(0 < currentQuestionIndex && currentQuestionIndex  < questions.length){
        handleBackButton();
    }else{
        startQuiz();
    }
})

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex  < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})




startQuiz();