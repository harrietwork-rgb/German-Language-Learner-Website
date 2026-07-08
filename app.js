let words = [];

let currentWord = null;


// Load words

fetch("words.json")

.then(response => response.json())

.then(data => {

    words = data;

    loadWord();

});





function showPage(pageId){

    const pages =
    document.querySelectorAll(".page");


    pages.forEach(page => {

        page.classList.remove("active");

    });


    document
    .getElementById(pageId)
    .classList.add("active");

}





function loadWord(){


    const availableWords =
    words.filter(word =>
        word.stage !== "mastered"
    );


    const randomIndex =
    Math.floor(
        Math.random()*availableWords.length
    );


    currentWord =
    availableWords[randomIndex];



    document
    .getElementById("answer")
    .value="";


    document
    .getElementById("feedback")
    .textContent="";



    updateQuestion();

}





function updateQuestion(){


    const wordDisplay =
    document.getElementById("word");


    if(currentWord.stage === "recognition"){


        wordDisplay.textContent =
        currentWord.german;


        document
        .querySelector(".label")
        .textContent =
        "German → English";


    }


    else {


        wordDisplay.textContent =
        currentWord.english;


        document
        .querySelector(".label")
        .textContent =
        "English → German";


    }

}





function checkAnswer(){


    const input =
    document
    .getElementById("answer")
    .value
    .trim()
    .toLowerCase();

document
.getElementById("answer")
.addEventListener("keydown", function(event){

    if(event.key === "Enter"){

        checkAnswer();

    }

});

    const feedback =
    document.getElementById("feedback");



    let correct;



    if(currentWord.stage === "recognition"){


        correct =
        input ===
        currentWord.english.toLowerCase();


    }


    else {


        correct =
        input ===
        currentWord.german.toLowerCase();


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
                "✓ Unlocked! Now type German next time";


            }


        }


        else {


            currentWord.production++;


            if(currentWord.production >=3){


                currentWord.stage =
                "mastered";


                feedback.textContent =
                "🎉 Word mastered!";


            }


        }



        setTimeout(loadWord,1200);



    }


    else {


        feedback.textContent =
        "✗ Try again";


        feedback.className =
        "incorrect";


    }


}
