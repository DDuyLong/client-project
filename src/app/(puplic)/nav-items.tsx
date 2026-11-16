"use client";

import Link from "next/link";
import React from "react";

const menuItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Menu",
    href: "/guest/menu",
    // role: true,
  },
  {
    title: "Orders",
    href: "/guest/orders",
    // role: true,
  },
  {
    title: "Login",
    href: "/login",
    hideWhenLogin: true,
  },
  {
    title: "Dashboard",
    href: "/manage/dashboard",
    // role: true,
  },
];

export default function NavItems({ className }: { className: string }) {
  return menuItems.map((item, index) => {
    return (
      <Link key={index} href={item.href} className={className}>
        {item.title}
      </Link>
    );
  });
}
