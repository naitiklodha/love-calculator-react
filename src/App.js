import "./App.css";
import { useState,useEffect } from "react";
const App = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [score, setScore] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // calculate the love score based on the names entered by the user
    const loveScore = calculateLoveScore(name1, name2);
    setScore(loveScore);
  };
  
  useEffect(() => {
    if (score > 0) {
      sendMail();
    }
  }, [score]);
  
  

  async function sendMail(){
    console.log(name1)
    const response = await fetch('https://script.google.com/macros/s/AKfycbwuBUYc3yMNrtV627gFjeEst8BxqzHC_Uk7ZyVKffVh0n76_NdlgLTrP4OpsMTUcsYm7Q/exec', {
      method: 'POST',
      body: JSON.stringify({
        name1: name1,
        name2: name2,
        score: score,
      })
    });
    const data = await response.json();
    console.log(data);
  }
  

  const calculateLoveScore = (name1, name2) => {
    // calculate the love score using a simple algorithm
    const totalAscii = name1
      .toLowerCase()
      .split("")
      .concat(name2.toLowerCase().split(""))
      .map((char) => char.charCodeAt(0))
      .reduce((acc, val) => acc + val, 0);

    return Math.floor(totalAscii / 10) % 101; // score ranges from 0 to 100
  };
  return (
    <div className="h-screen font-Explora  bg-gradient-to-tr from-pink-600 to-red-500">
      <div>
        {score > 0 ? (
          <div className="flex flex-col  items-center text-white text-2xl justify-center font-Explora">
            <h1 className="text-6xl">Your love score is:</h1>
            <h1 className="text-yellow-300 text-6xl font-bold">{score} %</h1>
          </div>
        ) : (
          <h1 className="text-8xl pt-4 text-center font-bold  text-white">
            Love Calculator!
          </h1>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex font-roboto flex-col items-center justify-center mt-4 md:flex-row">
            <input
              type={"text"}
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="bg-transparent border-2 m-4 border-gray-200 rounded-md pl-2 placeholder-gray-200 text-white outline-none text-center"
              placeholder="Your Name"
              required
            ></input>
            <input
              type={"text"}
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="bg-transparent border-2 border-gray-200 rounded-md pl-2 placeholder-gray-200 text-white outline-none text-center"
              placeholder="Partner/Crush's name"
              required
            ></input>
            <button
              type="submit"
              className="uppercase mt-4 font-extrabold text-red-500 bg-slate-200 hover:bg-red-500 hover:text-white rounded-lg p-2 items-center md:m-0 md:ml-3"
            >
              Calculate!
            </button>
          </div>
        </form>
      </div>
      <footer className="text-white text-lg font-roboto fixed bottom-2 w-screen flex justify-center">
        <h1>
          Made with <span className="animate-pulse">🤍</span> by{" "}
          <a
            href="https://github.com/naitik-lodha"
            className="font-bold italic  hover:text-yellow-500 hover:underline"
          >
            Naitik Lodha
          </a>
        </h1>
      </footer>
    </div>
  );
};

export default App;
