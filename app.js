let words = [];

let currentWord = null;


// -------------------------
// Load words
// -------------------------

fetch("words.json")

.then(response => {

    if (!response.ok) {
        throw new Error("Could not load words.json");
    }

    return response.json();

})

.then(data => {

    words = loadProgress(data);

    updateStats();

    loadWord();

})

.catch(error => {

    console.error(error);

});




// -------------------------
// Page navigation
// -------------------------

function showPage(pageId){

    const pages =
    document.querySelectorAll(".page");


    pages.forEach(page => {

        page.classList.remove("active");

    });


    document
    .getElementById(pageId)
    .classList.add("active");


    // Focus answer box when entering study

    if(pageId === "study"){

        setTimeout(() => {

            document
            .getElementById("answer")
            .focus();

        },100);

    }

}




// -------------------------
// Save progress
// -------------------------

function saveProgress(){

    localStorage.setItem(
        "germanTrainerWords",
        JSON.stringify(words)
    );

}




// -------------------------
// Load saved progress
// -------------------------

function loadProgress(defaultWords){


    const saved =
    localStorage.getItem(
        "germanTrainerWords"
    );


    if(saved){

        return JSON.parse(saved);

    }


    return defaultWords;

}




// -------------------------
// Pick next word
// -------------------------

function loadWord(){


    const availableWords =
    words.filter(word =>
        word.stage !== "mastered"
    );



    if(availableWords.length === 0){

        document
        .getElementById("word")
        .textContent =
        "All words mastered 🎉";


        return;

    }




    const randomIndex =
    Math.floor(
        Math.random() *
        availableWords.length
    );



    currentWord =
    availableWords[randomIndex];



    document
    .getElementById("answer")
    .value = "";



    document
    .getElementById("feedback")
    .textContent = "";



    updateQuestion();



    document
    .getElementById("answer")
    .focus();

}




// -------------------------
// Display question
// -------------------------

function updateQuestion(){


    const wordDisplay =
    document.getElementById("word");



    const label =
    document.querySelector(".label");



    if(currentWord.stage === "recognition"){


        wordDisplay.textContent =
        currentWord.german;


        label.textContent =
        "German → English";


    }


    else {


        wordDisplay.textContent =
        currentWord.english;


        label.textContent =
        "English → German";


    }


}





// -------------------------
// Check answer
// -------------------------

function checkAnswer(){


    if(!currentWord){
        return;
    }



    const input =
    document
    .getElementById("answer")
    .value
    .trim()
    .toLowerCase();



    const feedback =
    document.getElementById("feedback");



    let correct = false;



    if(currentWord.stage === "recognition"){


        correct =
        input ===
        currentWord.english
        .toLowerCase();


    }


    else {


        correct =
        input ===
        currentWord.german
        .toLowerCase();


    }





    if(correct){


        feedback.textContent =
        "✓ Correct!";


        feedback.className =
        "correct";




        if(currentWord.stage === "recognition"){


            currentWord.recognition++;



            if(currentWord.recognition >= 3){


                currentWord.stage =
                "production";


                feedback.textContent =
                "🎯 Unlocked! Next time type German";


            }


        }


        else {


            currentWord.production++;



            if(currentWord.production >= 3){


                currentWord.stage =
                "mastered";


                feedback.textContent =
                "🎉 Word mastered!";


            }


        }




        saveProgress();

        updateStats();



        setTimeout(() => {

            loadWord();

        },1200);



    }


    else {


        feedback.textContent =
        "✗ Try again";


        feedback.className =
        "incorrect";


    }


}




// -------------------------
// Enter key = Check button
// -------------------------

document
.getElementById("answer")
.addEventListener("keydown", function(event){


    if(event.key === "Enter"){


        checkAnswer();


    }


});





// -------------------------
// Statistics
// -------------------------

function updateStats(){


    const learned =
    words.filter(word =>
        word.stage === "mastered"
    ).length;



    const learnedElement =
    document.getElementById("learned");



    if(learnedElement){


        learnedElement.textContent =
        learned;


    }


}
