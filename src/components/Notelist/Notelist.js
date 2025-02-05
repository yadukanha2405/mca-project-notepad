import React from "react";
import Input from "../Input/Input";
import Note from "../Note/Note";
import "../Notelist/notelist.css";

const Notelist = ({ textFun, nodeList, handleDelet, searchText, selectedCategory, categories, setSelectedCategory }) => {
  return (
    <div className="main">
      <div className="notelist-container">
        {nodeList
          .filter((note) => selectedCategory === "All" || note.category === selectedCategory)
          .filter((val) => (searchText === "" ? true : val.text.toLowerCase().includes(searchText.toLowerCase())))
          .map((list, inx) => (
            <Note
              key={inx}
              element={list.text}
              category={list.category}
              id={list.id}
              data={list.data}
              time={list.time}
              handleDelet={handleDelet}
            />
          ))}

        {/* Pass selectedCategory to Input */}
        <Input textFun={textFun} categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </div>
    </div>
  );
};

export default Notelist;

