"use client";

import React from "react";
//import { usePathname } from "next/navigation";
import HeaderLogged from "@/components/Header/HeaderLogged";
import { useThemeMode } from "@/hooks/useThemeMode";

const SiteHeader = () => {
  useThemeMode();

  //let pathname = usePathname();

  return <HeaderLogged />
};

export default SiteHeader;
