import { Activity, Kanban, Layers, Package, Palette, Presentation, Ruler } from "lucide-react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const getRoutes = (pathname: string, params: Params) => {
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Dashboard",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
    },
    // {
    //   href: `/${params.storeId}/settings`,
    //   label: "Settings",
    //   active: pathname === `/${params.storeId}/settings`,
    // },
  ];
  return routes;
};
