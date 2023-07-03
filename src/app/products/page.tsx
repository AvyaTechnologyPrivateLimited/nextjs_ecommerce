"use client";

import React, { useEffect, useState } from "react";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard";
import TabFilters from "@/components/TabFilters";
import config from '../../custom/config';
import axios from 'axios'; 
import { redirect } from 'next/navigation'
import Cookies from "js-cookie";

const PageCollection = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [recordsPerPage] = useState(5);

  const [filtersData, setFiltersData] = useState([]);


  const getFilteredData = (filtersData:any) => {
    setFiltersData(filtersData);
    
    fetchProducts(filtersData);
    //console.log(filtersData);
  };

  const fetchProducts = async (filtersData:any) => {
    try {
      let headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get("access_token"),
      }
      const response = await axios.get(`${config.API_URL}products?page=${currentPage}${filtersData}`, { headers: headers });
      const data = await response.data;
      setProducts(data.data);
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(filtersData);
  }, [currentPage]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  //const currentRecords = products.slice(indexOfFirstRecord, indexOfLastRecord);

  const nPages = Math.ceil(products.length / recordsPerPage);

  const nextPage = () => {
    if(currentPage !== nPages) 
        setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
      if(currentPage !== 1) 
          setCurrentPage(currentPage - 1)
  }

  const handlePageChange = (pageNumber:any) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    pageNumbers.push(
        <button onClick={prevPage}
          className="inline-flex w-11 h-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-6000 dark:bg-neutral-900">
          Pre
        </button>
    );

    for (let i = 1; i <= lastPage; i++) {
      let active_page = currentPage === i ? 'bg-primary-6000 cursor-default text-white focus:outline-none' : 'bg-white hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:border-neutral-700';
      pageNumbers.push(
        
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-6000 dark:bg-neutral-900 ${active_page}`}
          /*className={currentPage === i ? 'active' : ''}*/
        >
          {i}
        </button>
      );
    }

    pageNumbers.push(
      <button  onClick={nextPage}
        className="inline-flex w-11 h-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-6000 dark:bg-neutral-900">
        Next
      </button>
    );

    return pageNumbers;
  };

  return (
    <div className={`nc-PageCollection`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Products
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              We not only help you design exceptional products, but also make it
              easy for you to share your designs with more like-minded people.
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          <main>

            {/* TABS FILTER */}
            <TabFilters getFilteredData={getFilteredData} />

            {/* LOOP ITEMS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
              {products.map((item, index) => (
                <ProductCard data={item} key={index} />
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
              
              <nav
                  className="nc-Pagination inline-flex space-x-1 text-base font-medium"
                >
                {renderPageNumbers()}
              </nav>
              
            </div>

          </main>
        </div>

        {/* === SECTION 5 === */}
        <hr className="border-slate-200 dark:border-slate-700" />

        <SectionSliderCollections />
        <hr className="border-slate-200 dark:border-slate-700" />

        {/* SUBCRIBES */}
        <SectionPromo1 />
      </div>
    </div>
  );
};

export default PageCollection;
