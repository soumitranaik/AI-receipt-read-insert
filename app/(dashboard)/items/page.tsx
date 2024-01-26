import React from 'react'
import ItemsList from './ItemsList'

export default function page() {


  return (
    <div className='lg:mx-32 mx-0' >
      <h2 className='text-center text-2xl mb-12'>Items</h2>
      <ItemsList />
    </div>
  );
}
