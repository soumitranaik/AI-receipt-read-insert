"use client"

import { OpenAIStream } from "ai";
import { read } from "fs";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import AddItems from "./AddItems";



export default function Home() {

  const [image, setImage] = useState<string>('');
  const [AIresponse, setAIresponse] = useState<string>("");

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      window.alert("No file uploaded");
      return;
    }

    const file = event.target.files[0];

    const reader = new FileReader();
    reader?.readAsDataURL(file);

    reader.onload = () => {
      
      if (reader.result && typeof reader.result === 'string') {
        console.log(reader.result);
        setImage(reader.result);
      } 
    }

    reader.onerror = (error) => {
      console.log("error:", error)
    }
  }


  const handleSubmit = async(event :  FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetch("api/analyzeimage", {
      method: "POST",
      headers: {"Content-Type": "application/JSON"},
      body: JSON.stringify({
        image: image
      })
    })
    .then(async(response: any) => {
      const reader = response.body?.getReader();
      setAIresponse("");
      while (true) {
        const {done, value} =  await reader?.read();
        if (done) {
          break;
        }

        var currentChunk = new TextDecoder().decode(value);
        setAIresponse((prev) => prev + currentChunk)
      }
    })
  }


  return (
    <div className=" min-h-screen flex justify-center items-center text-md">
      <div className="w-full bg-gradient-to-br from-cyan-500 to-cyan-100 max-w-2xl rounded-lg shadow-md p-8">
        <h2 className=" text-2xl mb-4 font-bold text-center">
          AI receipt reader
        </h2>
        {image ? (
          <div className="mb-4 overflow-hidden">
            <img
              src={image}
              className="w-full object-contain max-h-72"
              alt=""
            />
          </div>
        ) : (
          <div className="mb-4 text-center p-8">
            <p>Please upload a receipt</p>
          </div>
        )}

        <form onSubmit={(e) => handleSubmit(e)} className=" bg-inherit">
          <div className="flex flex-col mb-6">
            <label className="mb-2 text-sm font-medium">Upload Image</label>
            <input
              type="file"
              className="text-sm bg-cyan-300 border rounded-lg border-cyan-400 cursor-pointer"
              onChange={(e) => handleImageChange(e)}
              accept="image/*;capture=camera"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-gradient-to-l from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-b focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4"
            >
              Scan Receipt
            </button>
          </div>
        </form>
        <AddItems respAI={AIresponse} />
      </div>
    </div>
  );
}
