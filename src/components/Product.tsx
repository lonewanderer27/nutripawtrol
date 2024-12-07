import { Card, CardMedia, CardContent, Typography } from '@mui/material'

const width = 160
const height = 170

const Product = (props: {
  title: string,
  description: string
}) => {
  return (
    <Card sx={{ mr: 2, minWidth: width }}>
      <CardMedia
        width={width}
        component={"img"}
        height={height}
        image="/product_placeholder.png"
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