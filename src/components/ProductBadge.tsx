import {
  SparklesIcon
} from "@heroicons/react/24/outline";
import { Product } from "@/data/data";
import React, { FC } from "react";

interface Props {
  status: Product["status"];
  className?: string;
}

const ProductBadge: FC<Props> = ({
  status,
  className = "absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300",
}) => {
  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES = `nc-shadow-lg rounded-full flex items-center justify-center ${className}`;
    if (status !== "") {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
  };

  return renderStatus();
};

export default ProductBadge;
