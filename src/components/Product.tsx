import { Card, CardMedia, CardContent, Typography } from '@mui/material'
import { ProductType } from '../types'

const width = 160
const height = 170

const Product = (props: {
  title: string,
  description: string,
  product_url?: string,
  image_url: string
}) => {
  const handleProduct = () => {
    if (!props.product_url) return;
    console.log("Opening product in new tab:", props.product_url)
    window.open(props.product_url, "_blank")
  }

  console.log("Product props:", props)

  return (
    <Card sx={{ mr: 2, minWidth: width }} onClick={handleProduct}>
      <CardMedia
        width={width}
        component={"img"}
        height={height}
        image={props.image_url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Product