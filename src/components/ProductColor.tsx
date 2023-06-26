"use client";

import React, { FC, useState } from "react";
export interface ProductColorProps {
  colors: any[]
}

const ProductColor: FC<ProductColorProps> = ({
  colors
}) => {

  const [variantActive, setVariantActive] = useState("");
  
  const getActiveColor = (color:any) => {
    
    return variantActive===color.name ? color.code : "#ffffff";
    
  };

  
  if (!colors || !colors.length) {
    return null;
  }
  
  return (
    <>
    <label htmlFor="">
        <span className="text-sm font-medium">
          Color:
          <span className="ml-1 font-semibold">
            {variantActive}
          </span>
        </span>
      </label>
    <div className="flex space-x-1">
      {colors.map((color: any) => (
        <div
          key={color.id}
          onClick={() => setVariantActive(color.name)}
          className={`relative w-6 h-6 rounded-full overflow-hidden z-10 border cursor-pointer`}
          title={color.name}
          style={{ borderColor: getActiveColor(color) }}
        >
          <div
            className={`absolute inset-0.5 rounded-full z-0`}
            style={{ backgroundColor: color.code }}
          ></div>
        </div>
      ))}
    </div>
    </>
  );
};

export default ProductColor;
