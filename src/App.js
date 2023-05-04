import { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const name1Ref = useRef("");
  const name2Ref = useRef("");
  const [score, setScore] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loveScore = calculateLoveScore(
      name1Ref.current?.value,
      name2Ref.current?.value
    );
    setScore(loveScore);
  };

  useEffect(() => {
    if (score > 0) {
      async function sendMail() {
        const response = await fetch(process.env.REACT_APP_APPSCRIPT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors",
          body: JSON.stringify({
            name1: name1Ref.current?.value,
            name2: name2Ref.current?.value,
            score: score,
          }),
        });
      }
      sendMail();
    }
  }, [score]);

  const calculateLoveScore = (name1, name2) => {
    const totalAscii = name1
      .toLowerCase()
      .split("")
      .concat(name2.toLowerCase().split(""))
      .map((char) => char.charCodeAt(0))
      .reduce((acc, val) => acc + val, 0);

    return Math.floor(totalAscii / 10) % 101;
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
              ref={name1Ref}
              className="bg-transparent border-2 m-4 border-gray-200 rounded-md pl-2 placeholder-gray-200 text-white outline-none text-center"
              placeholder="Your Name"
              required
            ></input>
            <input
              type={"text"}
              ref={name2Ref}
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
