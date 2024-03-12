import React, { useState } from "react";
import filledBookmarkIco from "../icons/bookmark-filled-white.svg";
import "../css/Nav.css";
import Button from "./Button";

export default function Nav(props) {
  return (
    <nav>
      <p className="logo">Advised</p>
      <Button
        style="no-text"
        click={() => props.toggle()}
        text={filledBookmarkIco}
      />
    </nav>
  );
}
