"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from './logo.png'
import Image from 'next/image';
import LogoutButton from './LogoutButton';
import { FaBars, FaHamburger } from "react-icons/fa";

import { AiOutlineClose } from 'react-icons/ai';
import { GiHamburger } from 'react-icons/gi';

interface NavbarProps {
  user: { email: string } | null;
}

export default function Navbar({ user } : NavbarProps) {
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { href: "/", label: "Scan" },
    { href: "/items", label: "Items" },
  ];
  return (
    <>
      <header className="sm:px-8 px-4 z-10 w-full">
        <nav className="flex justify-between items-center max-container z-10">
          <Link href="/">
          <Image
            src={Logo}
            alt="logo"
            width={90}
            quality={100}
            placeholder="blur"
           
          />
          </Link>
          <ul className="flex-1 flex ml-12 mr-auto gap-16 max-lg:hidden">
            {navLinks.map((item) => (
              <li key={item.label} className=''>
                <a
                  href={item.href}
                  className="font-montserrat leading-normal text-lg text-slate-gray"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="max-lg:hidden flex gap-16">
            <p>{user?.email}</p>
            <LogoutButton />
          </div>
          <div
            className="hidden max-lg:block cursor-pointer"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <LogoutButton />
            {/*<FaBars className="text-4xl text-primary" />*/}
          </div>
        </nav>
      </header>
      { /* isMenuOpen && (
        <div>
          
          <nav className="fixed top-0 right-0 left-0 bottom-0 lg:bottom-auto bg-slate-100  ">
          <div className="flex w-full">
              <div
                className="hidden w-1/4 max-lg:block fixed right-0 py-4 cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
              >
                <AiOutlineClose className="text-4xl" />
              </div>
              <ul className="w-3/4 lg:hidden flex flex-col items-center justify-center h-full mr-auto">
                {navLinks.map((item) => (
                  <li className='mb-4 font-bold text-primary' key={item.label}>
                    <Link
                      href={item.href}
                      className="font-montserrat leading-normal text-lg text-slate-gray"
                    />
                    {item.label}
                  </li>
                ))}
                <li className='mb-4'>
                  {" "}
                  <p>{user?.email}</p>
                </li>
                <li>
                  <LogoutButton />
                </li>
              </ul>
                </div>
          </nav>
        </div>
                )*/}
    </>
  );
}
