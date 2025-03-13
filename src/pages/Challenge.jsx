import React, { useState } from "react";
import questionsData from "../questions.json";
import Progress from "../components/Progress";
import Button from "../components/Button";
import ScoreIndicator from "../components/ScoreIndicator";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {!quizStarted ? (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to the Challenge
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Select a difficulty level to begin:
          </p>

          <div className="flex justify-center mb-6 space-x-2 text-3xl">
            {[1, 2, 3].map((level) => (
              <span
                key={level}
                className={`cursor-pointer transition-colors ${
                  selectedDifficulty >= level
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                onClick={() => handleDifficultySelect(level)}
              >
                &#9733;
              </span>
            ))}
          </div>

          <button
            className={`w-full p-3 rounded-md text-lg font-medium transition-all ${
              selectedDifficulty
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            onClick={startQuiz}
            disabled={!selectedDifficulty}
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
          <Progress
            current={currentQuestion + 1}
            total={filteredQuestions.length}
          />

          <div className="mb-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Question {currentQuestion + 1} / {filteredQuestions.length}
            </h2>

            <div className="flex justify-center mb-2 text-2xl">
              {[1, 2, 3].map((level) => (
                <span
                  key={level}
                  className={`${
                    selectedDifficulty >= level
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  &#9733;
                </span>
              ))}
            </div>

            <p className="text-gray-600">
              {filteredQuestions[currentQuestion].category}
            </p>
          </div>

          <p className="text-lg font-semibold text-gray-700 mb-6">
            {filteredQuestions[currentQuestion].question}
          </p>

          <div className="grid gap-3">
            {filteredQuestions[currentQuestion].incorrect_answers
              .concat(filteredQuestions[currentQuestion].correct_answer)
              .sort()
              .map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-3 rounded-md border text-lg font-medium transition-all ${
                    selectedOption === option
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
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
          <div className="my-10">
            {/* <p className="text-center text-gray-600 mt-4 text-lg font-medium">
              Score: {((score / filteredQuestions.length) * 100).toFixed(1)}%
            </p> */}
            <ScoreIndicator current={score} total={filteredQuestions.length} />
            {/* <Progress current={score} total={filteredQuestions.length} /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
