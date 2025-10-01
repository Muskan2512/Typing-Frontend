import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const endpoint = import.meta.env.VITE_API_ENDPOINT;

// In the rapidly evolving digital landscape of 2025, the phrase 'adapt or be left behind' carries more weight than ever. Technology doesn't wait for anyone, and neither do the markets that rely on it. Consider this: artificial intelligence, once just a buzzword, now powers recommendation engines, fraud detection systems, and even generative design tools used by engineers. Developers toggle daily between languages like Python (v3.12+), C++17, and Rust 1.75, integrating APIs from platforms such as Twitter/X and GitHub. They push commits and merge pull requests, often juggling multiple branches simultaneously. Mistakes matter 2 + 2 ≠ 5, arrays must be zero-indexed, and for (int i = 0; i < n; i++) must run exactly n times. Efficiency >= speed, but clarity > cleverness; clean, readable code is better than one-liners that nobody can maintain Cybersecurity is equally critical. Strong passwords like A!r7$gH#2Lm@2025 may look messy, but they guard against brute-force attacks. Meanwhile, system administrators configure permissions with commands such as chmod 755 server.sh on Linux or manage files in Windows using paths like C:\Program Files\AppData\Logs. Emails (e.g., jane.doe@example.com) and log files (error_2025-09-18.log) are scattered everywhere, demanding precision when handled. Cloud providers like AWS, Azure, and GCP dominate discussions, while containerization via Docker (docker run -it ubuntu:latest) has become second nature.Yet, beyond the technical details, communication still rules. Misplaced commas, dangling semicolons; or forgotten brackets ( ), [ ], { }—all introduce chaos, whether in an English essay or a JavaScript function. Consider how punctuation alters meaning: 'Let's eat, grandma!' vs. 'Let's eat grandma!' One saves a family dinner, the other suggests cannibalism. Typists must also wrestle with ellipses… which subtly imply continuation, or em-dashes—that add dramatic emphasis.Ultimately, typing skill is about more than speed. It's about precision, endurance, and adaptability in an environment where text can mean source code, configuration files, or even life-critical medical records. Every keystroke matters. So, the challenge is simple: can you type this entire paragraph flawlessly, without a single error, while keeping pace with the ticking

const sentences = ["In the rapidly evolving digital landscape of 2025, the phrase 'adapt or be left behind' carries more weight than ever. Technology doesn't wait for anyone, and neither do the markets that rely on it. Consider this: artificial intelligence, once just a buzzword, now powers recommendation engines, fraud detection systems, and even generative design tools used by engineers. Developers toggle daily between languages like Python (v3.12+), C++17, and Rust 1.75, integrating APIs from platforms such as Twitter/X and GitHub. They push commits and merge pull requests, often juggling multiple branches simultaneously. Mistakes matter 2 + 2 != 5, arrays must be zero-indexed, and for (int i = 0; i < n; i++) must run exactly n times. Efficiency >= speed, but clarity > cleverness; clean, readable code is better than one-liners that nobody can maintain Cybersecurity is equally critical. Strong passwords like A!r7$gH#2Lm@2025 may look messy, but they guard against brute-force attacks. Meanwhile, system administrators configure permissions with commands such as chmod 755 server.sh on Linux or manage files in Windows using paths like C:\Program Files\AppData\Logs.one-liners that nobody can maintain Cybersecurity is equally critical. Strong passwords like A!r7$gH#2Lm@2025 may look messy, but they guard against brute-force attacks. Meanwhile, system administrators configure permissions with commands such as chmod 755 server.sh on Linux or manage files in Windows using paths like C:\Program Files\AppData\Logs."];

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
  const checkpointInterval = 10; // every 10 words

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
    const random = sentences[0];
    setText(random);
    setInput("");
    setResult(null);
    setStartTime(null);
    setEndTime(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // const handleChange1 = (e) => {
  //   const val = e.target.value;
  //   setInput(val);

  //   if (!startTime && val.length > 0) {
  //     setStartTime(new Date());
  //   }

  //   const inputWords = val.trim().split(/\s+/);
  //   const textWords = text.trim().split(/\s+/);

  //   // word checkpoint check
  //   if (
  //     inputWords.length > 0 &&
  //     inputWords.length % checkpointInterval === 0 &&
  //     val.endsWith(" ")
  //   ) {
  //     const correctSoFar = textWords.slice(0, inputWords.length).join(" ");
  //     if (val.trim() !== correctSoFar) {
  //       // toast.error(
  //       //   `Mistake at word-checkpoint ${inputWords.length / checkpointInterval}`
  //       // );
  //       const rollbackValue =
  //         textWords.slice(0, inputWords.length - checkpointInterval).join(" ") +
  //         " ";
  //       setInput(rollbackValue);
  //       return;
  //     } else {
  //       // toast.success(
  //       //   `Checkpoint ${inputWords.length / checkpointInterval} cleared ✅`
  //       // );
  //     }
  //   }

  //   if (val.trim() === text.trim()) {
  //     const end = new Date();
  //     setEndTime(end);
  //     calculateResult(startTime, end);
  //     setFinal(true);
  //   }
  // };


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
  const correctUpToCheckpoint = textWords
    .slice(0, checkpointIndex)
    .join(" ") + (checkpointIndex > 0 ? " " : "");

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

  // Highlight + scroll logic
  // const getHighlightedText = () => {
  //   return text.split("").map((char, idx) => {
  //     const typedChar = input[idx];
  //     const className =
  //       typedChar === undefined
  //         ? ""
  //         : typedChar === char
  //         ? "text-green-500"
  //         : "text-red-500";

  //     // attach ref to active char
  //     const isActive = idx === input.length;

  //     return (
  //       <span
  //         key={idx}
  //         ref={isActive ? activeCharRef : null}
  //         className={className}
  //       >
  //         {char}
  //       </span>
  //     );
  //   });
  // };

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
        >🚩</span>
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
      <h1 className="text-blue-500  md:mt-2 text-[30px] mx-auto text-center font-bold">
        TypEclipse
      </h1>
      <div className="mx-auto mt-5 w-3/4 shadow-lg p-3 rounded-lg bg-white justify-center ">
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
