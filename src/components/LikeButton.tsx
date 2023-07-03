"use client";
import Cookies from "js-cookie";
import config from '../custom/config';
import axios from 'axios'; 
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";

export interface LikeButtonProps {
  className?: string;
  liked?: boolean;
  productid:any;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  className = "",
  liked = false,
  productid
}) => {
  const [isLiked, setIsLiked] = useState(liked);

  // make random for demo
  useEffect(() => {
    setIsLiked(isLiked);
  }, []);

  const addToWishlist = async (productid:any) => {
    if(Cookies.get("access_token"))
    {
      try {
        let headers = {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + Cookies.get("access_token"),
        }
        const response = await axios.post(`${config.API_URL}wishlist/toggle`, {productid:productid}, { headers: headers });
        const data = await response.data;
        console.log(data.wishlisted);
        setIsLiked(data.wishlisted);
        toast.success(data.message);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    else
    {
      alert('Login first to add this product into wishlist');
    }
  };

  return (
    <button
      className={`w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 text-neutral-700 dark:text-slate-200 nc-shadow-lg ${className}`}
      onClick={() => addToWishlist(productid)}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
          stroke={isLiked ? "#ef4444" : "currentColor"}
          fill={isLiked ? "#ef4444" : "none"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default LikeButton;
