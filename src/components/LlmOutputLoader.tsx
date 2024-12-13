import { useMemo } from "react";
import ProductLoader from "./ProductLoader";

const LlmOutputLoader = () => {
  const randomNumber = useMemo(() => Math.floor(Math.random() * 6) + 1, [])
  console.log("LLMOutputLoader")

  return (
    <div className="mb-10">
      {/* Skeleton for Species */}
      <div className="mb-2">
        <div className="skeleton w-48 h-6 mb-2"></div> {/* Skeleton for species title */}
      </div>

      {/* Skeleton for Allergy */}
      <div className="mr-1 flex flex-row items-center mb-3">
        <div className="skeleton w-32 h-4"></div> {/* Skeleton for allergy text */}
      </div>

      {/* Skeleton for Product List */}
      <div className="flex my-1 overflow-x-hidden overflow-y-hidden ml-[0.5] pb-1 pl-[0.5]">
        {[...Array(randomNumber)].map((_, index) => (
            <ProductLoader key={index} />
        ))}
      </div>
    </div>
  );
};

export default LlmOutputLoader;
