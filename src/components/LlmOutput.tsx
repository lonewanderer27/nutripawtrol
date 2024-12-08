import { Box, Typography } from '@mui/material'
import Product from './Product'
import { LlmOutputType, ProductType } from '../types'

const LlmOutput = (props: {
  llmOutput: LlmOutputType,
  suggestOutput: ProductType[],
}) => {
  // capitalize the first letter of the specie
  const pet = props.llmOutput.pet.charAt(0).toUpperCase() + props.llmOutput.pet.slice(1);

  // capitalize the first letter of allergy
  const allergy = props.llmOutput.allergy.charAt(0).toUpperCase() + props.llmOutput.allergy.slice(1);

  return (
    <Box sx={{ mb: 5 }}>
      <Box>
        <Typography variant="h6">Species: {pet}</Typography>
      </Box>
      <Box sx={{ my: 1, display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography variant="body1" sx={{ mr: 1 }}>Allergy:</Typography>
        <Typography variant="body1">{allergy}</Typography>
      </Box>
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
        {props.suggestOutput?.map((product, index) => (
          <Product
            key={index}
            title={product.product_name}
            description={product.ingredients_text}
            image_url={product.image_url}
            product_url={product.url}
          />
        ))}
      </Box>
    </Box>
  )
}

export default LlmOutput