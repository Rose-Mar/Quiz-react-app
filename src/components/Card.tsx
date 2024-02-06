import React, { useState, useEffect } from "react";

interface Props {
  questionData: {
    question: string;
    correctAnswer: string;
  };
  commonOptions: string[];
  selectedAnswer: string | null;
  onAnswerSelected: (answer: string) => void;
}

const Card = ({
  questionData,
  commonOptions,
  selectedAnswer,
  onAnswerSelected,
}: Props) => {
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    const optionsWithoutCorrectAnswer = commonOptions.filter(
      (option) => option !== questionData.correctAnswer
    );

    let randomOptions: string[] = [];

    if (
      optionsWithoutCorrectAnswer.length >= 3 &&
      shuffledOptions.length === 0
    ) {
      const randomIndices = new Set<number>();
      while (randomIndices.size < 3) {
        const randomIndex = Math.floor(
          Math.random() * optionsWithoutCorrectAnswer.length
        );
        randomIndices.add(randomIndex);
      }
      randomOptions = Array.from(randomIndices).map(
        (index) => optionsWithoutCorrectAnswer[index]
      );

      const shuffled = [...randomOptions, questionData.correctAnswer].sort(
        () => Math.random() - 0.5
      );
      setShuffledOptions(shuffled);
    } else if (shuffledOptions.length === 0) {
      setShuffledOptions([
        ...optionsWithoutCorrectAnswer,
        questionData.correctAnswer,
      ]);
    }
  }, [commonOptions, questionData.correctAnswer, shuffledOptions]);

  const handleAnswerClick = (answer: string) => {
    onAnswerSelected(answer);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div>
        <h3 style={{ marginBottom: "16px", textAlign: "center" }}>
          {questionData.question}
        </h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {shuffledOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleAnswerClick(option)}
              style={{
                cursor: "pointer",
                backgroundColor: selectedAnswer === option ? "#3498db" : "#fff",
                color: selectedAnswer === option ? "#fff" : "#333",
                borderBottom: "1px solid #ccc",
                padding: "10px",
                transition:
                  "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
