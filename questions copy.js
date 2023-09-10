const questions = [
    {
        question: "How many Yell leaders are there and what are their grades?",
        answers:[
            {text: "There are 4 seniors", correct:false},
            {text:"There are 3 seniors and 1 junior", correct:false},
            {text:"There are 3 seniors and 2 juniors", correct:true},
            {text:"There are 2 seniors and 3 juniors", correct:false}
        ]
    },
    {
        question: "What does the MSC stand for?",
        answers:[
            {text: "Memorial Student Center", correct:true},
            {text:"Memorial Student Convention", correct:false},
            {text:"Monumental Student Center", correct:false},
            {text:"Monumental Student Convention", correct:false}
        ]
    },
    {
        question: "Ranked by USA Today, the Aggie War Hymn was once ranked as the ____ best college fight song?",
        answers:[
            {text: "3rd", correct:false},
            {text:"2nd", correct:false},
            {text:"10th", correct:false},
            {text:"1st", correct:true}
        ]
    },
    {
        question: "The Fightin’ Texas Aggie Band is the largest military marching band in _______.",
        answers:[
            {text: "Texas", correct:false},
            {text:"South", correct:false},
            {text:"Southwest", correct:false},
            {text:"United States", correct:true}
        ]
    },
    {
        question: "With the first line of the Aggie War Hymn, how is the word after “Hullabaloo” spelled?",
        answers:[
            {text: "Caneck", correct:true},
            {text:"Connect", correct:false},
            {text:"Connack", correct:false},
            {text:"Cannect", correct:false}
        ]
    },
    {
        question: "Who is the original 12th Man?",
        answers:[
            {text: "Joe Boyd", correct:false},
            {text:"E. King Gill", correct:true},
            {text:"Kevin Murray", correct:false},
            {text:"Bucky Richardson", correct:false}
        ]
    },
    {
        question: "Where are the 70 trees that honor the 70 Aggies who fought in WWI located?",
        answers:[
            {text: "Around Kyle Field", correct:false},
            {text:"In Aggie Park", correct:false},
            {text:"Around Simpson Drill Field", correct:true},
            {text:"Around the campus border", correct:false}
        ]
    },
    {
        question: "Which day is Aggie Muster held on?",
        answers:[
            {text: "March 29th", correct:false},
            {text:"April 6th", correct:false},
            {text:"April 21st", correct:true},
            {text:"May 1st", correct:false}
        ]
    },
    {
        question: "Fish Camp for incoming freshmen takes place in which city in Texas?",
        answers:[
            {text: "Palestine", correct:true},
            {text:"College Station", correct:false},
            {text:"Bryan", correct:false},
            {text:"Frankston", correct:false}
        ]
    },
    {
        question: "Which month does the Bonfire Memorial take place in?",
        answers:[
            {text: "December", correct:false},
            {text:"February", correct:false},
            {text:"January", correct:false},
            {text:"November", correct:true}
        ]
    },
    {
        question: "The term “Gig ‘Em” derived from the 1930 football game against which university?",
        answers:[
            {text: "Texas University", correct:false},
            {text:"Texas Christian University", correct:true},
            {text:"Texas Southern University", correct:false},
            {text:"Texas State University", correct:false}
        ]
    },
    {
        question: "What is not typically true regarding the thumbs-up gesture?",
        answers:[
            {text: "It is commonly done with the left hand", correct:false},
            {text:"It shows the Aggie Ring", correct:true},
            {text:"It signals the Aggie Spirit", correct:false},
            {text:"All of these are true", correct:false}
        ]
    },
    {
        question: "What ranking in the corps of Cadets is Miss Rev?",
        answers:[
            {text: "Cadet General", correct:true},
            {text:"Cadet Colonel", correct:false},
            {text:"Cadet Major", correct:false},
            {text:"Cadet Captain", correct:false}
        ]
    },
    {
        question: "Which of the following is the oldest sculpture on campus?",
        answers:[
            {text: "Sul Ross Statue", correct:true},
            {text:"Reveille Statue", correct:false},
            {text:"War Hymn Statue", correct:false},
            {text:"James Earl Rudder Statue", correct:false}
        ]
    },
    {
        question: "Which of the following are features on the Aggie Ring?",
        answers:[
            {text: "Class year is facing student", correct:false},
            {text:"13 stripes and 5 stars are on the shield at the top of the Ring", correct:false},
            {text:"Crossed flags of the U.S. and Texas", correct:false},
            {text:"All of the following are features of the Aggie Ring", correct:true}
        ]
    },
    {
        question: "In which direction is Silver Taps not played during a Silver Taps Ceremony?",
        answers:[
            {text: "North", correct:false},
            {text:"South", correct:false},
            {text:"East", correct:true},
            {text:"West", correct:false}
        ]
    },
    {
        question: "On what day does the Silver Taps ceremony take place?",
        answers:[
            {text: "Monday", correct:false},
            {text:"Tuesday", correct:true},
            {text:"Wednesday", correct:false},
            {text:"Thursday", correct:false}
        ]
    },
    {
        question: "What breed of dog is Reveille X?",
        answers:[
            {text: "Border Collie", correct:false},
            {text:"Rough Collie", correct:true},
            {text:"Bearded Collie", correct:false},
            {text:"Sheltie", correct:false}
        ]
    },
    {
        question: "In what year does an Aggie participate in the elephant walk?",
        answers:[
            {text: "Freshman", correct:false},
            {text:"Sophomore", correct:true},
            {text:"Junior", correct:false},
            {text:"Senior", correct:false}
        ]
    },
    {
        question: "What type of tree is the Century Tree?",
        answers:[
            {text: "Live Oak", correct:true},
            {text:"Spruce", correct:false},
            {text:"Birch", correct:false},
            {text:"Apple", correct:false}
        ]
    },
    {
        question: "How many years will a couple who proposed under the Century Tree remain married?",
        answers:[
            {text: "A century", correct:false},
            {text:"75 years", correct:false},
            {text:"50 years", correct:false},
            {text:"An eternity", correct:true}
        ]
    },
    {
        question: "When was the Spirit of ‘02 found?",
        answers:[
            {text: "2002", correct:false},
            {text:"1974", correct:true},
            {text:"1902", correct:false},
            {text:"1984", correct:false}
        ]
    },
    {
        question: "What year can you start to say “Whoop!”?",
        answers:[
            {text: "Freshman", correct:false},
            {text:"Sophomore", correct:false},
            {text:"Junior", correct:true},
            {text:"Senior", correct:false}
        ]
    },
    {
        question: " How many miles is the March to the Brazos walk that the Corps of Cadets does every spring as a fundraising campaign?",
        answers:[
            {text: "10", correct:false},
            {text:"15", correct:false},
            {text:"18", correct:true},
            {text:"22", correct:false}
        ]
    },
    {
        question: "What is the oldest student organization on campus, established in 1876?",
        answers:[
            {text: "Corps of Cadets", correct:true},
            {text:"SEC", correct:false},
            {text:"Student Council", correct:false},
            {text:"Association of Former Students", correct:false}
        ]
    }
];

const questElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("question-score")

let currentQuestionIndex = 0;
const searchParams = new URLSearchParams(window.location.search);
let score = searchParams.get("score");

function triggerGame() {
    window.open(`http://127.0.0.1:5500/game.html?score=${score}`,"_self");
}

function startQuiz(){
    // currentQuestionIndex = currentQuestionIndex % 25;
    // if(currentQuestionIndex >= question.length){
    //     currentQuestionIndex = 0;
    // }else{
    //     currentQuestionIndex = currentQuestionIndex;
    // }
    //score = 0;
    scoreElement.innerHTML = `Score: ${Math.floor(score)}`;
    currentQuestionIndex = Math.floor(score/100) % 25;
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuest = questions[currentQuestionIndex];
    questElement.innerHTML = currentQuest.question;
    currentQuest.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        // scoreElement.innerHTML = `Score: ${score}`;
        nextButton.innerHTML = "<a onclick='triggerGame()'>Keep Going!</a>";
        nextButton.style.display = "block";
    }else{
        selectedBtn.classList.add("incorrect");
        score=0;
        nextButton.innerHTML = "<a href='http://localhost:5500/game.html'>Start Over</a>";
        nextButton.style.display = "block";
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    }); 
    //nextButton.innerHTML = "Return";
}

// function showScore(){
//     //resetState();
//     questionElement.innerHTML = 'Return!';
//     nextButton.innerHTML = "Play Again";
//     nextButton.style.display = "block";
// }

// function handleNextButton(){
//     // currentQuestionIndex++;
//     // if(currentQuestionIndex < questions.length){
//     //     showQuestion();
//     // }else{
//     //     showScore();
//     // }
// }

nextButton.addEventListener("click", ()=>{
    currentQuestionIndex++;

    //showQuestion();
    // test
    // currentQuestionIndex++;
    // questionElement.innerHTML = 'Test text';
    // nextButton.innerHTML = "Play Again";
    // nextButton.style.display = "block";

    // if(currentQuestionIndex < questions.length){
    //     handleNextButton();
    // }else{
    //     startQuiz();
    // }
})

startQuiz();