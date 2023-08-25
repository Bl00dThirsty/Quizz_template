const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const timeCount = quizBox.querySelector(".timer .timer_sec"); 
const timeLine = quizBox.querySelector(".quiz-header .time_line");
const result_box = document.querySelector(".result_box");//interface pour afficher le score

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    result_box.classList.add('active');
    

    showQuestions(0);
    questionCounter(1);
    headerScore();
    startTimer(15);
    startTimerLine(0);
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;
let time;
let counter;
let timeValue = 15;
let widthValue = 0;


const nextBtn = document.querySelector('.next-btn');
const restart_quiz = result_box.querySelector(".button .restart")
const quit_quiz = result_box.querySelector(".button .quit")

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1){
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextBtn.classList.remove('active');
        //nextBtn.style.display = "none";
    }
    else {
        console.log('Question complétée');
        showResultBox();
    }
    
}




const optionList = document.querySelector('.option-list');

// revue des questions et options des listes
function showQuestions(index) {
    const questionText = document.querySelector('.question-text')
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

optionList.innerHTML = optionTag;

const option = document.querySelectorAll('.option');
for (let i = 0; i < option.length; i++){
    option[i].setAttribute('onclick', 'optionSelected(this)');
}
}
"########################################################################################################"

//====================================OPTION SELECTED=====================================================

"#########################################################################################################"

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    

    if (userAnswer == correctAnswer) {
        console.log('reponse correcte');
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }
    else {
        console.log('reponse incorrecte');
        answer.classList.add('incorrect');
// si la reponse est fausse selectionner automatiquement la bonne réponse
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

// si l'utilisateur a selectionné une question, desactiver le reste
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }
    
    nextBtn.classList.add('active')

   // nextBtn.style.display = "block";//si l'utilisateur clique sur une option, le bouton 'suivant' reaparait
    

}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} sur ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.head-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox(){ //box pour afficher le score du candidat
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.remove('active');
    result_Box.classList.add('active');
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 4){
       let scoreTag = "<span>Felicitation, vous avez reussi le test avec la note de "+ userScore +" sur "+ questions.length +"</span>";
       scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = "<span>Desolez, vous n'avez pas reussi le test votre note est de "+ userScore +" sur "+ questions.length +"</span>";
        scoreText.innerHTML = scoreTag;   
    }
    
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;

        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
       }
       /// if(time < 0){
           /// nextBtn.style.display = "block";//si le temp est ecouler le bouton suivant reaparait
        ///}
      

    }

}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 580){
            clearInterval(counterLine);
        }
    }

}