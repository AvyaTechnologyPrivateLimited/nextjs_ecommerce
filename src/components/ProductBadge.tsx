import {
  SparklesIcon
} from "@heroicons/react/24/outline";
import React, { FC } from "react";

interface Props {
  badge: any;
  className?: string;
}

const ProductBadge: FC<Props> = ({
  badge,
  className = "absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300",
}) => {
  
    if (!badge) {
      return null;
    }
    const CLASSES = `nc-shadow-lg rounded-full flex items-center justify-center ${className}`;
    return (
      <div className={CLASSES}>
        <SparklesIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">{status}</span>
      </div>
    );
};

export default ProductBadge;
