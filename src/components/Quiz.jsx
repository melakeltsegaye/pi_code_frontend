import React, { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import {Link} from "react-router-dom"

const Quiz = () => {
  const [category, setCategory] = useState(9); // Default: General Knowledge
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // Timer (10 seconds)
  const [attempts, setAttempts] = useState(0); // Tracks user attempts

  // Load attempts from session storage on page load
  useEffect(() => {
    const savedAttempts = sessionStorage.getItem("quizAttempts");
    if (savedAttempts !== null && !isNaN(savedAttempts)) {
      setAttempts(parseInt(savedAttempts, 10));
    }
  }, []);

  // Save attempts to session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("quizAttempts", attempts);
  }, [attempts]);

  // Fetch categories from OpenDB API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        const result = await response.json();
        setCategories(result.trivia_categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch trivia questions based on selected category and store in session
  const fetchQuestions = async () => {
    if (attempts >= 3) {
      setGameOver(true);
      return;
    }
  
    setLoading(true);
    setError(null);
    setGameOver(false);
    setWon(false);
    setCurrentQuestionIndex(0);
    setTimeLeft(10);  // Reset timer

    try {
      let storedQuestions = sessionStorage.getItem("quizQuestions");
      if (storedQuestions) {
        storedQuestions = JSON.parse(storedQuestions);
        setData(storedQuestions);
      } else {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=hard&type=multiple`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch questions.");
        }
        const result = await response.json();
        const formattedQuestions = result.results.map((q) => ({
          ...q,
          answers: [...q.incorrect_answers, q.correct_answer].sort(
            () => Math.random() - 0.5
          ),
        }));

        sessionStorage.setItem("quizQuestions", JSON.stringify(formattedQuestions));
        setData(formattedQuestions);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Timer Effect
  useEffect(() => {
    if (timeLeft > 0 && !gameOver && !won) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && data.length > 0) {
      handleGameOver();
    }
  }, [timeLeft, gameOver, won, data]);

  // Handle Game Over
  const handleGameOver = () => {
    setGameOver(true);
    setAttempts(attempts + 1);
    sessionStorage.removeItem("quizQuestions"); // Reset questions so the user gets new ones next time
  };

  // Handle Answer Click
  const handleAnswerClick = (answer) => {
    if (answer === data[currentQuestionIndex].correct_answer) {
      if (currentQuestionIndex + 1 < data.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(10); // Reset timer for the next question
      } else {
        setWon(true);
      }
    } else {
      handleGameOver();
    }
  };

  return (
    <div>

      <div className="p-3">

<Link to='/'>
<FaArrowLeftLong className="text-[#371E80] text-xl" />
</Link>
      
<div className="w-full flex justify-center gap-3 pb-10 pt-14">

<div className="p-2 rounded-md bg-gray-200 border border-l-[#371E80] border-l-4 flex flex-col items-center">
<p className="font-bold text-[#371E80]">🛑 Attempts Left</p>
<p className="text-4xl font-bold">{3 - attempts}</p>
</div>

{!gameOver && !won && data.length > 0 && (
  <div className="p-2 rounded-md bg-gray-200 border border-l-[#371E80] border-l-4 flex flex-col items-center">

<p className="font-bold text-[#371E80]">⏳ Time Left</p>
<p className="text-4xl font-bold">{timeLeft}</p>
  </div>
)}

</div>
{/* Display remaining attempts */}


{/* If user has exhausted attempts, show message */}


<div className="w-full flex justify-center">
  <div className="flex md:flex-row flex-col gap-3 w-full md:w-[80%]">
    <div className="flex flex-col gap-3 border border-[#371E80] rounded-md p-3 md:w-fit w-full">

    <label className="text-center font-bold text-2xl">Select Category</label>
    
    <div className="flex flex-col gap-1 h-72 overflow-y-auto">
    {categories.slice(0, 11).map((cat) => (
    <button
      key={cat.id}
      onClick={() => setCategory(cat.id)}
      disabled={attempts >= 3}
      style={{
        margin: "5px",
        padding: "10px",
        backgroundColor: category === cat.id ? "#4CAF50" : "#008CBA",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: attempts >= 3 ? "not-allowed" : "pointer",
      }}
    >
      {cat.name}
    </button>
  ))}  
    </div>
    <button onClick={fetchQuestions} className="b2" disabled={attempts >= 3}>Get Questions</button>


    </div>
    <div className="flex flex-col gap-3 border border-[#371E80] rounded-md p-3 md:w-[70%] w-full  items-center">
      <p className="text-center font-bold text-2xl">Quiz</p>
    {loading && <p>Loading...</p>}
    {error && <p>Error: {error}</p>}
    {gameOver && <h2>❌ Game Over! Time ran out or you answered incorrectly.</h2>}
    {attempts >= 3 && <h2>❌ No more attempts left! Please try again later.</h2>}
{won && <h2>🎉 Congratulations! You won the game!</h2>}
{!gameOver && !won && data.length > 0 && (
  <div className="pt-4">
    <h2 dangerouslySetInnerHTML={{ __html: data[currentQuestionIndex].question }} />
  
    <ul className="grid grid-cols-2 gap-4 pt-5">
      {data[currentQuestionIndex].answers.map((answer, i) => (
        <li key={i}>
          <button 
            className="b1"
            onClick={() => handleAnswerClick(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </li>
      ))}
    </ul>
  </div>
)}
    </div>
  </div>


</div>

{/* Category Selection Dropdown */}


{/* Loading & Error Handling */}


{/* Game Over Message */}


{/* Displaying One Question at a Time with Timer */}


      </div>
  </div>
  );
};

export default Quiz;
