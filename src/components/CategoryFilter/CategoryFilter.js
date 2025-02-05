import React, { useState } from "react";
import "./categoryFilter.css";

const CategoryFilter = ({ categories, setCategories, selectedCategory, setSelectedCategory }) => {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim() !== "" && newCategory !== "All" && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  return (
    <div className="category-container">
      {/* "All" Button for Viewing All Notes */}
      <button
        className={`category-btn ${selectedCategory === "All" ? "active" : ""}`}
        onClick={() => setSelectedCategory("All")}
      >
        All
      </button>

      {/* Dynamic Category Buttons */}
      {categories.map((category, index) => (
        <button
          key={index}
          className={`category-btn ${selectedCategory === category ? "active" : ""}`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}

      {/* Input to Add New Category */}
      <div className="category-input">
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add</button>
      </div>
    </div>
  );
};

export default CategoryFilter;

