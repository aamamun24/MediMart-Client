"use client"
import Image from 'next/image';
import React from 'react'

export default function AboutUs() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 container mx-auto mt-10 gap-8 px-5 mb-28">
          
          
          <div className="relative flex justify-center lg:justify-end">
        
            <div className="relative w-full lg:w-3/4 h-[400px]">
              <Image
                src="https://plus.unsplash.com/premium_photo-1668487826666-baa00865bc13?q=80&w=1412&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="About Image 1"
                fill
                className="rounded-tr-2xl rounded-bl-2xl object-cover"
                sizes="(max-width: 1024px) 100vw, 75vw"
              />
            </div>
            
          
            <div className="w-[60vw] sm:w-[40vw] md:w-[30vw] lg:w-[25vw] h-[250px] absolute left-5 -bottom-20 hidden xl:block">
              <Image
                src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="About Image 2"
                fill
                className="rounded-tr-2xl rounded-bl-2xl border-t-8 border-r-8 border-t-white border-r-white shadow-lg object-cover"
                sizes="(max-width: 1536px) 25vw, 384px"
              />
            </div>
          </div>
    
          <div className="flex flex-col justify-center text-center lg:text-left space-y-6 px-6">
  <h1 className="text-4xl font-bold text-teal-600 relative inline-block mb-4">
    <span className="border-b-4 border-teal-400 pb-1">About FineMed</span>
  </h1>
  <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto lg:mx-0 font-medium">
    Welcome to <span className="text-teal-600 font-semibold">FineMed</span> — where your health is our priority.
    We provide <span className="text-teal-500 font-semibold">safe</span>, <span className="text-teal-500 font-semibold">affordable</span>, 
    and <span className="text-teal-500 font-semibold">reliable</span> medicines, ensuring everyone has access to quality care.
    <br className="hidden lg:block" />
    Join us in making healthcare simpler, smarter, and more compassionate.
  </p>
</div>

        </div>
    );
}