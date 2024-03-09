const questions=[
    {
        question: "Which country is the largest producer of coffee in the world?",
        answers: [
            { text: "Brazil", correct: true},
            { text: "Colombia", correct: false},
            { text: "China", correct: false},
            { text: "Vietnam", correct: false},
        ]
    },
    {
        question: "What is the national language of Malaysia?",
        answers: [
            { text: "Malay", correct: true},
            { text: "English", correct: false},
            { text: "Mandarin", correct: false},
            { text: "Tamil", correct: false},
        ]
    },
    {
        question: "What is the capital city of the United States?",
        answers: [
            { text: "Chicago", correct: false},
            { text: "Washington, D.C.", correct: true},
            { text: "New York City", correct: false},
            { text: "Los Angeles", correct: false},
        ]
    },
    {
        question: "What is the name of Queen Elizabeth II's husband, who held the title of Duke of Edinburgh until his passing in April 2021?",
        answers: [
            { text: "Prince Charles", correct: false},
            { text: "Prince William", correct: false},
            { text: "Prince Philip", correct: true},
            { text: "Prince Andrew", correct: false},
        ]
    },
    {
        question: "Which company developed the Android operating system for smartphones and tablets?",
        answers: [
            { text: "Apple", correct: false},
            { text: "Samsung", correct: false},
            { text: "Microsoft", correct: false},
            { text: "Google", correct: true},
        ]
    },
    {
        question: "Which Chinese city is famous for its giant panda research and breeding base?",
        answers: [
            { text: "Bei Jing", correct: false},
            { text: "Xi An", correct: false},
            { text: "Wu Han", correct: false},
            { text: "Cheng Du", correct: true},
        ]
    },
    {
        question: "Mount Fuji, an iconic symbol of Japan, is located on which island?",
        answers: [
            { text: "Hokkaido", correct: false},
            { text: "Honshu", correct: true},
            { text: "Kyoto", correct: false},
            { text: "Osaka", correct: false},
        ]
    },
    {
        question: "Which country has the highest total GDP in Asia?",
        answers: [
            { text: "Japan", correct: false},
            { text: "South Korea", correct: false},
            { text: "China", correct: true},
            { text: "Singapore", correct: false},
        ]
    },
    {
        question: "Matcha is a type of powdered green tea originating from which country?",
        answers: [
            { text: "Japan", correct: false},
            { text: "Vietnam", correct: false},
            { text: "India", correct: false},
            { text: "China", correct: true},
        ]
    },
    {
        question: "Who is the leader of the Kpop girl group - aespa?",
        answers: [
            { text: "Karina", correct: true},
            { text: "Winter", correct: false},
            { text: "Giselle", correct: false},
            { text: "Ning Ning", correct: false},
        ]
    },
]

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    })
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! <span id="credit">by TYP</span>`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
