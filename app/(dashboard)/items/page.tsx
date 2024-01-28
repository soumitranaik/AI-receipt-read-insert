import React from 'react'
import ItemsList from './ItemsList'
import Link from 'next/link';
import { BsPlusCircleFill } from 'react-icons/bs';


export default function page() {


  return (
    <div className="lg:mx-32 mx-0">
      <div className="flex items-center">
        <h2 className="text-2xl mb-12 mr-auto">Items</h2>
        <Link href='/'><BsPlusCircleFill className='mb-12 text-4xl mr-1 text-primary' /></Link>
      </div>

      <ItemsList />
    </div>
  );
}
