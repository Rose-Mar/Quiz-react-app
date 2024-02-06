import React from "react";

interface ResultSummaryProps {
  correctAnswers: number;
  totalQuestions: number;
  gamesHistory: {
    correctAnswers: number;
    incorrectAnswers: number;
    totalPoints: number;
  }[];
  onRestart: () => void;
}

const ResultSummary: React.FC<ResultSummaryProps> = ({
  gamesHistory,
  onRestart,
}) => {
  const lastGame = gamesHistory[gamesHistory.length - 1];

  const summaryStyle: React.CSSProperties = {
    backgroundColor: "#f8f9fa",
    border: "1px solid #ced4da",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center",
    margin: "16px auto",
    maxWidth: "400px",
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "16px",
    transition: "background-color 0.3s ease-in-out",
  };

  return (
    <div style={summaryStyle}>
      <h2>Game Over!</h2>
      {lastGame ? (
        <>
          <p>Correct Answers: {lastGame.correctAnswers}</p>
          <p>Incorrect Answers: {lastGame.incorrectAnswers}</p>
          <p>Total Points: {lastGame.totalPoints}</p>
        </>
      ) : (
        <p>No game history available.</p>
      )}
      <button style={buttonStyle} onClick={onRestart}>
        Restart
      </button>
    </div>
  );
};

export default ResultSummary;
