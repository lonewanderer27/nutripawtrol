import { Box, Skeleton } from '@mui/material'

const ProductLoader = () => {
  return (
    <Box sx={{ mr: 2 }}>
      <Skeleton variant="rectangular" width={160} height={170} sx={{ borderRadius: 1 }} />
      <Skeleton variant="text" sx={{ fontSize: '2rem', mt: 1 }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    </Box>
  )
}

export default ProductLoader