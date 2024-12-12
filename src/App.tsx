import './App.css';
import { useState, useRef, useEffect } from 'react';
import { useDebounceValue } from "usehooks-ts";
import useSuggest from './hooks/useSuggest';
import useLlm from './hooks/useLlm';
import LlmOutput from './components/LlmOutput';

function App() {
  const [search, setSearch] = useState('');
  const llm = useLlm(search);
  const suggest = useSuggest(10, llm.data?.output ?? [], search);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearch(search);
      console.log("Search:", search);
      llm.refetch();
    }
  }

  console.log("LLM Output:\n", llm.data);
  console.log("Suggest Output:\n", suggest.data);

  return (
    <div className="App px-4">
      <div className='my-4'>
        <label className="input input-bordered flex items-center gap-2 border-2 border-black">
          {/* TODO: Replace with hamburger icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill='#3a619c'
            className=" h-6 w-6 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
          <input
            type="text"
            className=" grow flex-1"
            placeholder="Enter your query"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleEnter}
            value={search}
            ref={inputRef}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill='#3a619c'
            className="h-6 w-6 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
        </label>
      </div>
      {suggest.data?.recommend && suggest.data.recommend.length > 0 &&
        llm.data?.output.map((llmOutput, index) => (
          <LlmOutput
            key={index}
            llmOutput={llmOutput}
            suggestOutput={suggest.data?.recommend?.[index]}
          />
        ))}
    </div>
  );
}

export default App;
