import { Box, Skeleton } from '@mui/material'
import ProductLoader from './ProductLoader'
import { useMemo } from 'react'

const LlmOutputLoader = () => {
  const randomProductCount = useMemo(() => Math.floor(Math.random() * 5) + 1, [])

  return (
    <Box sx={{ mb: 5 }}>
      <Skeleton variant="text" width={200} sx={{ fontSize: "2rem" }}/>
      <Skeleton variant="text" width={400} sx={{ fontSize: "1rem", mb: 1 }}/>
      <Box sx={{
        display: "flex",
        my: 1,
        overflow: "hidden",
        ml: -0.5,
        pb: 1,
        pl: 0.5
      }}
      >
        {Array.from({ length: randomProductCount }).map((_, index) => (
          <ProductLoader key={index} />
        ))}
      </Box>
    </Box>
  )
}

export default LlmOutputLoader