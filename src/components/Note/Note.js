import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"
import "../Note/note.css";
import React from "react";

const Note = ({ element, category, id, handleDelet, data, time, myKey }) => {
  return (
    <div className="container" key={myKey}>
      {/* Category on Top */}
      <div className="note-category">{category}</div>
      
      <p>{element}</p>
      
      <div className="child">
        <div>
          <small>{time}</small>
          <small className="data">{data}</small>
        </div>
        <IconButton onClick={() => handleDelet(id)} >
        <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Note;
