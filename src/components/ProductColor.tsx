"use client";

import React, { FC, useState } from "react";


export interface ProductColorProps {
  colors: any
}

const ProductColor: FC<ProductColorProps> = ({
  colors
}) => {

  const [variantActive, setVariantActive] = useState(0);
  
  //console.log(data.badge)
  const getBorderClass = (Bgclass = "") => {
    if (Bgclass.includes("red")) {
      return "border-red-500";
    }
    if (Bgclass.includes("violet")) {
      return "border-violet-500";
    }
    if (Bgclass.includes("orange")) {
      return "border-orange-500";
    }
    if (Bgclass.includes("green")) {
      return "border-green-500";
    }
    if (Bgclass.includes("blue")) {
      return "border-blue-500";
    }
    if (Bgclass.includes("sky")) {
      return "border-sky-500";
    }
    if (Bgclass.includes("yellow")) {
      return "border-yellow-500";
    }
    return "border-transparent";
  };

  
    if (!colors || !colors.length) {
      return null;
    }
    
    return (
      <div className="flex space-x-1">
        {colors.map((color: any) => (
          <div
            key={color.id}
            onClick={() => setVariantActive(color.id)}
            className={`relative w-6 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${
              variantActive === color.id
                ? getBorderClass(color.name)
                : "border-transparent"
            }`}
            title={color.name}
          >
            <div
              className={`absolute inset-0.5 rounded-full z-0`}
              style={{ backgroundColor: color.code }}
            ></div>
          </div>
        ))}
      </div>
    );
  
};

export default ProductColor;
