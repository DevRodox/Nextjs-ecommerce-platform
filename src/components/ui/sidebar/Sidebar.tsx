'use client';

import {
  IoCloseOutline, 
  IoSearchOutline,
  IoPersonOutline,
  IoTicketOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoShirtOutline,
  IoPeopleOutline,
} from "react-icons/io5";

import { SidebarItem } from "./SidebarItem";

const userMenu = [
  { href: "/", label: "Perfil", icon: IoPersonOutline },
  { href: "/", label: "Órdenes", icon: IoTicketOutline },
  { href: "/", label: "Ingresar", icon: IoLogInOutline },
  { href: "/", label: "Salir", icon: IoLogOutOutline },
];

const adminMenu = [
  { href: "/", label: "Productos", icon: IoShirtOutline },
  { href: "/", label: "Órdenes", icon: IoTicketOutline },
  { href: "/", label: "Usuarios", icon: IoPeopleOutline },
];

export const Sidebar = () => {
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-10 bg-black/30" />
      <div className="fixed inset-0 z-10 backdrop-blur-sm" />

      {/* Sidebar */}
      <nav className="fixed right-0 top-0 z-20 h-screen w-100 bg-white p-5 shadow-2xl">
        <IoCloseOutline
          size={40}
          className="absolute top-5 right-5 cursor-pointer"
        />

        {/* Search */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full rounded bg-gray-50 py-1 pl-10 pr-10 text-xl border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* User menu */}
        <div className="mt-10 space-y-2">
          {userMenu.map(item => (
            <SidebarItem
              key={item.label}
              href={item.href}
              label={item.label}
              Icon={item.icon}
            />
          ))}
        </div>

        {/* Separator */}
        <div className="my-10 h-px w-full bg-gray-200" />

        {/* Admin menu */}
        <div className="space-y-2">
          {adminMenu.map(item => (
            <SidebarItem
              key={item.label}
              href={item.href}
              label={item.label}
              Icon={item.icon}
            />
          ))}
        </div>
      </nav>
    </>
  );
};
