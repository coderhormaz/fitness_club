const quizData = [
    {
        question: "What is the recommended daily water intake for adults?",
        a: "1 liter",
        b: "2 liters",
        c: "3 liters",
        d: "4 liters",
        correct: "b"
    },
    {
        question: "Which type of exercise helps improve flexibility?",
        a: "Running",
        b: "Weightlifting",
        c: "Yoga",
        d: "High-intensity interval training (HIIT)",
        correct: "c"
    },
    {
        question: "Which of the following is a good source of lean protein?",
        a: "Chicken breast",
        b: "French fries",
        c: "Ice cream",
        d: "Soda",
        correct: "a"
    },
    {
        question: "What is the recommended number of steps per day for an active lifestyle?",
        a: "1,000 steps",
        b: "5,000 steps",
        c: "10,000 steps",
        d: "15,000 steps",
        correct: "c"
    },
    {
        question: "Which muscle group is targeted by push-ups?",
        a: "Hamstrings",
        b: "Glutes",
        c: "Chest",
        d: "Calves",
        correct: "c"
    },
    {
        question: "What is the recommended warm-up duration before exercise?",
        a: "5 minutes",
        b: "10 minutes",
        c: "15 minutes",
        d: "20 minutes",
        correct: "b"
    },
    {
        question: "What is the recommended rest period between different exercise sessions per week?",
        a: "1 day",
        b: "2 days",
        c: "3 days",
        d: "No rest days needed",
        correct: "b"
    },
    {
        question: "What is the recommended rest period between sets during weightlifting?",
        a: "15 seconds",
        b: "30 seconds",
        c: "60 seconds",
        d: "120 seconds",
        correct: "c"
    },
    {
        question: "What is the recommended cool-down duration after exercise?",
        a: "5 minutes",
        b: "10 minutes",
        c: "15 minutes",
        d: "20 minutes",
        correct: "a"
    },
    {
        question: "Which muscle group does the 'bicep curl' exercise target?",
        a: "Triceps",
        b: "Quadriceps",
        c: "Biceps",
        d: "Hamstrings",
        correct: "c"
    },

];


const quiz = document.getElementById('quiz');
const submitBtn = document.getElementById('submit');
const resultDiv = document.getElementById('result');
const scoreDisplay = document.getElementById('score');
const animationContainer = document.getElementById('animation-container');
const reviewBtn = document.getElementById('review-answers');
const reviewSection = document.getElementById('review');
const reviewQuestions = document.getElementById('review-questions');
const liveScore = document.getElementById('live-score');

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

function loadQuiz() {
    const currentQuizData = quizData[currentQuestion];
    quiz.innerHTML = `
        <div class="question">${currentQuizData.question}</div>
        <ul class="options">
            <li><input type="radio" name="answer" id="a" value="a"> <label for="a">${currentQuizData.a}</label></li>
            <li><input type="radio" name="answer" id="b" value="b"> <label for="b">${currentQuizData.b}</label></li>
            <li><input type="radio" name="answer" id="c" value="c"> <label for="c">${currentQuizData.c}</label></li>
            <li><input type="radio" name="answer" id="d" value="d"> <label for="d">${currentQuizData.d}</label></li>
        </ul>
    `;
}

function getSelected() {
    const answers = document.querySelectorAll('input[name="answer"]');
    let answer = undefined;

    answers.forEach((ans) => {
        if (ans.checked) {
            answer = ans.value;
        }
    });

    return answer;
}

function showLiveScore() {
    liveScore.innerText = `Score: ${score}`;
}

function showAnimation(correct) {
    if (correct) {
        document.querySelector('.quiz-container').classList.add('correct-answer');
        setTimeout(() => {
            document.querySelector('.quiz-container').classList.remove('correct-answer');
        }, 500);
    }
}

function showCorrectAnswer() {
    const options = document.querySelectorAll('.options li');
    options.forEach((option) => {
        if (option.querySelector('input').value === quizData[currentQuestion].correct) {
            option.classList.add('correct');
        } else {
            option.classList.add('incorrect');
        }
    });
}

function showFinalAnimation(score) {
    let videoSource;
    if (score <= 3) {
        videoSource = 'angry.png'; // Add your sad animation video URL or path
    } else if (score <= 7) {
        videoSource = 'happy_animation.mp4'; // Add your happy animation video URL or path
    } else {
        videoSource = 'very_happy_animation.mp4'; // Add your very happy animation video URL or path
    }
    animationContainer.innerHTML = `<video src="${videoSource}" autoplay loop></video>`;
}

function showReview() {
    reviewQuestions.innerHTML = '';
    quizData.forEach((item, index) => {
        const userAnswer = userAnswers[index];
        const correctAnswer = item.correct;
        const status = userAnswer === correctAnswer ? 'correct' : 'incorrect';

        reviewQuestions.innerHTML += `
            <div class="review-item ${status}">
                <div class="review-question">Q${index + 1}: ${item.question}</div>
                <div class="review-answer">Your Answer: ${item[userAnswer]}</div>
                <div class="review-correct">Correct Answer: ${item[correctAnswer]}</div>
                <div class="review-status">${status.toUpperCase()}</div>
            </div>
        `;
    });
}

quiz.addEventListener('click', () => {
    const answer = getSelected();

    if (answer) {
        const correct = answer === quizData[currentQuestion].correct;
        if (correct) {
            score++;
            showAnimation(true);
        } else {
            showCorrectAnswer();
        }
        userAnswers[currentQuestion] = answer;

        currentQuestion++;
        showLiveScore();

        if (currentQuestion < quizData.length) {
            loadQuiz();
        } else {
            resultDiv.style.display = 'block';
            scoreDisplay.innerText = `Your Score: ${score} / ${quizData.length}`;
            showFinalAnimation(score);
            reviewBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }
});

submitBtn.addEventListener('click', () => {
    resultDiv.style.display = 'block';
    scoreDisplay.innerText = `Your Score: ${score} / ${quizData.length}`;
    showFinalAnimation(score);
    reviewBtn.style.display = 'block';
});

reviewBtn.addEventListener('click', () => {
    reviewSection.style.display = 'block';
    showReview();
});

loadQuiz();
showLiveScore();

// Example function to handle answer selection
function handleAnswerSelection(isCorrect) {
    const quizContainer = document.querySelector('.quiz-container');

    if (isCorrect) {
        quizContainer.classList.remove('incorrect-bg');
    } else {
        quizContainer.classList.add('incorrect-bg');
    }
}

// Example usage
document.querySelectorAll('.options li').forEach(option => {
    option.addEventListener('click', function() {
        const isCorrect = option.classList.contains('correct');
        handleAnswerSelection(isCorrect);
    });
});
// Function to handle answer selection
function handleAnswerSelection(isCorrect) {
    const quizContainer = document.querySelector('.quiz-container');

    if (isCorrect) {
        quizContainer.classList.remove('incorrect-bg');
    } else {
        quizContainer.classList.add('incorrect-bg');
    }
}

// Function to load the next question
function loadNextQuestion() {
    const quizContainer = document.querySelector('.quiz-container');
    
    // Remove the incorrect background class when loading the next question
    quizContainer.classList.remove('incorrect-bg');
    
    // Logic to load the next question goes here
    // For example, you might update the content of the quiz container
}

// Example usage
document.querySelectorAll('.options li').forEach(option => {
    option.addEventListener('click', function() {
        const isCorrect = option.classList.contains('correct');
        handleAnswerSelection(isCorrect);
        
        // Simulate loading the next question after a delay (e.g., 2 seconds)
        setTimeout(loadNextQuestion, 2000);
    });
});

