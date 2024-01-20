"use client"

import { OpenAIStream } from "ai";
import { read } from "fs";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Home() {

  const [image, setImage] = useState<string>('');
  const [AIresponse, setAIresponse] = useState<string>('');

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
    <div className="min-h-screen flex justify-center items-center text-md">
      <div className="w-full bg-sky-950 max-w-2xl rounded-lg shadow-md p-8">
        <h2 className="text-xl mb-4 font-bold text-center">Review page design</h2>
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
            <p>
              Please Upload an Image
            </p>
          </div>
        )}

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col mb-6">
            <label className="mb-2 text-sm font-medium">Upload Image</label>
            <input
              type="file"
              className="text-sm border rounded-lg cursor-pointer"
              onChange={(e) => handleImageChange(e)}
            />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="rounded-md p-2 bg-sky-500 mb-4">
              Review Image
            </button>
          </div>
        </form>
        {AIresponse && (
          <div className="border-t border-gray-300 pt-4">
            <h2 className="text-xl mb-2">
              <p>{AIresponse}</p>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
