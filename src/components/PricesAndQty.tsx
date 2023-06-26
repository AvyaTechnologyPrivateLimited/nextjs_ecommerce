import React, { FC } from "react";

export interface PricesProps {
  className?: string;
  price: number;
  quantity: number;
  total_price: number
  contentClass?: string;
}

const PricesAndQty: FC<PricesProps> = ({
  className = "",
  price,
  quantity,
  total_price,
  contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium",
}) => {
  return (
    <div className={`${className}`}>
      <div
        className={`items-center border-2 border-green-500 rounded-lg ${contentClass}`}
      >
        <div className="text-center text-gray-400 text-xs">{quantity} x ${price}</div>
        <div className="text-center text-green-500 text-base !leading-none">${String(total_price)}</div>
      </div>
    </div>
  );
};

export default PricesAndQty;
