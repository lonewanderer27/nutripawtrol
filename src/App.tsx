import { useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { CircularProgress, InputAdornment, OutlinedInput } from '@mui/material';
import useLlm from './hooks/useLlm';
import { useDebounceValue } from 'usehooks-ts';
import { MenuOutlined, Search } from '@mui/icons-material';
import LlmOutput from './components/LlmOutput';


export default function App() {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounceValue(search, 500);
  const { data, isFetching } = useLlm(debouncedSearch);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  console.log("Data received", data);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <OutlinedInput
          ref={inputRef}
          startAdornment={
            <InputAdornment position="start">
              {isFetching ? <CircularProgress size={20} /> : <MenuOutlined />}
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
      {data?.output.map((result, index) => <LlmOutput key={index} {...result} />)}
    </Container>
  );
}
