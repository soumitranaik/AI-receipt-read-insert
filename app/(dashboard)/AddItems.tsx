import { Span } from 'next/dist/trace';
import React, { useState } from 'react';

interface AIResponseProps {
   respAI?: any
}

export default function AddItems({respAI} : AIResponseProps) {
  
  const AIrespstring = '[{"Item": "Shirt and jeans", "Quantity": 1, "Price": 800.00}, {"Item": "Shirt and jeans 3", "Quantity": 13, "Price": 8300.00}]'
  

  const [isLoading , setIsloading] = useState(false)
  const handleaddItems = async() => {
    const parsedAIresponse =  respAI ? JSON.parse(respAI) : null;

    console.log("respai", respAI)
    
    setIsloading(true);
     
    

   
    console.log("parsedairesp=", parsedAIresponse)

    const newitemsarray = []

    for (const item of parsedAIresponse) {
      const newitems = {
        Item: item.Item, 
        Quantity: item.Quantity ,
        Price: item.Price
      }

      newitemsarray.push(newitems);
    }

    
   
    const res = await fetch ("/api/items", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newitemsarray)
    })

    console.log("newitemsarray", newitemsarray)
    //console.log("airespstr" + AIrespstring)
    const json = await res.json();

    if (json.error) {
      console.log(json.error.message);
      console.log("items" , json.items)
    }

    if (json.data) {
      console.log("added")
      setIsloading(false)
    }
    
    
  } 
  


  return (
    <>
      {
        respAI && <div className="border-t border-primary pt-4">
         
            <p>{respAI}</p>
            {/*<p><span className='font-bold'>Item: </span>{parsedAIresponse?.Item}</p>
            <p><span className='font-bold'>Quantity: </span>{parsedAIresponse?.Quantity}</p>
      <p><span className='font-bold'>Price: </span>Rs. {parsedAIresponse?.Price}</p>*/}

          
        </div>
      }
      { respAI &&
      <div className="flex justify-center">
        <button className="mt-4" disabled={isLoading} onClick={handleaddItems}>
          {isLoading ? <span>Adding...</span> : <span>Add Items to database</span>} 
        </button>
      </div>
}
    </>
  );
}
