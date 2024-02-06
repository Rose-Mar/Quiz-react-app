import React, { useState } from "react";
import Button from "./Button";

interface StartScreenProps {
  onStartGame: (numberOfQuestions: number) => void;
  onAddQuestion: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({
  onStartGame,
  onAddQuestion,
}) => {
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(4);

  const handleStartGame = () => {
    onStartGame(numberOfQuestions);
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        border: "1px solid #ced4da",
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "auto",
        marginTop: "50px",
      }}
    >
      <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
        Welcome to the Quiz Game!
      </h2>
      <p style={{ fontSize: "16px", marginBottom: "10px" }}>
        Choose the number of questions:
      </p>
      <input
        type="number"
        value={numberOfQuestions}
        onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "20px",
          borderRadius: "4px",
          border: "1px solid #ced4da",
          boxSizing: "border-box",
        }}
      />
      <Button
        onClick={handleStartGame}
        color="primary"
        style={{ width: "100%", marginTop: "10px" }}
      >
        Start Game
      </Button>
      <Button
        onClick={onAddQuestion}
        color="secondary"
        style={{ width: "100%", marginTop: "10px" }}
      >
        Add Question
      </Button>
    </div>
  );
};

export default StartScreen;
