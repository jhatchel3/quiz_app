/* when a user clicks on start quiz button */
function startQuiz() {
  $("#start").on("click", function (event) {
    renderAQuestion();
  });
}

/* Displays question number and score obtained */
function updateQuestionAndScore() {
  const html = $(`<ul>
        <li id="js-answered">Questions Number: ${NBA.currentQuestion + 1}/${
    NBA.questions.length
  }</li>
        <li id="js-score">Score: ${NBA.score}/${NBA.questions.length}</li>
      </ul>`);
  $(".question-and-score").html(html);
}

/* Displays the options for the current question */
function updateOptions() {
  let question = NBA.questions[NBA.currentQuestion];
  for (let i = 0; i < question.options.length; i++) {
    $(".js-options").append(`
          <input type = "radio" name="options" id="option${i + 1}" value= "${
      question.options[i]
    }" tabindex ="${i + 1}"> 
          <label for="option${i + 1}"> ${question.options[i]}</label> <br/>
          <span id="js-r${i + 1}"></span>
      `);
  }
}

/*displays the question*/
function renderAQuestion() {
  let question = NBA.questions[NBA.currentQuestion];
  updateQuestionAndScore();
  const questionHtml = $(`
    <div>
      <form id="js-questions" class="question-form">
        
        <fieldset>
          <div class="row question">
            <div class="col-12">
              <legend> ${question.question}</legend>
            </div>
          </div>
  
          <div class="row options">
            <div class="col-12">
              <div class="js-options"> </div>
          </div>
        </div>
      
  
        <div class="row">
          <div class="col-12">
            <button type = "submit" id="answer" tabindex="5">Submit</button>
            <button type = "button" id="next-question" tabindex="6"> Next >></button>
          </div>
        </div>
      </fieldset>
      </form>
    </div>`);
  $("main").html(questionHtml);
  updateOptions();
  $("#next-question").hide();
}

/* displays results and restart quiz button */
function displayResults() {
  let resultHtml = $(
    `<div class="results">
        <form id="js-restart-quiz">
          <fieldset>
            <div class="row">
              <div class="col-12">
                <legend>Your Score is: ${NBA.score}/${NBA.questions.length}</legend>
              </div>
            </div>
          
            <div class="row">
              <div class="col-12">
                <button type="button" id="restart"> Restart Quiz </button>
              </div>
            </div>
          </fieldset>
      </form>
      </div>`
  );
  NBA.currentQuestion = 0;
  NBA.score = 0;
  $("main").html(resultHtml);
}

/* checks whether it reached the end of questions list */
function handleQuestions() {
  $("body").on("click", "#next-question", (event) => {
    NBA.currentQuestion === NBA.questions.length
      ? displayResults()
      : renderAQuestion();
  });
}

/*checks whether the chosen option is right or wrong and displays respective message*/

function handleSelectOption() {
  $("body").on("submit", "#js-questions", function (event) {
    event.preventDefault();
    let currentQues = NBA.questions[NBA.currentQuestion];
    let selectedOption = $("input[name=options]:checked").val();
    if (!selectedOption) {
      alert("Choose an option");
      return;
    }
    let id_num = currentQues.options.findIndex((i) => i === selectedOption);
    let id = "#js-r" + ++id_num;
    $("span").removeClass("right-answer wrong-answer");
    if (selectedOption === currentQues.answer) {
      NBA.score++;
      $(`${id}`).append(`You got it right<br/>`);
      $(`${id}`).addClass("right-answer");
    } else {
      $(`${id}`).append(
        `You got it wrong <br/> The answer is "${currentQues.answer}"<br/>`
      );
      $(`${id}`).addClass("wrong-answer");
    }

    NBA.currentQuestion++;
    $("#js-score").text(`Score: ${NBA.score}/${NBA.questions.length}`);
    $("#answer").hide();
    $("input[type=radio]").attr("disabled", true);
    $("#next-question").show();
  });
}

function restartQuiz() {
  $("body").on("click", "#restart", (event) => {
    renderAQuestion();
  });
}

function handleQuizApp() {
  startQuiz();
  handleQuestions();
  handleSelectOption();
  restartQuiz();
}

$(handleQuizApp);
