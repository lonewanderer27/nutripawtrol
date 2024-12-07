import { Card, CardMedia, CardContent, Typography } from '@mui/material'

const Product = (props: {
  title: string,
  description: string
}) => {
  return (
    <Card sx={{ mr: 2, minWidth: 180 }}>
      <CardMedia
        width={180}
        component={"img"}
        height={200}
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