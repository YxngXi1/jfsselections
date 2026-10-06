import Link from "next/link";

const voteInfo = {
  date: "Thursday, October 8th",           
  time: "11:00 AM - 2:46 PM",           
  location: "Back Atrium",   
  notes: "Make sure to bring your ID!", 
};

const items = [
  {
    label: "DATE",
    value: voteInfo.date,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect x="3" y="4.5" width="18" height="16" rx="2" />
        <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
      </svg>
    ),
  },
  {
    label: "TIME",
    value: voteInfo.time,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    label: "LOCATION",
    value: voteInfo.location,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
    ),
  },
];

export default function VotePage() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background (same photo as the home page) */}
      <div className="absolute inset-0 bg-home bg-cover bg-center"></div>
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(6.85px)",
        }}
      ></div>

      <main className="relative z-10 flex flex-col items-center text-center gap-y-12 w-full max-w-6xl" style={{ padding: "80px 20px" }}>
        {/* Title */}
        <div className="flex flex-col items-center gap-y-4" data-aos="fade-up">
          <h1 className="font-bold text-5xl md:text-8xl text-[#0073FF]">Where to Vote</h1>
          <div className="h-1 w-24 bg-[#0073FF] rounded-full"></div>
          <p className="text-white text-xl md:text-3xl font-light">
            Make your voice heard in the 2026 JohnFraser SAC elections
          </p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {items.map((item, i) => (
            <div
              key={item.label}
              className="bg-white shadow-lg flex flex-col items-center gap-y-4 border-t-4 border-[#0073FF] transition duration-300 hover:scale-105"
              style={{ padding: "40px 24px" }}
              data-aos="fade-up"
              data-aos-delay={200 + i * 150}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#0073FF]/10 text-[#0073FF]">
                {item.icon}
              </div>
              <p className="text-sm tracking-[0.3em] font-semibold text-[#0073FF]">{item.label}</p>
              <p className="text-2xl md:text-3xl font-light text-black">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Notes */}
        {voteInfo.notes && (
          <p
            className="text-white text-lg md:text-2xl font-light max-w-3xl border border-white/30 rounded-3xl bg-white/10"
            style={{ padding: "20px 32px" }}
            data-aos="fade-up"
            data-aos-delay="650"
          >
            {voteInfo.notes}
          </p>
        )}

        {/* Return Home button */}
        <Link href="/" data-aos="fade-up" data-aos-delay="800">
          <button className="border-0 text-lg md:text-2xl font-light bg-[#0073FF] text-white rounded-3xl w-[160px] h-[56px] md:w-[182px] md:h-[65px] cursor-pointer hover:bg-white hover:border hover:border-[#0073FF] hover:text-[#0073FF] transition duration-700 ease-in-out">
            Return Home
          </button>
        </Link>
      </main>
    </section>
  );
}