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
    window.open(props.product_url, "_blank")
  }

  return (
    <Card sx={{ mr: 2, minWidth: width }} onClick={handleProduct}>
      <CardMedia
        width={width}
        component={"img"}
        height={height}
        // image="/product_placeholder.png"
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