"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const IMAGES = [
  "/Follow6.jpg",
  "/Follow1.jpg",
  "/Follow5.png",
  "/Follow2.jpg",
  "/Follow3.jpeg",
  "/Follow4.webp",
];

export default function PhotoStrip() {
  const scroller = useRef<HTMLUListElement | null>(null);
  const [paused, setPaused] = useState(false);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  const getStep = () => {
    const el = scroller.current;
    if (!el) return 0;
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return el.clientWidth * 0.9;
    const styles = getComputedStyle(card);
    const margins =
      parseFloat(styles.marginLeft || "0") + parseFloat(styles.marginRight || "0");
    return card.offsetWidth + margins; // exact card + gap width
  };

  const scrollByCard = (dir: -1 | 1) => {
    const el = scroller.current;
    if (!el) return;
    const step = getStep();
    const max = el.scrollWidth - el.clientWidth;
    const next = el.scrollLeft + dir * step;

    if (next >= max - 2) {
      // wrap instantly to the start for seamless loop
      el.scrollTo({ left: 0, behavior: "auto" });
    } else if (next <= 0 && dir === -1) {
      // wrap to end if going backwards
      el.scrollTo({ left: max, behavior: "auto" });
    } else {
      el.scrollBy({ left: dir * step, behavior: "smooth" });
    }
  };

  // --- autoplay ---
  useEffect(() => {
    if (paused) return;
    const el = scroller.current;
    if (!el) return;

    const interval = setInterval(() => {
      scrollByCard(1);
    }, 2000); // <-- change speed here (ms between slides)

    return () => clearInterval(interval);
  }, [paused]);

  // pause on user interaction + resume after idle
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const pauseShortly = () => {
      setPaused(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setPaused(false), 2000); // resume delay
    };

    const onEnter = () => setPaused(true);
    const onLeave = () => setPaused(false);

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onEnter, { passive: true });
    el.addEventListener("touchend", onLeave, { passive: true });
    el.addEventListener("wheel", pauseShortly, { passive: true });
    el.addEventListener("scroll", pauseShortly, { passive: true });

    const vis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", vis);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onEnter as any);
      el.removeEventListener("touchend", onLeave as any);
      el.removeEventListener("wheel", pauseShortly as any);
      el.removeEventListener("scroll", pauseShortly as any);
      document.removeEventListener("visibilitychange", vis);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <section className="w-full py-10 px-16 relative">
      {/* header */}
          <div className='absolute overflow-hidden bg-[#22c55e]  blur-[139px]  -left-10 h-[120px] w-[120px]'></div>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-white font-[600] text-[44px] leading-[53px]">
          Follow <span className="bg-gradient-to-r from-green-500 to-green-500 bg-clip-text text-transparent">Us</span>
        </h1>
        <p className="mt-2 text-[14px] text-gray-300">Learn more about us on Instagram!</p>
        <div className="mt-4">
          <button className="font-semibold border px-6 py-2.5 text-[13.5px] rounded-full border-green-500 text-green-500">
            Follow
          </button>
        </div>
      </div>

      {/* strip */}
      <div className="mt-10 relative">
        {/* Prev / Next */}
        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Previous"
          className="absolute -left-10 top-1/2 z-50 -translate-y-1/2"
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M15 6l-6 6 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => scrollByCard(1)}
          aria-label="Next"
          className="absolute -right-10 top-1/2 z-50 -translate-y-1/2"
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <ul
          ref={scroller}
          className="flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none]"
        >
          <style jsx>{`ul::-webkit-scrollbar { display: none; }`}</style>
          {IMAGES.map((src, i) => (
            <li
              key={i}
              data-card
              className="relative snap-start shrink-0 w-[225px] h-[225px] rounded-3xl overflow-hidden bg-[#181616] mx-[11.5px]"
            >
              <div className="bg-[#0000003e] absolute inset-0 z-10" />
              <Image
                src={src}
                alt={`gallery-${i + 1}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                priority={i < 2}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
