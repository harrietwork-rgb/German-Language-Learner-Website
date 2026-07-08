let words = [];

let currentWord = null;


// Load vocabulary

fetch("words.json")

.then(response => response.json())

.then(data => {

    words = data;

    loadWord();

});





function showPage(pageId){


    const pages =
    document.querySelectorAll(".page");


    pages.forEach(page=>{

        page.classList.remove("active");

    });


    document
    .getElementById(pageId)
    .classList.add("active");


}





function loadWord(){


    const randomIndex =
    Math.floor(Math.random()*words.length);


    currentWord =
    words[randomIndex];


    document
    .getElementById("word")
    .textContent =
    currentWord.german;


    document
    .getElementById("answer")
    .value="";


    document
    .getElementById("feedback")
    .textContent="";


}





function checkAnswer(){


    const userAnswer =
    document
    .getElementById("answer")
    .value
    .trim()
    .toLowerCase();


    const correctAnswer =
    currentWord.english
    .toLowerCase();



    const feedback =
    document.getElementById("feedback");



    if(userAnswer === correctAnswer){


        feedback.textContent =
        "✓ Correct!";


        feedback.className =
        "correct";


        setTimeout(loadWord,1000);



    } else {


        feedback.textContent =
        "✗ Correct answer: "
        + currentWord.english;


        feedback.className =
        "incorrect";


    }


}
