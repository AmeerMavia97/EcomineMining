import Image from "next/image";

type Card = {
    titleTop: string;
    titleBottom: string;
    description: string;
    bullets: { title: string; body: string }[];
    bgImg: string; // path in /public
};

const CARDS: Card[] = [
    {
        titleTop: "Hosting",
        titleBottom: "services",
        description: "Host your equipment at EcomineX facilities. Secure premises with 24/7 monitoring and on-site experts. We manage everything: installation, maintenance, and repairs.",
        bullets: [
            {
                title: "Host your equipment at EcomineX sites",
                body:
                    "In secure premises, with a team of experts available on site 7 days a week.",
            },
            {
                title: "We manage everything for you",
                body:
                    "From the installation, to maintenance and reparation, we take care of your machines.",
            },
        ],
        bgImg: "/globe-s.svg",
    },
    {
        titleTop: "Purchase of",
        titleBottom: "machines",
        description:"Choose your machine and complete your purchase securely on our platform",
        bullets: [
            {
                title: "A simplified purchasing process",
                body:
                    "Your mining machines are guaranteed for 1 year and at the best price!",
            },
            {
                title: "Fast delivery and installation",
                body:
                    "Have you chosen your machines? EcomineX will take care of delivery, customs clearance and installation.",
            },
        ],
        bgImg: "/Purchases-of-machines.png.webp",
    },
    {
        titleTop: "Updates & Take ",
        titleBottom: "Profit ",
        description: "Get live updates in your EcomineX account dashboard. Track machine performance and receive profits directly.",
        bullets: [
            {
                title: "Your own infrastructure",
                body:
                    "A ready-to-use container, entirely dedicated to your activity.",
            },
            {
                title: "Maximum autonomy, guaranteed performance",
                body:
                    "You control your production from A to Z, with technical support from EcomineX Hosting.",
            },
        ],
        bgImg: "/container.png.webp",
    },
];

export default function ServicesSection() {
    return (
        <section className="w-full bg-transparent pt-20 pb-14 sm:py-20 relative ">
            <div className='text-center items-center flex flex-col text-white'>

                <h1 className='font-[600] text-[36px] sm:text-[48px]'>Our <span className='bg-gradient-to-r from-green-500 to-green-500 bg-clip-text text-transparent'>Services</span></h1>

                <p className='sm:w-[60%] text-[#d2d2d2] text-[12.5px] sm:text-[14.5px]'>We offer you turnkey solutions for getting started in mining, without having to manage

                    the purchase, installation, management and maintenance of the machines.</p>

            </div>
            <div className=" mt-10 z-50 relative px-3">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {CARDS.map((card, i) => (
                        <article
                            key={i}
                            className="relative overflow-hidden rounded-3xl h-[300px] sm:h-[350px] bg-gradient-to-b from-[#1a1a1a] to-[#111] py-12 px-9 shadow-[0_8px_30px_rgb(0,0,0,0.3)] "
                        >
                            <div>
                                <img className="absolute -right-20 top-14 opacity-25" src={card.bgImg} alt="" />
                                <div className="absolute w-full h-full left-0 top-0  bg-[#2e2e2ea2] " />
                            </div>
                            {/* faint background image */}


                            <h3 className="relative z-10 mb-4 leading-tight  font-extrabold tracking-tight text-white">
                                <span className=" text-[29px] sm:text-[32px] leading-[36px] ">{card.titleTop} </span>
                                <span className=" text-[29px] sm:text-[32px] text-green-500">{card.titleBottom}</span>
                            </h3>

                            <ul className="relative z-10 space-y-4">
                                    <li className="pl-0">
                                        <p className="text-gray-300 leading-snug text-[12.5px]">{card.description}</p>
                                    </li>
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
            <div className='absolute overflow-hidden bg-[#22c55e] -right-10 bottom-16 blur-[139px]  h-[350px] w-[208px]'></div>
            <div className="items-center flex justify-center mt-10">
                <button className="!font-semibold border-[1px] px-7 py-3 text-[12.5px] sm:text-[13.5px] rounded-full border-green-500 text-green-500">Calculate my Profits</button>
            </div>
        </section>
    );
}
