import React, { useState } from "react";
import Modal from "./Modal";
import QuestionData from "../types";

interface AddQuestionModalProps {
  onClose: () => void;
  onAddQuestion: (question: QuestionData) => void;
}

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  onClose,
  onAddQuestion,
}) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAddQuestion = () => {
    if (newQuestion.trim() === "" || correctAnswer.trim() === "") {
      setError("Both question and correct answer are required.");
      return;
    }

    onAddQuestion({ question: newQuestion, correctAnswer });
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2>Add New Question</h2>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <label style={{ marginBottom: "10px" }}>
        Question:
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          style={inputStyle}
        />
      </label>

      <label style={{ marginBottom: "10px" }}>
        Correct Answer:
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          style={inputStyle}
        />
      </label>

      <button style={buttonStyle} onClick={handleAddQuestion}>
        Add Question
      </button>
    </Modal>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ced4da",
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  background: "#4caf50",
  color: "#fff",
  padding: "10px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  width: "100%",
};

export default AddQuestionModal;
