import ImageWithFallback from "./ImageWithFallback";

const Product = (props: {
  title: string,
  description: string,
  product_url?: string,
  image_url: string
}) => {
  const handleProduct = () => {
    if (!props.product_url) return;
    console.log("Opening product in new tab:", props.product_url);
    window.open(props.product_url, "_blank");
  }

  return (
    <div 
      className="card card-bordered card-compact border-black border-2 text-primary-content w-48 h-auto mr-3 mb-2 rounded-lg" 
      onClick={handleProduct}>
      <figure className="h-[250px]">
        {/* <ImageWithFallback
          className="object-cover w-full h-full"
          src={props.image_url}
          alt={props.title} 
          defaultSrc="/product_image_unavailable.png"
        /> */}
        <img 
          className="object-cover w-full h-full"
          src={props.image_url ?? "/product_image_unavailable.png"}
          alt={props.title} 
        />
      </figure>
      <div className="card-body bg-[#3a619c] w-48 rounded-lg rounded-t-none m-[-2px]">
        <p className="font-bold text-ellipsis line-clamp-2">{props.title}</p>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default Product;
