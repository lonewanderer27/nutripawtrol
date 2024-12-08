import { Box, Skeleton } from '@mui/material'
import ProductLoader from './ProductLoader'

const LlmOutputLoader = () => {
  return (
    <Box sx={{ mb: 5 }}>
      <Skeleton variant="text" width={200} sx={{ fontSize: "2rem" }}/>
      <Skeleton variant="text" width={400} sx={{ fontSize: "1rem", mb: 1 }}/>
      <Box sx={{
        display: "flex",
        my: 1,
        overflowX: "scroll",
        overflowY: "hidden",
        ml: -0.5,
        pb: 1,
        pl: 0.5
      }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <ProductLoader key={index} />
        ))}
      </Box>
    </Box>
  )
}

export default LlmOutputLoader