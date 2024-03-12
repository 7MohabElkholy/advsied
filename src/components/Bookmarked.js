import React, { useEffect, useState } from "react";
import Button from "./Button";
import filledBookmarkIco from "../icons/bookmark-filled.svg";

export default function Bookmarked() {
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [bookmarkedData, setBookmarkedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedAdviceIds =
      JSON.parse(localStorage.getItem("savedAdviceIds")) || [];
    setBookmarkedIds(savedAdviceIds);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const bookmarkedDataArray = [];
      for (const id of bookmarkedIds) {
        try {
          const url = `https://api.adviceslip.com/advice/${id}`;
          const response = await fetch(url, { cache: "no-store" });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const jsonData = await response.json();
          bookmarkedDataArray.push(jsonData.slip);
        } catch (error) {
          setError(error);
        }
      }
      setBookmarkedData(bookmarkedDataArray);
      setLoading(false);
    };

    fetchData();
  }, [bookmarkedIds]);

  function removeBookmark(idToRemove) {
    const updatedBookmarkedIds = bookmarkedIds.filter(
      (id) => id !== idToRemove
    );
    setBookmarkedIds(updatedBookmarkedIds);
    localStorage.setItem(
      "savedAdviceIds",
      JSON.stringify(updatedBookmarkedIds)
    );
  }

  return (
    <div className="advice-main-contanier">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {bookmarkedData.map((advice) => (
        <div className="advice-container" key={advice.id}>
          <p>{advice.advice}</p>
          <Button
            style="no-text"
            text={filledBookmarkIco}
            click={() => removeBookmark(advice.id)}
          />
        </div>
      ))}
    </div>
  );
}
