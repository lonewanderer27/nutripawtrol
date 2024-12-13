import { LlmOutputType, ProductType } from "../types"
import Product from "./Product";

const LlmOutput = (props: {
  llmOutput: LlmOutputType,
  suggestOutput: ProductType[],
}) => {
  // capitalize the first letter of the specie
  const pet = props.llmOutput.pet.charAt(0).toUpperCase() + props.llmOutput.pet.slice(1);

  // capitalize the first letter of allergy
  const allergy = props.llmOutput.allergy.charAt(0).toUpperCase() + props.llmOutput.allergy.slice(1);

  return (
    <div className="mb-10">
      <div className="mb-2">
        <span className=" font-bold text-xl">Species: {pet}</span>
      </div>
      <div className="mr-1 flex flex-row items-center mb-3">
        <p className="mr-1">Allergy: {allergy}</p>
      </div>
      <div className="flex my-1 overflow-x-scroll overflow-y-hidden ml-[0.5] pb-1 pl-[0.5]">
        {props.suggestOutput?.map((product, index) => (
          <Product
            key={index}
            title={product.product_name}
            description={product.ingredients_text}
            image_url={product.image_url}
            product_url={product.url}
          />
        ))}
      </div>
    </div>
  )
}

export default LlmOutput