// app/components/StepsSection.tsx
import clsx from "clsx";

type Step = { title: string; body: string };

const STEPS: Step[] = [
    {
        title: "Book a call with an advisor to define your goals",
        body:
            "First of all, let's take the time to talk. Book a call with one of our specialist advisors to clearly define your objectives and answer any questions you may have.",
    },
    {
        title: "Choosing & ordering your machines",
        body:
            "We guide you in choosing the best machines for your project. Once you've made your choice, we'll take care of the rest.",
    },
    {
        title: "Your machines are on their way",
        body:
            "Your machines are on their way! Delivery times vary by country, and we'll keep you informed at every stage.",
    },
    {
        title: "Setting up & configuring your machines",
        body:
            "Our team takes care of everything—from installation to configuration—so your machines are up and running quickly.",
    },
    {
        title: "Stay informed in real time about performance",
        body:
            "Track your machines’ performance with our real-time interactive dashboard and relax while we monitor.",
    },
];

// For large screens we place cards on a 6-column grid:
// 01→cols 1-2, 02→3-4, 03→5-6, 04→2-3, 05→4-5
const COL_STARTS = [1, 3, 5, 2, 4];

function StepCard({
    step,
    index,
}: {
    step: Step;
    index: number;
}) {
    return (
        <article
            className={clsx(
                "relative rounded-2xl bg-transparent ",
                " text-gray-300",
                ""
            )}
        >
            {/* faint big step number */}
            <span className="pointer-events-none absolute -top-7 -right-7 text-[70px] font-extrabold leading-none text-white/5 select-none">
                {String(index + 1).padStart(2, "0")}
            </span>
            <span className="pointer-events-none absolute  -right-10 top-20 text-[70px] font-extrabold leading-none text-white/5 select-none border-[1px] border-green-500 h-8">
                
            </span>

            <h3 className="relative z-10 mb-3 text-[19px] w-[80%] font-extrabold leading-tight text-[#f5f5f5]">
                {step.title}
            </h3>
            <p className="relative z-10 text-[13.2px] leading-[17px] text-[#b3b3b3]">
                {step.body}
            </p>
        </article>
    );
}

export default function HowItsWork() {
    return (
        <section className="w-full bg-[#121212] py-14 px-2">
            <div className=' text-white'>
                <h1 className='font-[600] text-[48px]'>How Its <span className='bg-gradient-to-r from-green-500 to-green-500 bg-clip-text text-transparent'>Works</span></h1>
            </div>

            <div className="mt-10">
                <div className="relative">

                    {/* grid */}
                    <div className="grid gap-20 md:grid-cols-2 lg:grid-cols-6 ">
                        {STEPS.map((s, i) => (
                            <div
                                key={i}
                                className={clsx(
                                    "col-span-1 md:col-span-1 bg-transparent",
                                    "lg:col-span-2",
                                    "lg:[grid-column-start:var(--col)]"
                                )}
                                style={
                                    { ["--col" as any]: String(COL_STARTS[i]) }
                                }
                            >
                                <StepCard step={s} index={i} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="items-center flex justify-center mt-16">
                <button className="!font-semibold border-[1px] px-7 py-3 text-[13.5px] rounded-full border-green-500 text-green-500">Talk to an expert</button>
            </div>

            <div className='absolute overflow-hidden bg-[#22c55e]  blur-[139px]  -left-10 h-[120px] w-[160px]'></div>
        </section>
    );
}
