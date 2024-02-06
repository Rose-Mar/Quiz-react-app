import React, { useState, useEffect } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Card from "./components/Card";
import AddQuestionModal from "./components/AddQuestionModal";
import ResultSummary from "./components/ResultSummary";
import QuestionData from "./types";
import "./App.css";
import StartScreen from "./components/StartScreen";

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [alertVisible, setAlertVisibility] = useState(false);
  const [addQuestionModalVisible, setAddQuestionModalVisibility] =
    useState(false);
  const [gamesHistory, setGamesHistory] = useState<
    { correctAnswers: number; incorrectAnswers: number; totalPoints: number }[]
  >([]);
  const [startScreenVisible, setStartScreenVisible] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isEndGameScreenVisible, setIsEndGameScreenVisible] = useState(false);

  const [questionsData, setQuestionsData] = useState<QuestionData[]>([
    { question: "jabłko", correctAnswer: "apple" },
    { question: "dom", correctAnswer: "house" },
    { question: "kot", correctAnswer: "cat" },
    { question: "pies", correctAnswer: "dog" },
    // { question: "stół", correctAnswer: "table" },
    // { question: "krzesło", correctAnswer: "chair" },
    // { question: "samochód", correctAnswer: "car" },
    // { question: "książka", correctAnswer: "book" },
    // { question: "telefon", correctAnswer: "phone" },
    // { question: "drzewo", correctAnswer: "tree" },
    // { question: "kwiat", correctAnswer: "flower" },
    // { question: "chleb", correctAnswer: "bread" },
    // { question: "woda", correctAnswer: "water" },
    // { question: "słońce", correctAnswer: "sun" },
    // { question: "księżyc", correctAnswer: "moon" },
  ]);

  const commonOptions: string[] = Array.from(
    new Set(questionsData.map((question) => question.correctAnswer))
  );

  const [filteredQuestions, setFilteredQuestions] = useState<QuestionData[]>(
    questionsData.slice(0, 5)
  );

  const handleFilterChange = (filterValue: number) => {
    setFilteredQuestions(questionsData.slice(0, filterValue));
    setCurrentCardIndex(0);
  };

  const handleNextCard = () => {
    if (selectedAnswer !== null) {
      const currentQuestion = filteredQuestions[currentCardIndex];

      if (selectedAnswer === currentQuestion.correctAnswer) {
        setPoints((prevPoints) => prevPoints + 1);
        console.log("Current Game Result:", points);
      }

      const nextIndex = currentCardIndex + 1;

      if (nextIndex < filteredQuestions.length) {
        setCurrentCardIndex(nextIndex);
      } else {
        // Handle end of game logic here
        handleEndGame();
      }

      setSelectedAnswer(null);
      setAlertVisibility(false);
    } else {
      setAlertVisibility(true);
    }
  };

  const handleEndGame = () => {
    if (selectedAnswer !== null) {
      const currentQuestion = filteredQuestions[currentCardIndex];

      // Sprawdź, czy odpowiedź była poprawna i dodaj punkty
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setPoints((prevPoints) => prevPoints + 1);
      }

      // Pobierz najnowszą wartość stanu
      const updatedPoints =
        points + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
      const correctAnswers = updatedPoints;
      const incorrectAnswers = filteredQuestions.length - correctAnswers;
      const totalPoints = updatedPoints;

      const gameResult = {
        correctAnswers,
        incorrectAnswers,
        totalPoints,
      };

      setGamesHistory((prevHistory) => [
        ...prevHistory,
        { correctAnswers, incorrectAnswers, totalPoints },
      ]);

      // Resetuj stan gry
      setAlertVisibility(false);
      setCurrentCardIndex(0);
      setPoints(0);
      setFilteredQuestions([]);
      setIsEndGameScreenVisible(true);
      setIsGameActive(false);
    } else {
      setAlertVisibility(true);
    }
  };

  const handleRestart = (numberOfQuestions: number) => {
    setStartScreenVisible(false);
    setIsEndGameScreenVisible(false);
    setIsGameActive(true);
    setCurrentCardIndex(0);
    setPoints(0);
    setFilteredQuestions([]);
    handleFilterChange(numberOfQuestions);
  };

  const handleShowAddQuestionModal = () => {
    console.log("Before toggle:", addQuestionModalVisible);
    setAddQuestionModalVisibility((prevValue) => !prevValue);
  };

  const handleAddQuestion = (newQuestion: QuestionData) => {
    setQuestionsData((prevQuestionsData) => [
      ...prevQuestionsData,
      newQuestion,
    ]);
    setAddQuestionModalVisibility(false);
  };

  useEffect(() => {
    console.log("addQuestionModalVisible changed:", addQuestionModalVisible);
  }, [addQuestionModalVisible]);

  return (
    <div>
      {startScreenVisible && (
        <>
          <StartScreen
            onStartGame={(numberOfQuestions) =>
              handleRestart(numberOfQuestions)
            }
            onAddQuestion={handleShowAddQuestionModal}
          />
        </>
      )}

      {!startScreenVisible && isGameActive && alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>
          <strong>Please select an answer!</strong>
        </Alert>
      )}

      {!startScreenVisible && (
        <div>
          {currentCardIndex < filteredQuestions.length && (
            <Card
              key={currentCardIndex}
              questionData={filteredQuestions[currentCardIndex]}
              commonOptions={commonOptions}
              selectedAnswer={selectedAnswer}
              onAnswerSelected={(answer) => setSelectedAnswer(answer)}
            />
          )}

          {currentCardIndex < filteredQuestions.length - 1 && (
            <Button onClick={handleNextCard}>Next Card</Button>
          )}

          {currentCardIndex === filteredQuestions.length - 1 && (
            <Button onClick={handleEndGame}>End Game</Button>
          )}

          {currentCardIndex === filteredQuestions.length && (
            <Button onClick={handleShowAddQuestionModal}>Add Question</Button>
          )}

          {addQuestionModalVisible && (
            <AddQuestionModal
              onClose={() => setAddQuestionModalVisibility(false)}
              onAddQuestion={handleAddQuestion}
            />
          )}
        </div>
      )}

      {!startScreenVisible && currentCardIndex === filteredQuestions.length && (
        <ResultSummary
          correctAnswers={points}
          totalQuestions={filteredQuestions.length}
          gamesHistory={gamesHistory}
          onRestart={() => {
            setPoints(0);
            setAlertVisibility(false);
            setCurrentCardIndex(0);
            setFilteredQuestions(questionsData.slice(0, 5));
            setStartScreenVisible(true);
          }}
        />
      )}
    </div>
  );
}

export default App;
