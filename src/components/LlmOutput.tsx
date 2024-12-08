import { Box, Typography } from '@mui/material'
import Product from './Product'
import { LlmOutputType } from '../types'
import useSuggest from '../hooks/useSuggest';

const defaultNum = 10;

const LlmOutput = (props: LlmOutputType) => {
  // capitalize the first letter of the specie
  const pet = props.pet.charAt(0).toUpperCase() + props.pet.slice(1);

  // capitalize the first letter of each allergy
  const allergies = props.allergies.map((allergy) => {
    return allergy.charAt(0).toUpperCase() + allergy.slice(1);
  })

  const { data, isFetching } = useSuggest(defaultNum, props);

  return (
    <Box sx={{ mb: 5 }}>
      <Box>
        <Typography variant="h6">Species: {pet}</Typography>
      </Box>
      <Box sx={{ my: 1, display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography variant="body1" sx={{ mr: 1 }}>Allergens:</Typography>
        <Typography variant="body1">{allergies.join(', ')}</Typography>
      </Box>
      <Box sx={{ display: "flex", my: 1, overflowX: "scroll", overflowY: "hidden" }}>
        {/* {Array.from({ length: 10 }).map((_, index) => (
          <Product
            key={index}
            title="Pedigree"
            description='Dog food that has no absolutely peanut'
            image_url='/product_placeholder.png'
          />
        ))} */}
        {data?.map((product, index) => (
          <Product
            key={index}
            title={product.product_name}
            description={product.allergens}
            image_url={product.image_url}
            product_url={product.url}
          />
        ))}
      </Box>
    </Box>
  )
}

export default LlmOutput