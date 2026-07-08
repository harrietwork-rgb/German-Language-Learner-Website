const question = document.getElementById("question");
const answer = document.getElementById("answer");
const feedback = document.getElementById("feedback");
const button = document.getElementById("checkButton");

button.addEventListener("click", checkAnswer);

answer.addEventListener("keydown", function(e){

    if(e.key === "Enter"){
        checkAnswer();
    }

});

function checkAnswer(){

    if(answer.value.trim() === ""){

        feedback.textContent = "Please type an answer.";

        return;

    }

    feedback.textContent =
        "Quiz logic coming in Step 2.";

}