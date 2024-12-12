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

  return (
    <div className={`card card-bordered card-compact border-black text-primary-content w-48 h-auto mr-2 rounded-lg`} onClick={handleProduct}>
      <figure>
        <img
          className=" object-cover w-40 h-42"
          src={props.image_url}
          alt={props.title}
        />
      </figure>
      <div className="card-body bg-[#3a619c] w-48 rounded-lg rounded-t-none">
        <h6 className="card-title prose-h6">
          {props.title}
        </h6>
        <p>{props.description}</p>
      </div>
    </div>
  )
}

export default Product