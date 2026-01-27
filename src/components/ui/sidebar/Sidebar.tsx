'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  IoCloseOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoTicketOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoShirtOutline,
  IoPeopleOutline,
} from 'react-icons/io5';

import clsx from 'clsx';

import { signOut, useSession } from '@/lib/auth-client';

import { SidebarItem } from './SidebarItem';
import { useUIStore } from '@/store';

const userMenu = [
  { href: '/profile', label: 'Perfil', icon: IoPersonOutline },
  { href: '/', label: 'Órdenes', icon: IoTicketOutline },
];

const adminMenu = [
  { href: '/', label: 'Productos', icon: IoShirtOutline },
  { href: '/', label: 'Órdenes', icon: IoTicketOutline },
  { href: '/', label: 'Usuarios', icon: IoPeopleOutline },
];

export const Sidebar = () => {
  const router = useRouter();
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === 'admin';

  const handleLogout = async () => {
    await signOut();
    closeMenu();
    router.refresh();
  };

  return (
    <>
      {/* Overlay */}

      {isSideMenuOpen && (
        <>
          <div className='fixed inset-0 z-10 bg-black/30' />
          <div
            className='fixed inset-0 z-10 backdrop-blur-sm'
            onClick={closeMenu}
          />
        </>
      )}

      {/* Sidebar */}
      <nav
        className={clsx(
          'fixed right-0 top-0 z-20 h-screen w-100 bg-white p-5 shadow-2xl duration-300',
          {
            'translate-x-full': !isSideMenuOpen,
          },
        )}
      >
        <IoCloseOutline
          size={40}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={closeMenu}
        />

        {/* Search */}
        <div className='relative mt-14'>
          <IoSearchOutline size={20} className='absolute top-2 left-2' />
          <input
            type='text'
            placeholder='Buscar'
            className='w-full rounded bg-gray-50 py-1 pl-10 pr-10 text-xl border-b-2 border-gray-200 focus:outline-none focus:border-blue-500'
          />
        </div>

        {isAuthenticated && (
          <>
            {/* User menu */}
            <div className='mt-10 space-y-2'>
              {userMenu.map((item) => (
                <SidebarItem
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  Icon={item.icon}
                  onClick={closeMenu}
                />
              ))}
            </div>
            <button
              className=' w-full flex items-center p-2 rounded hover:bg-gray-100 transition-all'
              onClick={handleLogout}
            >
              <IoLogOutOutline size={30} />
              <span className='ml-3 text-xl'>Salir</span>
            </button>
          </>
        )}

        {!isAuthenticated && (
          <Link
            href={'/auth/login'}
            className='flex items-center p-2 rounded hover:bg-gray-100 transition-all'
            onClick={closeMenu}
          >
            <IoLogInOutline size={30} />
            <span className='ml-3 text-xl'>Ingresar</span>
          </Link>
        )}

        {isAdmin && (
          <>
            {/* Separator */}
            <div className='my-10 h-px w-full bg-gray-200' />

            {/* Admin menu */}
            <div className='space-y-2'>
              {adminMenu.map((item) => (
                <SidebarItem
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  Icon={item.icon}
                  onClick={closeMenu}
                />
              ))}
            </div>
          </>
        )}
      </nav>
    </>
  );
};
