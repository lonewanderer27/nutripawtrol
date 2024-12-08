import { useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { CircularProgress, InputAdornment, OutlinedInput } from '@mui/material';
import useLlm from './hooks/useLlm';
import { useDebounceValue } from 'usehooks-ts';
import { MenuOutlined, Search } from '@mui/icons-material';
import LlmOutput from './components/LlmOutput';
import useSuggest from './hooks/useSuggest';
import LlmOutputLoader from './loaders/LlmOutputLoader';


export default function App() {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounceValue(search, 500);
  const llm = useLlm(debouncedSearch);
  const suggest = useSuggest(10, llm.data?.output ?? [], debouncedSearch);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  console.log("LLM Output:\n", llm.data);
  console.log("Suggest Output:\n", suggest.data);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <OutlinedInput
          ref={inputRef}
          startAdornment={
            <InputAdornment position="start">
              {llm.isFetching ? <CircularProgress size={20} /> : <MenuOutlined />}
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          }
          placeholder='Enter your query'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          fullWidth
        />
      </Box>
      {suggest.data?.recommend && suggest.data.recommend.length > 0 &&
        llm.data?.output.map((llmOutput, index) => (
          <LlmOutput
            key={index}
            llmOutput={llmOutput}
            suggestOutput={suggest.data?.recommend?.[index]}
          />
        ))}
      {(llm.isFetching || suggest.isFetching) && (
        <>
          <LlmOutputLoader />
          <LlmOutputLoader />
        </>
      )}
    </Container>
  );
}
