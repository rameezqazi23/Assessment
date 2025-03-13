import React, { useState } from "react";
import questionsData from "../questions.json";
import Progress from "../components/Progress";
import Button from "../components/Button";
import ScoreIndicator from "../components/ScoreIndicator";
import "../index.css";

const Quiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  const handleDifficultySelect = (difficultyLevel) => {
    setSelectedDifficulty(difficultyLevel);

    const difficultyMap = {
      1: "easy",
      2: "medium",
      3: "hard",
    };
    const selectedLevel = difficultyMap[difficultyLevel];

    const filtered = questionsData.filter(
      (q) => q.difficulty === selectedLevel
    );

    console.log("Filtered Questios==>", filtered);
    setFilteredQuestions(filtered);
  };

  const startQuiz = () => {
    if (selectedDifficulty) {
      setQuizStarted(true);
      setCurrentQuestion(0);
    }
  };

  const handleOptionClick = (option) => {
    console.log("Option===>", option);
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === filteredQuestions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    setSelectedOption(null);

    if (currentQuestion + 1 < filteredQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(
        `Quiz completed! Your score: ${score + 1} / ${filteredQuestions.length}`
      );
      resetQuiz();
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setSelectedDifficulty(null);
    setFilteredQuestions([]);
    setScore(0);
    setCurrentQuestion(0);
  };

  return (
    <div className="quiz-container">
      {!quizStarted ? (
        <div>
          <h2>Welcome to the Challenge</h2>
          <p>Select a difficulty level to begin:</p>

          <div className="difficulty-container">
            {[1, 2, 3].map((level) => (
              <span
                key={level}
                className={`difficulty-star ${
                  selectedDifficulty >= level ? "selected" : "unselected"
                }`}
                onClick={() => handleDifficultySelect(level)}
              >
                &#9733;
              </span>
            ))}
          </div>

          <button
            className={`button ${
              selectedDifficulty ? "start-enabled" : "start-disabled"
            }`}
            onClick={startQuiz}
            disabled={!selectedDifficulty}
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div>
          <Progress
            current={currentQuestion + 1}
            total={filteredQuestions.length}
          />
          <div className="question-container">
            <h2>
              Question {currentQuestion + 1} / {filteredQuestions.length}
            </h2>

            <div className="difficulty-container">
              {[1, 2, 3].map((level) => (
                <span
                  key={level}
                  className={`difficulty-star ${
                    selectedDifficulty >= level ? "selected" : "unselected"
                  }`}
                >
                  &#9733;
                </span>
              ))}
            </div>

            <p className="category-text">
              {filteredQuestions[currentQuestion].category}
            </p>
          </div>

          <p className="question-text">
            {filteredQuestions[currentQuestion].question}
          </p>

          <div className="answer-options">
            {filteredQuestions[currentQuestion].incorrect_answers
              .concat(filteredQuestions[currentQuestion].correct_answer)
              .sort()
              .map((option, index) => (
                <button
                  key={index}
                  className={`answer-button ${
                    selectedOption === option ? "selected" : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
          </div>
          <Button
            onClick={handleNextQuestion}
            disabled={!selectedOption}
            text={
              currentQuestion + 1 === filteredQuestions.length
                ? "Finish"
                : "Next"
            }
            selectedOption={selectedOption}
          />

          <div className="score-container">
            <ScoreIndicator current={score} total={filteredQuestions.length} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
