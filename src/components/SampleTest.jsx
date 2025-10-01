import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Final from "./Final";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const sentences = ["Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, obcaecati! repellat magni laboriosam dicta optio."];


const FinalPage = () => (
  
  <div className="flex flex-col justify-between items-center gap-5">
        <Final final={true}/>
        <Link to={"/tests"} className="flex w-fit justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Go to Tests</Link>
  </div>
);


function SampleTest() {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [final,setFinal]=useState(false);

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const textContainerRef = useRef(null); // container ref
  const activeCharRef = useRef(null); // current typed char ref

  const [loggedInUser] = useState(localStorage.getItem("webmail") || "");
  const checkpointInterval = 7; // every 7 words

  useEffect(() => {
    resetTest();
  }, []);

  const resetTest = () => {
    const random = sentences[0];
    setText(random);
    setInput("");
    setResult(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  
const handleChange = (e) => {
  const val = e.target.value;
  const textWords = text.trim().split(/\s+/);
  const inputWords = val.trim().split(/\s+/);

  

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
    setFinal(true);
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

    <>
      {final?<FinalPage/>:<div
      onContextMenu={disableEvents}
      onCopy={disableEvents}
      onCut={disableEvents}
      onPaste={disableEvents}
      className="select-none"
    >
      <h1 className="text-blue-500  md:mt-2 text-[30px] mx-auto text-center font-bold">
        Sample Type Testing
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
    </div>}
    </>
    
  );
}

export default SampleTest;
