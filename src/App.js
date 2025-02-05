import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import PrivateRoute from "./components/pages/PrivateRoute";
import { nanoid } from "nanoid";
import Auth from "./components/pages/Auth";
import Notelist from "./components/Notelist/Notelist";
import Search from "./components/Search/Search";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import "./styles.css";

export default function App() {
  const [list, setList] = useState(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    return savedNotes;
  });

  // Load categories and selectedCategory from localStorage or set defaults
  const [categories, setCategories] = useState(() => {
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || ["General"];
    return savedCategories;
  });

  const [selectedCategory, setSelectedCategory] = useState(() => {
    const savedCategory = localStorage.getItem("selectedCategory") || "All";
    return savedCategory;
  });

  // Define searchText and setSearchText state variables
  const [searchText, setSearchText] = useState("");

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(list));
  }, [list]);

  // Save categories to localStorage
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  // Save selectedCategory to localStorage
  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory]);

  const handleText = (txt, category) => {
    let data = new Date();
    let newText = {
      id: nanoid(),
      text: txt,
      category: category === "All" ? "General" : category,
      date: data.toLocaleDateString(),
      time: `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
    };
    setList([...list, newText]);
  };

  const handleDelet = (id) => {
    const updatedList = list.filter((val) => val.id !== id);
    setList(updatedList);
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <div className="App">
                  <CategoryFilter 
                    categories={categories} 
                    setCategories={setCategories} 
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={setSelectedCategory} 
                  />
                  <Search setSearchText={setSearchText} />
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
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
