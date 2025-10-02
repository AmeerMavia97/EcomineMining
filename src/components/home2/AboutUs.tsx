"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function useParallaxFast(strength = 240, curve = 0.55) {
    const ref = useRef<HTMLDivElement>(null);
    const [y, setY] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let raf = 0;
        let active = false;

        const tick = () => {
            if (!active) return;
            const rect = el.getBoundingClientRect();
            const total = rect.height + window.innerHeight;
            const scrolled = Math.min(Math.max(window.innerHeight - rect.top, 0), total);
            let p = scrolled / total;
            p = Math.pow(p, curve);
            setY((p * 2 - 1) * strength);
            raf = requestAnimationFrame(tick);
        };

        const io = new IntersectionObserver(([entry]) => {
            active = entry.isIntersecting;
            if (active) {
                cancelAnimationFrame(raf);
                raf = requestAnimationFrame(tick);
            } else {
                cancelAnimationFrame(raf);
            }
        }, { threshold: 0 });

        io.observe(el);
        return () => {
            io.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [strength, curve]);

    return { ref, y };
}

export default function AboutUs() {
    const { ref, y } = useParallaxFast(260, 0.5);

    return (
        <section ref={ref} className="w-full bg-[#101010] py-20 relative">
            <div className='absolute overflow-hidden bg-[#22c55e]  blur-[139px]  -right-10 h-[180px] w-[180px]'></div>

            <div className=" grid grid-cols-1 gap-8 lg:grid-cols-2 place-items-center">
                {/* Left card */}
                <article className="flex flex-col gap-6 text-white relative z-50 ">
                    <div className='flex relative -mb-3'>
                        <div className='text-transparent z-10 -mr-10 border-solid border-[2px] border-white px-4 rounded-full py-0'>.</div>
                        <div className='text-transparent ml-5 z-20  bg-green-600 px-5 py-5 rounded-full'></div>
                    </div>
                    <div className=' text-white'>
                        <h1 className='font-[600] sm:w-[80%] text-[34px] leading-[44px] sm:text-[44px] sm:leading-[53px]'>About <span className='bg-gradient-to-r from-green-500 to-green-500 bg-clip-text text-transparent '>Ecomine </span> Hosting</h1>
                    </div>
                    <p className="text-[14px] sm:text-[16px] leading-[19px] sm:w-[80%] text-gray-300 ">
                        For several years now, we&apos;ve been exploring the four corners of the globe…
                    </p>
                    <div className="mt-2">
                        <button className="!font-semibold border-[1px] px-7 py-3 text-[12.5px] sm:text-[13.5px] rounded-full border-green-500 text-green-500">Learn More</button>
                    </div>
                </article>

                {/* RIGHT: frame with BG parallax */}
                <div className="relative h-[320px] sm:h-[400px] w-full overflow-hidden rounded-[10px] border border-white/10">
                    {/* dark overlay like your design */}
                    <div className="pointer-events-none absolute inset-0 z-10 bg-black/20" />
                    {/* BG layer we move */}
                    <div
                        className="absolute inset-0 will-change-transform"
                        style={{
                            transform: `translate3d(0, ${y}px, 0) scale(1.22)`,
                            backgroundImage: "url('/AboutUS.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    />
                    <div
                        className="absolute -mt-[20%] inset-0 will-change-transform"
                        style={{
                            transform: `translate3d(0, ${y}px, 0) scale(1.22)`, // scale gives bleed to prevent gaps
                            backgroundImage: "url('/AboutUS.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    />
                </div>

                <div className='absolute overflow-hidden bg-[#22c55e]  blur-[139px] -bottom-20 -left-10 h-[100px] w-[110px]'></div>
            </div>
        </section>
    );
}
