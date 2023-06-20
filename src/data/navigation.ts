import { NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";

export const MEGAMENU_TEMPLATES: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/#",
    name: "Explore",
    children: [
      { id: ncNanoId(), href: "/products", name: "Category 1" },
      { id: ncNanoId(), href: "/products", name: "Category 2" },
      { id: ncNanoId(), href: "/products", name: "Category 3" },
      { id: ncNanoId(), href: "/products", name: "Category 4" },
    ],
  }
];

const OTHER_PAGE_CHILD: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/products",
    name: "Category Pages",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/products",
        name: "Category page 1",
      },
      {
        id: ncNanoId(),
        href: "/products",
        name: "Category page 2",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/cart",
    name: "Cart Page",
  },
  {
    id: ncNanoId(),
    href: "/checkout",
    name: "Checkout Page",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Search Page",
  },
  {
    id: ncNanoId(),
    href: "/account",
    name: "Account Page",
  }
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
  },
  /*{
    id: ncNanoId(),
    href: "/category-2",
    name: "Women",
  },
  {
    id: ncNanoId(),
    href: "/products",
    name: "Beauty",
  },

  {
    id: ncNanoId(),
    href: "/category-2",
    name: "Sport",
  },*/
  {
    id: ncNanoId(),
    href: "/products",
    name: "Collections",
    type: "megaMenu",
    children: MEGAMENU_TEMPLATES,
  },
  /*{
    id: ncNanoId(),
    href: "/search",
    name: "Explore",
    type: "dropdown",
    children: OTHER_PAGE_CHILD,
  },*/
];
