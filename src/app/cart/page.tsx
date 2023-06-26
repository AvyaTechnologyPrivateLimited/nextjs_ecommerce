"use client";

import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import CartQuantityUpdate from "@/components/CartQuantityUpdate";
import PricesAndQty from "@/components/PricesAndQty";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import config from '../../custom/config';
import axios from 'axios';
import Cookies from "js-cookie";
import ColorAndSize from "@/components/ColorAndSize";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cartContent, setCartContent] = useState([])
  const [cartTotalPrice, setCartTotalPrice] = useState([])
  const [cartTotalItem, setCartTotalItem] = useState(0)
  
  const getCartData = async () => {
    const access_token = Cookies.get("access_token");
    if(!access_token)
    {
      //toast.error('Please login first');
      console.log('you are not loggedin');
    }
    else
    {
      let headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + access_token,
      }
      await axios.get(`${config.API_URL}cart`, { headers: headers })
        .then((response)=>{
          let cartdetail = response.data;
          //console.log(response.data);
          setCartContent(cartdetail.content);
          setCartTotalPrice(cartdetail.total_price);
          setCartTotalItem(cartdetail.total_item);
        }).catch((error) =>  {
          console.error(`Login to get cart ${error}`);
        });
    }
  };

  const removeFromCart = async (id:any) => {
    let headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + Cookies.get("access_token"),
    }
    console.log(headers);
    await axios.post(`${config.API_URL}cart/remove`, {id:id}, { headers: headers })
      .then((response)=>{
        let cartdetail = response.data;
        toast.success(cartdetail.message);
      }).catch((error) =>  {
        console.error(`Login first ${error}`);
      });
  };

  useEffect(() => {
    getCartData();
  }, [])

  const renderProduct = (item:any) => {
    const { id, name, price, image, quantity, in_stock_qty, color, size, total_price } = item;

    return (
      <div
        key={id}
        className="relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0"
      >
        <div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            src={image}
            alt={name}
            sizes="300px"
            className="h-full w-full object-contain object-center"
          />
          <Link href="/product-detail" className="absolute inset-0"></Link>
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <h3 className="text-base font-semibold">
                  <Link href="/product-detail">{name}</Link>
                </h3>
                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                  <ColorAndSize color={color} size={size} />
                </div>

              </div>

              <div className="hidden sm:block text-center relative">
                <CartQuantityUpdate defaultValue={quantity} max={in_stock_qty} className="relative z-10" />
              </div>

              <div className="hidden flex-1 sm:flex justify-end">
                <PricesAndQty price={price} quantity={quantity} total_price={total_price} className="mt-0.5" />
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            
            {in_stock_qty<1 ? (
            <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <NoSymbolIcon className="w-3.5 h-3.5" />
              <span className="ml-1 leading-none">Sold Out</span>
            </div>
            ) : (
              <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <CheckIcon className="w-3.5 h-3.5" />
                <span className="ml-1 leading-none">In Stock</span>
              </div>
            )}

            <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
                onClick={() => removeFromCart(id)}
              >
                Remove
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-CartPage">
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-12 sm:mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            Shopping Cart
          </h2>
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link href={"/"} className="">
              Home
            </Link>
            
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">Shopping Cart</span>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" />

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700 ">
            {cartContent.map(renderProduct)}
          </div>
          <div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>
          <div className="flex-1">
            <div className="sticky top-28">
              <h3 className="text-lg font-semibold ">Order Summary</h3>
              <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
                <div className="flex justify-between pb-4">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    ${cartTotalPrice}
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span>Shpping estimate</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    Free
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span>Tax estimate</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    $00
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span>Order total</span>
                  <span>${cartTotalPrice}</span>
                </div>
              </div>
              <ButtonPrimary href="/checkout" className="mt-8 w-full">
                Checkout
              </ButtonPrimary>
              <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
                <p className="block relative pl-5">
                  <svg
                    className="w-4 h-4 absolute -left-1 top-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8V13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.9945 16H12.0035"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Learn more{` `}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="##"
                    className="text-slate-900 dark:text-slate-200 underline font-medium"
                  >
                    Taxes
                  </a>
                  <span>
                    {` `}and{` `}
                  </span>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="##"
                    className="text-slate-900 dark:text-slate-200 underline font-medium"
                  >
                    Shipping
                  </a>
                  {` `} infomation
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
