import React, { useState } from "react";
import { nanoid } from "nanoid";
import Notelist from "./components/Notelist/Notelist";
import Search from "./components/Search/Search";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import "./styles.css";

export default function App() {
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState(["General"]); // Default category
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to "All"

  const handleText = (txt, category) => {
    let data = new Date();
    let newText = {
      id: nanoid(),
      text: txt,
      category: category === "All" ? "General" : category, // Ensure "General" is used instead of "All"
      date: data.toLocaleDateString(),
      time: `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
    };
    setList([...list, newText]);
  };
  

  const handleDelet = (id) => {
    setList(list.filter((val) => val.id !== id));
  };

  return (
    <div className="App">
      {/* Category Filter */}
      <CategoryFilter 
        categories={categories} 
        setCategories={setCategories} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />

      {/* Search Bar */}
      <Search setSearchText={setSearchText} />

      {/* Notes List */}
      <Notelist 
        textFun={handleText} 
        nodeList={list} 
        handleDelet={handleDelet} 
        searchText={searchText} 
        selectedCategory={selectedCategory} 
        categories={categories}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}
