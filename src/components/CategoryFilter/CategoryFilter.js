import React, { useState } from "react";
import "./categoryFilter.css";

const CategoryFilter = ({ categories, setCategories, selectedCategory, setSelectedCategory, handleDeleteCategory }) => {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim() !== "" && newCategory !== "All" && !categories.includes(newCategory)) {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
      setNewCategory("");
    }
  };

  const handleDelete = (category) => {
    if (window.confirm(`Are you sure you want to delete the "${category}" category?`)) {
      handleDeleteCategory(category);
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

      {/* Dynamic Category Buttons with Hover Delete Cross */}
      {categories
        .filter((category) => category !== "All") // Hide "All" from the list
        .map((category, index) => (
          <div key={index} className="category-wrapper">
            <button
              className={`category-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
            {category !== "General" && (
              <span className="delete-cross" onClick={() => handleDelete(category)}>✖</span>
            )}
          </div>
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

