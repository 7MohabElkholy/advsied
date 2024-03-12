import React, { useEffect, useState } from "react";
import "../css/Advice.css";
import Button from "./Button";
import bookMarkIco from "../icons/bookmark.svg";
import filledBookMarkIco from "../icons/bookmark-filled.svg";

export default function Advice() {
  const [jsx, setJsx] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adviceJsx, setAdviceJsx] = useState("");
  const [timesCalled, setTimesCalled] = useState(1);
  const [bookmarkIcon, setBookmarkIcon] = useState(bookMarkIco);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.adviceslip.com/advice`;
        const response = await fetch(url, { cache: "no-store" }); // Specify 'no-store' option to disable cache
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData.slip);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [timesCalled]);

  useEffect(() => {
    switch (true) {
      case loading:
        // setJsx(<p>Loading...</p>);
        // console.log("looading");
        break;

      case error:
        setJsx(<p>Error: {error.message}</p>);
        break;

      default:
        setJsx(adviceJsx);
        break;
    }
  }, [loading, error, data, adviceJsx]);

  useEffect(() => {
    if (data) {
      setAdviceJsx(<p>{data.advice}</p>);
    }
  }, [data]);

  function generateAdvice() {
    setLoading(true);
    setTimesCalled((prev) => prev + 1);
  }

  function bookmarkHandleing() {
    if (data) {
      const currentAdviceId = data.id;
      const savedAdviceIds =
        JSON.parse(localStorage.getItem("savedAdviceIds")) || [];
      const index = savedAdviceIds.indexOf(currentAdviceId);
      if (index === -1) {
        savedAdviceIds.push(currentAdviceId);
        setBookmarkIcon(filledBookMarkIco);
      } else {
        savedAdviceIds.splice(index, 1);
        setBookmarkIcon(bookMarkIco);
      }
      localStorage.setItem("savedAdviceIds", JSON.stringify(savedAdviceIds));
    }
  }

  useEffect(() => {
    const savedAdviceIds =
      JSON.parse(localStorage.getItem("savedAdviceIds")) || [];
    if (data && savedAdviceIds.includes(data.id)) {
      setBookmarkIcon(filledBookMarkIco);
    } else {
      setBookmarkIcon(bookMarkIco);
    }
  }, [data]);

  return (
    <div className="advice-main-contanier">
      <div className="advice-info">
        <p className="timesGentrated">Advice generated: {timesCalled}</p>
        <Button
          style="no-text"
          text={bookmarkIcon}
          click={() => bookmarkHandleing()}
        />
      </div>
      <div className="advice-container">{jsx}</div>
      <Button
        style="normal"
        text={loading ? "Loading..." : "Generate"}
        click={() => generateAdvice()}
        disable={loading}
      />
    </div>
  );
}
