"use client";
import React, { useEffect, useState } from "react";
import NavigationItem from "./NavigationItem";
import ncNanoId from "@/utils/ncNanoId";
import config from '../../custom/config';
import axios from 'axios'; 

function Navigation() {

  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.API_URL}categories`);
        const data = await response.data;
        setCategories(data);
        //console.log(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const MEGAMENU_TEMPLATES = [{
    id: ncNanoId(),
    href: "/#",
    name: "Explore",
    children: categories,
  }]

  const menu = [
    {
      id: ncNanoId(),
      href: "/",
      name: "Home",
    },
    {
      id: ncNanoId(),
      href: "/category",
      name: "Collections",
      type: "megaMenu",
      children: MEGAMENU_TEMPLATES,
    }
  ];

  return (
    <ul className="nc-Navigation flex items-center">
      {menu.map((item: any) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
