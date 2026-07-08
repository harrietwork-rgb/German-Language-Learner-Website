let words = [];
let current = 0;

fetch("words.json")
  .then(r => r.json())
  .then(data => {
    words = data;
    document.getElementById("question").textContent =
      words[current].german;
  });

function checkAnswer() {
    const answer = document.getElementById("answer").value.toLowerCase();

    if(answer === words[current].english.toLowerCase()) {
        document.getElementById("result").textContent = "Correct!";
        current++;

        if(current < words.length){
            document.getElementById("question").textContent =
                words[current].german;
            document.getElementById("answer").value = "";
        }
    } else {
        document.getElementById("result").textContent = "Try again.";
    }
}
