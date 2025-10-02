"use client";

import { useEffect, useState } from "react";

type Loc = {
    id: string;
    label: string;
    x: number; // % from left
    smx: number; // % from left
    smy: number; // % from left
    y: number; // % from top
    stats: { electricity: string; climate: string; lead: string };
};

const LOCATIONS: Loc[] = [
    { id: "uae", label: "Canada", smx: 50, smy: 56, x: 94, y: 56, stats: { electricity: "0.06 € / kWh", climate: "Dry and hot", lead: "30 days" } },
    { id: "usa", label: "UAE", smx: 50, smy: 56, x: 27, y: 17, stats: { electricity: "0.10–0.14 € / kWh", climate: "Varies by state", lead: "20–45 days" } },
    { id: "russia", label: "Kazakhstan", smx: 50, smy: 56, x: 85, y: 24, stats: { electricity: "0.05–0.07 € / kWh", climate: "Cold/continental", lead: "40–60 days" } },
    { id: "oman", label: "USA", smx: 50, smy: 56, x: 96, y: 60, stats: { electricity: "0.07 € / kWh", climate: "Hot desert", lead: "25–35 days" } },
];


export default function StrategicSection() {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 550);
    const [active, setActive] = useState<Loc | null>(null)

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 550);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);





    return (
        <section className="w-full bg-[#111] pt-10 pb-20 ">
            <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-14 sm:gap-20 place-items-center ">

                {/* LEFT: globe + pins */}
                <div
                    className="relative aspect-[3/3] w-full overflow-visible flex flex-col justify-center items-center "
                    onMouseLeave={() => setActive(null)}
                >
                    <div
                        className="absolute inset-0  rounded-[28px] w-[100%] sm:h-[480px]"
                        style={{
                            backgroundImage: "url('/map-planet.webp')",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center center",
                        }}
                    />

                    {/* pins */}
                    {LOCATIONS.map((loc) => {
                        const isActive = active?.id === loc.id;

                        const x = isSmallScreen ? loc.smx : loc.x;
                        const y = isSmallScreen ? loc.smy : loc.y;
                        return (
                            <button
                                key={loc.id}
                                className={`absolute -translate-x-1/2 -translate-y-1/2 outline-none `}
                                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                                aria-label={`Select ${loc.label}`}
                                onMouseEnter={() => setActive(loc)}
                                onFocus={() => setActive(loc)}
                                onClick={() => setActive(loc)} // mobile fallback
                            >
                                <span
                                >
                                    <svg className={`block h-6 w-6 rounded-full transition-transform hover:scale-110 ${isActive
                                        ? "text-green-300"
                                        : "text-green-500"
                                        } `} id="pin-usa" xmlns="http://www.w3.org/2000/svg" width=" 100%" height=" 100%" viewBox="0 0 28 28" fill="none"><path d="M21.9157 7.42299C21.2522 6.11483 20.2705 4.99445 19.0609 4.16487C17.8512 3.33528 16.4524 2.8231 14.9931 2.67541C14.3329 2.60917 13.6678 2.60917 13.0076 2.67541C11.5483 2.82319 10.1495 3.33536 8.93981 4.16485C7.7301 4.99434 6.74826 6.11455 6.08451 7.42255C5.2494 9.09148 4.92683 10.9702 5.15743 12.8221C5.38803 14.674 6.16149 16.4163 7.38038 17.8294L13.3242 25.0559C13.4063 25.1558 13.5094 25.2362 13.6263 25.2914C13.7432 25.3466 13.8708 25.3753 14.0001 25.3753C14.1294 25.3753 14.257 25.3466 14.3739 25.2914C14.4908 25.2362 14.594 25.1558 14.676 25.0559L20.6198 17.8294C21.8387 16.4164 22.6122 14.6742 22.8428 12.8223C23.0734 10.9705 22.7508 9.09184 21.9157 7.42299ZM14.0001 14.875C13.3079 14.875 12.6312 14.6697 12.0556 14.2852C11.48 13.9006 11.0314 13.3539 10.7665 12.7144C10.5016 12.0749 10.4323 11.3711 10.5674 10.6922C10.7024 10.0133 11.0357 9.38962 11.5252 8.90014C12.0147 8.41065 12.6384 8.07731 13.3173 7.94226C13.9962 7.80721 14.7 7.87653 15.3395 8.14143C15.979 8.40634 16.5257 8.85494 16.9102 9.43052C17.2948 10.0061 17.5001 10.6828 17.5001 11.375C17.499 12.3029 17.1299 13.1925 16.4738 13.8487C15.8176 14.5048 14.928 14.8739 14.0001 14.875Z" fill="currentColor"></path></svg>
                                </span>

                            </button>
                        );
                    })}

                    {/* floating info card (only when active) */}
                    {active && (() => {
                        const x = isSmallScreen ? active.smx : active.x;
                        const y = isSmallScreen ? active.smy : active.y;

                        return (
                            <div
                                className="pointer-events-none absolute z-10 w-[330px] -translate-x-1/2 -translate-y-[115%] rounded-2xl border border-white/10 bg-[#242424] p-6 text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all"
                                style={{ left: `${x}%`, top: `${y}%` }}
                                aria-live="polite"
                            >
                                <h4 className="mb-3 text-lg sm:text-xl font-extrabold">{active.label}</h4>
                                <div className="space-y-1.5 text-[14px] sm:text-[15px]">
                                    <p><span className="font-semibold">Electricity cost:</span> {active.stats.electricity}</p>
                                    <p><span className="font-semibold">Climate:</span> {active.stats.climate}</p>
                                    <p><span className="font-semibold">Lead time:</span> {active.stats.lead}</p>
                                </div>
                                <span className="absolute left-1/2 top-full hidden sm:block h-3 w-3 -translate-x-1/2 -translate-y-1 rotate-45 bg-[#242424] border-r border-b border-white/10" />
                            </div>
                        );
                    })()}

                </div>

                <div
                    className="flex flex-col justify-center "

                >
                    <div className=' text-white'>
                        <h1 className='font-[600] text-[34px] leading-[43px] sm:text-[44px] sm:leading-[53px]'><span className='bg-gradient-to-r from-green-500 to-green-500 bg-clip-text text-transparent'>Strategic </span>key locations</h1>
                    </div>
                    <p className="mt-3 text-[13.5px] sm:text-[14px] sm:w-[80%] text-gray-300">
                        Global presence for reliable, cost-efficient mining operations
                    </p>

                    <div onMouseLeave={() => setActive(null)} className="mt-5 sm:mt-8 grid grid-cols-2 gap-4 sm:gap-5 max-w-sm">
                        {LOCATIONS.map((loc) => {
                            const isActive = active?.id === loc.id;
                            return (
                                <button
                                    key={loc.id}
                                    onMouseEnter={() => setActive(loc)}
                                    onFocus={() => setActive(loc)}
                                    onClick={() => setActive(loc)}
                                    aria-pressed={isActive}
                                    className={`rounded-2xl py-3.5 sm:px-3 sm:py-4 text-[15px] sm:text-lg font-extrabold transition ${isActive
                                        ? "bg-green-500 text-white shadow-[0_10px_30px_rgba(75,144,139,0.35)]"
                                        : "bg-[#2a2a2a] text-white/90 hover:bg-[#333]"
                                        }`}
                                >
                                    {loc.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section >
    );
}
