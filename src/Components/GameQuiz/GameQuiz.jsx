"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios"; // Import axios
import styles from "./GameQuiz.module.css"; // Import the CSS module

const GameQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [games, setGames] = useState([]);
  const [started, setStarted] = useState(false);
  const [randomThumbnail, setRandomThumbnail] = useState(null); // State for random thumbnail

  const questions = [
    {
      id: "genre",
      text: "What Genre Do You Prefer?",
      options: ["Action", "Adventure", "RPG", "Horror"],
    },
    {
      id: "difficulty",
      text: "Your Ideal Difficulty Level?",
      options: ["Easy", "Medium", "Hard"],
    },
  ];

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("/api/games");
        console.log(response.data); // Log the response to check the structure
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [questions[step].id]: answer });

    // Select a random game thumbnail from the array
    const randomGame = games[Math.floor(Math.random() * games.length)];
    console.log("Random Game Selected:", randomGame); // Log the selected game
    setRandomThumbnail(randomGame); // Update the random thumbnail state

    setStep(step + 1);
  };

  const Result = () => {
    const recommendedGames = games.filter((game) =>
      Object.keys(answers).every((key) => game[key] === answers[key])
    );

    return (
      <div className={styles.result}>
        <div className={styles.quiz_left}>
          <h2>Recommended Games:</h2>
          {recommendedGames.length > 0 ? (
            recommendedGames.map((game) => (
              <div key={game.id}>
                <h3>{game.name}</h3>
                <p>Genre: {game.genre}</p>
                <p>Difficulty: {game.difficulty}</p>
              </div>
            ))
          ) : (
            <p>No Games Found Matching Your Criteria</p>
          )}
        </div>
        <div className={styles.quiz_right}>
          {randomThumbnail && ( // Display the final answer's thumbnail and title
            <div className={styles.final_result}>
              <h3>Your Selected Game:</h3>
              <Image
                src={randomThumbnail.thumbnail} // Ensure this is the correct property
                alt={randomThumbnail.name}
                className={styles.thumbnail}
                width={200} // Add width
                height={300} // Add height
              />
              <p>{randomThumbnail.name}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.quiz_section}>
        {!started ? (
          <button className={styles.button} onClick={handleStart}>
            Start Quiz
          </button>
        ) : step < questions.length ? (
          <div>
            <h2 className={styles.title}>{questions[step].text}</h2>
            {questions[step].options.map((option) => (
              <button
                key={option}
                className={styles.button}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <Result />
        )}
      </div>
    </div>
  );
};

export default GameQuiz;
