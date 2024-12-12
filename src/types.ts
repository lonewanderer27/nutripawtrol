export type LlmResultType = {
  output: LlmOutputType[];
};

export type LlmOutputType = {
  pet: string;
  allergy: string;
}

export type SuggestOutputNoCsvType = {
  recommend: number[][];
}

export type SuggestOutputType = {
  recommend: ProductType[][];
}

export type SuggestRequestBody = {
  num: number;
  list: LlmOutputType[];
  "no-csv"?: boolean;
}

export interface ProductType {
  main_category_en: string;       // used for filtering by pets
  image_url: string;              // used for displaying product image
  product_name: string;           // used for displaying product name
  url?: string;                   // used for linking to product page (optional)
  allergens: string;              // used for displaying allergens
  ingredients_text: string;       // used for displaying description
  image_ingredients_url?: string; 
  image_nutrition_url?: string;
  countries_en?: string;
  brands?: string;
}