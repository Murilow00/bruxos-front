"use client";

import { useState, useEffect } from "react";
import styles from "./TemaComponent.module.css";

export default function TemaComponent() {
  const [tema, setTema] = useState("light");

  const readThemeCookie = (name) => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split("=");
      if (key === name) return value;
    }
    return null;
  };

  const applyTheme = (newTheme) => {
    const htmlElement = document.documentElement;
    
    if (newTheme === "dark") {
      htmlElement.classList.add("dark-theme");
    } else {
      htmlElement.classList.remove("dark-theme");
    }
  };

  const toggleTheme = () => {
    const newTheme = tema === "light" ? "dark" : "light";
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    document.cookie =
      `tema=${newTheme}; expires=${expirationDate.toUTCString()}; path=/`;

    applyTheme(newTheme);
    setTema(newTheme);
  };

  useEffect(() => {
    const savedTheme = readThemeCookie("tema");

    if (savedTheme === "dark" || savedTheme === "light") {
      setTema(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme("light");
    }
  }, []);

  return (
    <button className={styles.themeButton} onClick={toggleTheme}>
      {tema === "light" ? "🌙 Escuro" : "☀️ Claro"}
    </button>
  );
}