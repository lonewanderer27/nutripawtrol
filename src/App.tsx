import './App.css';
import { useState, useRef, useEffect, useMemo } from 'react';
import LlmOutput from './components/LlmOutput';
import LlmOutputLoader from './components/LlmOutputLoader';
import useSuggestLlm from './hooks/useSuggestLlm';

function App() {
  const [search, setSearch] = useState('');
  const sl = useSuggestLlm(search, 10);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (search.length === 0) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      sl.refetch();
    }
  }

  const randomNumber = useMemo(() => Math.floor(Math.random() * 6) + 1, [])

  return (
    <div className="App px-4">
      <div className='my-4'>
        <label className="input input-bordered flex items-center gap-2 border-2 border-black">
          {!sl.isFetching && 
          <svg
            xmlns="http://www.w3.org/2000/svg" 
            height="24px" 
            viewBox="0 -960 960 960" 
            width="24px" 
            fill="#5f6368">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
          </svg>}
          {sl.isFetching && <span className="loading loading-spinner loading-xl"></span>}
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
      {/* Display the loader only if it's fetching data */}
      {sl.isFetching && (
        <div>
          {[...Array(randomNumber).keys()].map((_, index) => (
            <LlmOutputLoader key={index} />
          ))}
        </div>
      )}
      {/* Display the LLM output if data is available */}
      {!sl.isFetching && sl.data?.llm.map((llmOutput, index) => (
        <LlmOutput key={index} llmOutput={llmOutput} suggestOutput={sl.data.suggest?.[index] ?? []} />
      ))}
    </div>
  );
}

export default App;
