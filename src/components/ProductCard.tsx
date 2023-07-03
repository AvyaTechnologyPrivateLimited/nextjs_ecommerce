"use client";

import React, { FC, useState } from "react";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ModalQuickView from "./ModalQuickView";
import ProductBadge from "./ProductBadge";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import TruncatedSentence from "./TruncatedSentence";
import ProductColor from "./ProductColor";

export interface ProductCardProps {
  className?: string;
  data: any;
}

const ProductCard: FC<ProductCardProps> = ({
  className = "",
  data
}) => {
  //console.log(data.badge)
  const {
    id,
    name,
    price,
    description,
    api_colors,
    badge,
    image,
    rating,
    slug,
    numberOfReviews,
    wishlist
  } = data;
  
  const is_wishlisted = wishlist ? true : false;

  const [showModalQuickView, setShowModalQuickView] = useState(false);

  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
       
        <ButtonSecondary
          className="ml-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => setShowModalQuickView(true)}
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ml-1">Quick view</span>
        </ButtonSecondary>
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
      >
        <Link href={`/products/${slug}`} className="absolute inset-0"></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link href={`/products/${slug}`} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={image}
              className="object-cover w-full h-full drop-shadow-xl"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
            />
          </Link>
          <ProductBadge badge={badge} />
          <LikeButton liked={is_wishlisted} productid={id} className="absolute top-3 right-3 z-10" />
          {renderGroupButtons()}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          <ProductColor colors={api_colors} />
          <div>
            <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
              {name}
            </h2>
            <div className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}>
              {description?<TruncatedSentence sentence={description} maxLength={40} />:''}
            </div>
          </div>

          <div className="flex justify-between items-end ">
            <Prices price={price} />
            <div className="flex items-center mb-0.5">
              <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
              <span className="text-sm ml-1 text-slate-500 dark:text-slate-400">
                {rating || ""} ({numberOfReviews || 0} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* QUICKVIEW */}
      <ModalQuickView
        show={showModalQuickView}
        data={data}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
