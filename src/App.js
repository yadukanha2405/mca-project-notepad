
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/authentication/AuthContext";
import PrivateRoute from "./components/authentication/PrivateRoute";
import { nanoid } from "nanoid";
import Auth from "./components/authentication/Auth";
import Home from "./components/Home/Home"; 
import Notelist from "./components/Notelist/Notelist";
import Search from "./components/Search/Search";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";

import "./styles.css";
import Headerr from "./components/Header/Headerr";



export default function App() {
  const [list, setList] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });

  const [categories, setCategories] = useState(() => {
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    return savedCategories.includes("General") ? savedCategories : ["General", ...savedCategories];
  });

  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem("selectedCategory") || "All";
  });

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory]);

  const handleText = (txt, category) => {
    let data = new Date();
    let assignedCategory = category === "All" || !category ? "General" : category;

    let newText = {
      id: nanoid(),
      text: txt,
      category: assignedCategory,
      date: data.toLocaleDateString(),
      time: `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
    };

    setList([...list, newText]);

    if (!categories.includes("General")) {
      setCategories(["General", ...categories]);
    }
  };

  const handleDelete = (id) => {
    setList((prevList) => prevList.filter((note) => note.id !== id));
  };

  const handleDeleteCategory = (category) => {
    if (category === "General") return;

    const updatedNotes = list.filter((note) => note.category !== category);
    setList(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    const updatedCategories = categories.filter((cat) => cat !== category);
    setCategories(updatedCategories);
  };

  return (
    <AuthProvider>
      <Router>
        <Headerr/>
        
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

