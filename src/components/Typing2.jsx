import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const endpoint = import.meta.env.VITE_API_ENDPOINT;
const sentenceFromEnv = import.meta.env.VITE_TEST_SENTENCE;
const checkpointInterval = Number(
  import.meta.env.VITE_CHECKPOINT_INTERVAL || 10
);

function Typing2({ final, setFinal }) {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const textContainerRef = useRef(null); // container ref
  const activeCharRef = useRef(null); // current typed char ref

  const [loggedInUser] = useState(localStorage.getItem("webmail") || "");

  useEffect(() => {
    resetTest();
  }, []);

  useEffect(() => {
    if (final) {
      // console.log("Final is true, navigating to /final");
      navigate("/final");
    }
  }, [final]);

  const resetTest = () => {
    setText(sentenceFromEnv);
    setInput("");
    setResult(null);
    setStartTime(null);
    setEndTime(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    const textWords = text.trim().split(/\s+/);
    const inputWords = val.trim().split(/\s+/);

    // Start the timer
    if (!startTime && val.length > 0) {
      setStartTime(new Date());
    }

    // Determine current checkpoint
    const checkpointIndex =
      Math.floor(inputWords.length / checkpointInterval) * checkpointInterval;

    // Get the correct text up to this checkpoint
    const correctUpToCheckpoint =
      textWords.slice(0, checkpointIndex).join(" ") +
      (checkpointIndex > 0 ? " " : "");

    // If user typed beyond the last checkpoint, check correctness
    if (!text.startsWith(val)) {
      // rollback to previous checkpoint
      setInput(correctUpToCheckpoint);
      // optional: show error toast
      // toast.error(`Mistake! Back to checkpoint ${checkpointIndex / checkpointInterval}`);
      return;
    }

    // Update input if correct
    setInput(val);

    // Check if typing is complete
    if (val.trim() === text.trim()) {
      const end = new Date();
      setEndTime(end);
      calculateResult(startTime, end);
      setFinal(true);
    }
  };

  const calculateResult = async (start, end) => {
    const timeTaken = (end - start) / 1000;
    const words = text.trim().split(/\s+/).length;
    const speed = Math.round((words / timeTaken) * 60);
    const correctChars = input
      .split("")
      .filter((ch, i) => ch === text[i]).length;
    const accuracy = Math.round((correctChars / text.length) * 100);

    const res = { speed, accuracy, time: timeTaken };
    setResult(res);

    const response = await axios.post(`${endpoint}/save`, {
      speed,
      time: timeTaken,
      webmail: loggedInUser,
    });
    if (response.status !== 200) {
      toast.error(response.data.message || "Some error occurred");
      return;
    }
  };

  // Highlight + scroll logic with checkpoints
  const getHighlightedText = () => {
    const words = text.trim().split(/\s+/); // split by words
    let charIndex = 0; // to map typed input position
    const spans = [];

    words.forEach((word, wordIdx) => {
      // render each character of this word
      word.split("").forEach((char) => {
        const typedChar = input[charIndex];
        const className =
          typedChar === undefined
            ? ""
            : typedChar === char
            ? "text-green-500"
            : "text-red-500";

        const isActive = charIndex === input.length;

        spans.push(
          <span
            key={charIndex}
            ref={isActive ? activeCharRef : null}
            className={className}
          >
            {char}
          </span>
        );

        charIndex++;
      });

      // add space between words
      spans.push(
        <span key={`space-${wordIdx}`} className="">
          {" "}
        </span>
      );
      charIndex++;

      // insert checkpoint after every 10 words (not counted in typing)
      if ((wordIdx + 1) % checkpointInterval === 0) {
        spans.push(
          <span
            key={`checkpoint-${wordIdx}`}
            className="text-gray-400 font-semibold"
          >
            🚩
          </span>
        );
      }
    });

    return spans;
  };

  // auto-scroll only when active char goes out of view
  useEffect(() => {
    if (activeCharRef.current && textContainerRef.current) {
      const container = textContainerRef.current;
      const active = activeCharRef.current;
      const containerRect = container.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();

      if (activeRect.bottom > containerRect.bottom) {
        active.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [input]);

  const disableEvents = (e) => e.preventDefault();

  return (
    <div
      onContextMenu={disableEvents}
      onCopy={disableEvents}
      onCut={disableEvents}
      onPaste={disableEvents}
      className="select-none"
    >
      <h1 className="text-indigo-400 text-[2.6rem] font-extrabold text-center tracking-wide drop-shadow-md">
        TypEclipse
      </h1>

      <div className="mx-auto text-2xl mt-5 w-[80%] shadow-lg p-3 rounded-lg bg-white justify-center ">
        <div
          ref={textContainerRef}
          className="flex flex-col 
    w-full              
    max-h-[60vh]         
    overflow-y-auto     
    p-4 
    border border-gray-200 
    rounded-lg"
        >
          <p className="quote text-gray-700 leading-relaxed">
            {getHighlightedText()}
          </p>
        </div>
        <textarea
          ref={inputRef}
          className={`w-full min-h-[100px] md:min-h-[150px]      
    lg:min-h-[200px]      
    outline-1 
    mt-5 
    select-none 
    -outline-offset-1 
    outline-black/10 
    p-3 
    resize-none           
    ${result ? "bg-gray-100" : ""}`}
          placeholder="Start typing here..."
          value={input}
          onChange={handleChange}
          disabled={result}
        />
      </div>
    </div>
  );
}

export default Typing2;
