import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react';
import { cookies } from 'next/headers';

const getTickets = async() => {
    const supabase =  createServerComponentClient({cookies})
    const {data, error} = await supabase.from('Orders').select();

    if (error) {
        console.log(error)
    }
    if(data){
        return data;
    }
}

export default async function ItemsList() {
    const items = await getTickets();
 
    
  return (
    <>
    

<div className="overflow-x-auto shadow-md rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-primary dark:text-cyan-800">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-cyan-900 dark:text-white">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Quantity
                </th>
            
                <th scope="col" className="px-6 py-3">
                    Price
                </th>

            </tr>
        </thead>
        <tbody>
            { items?.map((item) => {
                return (
                  <tr className="odd:bg-white odd:dark:bg-cyan-200 even:bg-gray-50 even:dark:bg-cyan-300 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-primary"
                    >
                      {item.Item}
                    </th>
                    <td className="px-6 py-4">{item.Quantity}</td>

                    <td className="px-6 py-4">Rs. {item.Price}</td>
                  </tr>
                );
             })
                            
            }
            
        </tbody>
    </table>
</div>


    </>
  )
}
