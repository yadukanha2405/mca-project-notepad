// import React, { useState } from "react";
// import { nanoid } from "nanoid";
// import Notelist from "./components/Notelist/Notelist";
// import Search from "./components/Search/Search";
// import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
// import "./styles.css";

// export default function App() {
//   // const [list, setList] = useState([]);
//   const [list, setList] = useState(() => {
//     const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
//     return savedNotes;
//   });
  
//   const [searchText, setSearchText] = useState("");
//   const [categories, setCategories] = useState(["General"]); // Default category
//   const [selectedCategory, setSelectedCategory] = useState("All"); // Default to "All"
  

//   // const handleText = (txt, category) => {
//   //   let data = new Date();
//   //   let newText = {
//   //     id: nanoid(),
//   //     text: txt,
//   //     category: category === "All" ? "General" : category, // Ensure "General" is used instead of "All"
//   //     date: data.toLocaleDateString(),
//   //     time: `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
//   //   };
//   //   setList([...list, newText]);
//   // };
  

//   // const handleDelet = (id) => {
//   //   setList(list.filter((val) => val.id !== id));
//   // };

//   const handleText = (txt, category) => {
//     let data = new Date();
//     let newText = {
//       id: nanoid(),
//       text: txt,
//       category: category === "All" ? "General" : category, 
//       date: data.toLocaleDateString(),
//       time: `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
//     };
//     const updatedList = [...list, newText];
//     setList(updatedList);
//     localStorage.setItem("notes", JSON.stringify(updatedList)); // Save to LocalStorage
//   };
  
//   const handleDelet = (id) => {
//     const updatedList = list.filter((val) => val.id !== id);
//     setList(updatedList);
//     localStorage.setItem("notes", JSON.stringify(updatedList)); // Save updated list
//   };
  

//   return (
//     <div className="App">
//       {/* Category Filter */}
//       <CategoryFilter 
//         categories={categories} 
//         setCategories={setCategories} 
//         selectedCategory={selectedCategory} 
//         setSelectedCategory={setSelectedCategory} 
//       />

//       {/* Search Bar */}
//       <Search setSearchText={setSearchText} />

//       {/* Notes List */}
//       <Notelist 
//         textFun={handleText} 
//         nodeList={list} 
//         handleDelet={handleDelet} 
//         searchText={searchText} 
//         selectedCategory={selectedCategory} 
//         categories={categories}
//         setSelectedCategory={setSelectedCategory}
//       />
//     </div>
//   );
// }


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

  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState(["General"]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(list));
  }, [list]);

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
