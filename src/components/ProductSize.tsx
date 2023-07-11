"use client";

import React, { FC, useState } from "react";
export interface ProductSizeProps {
  defaultValue?:String,
  sizes: any[]
}

const ProductSize: FC<ProductSizeProps> = ({
  defaultValue,
  sizes
}) => {

  const [sizeSelected, setSizeSelected] = useState(defaultValue);
  
  if (!sizes || !sizes.length) {
    return null;
  }
  return (
    <div>
      <div className="flex justify-between font-medium text-sm">
        <label htmlFor="">
          <span className="">
            Size:
            <span className="ml-1 font-semibold">{sizeSelected}</span>
          </span>
        </label>
        
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-3">
        
        {sizes.map((size:any) => {
          const isActive = size.name === sizeSelected;
          return (
            <div
              key={size.id}
              className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
              text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 ${
                
                  "cursor-pointer"
              } ${
                isActive
                  ? "bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000"
                  : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
              }`}
              onClick={() => {
                setSizeSelected(size.name);
              }}
            >
              {size.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSize;
