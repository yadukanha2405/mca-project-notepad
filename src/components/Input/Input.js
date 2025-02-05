import React, { useState, useEffect } from "react";
import "../Input/input.css";

const Input = ({ textFun, categories, selectedCategory, setSelectedCategory }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    setSelectedCategory(selectedCategory);
  }, [selectedCategory, setSelectedCategory]);

  const remainingWord = 200 - input.length;

  const handleSave = () => {
    if (input.trim().length > 0) {
      const categoryToSave = selectedCategory === "All" ? "General" : selectedCategory; // Prevent "All" as category
      textFun(input, categoryToSave);
      setInput("");
    }
  };
  

  return (
    <div className="input-container">
      {/* Category Dropdown - Exclude "All" */}
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Text Input */}
      <textarea
        rows="6"
        cols="20"
        placeholder="Type here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="input-bottom">
        <small>{remainingWord}</small>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Input;
