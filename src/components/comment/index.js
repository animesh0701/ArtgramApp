import React from "react";
import "./style.css";

export function Comment({ username, caption }) {
  return (
    <div className="comment">
      <p>
        <span style={{ fontWeight: "600", marginRight: "6px" }}>
          {username}
        </span>
        {caption}
      </p>
    </div>
  );
}
