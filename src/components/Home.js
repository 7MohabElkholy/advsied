import React, { useState } from "react";
import Advice from "./Advice";
import Nav from "./Nav";
import Bookmarked from "./Bookmarked";
import Footer from "./Footer";

export default function Home() {
  const [currentPage, setCurrtentPage] = useState("advice");

  function toggleCurrnetPage() {
    setCurrtentPage((prev) => {
      if (prev === "bookmarked") {
        return "advice";
      } else {
        return "bookmarked";
      }
    });
  }

  return (
    <>
      <Nav toggle={() => toggleCurrnetPage()} />
      {currentPage === "advice" ? <Advice /> : <Bookmarked />}
      <Footer />
    </>
  );
}
