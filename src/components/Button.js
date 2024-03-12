import React from "react";

import "../css/Button.css";

export default function Button(props) {
  return (
    <button
      disabled={props.disable}
      className={props.style}
      onClick={props.click}
    >
      {props.style === "no-text" ? <img src={props.text} /> : props.text}
    </button>
  );
}
