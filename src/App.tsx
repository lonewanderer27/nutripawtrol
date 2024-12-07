import { useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CircularProgress, InputAdornment, OutlinedInput } from '@mui/material';
import useNutriPawtrol from './useNutriPawtrol';
import { useDebounceValue } from 'usehooks-ts';
import { MenuOutlined, Search } from '@mui/icons-material';


export default function App() {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounceValue(search, 500);
  const { data, isFetching } = useNutriPawtrol(debouncedSearch);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  console.log(data);

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
      {data?.map((result, index) => {
        // capitalize the first letter of the specie
        const specie = result.specie.charAt(0).toUpperCase() + result.specie.slice(1);

        // capitalize the first letter of each allergy
        const allergies = result.allergies.map((allergy) => {
          return allergy.charAt(0).toUpperCase() + allergy.slice(1);
        })

        return (
          <Box key={index}>
            <Box>
              {/* <Chip label={"Species: " + result.specie} /><br/> */}
              <Typography variant="h6">Species: {specie}</Typography>
            </Box>
            <Box sx={{ my: 1, display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Typography variant="body1" sx={{ mr: 1 }}>Allergens:</Typography>
              <Typography variant="body1">{allergies.join(', ')}</Typography>
            </Box>
          </Box>
        )
      })}
    </Container>
  );
}
