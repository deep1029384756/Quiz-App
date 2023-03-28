let question = document.querySelector("#question")
let optiongrp = document.querySelector(".option-group");
let option1 = document.querySelector("#option1l")
var question_num = document.querySelector(".qnum")
var prevbtn = document.querySelector(".prev")
let question_number = 0;
let score = 0;
question_num.textContent= question_number+1;
let arr = new Array();
async function getData(){
    const result = await fetch("https://opentdb.com/api.php?amount=10&category=27&difficulty=medium")
    const data = await result.json();
    getQuestion(data.results[question_number]);
    console.log(data)
    arr = data.results;
}
getData();
function getQuestion(data){
        //for correct answers
           question.textContent = data.question;
           let option = document.createElement("div")
           option.classList.add("option");
           optiongrp.appendChild(option);
           let input = document.createElement("input")
           input.setAttribute("type","radio");
           input.setAttribute("name","rad");
           input.setAttribute("id","option1");
           input.setAttribute("class","op");
           option.appendChild(input)
           let label = document.createElement("label")
           label.setAttribute("for","option1");
           option.appendChild(label)
           label.textContent = data.correct_answer;
        // for incorrct answers
        data.incorrect_answers.forEach(el=>{
            let option = document.createElement("div")
            option.classList.add("option");
            optiongrp.appendChild(option);
            let input = document.createElement("input")
            input.setAttribute("type","radio");
            input.setAttribute("name","rad");
            input.setAttribute("id","option1");
            input.setAttribute("class","op");
            option.appendChild(input)
            let label = document.createElement("label")
            label.setAttribute("for","option1");
            option.appendChild(label)
            label.textContent = el;
        })
}

var options = Array.from(document.querySelectorAll(".op"));
console.log(options)
var nextbtn = document.querySelector(".nextbtn");
// next
function next(){
    prevbtn.classList.add("visible");
    console.log(options)
   options.forEach(ele=>{
    if(ele.checked){
        if(ele.nextElementSibling.textContent == arr[question_number].correct_answer){
            score++;
        }
        ele.checked = false;
    }
})
    time = 15;
    question_number++;
    question_num.textContent= question_number+1;
    if(question_number == arr.length-1){
        nextbtn.textContent = "Submit"
    }
    if(question_number == arr.length) {
        submit()
    }
    // remove all div
    optiongrp.innerHTML = ""
    getQuestion(arr[question_number])
}

// prev
prevbtn.addEventListener('click',()=>{
    time = 16;
    question_num.textContent= question_number;
    // if(question_number == 0){
    //     content.classList.add("hide");
    //     start.classList.add('visible')
    // }
    optiongrp.innerHTML = ""
    getQuestion(arr[question_number])
    question_number--;
    if(question_number == 0){
        prevbtn.classList.remove("visible")
    }
})
// score
var setscore = document.querySelector(".score")
//start button
var start = document.querySelector(".startsec");
var content = document.querySelector(".content");
start.addEventListener('click', ()=>{
content.classList.add("visible");
start.classList.add('hide')
starttime();
})
//timer
let time = 15;
var timer = document.querySelector(".timer")
timer.textContent = time;
function starttime(){
    setInterval(()=>{
        time--;
        timer.textContent = time;
        if(time == 0){ 
            // time = 15
            next();
        }
    },1000);
}
    


// submisssion
var submitbtn = document.querySelector(".submitbtn")
var submitsection = document.querySelector(".submit")
function submit(){
    setscore.textContent = score;
submitsection.classList.add("vis")
content.classList.remove("visible");
}


