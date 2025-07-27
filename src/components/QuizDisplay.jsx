import React, { useEffect, useState } from "react";
import data from "../assets/data.js";

const QuizDisplay = () => {
  const questions = data;
  const [current, setCurrent] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [timer, setTimer] = useState(current < questions.length ? questions[current].time : 0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    try {
        if (selected === questions[current].correct) {
            setTotalScore((prev) => prev + questions[current].marks);
        }
        setCurrent(prev => prev + 1);
        console.log(current)
        if(current >= questions.length-1) {setIsCompleted(true); return;}
        setTimer(questions[current].time)
    } catch (error) {
        console.log("Something went wrong !!")
    }
  };

  useEffect(() => {
    if (timer <= 0) {
      handleSubmit();
      return;
    }

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);


  return (
    <div className="bg-white sm:w-[50%] lg:w-[35%] max-sm:w-[90%] rounded-2xl p-4">
      {isCompleted === false ? (
        <form action="" onSubmit={handleSubmit}>
        <div className="font-semibold text-center text-lg">
          Question {current + 1} of {questions.length}
        </div>
        <div className="text-lg my-2">{questions[current].ques}</div>

        <ul className="flex flex-col items-center gap-3 justify-center my-8">
          {questions[current].options.map((opt, idx) => {
            return (
              <li
                key={idx}
                className={`
                    ${selected === opt ? "bg-sky-600" : "bg-sky-500"}
                    w-full text-center p-1.5 rounded-md text-white
                    cursor-pointer
                `}
                
                onClick={() => setSelected(opt)}
              >
                {opt}
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-between w-full">
          <div className="font-bold">Time left: {timer}s</div>
          <button
            className="bg-green-600 cursor-pointer w-20 text-center p-1 rounded-md text-white"
            type="submit"
          >
            Next
          </button>
        </div>
      </form>
      ) : (
        <div className="h-50 flex flex-col items-center justify-center">
            <p className="font-semibold text-red-500">
                Cogratulations, Quiz is Completed !!
            </p>
            <p className="font-semibold">
                Scored - {totalScore} / {questions.length}
            </p>
        </div>
      )}
    </div>
  );
};

export default QuizDisplay;