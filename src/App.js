import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/authentication/AuthContext";
import PrivateRoute from "./components/authentication/PrivateRoute";
import { nanoid } from "nanoid";
import Auth from "./components/authentication/Auth";
import Home from "./components/Home/Home"; 
import Notelist from "./components/Notelist/Notelist";
import Search from "./components/Search/Search";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import Headerr from "./components/Header/Headerr";
import "./styles.css";

export default function App() {
  const [list, setList] = useState(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    return savedNotes;
  });

  // Ensure "General" is always present in categories
  const [categories, setCategories] = useState(() => {
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    return savedCategories.includes("General") ? savedCategories : ["General", ...savedCategories];
  });

  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem("selectedCategory") || "All";
  });

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

  // Handle adding a note
  const handleText = (txt, category) => {
    let data = new Date();
    let assignedCategory = category === "All" || !category ? "General" : category; // Default to "General"

    let newText = {
      id: nanoid(),
      text: txt,
      category: assignedCategory,
      date: data.toLocaleDateString(),
      time: `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
    };

    setList([...list, newText]);

    // Ensure "General" category is always available
    if (!categories.includes("General")) {
      setCategories(["General", ...categories]);
    }
  };

  // Handle note deletion
  const handleDelete = (id) => {
    setList((prevList) => prevList.filter((note) => note.id !== id));
  };

  // Handle category deletion
  const handleDeleteCategory = (category) => {
    if (category === "General") return; // Prevent deletion of "General"

    const updatedNotes = list.filter((note) => note.category !== category);
    setList(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    const updatedCategories = categories.filter((cat) => cat !== category);
    setCategories(updatedCategories);
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/notepad"
            element={
              <PrivateRoute>
                <div className="App">
                
                  <CategoryFilter
                    categories={categories}
                    setCategories={setCategories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    handleDeleteCategory={handleDeleteCategory}
                  />
                  <Search setSearchText={setSearchText} />
                  <Notelist
                    textFun={handleText}
                    nodeList={list}
                    handleDelet={handleDelete}
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

