const questions = [
    {
      question: "Mis on Eesti pealinn?",
      answers: ["Tallinn", "Tartu", "Narva"],
      correctAnswer: "Tallinn"
    },
    {
      question: "Mis on Eesti suurim järv?",
      answers: ["Peipsi järv", "Võrtsjärv", "Pühajärv"],
      correctAnswer: "Peipsi järv"
    },
    {
      question: "Kes on Eesti president 2025. aastal?",
      answers: ["Kersti Kaljulaid", "Alar Karis", "Jüri Ratas"],
      correctAnswer: "Alar Karis"
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let userAnswers = [];
  
  const questionElement = document.getElementById("question");
  const answersList = document.getElementById("answers");
  const feedbackElement = document.getElementById("feedback");
  const nextButton = document.getElementById("next-btn");
  const resultContainer = document.getElementById("result-container");
  const resultTableBody = document.querySelector("#result-table tbody");
  const finalScoreElement = document.getElementById("final-score");
  const personalizedMessageElement = document.getElementById("personalized-message");
  
  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersList.innerHTML = ""; // Eelnevad vastused tühistatakse
  
    currentQuestion.answers.forEach(answer => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.classList.add("answer-btn");
      button.textContent = answer;
      button.onclick = () => checkAnswer(answer);
      li.appendChild(button);
      answersList.appendChild(li);
    });
  
    feedbackElement.textContent = "";
    nextButton.style.display = "none"; // Peida nupp kuni vastus on valitud
  }
  
  function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    const feedbackText = correct ? "Õige vastus!" : `Vale vastus. Õige vastus on: ${currentQuestion.correctAnswer}`;
  
    userAnswers.push({ question: currentQuestion.question, userAnswer: selectedAnswer, correct });
  
    feedbackElement.textContent = feedbackText;
  
    // Näita nuppu "Järgmine küsimus" ainult siis, kui vastus on valitud
    nextButton.style.display = "inline-block";
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResults();  // Kui kõik küsimused on vastatud, kuvame tulemused
      nextButton.style.display = "none";  // Peida "Järgmine küsimus" nupp pärast küsimuste lõppu
    }
  }
  
  function showResults() {
    resultContainer.style.display = "block";  // Kuvame tulemuste konteineri
    let correctAnswersCount = 0;
  
    // Loo uus rida iga küsimuse tulemuse jaoks
    userAnswers.forEach(answer => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${answer.question}</td>
        <td>${answer.userAnswer}</td>
        <td>${answer.correct ? "Õige" : "Vale"}</td>
      `;
      resultTableBody.appendChild(row);
      if (answer.correct) correctAnswersCount++; // Arvuta õigete vastuste arv
    });
  
    finalScoreElement.textContent = `Teie lõppskoor on: ${correctAnswersCount} / ${questions.length}`;
  
    // Kuvage skoori põhjal isikupärastatud sõnum
    let message = "";
    if (correctAnswersCount === 3) {
      message = "Suurepärane! Oled kõik küsimused õigesti vastanud!";
    } else if (correctAnswersCount === 2) {
      message = "Tubli! Oled 2 küsimust õigesti vastanud!";
    } else {
      message = "Proovi veel! Oled saanud 1 küsimuse õigesti.";
    }
    personalizedMessageElement.textContent = message;
  
    nextButton.style.display = "none";  // Peida nupp
  }
  
  loadQuestion();
  nextButton.addEventListener("click", nextQuestion);