"use client";

import React, { useState, useEffect } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import toast from "react-hot-toast";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import detail1JPG from "@/images/products/detail1.jpg";
import detail2JPG from "@/images/products/detail2.jpg";
import detail3JPG from "@/images/products/detail3.jpg";
import Policy from "./Policy";
import ReviewItem from "@/components/ReviewItem";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ModalViewAllReviews from "./ModalViewAllReviews";
import AddToCartNotify from "@/components/AddToCartNotify";

import Image from "next/image";
import ProductAccordion from "@/components/ProductAccordion";
import { usePathname } from 'next/navigation'
import config from '../../../custom/config';
import axios from 'axios';
import ProductBadge from "../../../components/ProductBadge";
import ProductColor from "../../../components/ProductColor";
import ProductSize from "../../../components/ProductSize";
import Cookies from "js-cookie";
import ImagePlaceHolder from "@/images/products/placeholder.png";

const LIST_IMAGES_DEMO = [detail1JPG, detail2JPG, detail3JPG];

const ProductDetailPage = () => {
  
  const [qualitySelected, setQualitySelected] = useState(1);
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);

  const [data, setData] = useState({
    name:"",
    price:0,
    description:"",
    features:"",
    product_details:"",
    api_colors:[],
    api_sizes:[],
    badge:"",
    image:ImagePlaceHolder,
    rating:"",
    id:"",
    slug:"",
    wishlist: false,
    numberOfReviews:"",
    quantity:0
  })
  const [isLoading, setLoading] = useState(false)
  const [defaultColor, setDefaultColor] = useState("")
  const [defaultSize, setDefaultSize] = useState("")
  
  const [descData, setDescData] = useState([{}])
  const pathname = usePathname();
  useEffect(() => {
    if(pathname) {
      const slug = pathname.split("/").at(-1);
      console.log(slug);
      attempt(slug)
    } 
    
  }, [])
  const attempt = async (slug: any) => {
    try {
      let headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get("access_token"),
      }
      setLoading(true)
      // Send login request
      const response = await axios.get(`${config.API_URL}products/${slug}`, { headers: headers });
      response.data.wishlist = response.data.wishlist ? true :false;
      let apicolors = response.data.api_colors;
      if(apicolors.length>0)
      {
        setDefaultColor(apicolors[0].name);
      }

      let apisizes = response.data.api_sizes;
      if(apisizes.length>0)
      {
        setDefaultSize(apisizes[0].name);
      }

      setData(response.data);
      setDescData([
        {
          name: "Description",
          content: response.data.description,
        },
        {
          name: "Features",
          content: response.data.features
        }
      ]);
      setLoading(false);
    } catch (error: any) {
      console.error(error);
    }
    setLoading(false)
  }
  
  const notifyAddTocart = (data:any) => {
    toast.custom(
      (t) => (
        <AddToCartNotify
          data={data}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const addToCart = () => {
    const access_token = Cookies.get("access_token");
    if(!access_token)
    {
      toast.error('Please login first');
    }
    else
    {
      attemptAddToCart(access_token);
      //notifyAddTocart();
    }
  };

  const attemptAddToCart = async (access_token: String) => {
    let add_to_cart_data = {
      productId: data.id,
      quantity: qualitySelected
    }
    
    let headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + access_token,
    }
    await axios.post(`${config.API_URL}cart/add`, add_to_cart_data, { headers: headers })
      .then((response)=>{
        let cart_added = response.data;
        let current = response.data.current;
        let all = response.data.all;
        console.log(response.data);
        notifyAddTocart(current);
      }).catch((error) =>  {
        toast.error(error.response.data.message);
      });
    
  };

  const renderSectionContent = () => {
    
    return (
      <div className="space-y-7 2xl:space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {data.name}
          </h2>

          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={data.price}
            />

            <div className="h-7 border-l border-slate-300 dark:border-slate-700"></div>

            <div className="flex items-center">
              <a
                href="#reviews"
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ml-1.5 flex">
                  <span>4.9</span>
                  <span className="block mx-2">·</span>
                  <span className="text-slate-600 dark:text-slate-400 underline">
                    142 reviews
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        
        
        <div>
        {(!isLoading ? 
                <ProductColor defaultValue={defaultColor} colors={data.api_colors} />
        :null)}
          
        </div>
        <div>
        {(!isLoading ? 
          <ProductSize defaultValue={defaultSize} sizes={data.api_sizes} />
        :null)}
        </div>
       

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex space-x-3.5">
          <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
            <NcInputNumber
              defaultValue={qualitySelected}
              onChange={setQualitySelected}
              max={data.quantity}
            />
          </div>
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
            onClick={addToCart}
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ml-3">Add to cart</span>
          </ButtonPrimary>
        </div>

        {/*  */}
        <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        <ProductAccordion data={descData} />

        {/* ---------- 6 ----------  */}
        <div className="hidden xl:block">
          <Policy />
        </div>
      </div>
    );
  };

  const renderDetailSection = () => {
    return (
      <div className="">
        <h2 className="text-2xl font-semibold">Product Details</h2>
        {data.product_details}
      </div>
    );
  };

  const renderReviews = () => {
    return (
      <div className="">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold flex items-center">
          <StarIcon className="w-7 h-7 mb-0.5" />
          <span className="ml-1.5"> 4,87 · 142 Reviews</span>
        </h2>

        {/* comment */}
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
            <ReviewItem />
            <ReviewItem
              data={{
                comment: `I love the charcoal heavyweight hoodie. Still looks new after plenty of washes. 
                  If you’re unsure which hoodie to pick.`,
                date: "December 22, 2021",
                name: "Stiven Hokinhs",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `The quality and sizing mentioned were accurate and really happy with the purchase. Such a cozy and comfortable hoodie. 
                Now that it’s colder, my husband wears his all the time. I wear hoodies all the time. `,
                date: "August 15, 2022",
                name: "Gropishta keo",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `Before buying this, I didn't really know how I would tell a "high quality" sweatshirt, but after opening, I was very impressed. 
                The material is super soft and comfortable and the sweatshirt also has a good weight to it.`,
                date: "December 12, 2022",
                name: "Dahon Stiven",
                starPoint: 5,
              }}
            />
          </div>

          <ButtonSecondary
            onClick={() => setIsOpenModalViewAllReviews(true)}
            className="mt-10 border border-slate-300 dark:border-slate-700 "
          >
            Show me all 142 reviews
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  return (
    
    <div className={`nc-ProductDetailPage `}>
      {/* MAIn */}
      <main className="container mt-5 lg:mt-11">
        <div className="lg:flex">
          {/* CONTENT */}
          <div className="w-full lg:w-[55%] ">
            {/* HEADING */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-16 relative">
                111
                <Image
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  src="https://av-ecom-cms.avdemosites.com/uploads/shirt-5-1688117499.png"
                  className="w-full rounded-2xl object-cover"
                  alt="product detail 1"
                />
              </div>
              <ProductBadge badge={data.badge} />
              {/* META FAVORITES */}

              {(!isLoading ? 
                <LikeButton liked={data.wishlist} productid={data.id} className="absolute right-3 top-3 " />
              :null)}
              
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-8 xl:mt-8">
              {[LIST_IMAGES_DEMO[1], LIST_IMAGES_DEMO[2]].map((item, index) => {
                return (
                  <div
                    key={index}
                    className="aspect-w-11 xl:aspect-w-10 2xl:aspect-w-11 aspect-h-16 relative"
                  >
                    <Image
                      sizes="(max-width: 640px) 100vw, 33vw"
                      fill
                      src={item}
                      className="w-full rounded-2xl object-cover"
                      alt="product detail 1"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            {renderSectionContent()}
          </div>
        </div>

        {/* DETAIL AND REVIEW */}
        <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
          <div className="block xl:hidden">
            <Policy />
          </div>

          {renderDetailSection()}

          <hr className="border-slate-200 dark:border-slate-700" />

          {renderReviews()}

          <hr className="border-slate-200 dark:border-slate-700" />

          {/* OTHER SECTION */}
          <SectionSliderProductCard
            heading="Customers also purchased"
            subHeading=""
            headingFontClassName="text-2xl font-semibold"
            headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
          />

          
        </div>
      </main>

      {/* MODAL VIEW ALL REVIEW */}
      <ModalViewAllReviews
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      />
    </div>
  );
};

export default ProductDetailPage;
