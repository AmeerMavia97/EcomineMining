// @ts-nocheck

"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Bitcoin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Carousel from "./Carousel";

// Define RootState interface for TypeScript
interface RootState {
    auth: {
        isAuthenticated: boolean;
    };
}

const MiningHeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const router = useRouter();

    // Get authentication state from Redux
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    // Handle button click based on authentication
    const handleStartMiningClick = () => {
        if (isAuthenticated) {
            router.push("/shop/");
        } else {
            router.push("/auth/signin/");
        }
    };

    const slides = [
        {
            title: "Start Mining",
            subtitle: "Today",
            subheader: "",
            description:
                "Your  solution for buying, selling, and mining cryptocurrencies",
            image: "/hh.png",
            stats: [
                {
                    value: "98%",
                    label: "Average Uptime",
                    subtext: "With stable & secure infrastructures",
                },
                {
                    value: "$0.055",
                    prefix: "From",
                    label: "per KW/h",
                    subtext: "The best rates on the market",
                },
                {
                    value: "10MW",
                    label: "Under Management",
                    subtext: "An ever-expanding portfolio of data centers",
                },
                {
                    value: "5000+",
                    label: "Ecominex Sold",
                    subtext: "We sell and deliver worldwide",
                },
            ],
        },
    ];

    const nextSlide = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setTimeout(() => setIsAnimating(false), 700);
        }
    };

    const prevSlide = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
            setTimeout(() => setIsAnimating(false), 700);
        }
    };

    return (
        <>
            <section className=" py-20">
                <div className="">
                    <div className="text-white flex flex-col gap-4">
                        <div className="flex items-center justify-between leading-[60px]">
                            <h1 className="font-[600] text-[60px]">Start Mining Today </h1>
                            <div className="flex gap-2.5 mt-3">
                                  <div className='absolute overflow-hidden bg-[#22c55e] -right-10 top-30 blur-[139px]  h-[350px] w-[208px]'></div>


                                {["Instagram", "Twitter", "LinkedIn"].map((platform , index) => (
                                    <span key={index} className="bg-[#5e7467a4] px-3 py-[11px] rounded-full relative z-50">
                                        <svg
                                            className="h-5 w-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            {platform === "Instagram" && (
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                            )}
                                            {platform === "Twitter" && (
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                            )}
                                            {platform === "LinkedIn" && (
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            )}
                                        </svg>
                                    </span>
                                ))}

                            </div>
                        </div>
                        <span className="flex items-center gap-2 leading-[40px]">
                            <span className="w-10  h-1 text-white bg-white"></span>
                            <h3 className="text-[34px] tracking-tighter font-[500] italic">Turnkey Solution</h3>
                        </span>
                        <p className="text-[15px] w-[40%] leading-[20px]">Your solution for buying, selling, and mining cryptocurrencies</p>
                        <button className="w-max mt-2 bg-green-500 font-[600] text-[15px] rounded-full px-8 py-2.5">Let&apos;s Start</button>
                    </div>
                </div>
                <div className="flex items-center mt-14 relative !z-50">
                     <div className='absolute overflow-hidden bg-[#22c55e]  blur-[139px]  -left-10 h-[180px] w-[208px]'></div>
                    <div className="grid grid-cols-2 gap-4 mt-4 relative z-50 w-[47%]">
                        <div className="bg-[#292929]  py-5.5 rounded-[10px] pl-6 flex flex-col justify-center">
                            <h3 className="text-green-500 font-[550] leading-[38px] text-[30px]">98%</h3>
                            <h6 className="font-[550] text-white text-[16px] leading-[34px]">Average Uptime</h6>
                            <p className="font-[400] text-[#d5d5d5] text-[13.5px] w-[80%]  leading-[18px]">With stable & secure infrastructures</p>
                        </div>
                        <div className="bg-[#292929]  py-5.5 rounded-[10px] pl-6 flex flex-col justify-center gap-0.5">
                            <h3 className="text-green-500 font-[550] leading-[32px] text-[18px]">From
                                <span className="text-[27px]"> $0.02</span></h3>
                            <h6 className="font-[550] text-white text-[16.5px] leading-[34px]">per KW/h</h6>
                            <p className="font-[400] text-[#d5d5d5] text-[13.5px] w-[80%]  leading-[18px]">The best rates on the market.</p>
                        </div>
                        <div className="bg-[#292929] py-6 rounded-[10px] flex flex-col gap-1  pl-6">
                            <h3 className="text-green-500 font-[550] leading-[38px] text-[28px]">10MW</h3>
                            <h6 className="font-[550] text-white text-[16.5px] leading-[22px] w-[%]">Under Management</h6>
                            <p className="font-[400] text-[#d5d5d5] text-[13.5px] w-[80%]  leading-[18px]">An ever-expanding portfolio of data centers.</p>
                        </div>
                        <div className="bg-[#292929]  py-5.5 rounded-[10px] pl-6 flex flex-col justify-center">
                            <h3 className="text-green-500 font-[550] leading-[38px] text-[30px]">5000</h3>
                            <h6 className="font-[550] text-white text-[16.5px] leading-[34px]">Miners Sold</h6>
                            <p className="font-[400] text-[#d5d5d5] text-[13.5px] w-[80%]  leading-[18px]">We sell and deliver worldwide</p>
                        </div>
                    </div>
                    <div className="absolute right-0 -top-28 z-20">
                        <Carousel />
                    </div>
                </div>
            </section>
        </>
    );
};

export default MiningHeroSlider;
