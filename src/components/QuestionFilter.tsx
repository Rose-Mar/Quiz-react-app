import React, { useState } from "react";
import QuestionData from "../types";

interface QuestionFilterProps {
  onFilterChange: (filterValue: number) => void;
  questionsData: QuestionData[];
}

const QuestionFilter: React.FC<QuestionFilterProps> = ({
  onFilterChange,
  questionsData,
}) => {
  const [filterValue, setFilterValue] = useState<number>(5);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    if (!isNaN(value) && value >= 1 && value <= questionsData.length) {
      setFilterValue(value);
      onFilterChange(value);
    }
  };

  return (
    <div style={{ margin: "16px 0", textAlign: "center" }}>
      <label style={{ display: "block", marginBottom: "8px" }}>
        Number of Questions:
        <input
          type="number"
          value={filterValue}
          onChange={handleFilterChange}
          min={1}
          max={questionsData.length}
          style={{
            marginLeft: "8px",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "50px",
            textAlign: "center",
          }}
        />
      </label>
    </div>
  );
};

export default QuestionFilter;
