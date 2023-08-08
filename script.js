const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const submitButton = document.getElementById('submit');
const resultElement = document.getElementById('result');
const startQuizButton = document.getElementById('start-quiz'); // Added for the YouTube interaction

let currentQuestion = 0;
let score = 0;

function displayQuestion() {
    questionElement.textContent = questions[currentQuestion].question;

    optionsElement.innerHTML = '';
    for (let i = 0; i < questions[currentQuestion].options.length; i++) {
        const option = document.createElement('button');
        option.textContent = questions[currentQuestion].options[i];
        option.addEventListener('click', () => checkAnswer(i));
        optionsElement.appendChild(option);
    }
}

function checkAnswer(selectedIndex) {
    questions[currentQuestion].userAnswerIndex = selectedIndex;

    if (selectedIndex === questions[currentQuestion].correctAnswer) {
        score++;
    }
    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.style.display = 'none';
    optionsElement.style.display = 'none';
    submitButton.style.display = 'none';

    let resultHTML = `You scored ${score} out of ${questions.length}!<br><br>`;
    resultHTML += '<strong>Questions and Answers:</strong><br><br>';

    for (let i = 0; i < questions.length; i++) {
        const userAnswer = questions[i].options[questions[i].userAnswerIndex];
        const correctAnswer = questions[i].options[questions[i].correctAnswer];

        resultHTML += `<p><strong>Question ${i + 1}:</strong> ${questions[i].question}</p>`;
        resultHTML += `<p>Your Answer: ${userAnswer}</p>`;
        resultHTML += `<p>Correct Answer: ${correctAnswer}</p><br>`;
    }

    resultElement.innerHTML = resultHTML;
}

// Function to start quiz after watching YouTube video
function startQuizAfterVideo() {
    const videoContainer = document.querySelector('.video-container');
    const quizContainer = document.querySelector('.quiz-container');

    videoContainer.style.display = 'none';
    quizContainer.style.display = 'block';

    displayQuestion(); // Start the quiz
}

// Load questions from external file and start the quiz
function loadQuestions() {
    const script = document.createElement('script');
    script.src = 'questions.js';
    script.onload = () => {
        // Start the quiz after loading questions
        startQuizButton.addEventListener('click', startQuizAfterVideo);
    };
    document.body.appendChild(script);
}

// Start loading questions when the page is ready
document.addEventListener('DOMContentLoaded', loadQuestions);

