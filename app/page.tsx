'use client'

import Image from "next/image";
import { candidates } from "../utils/candidates";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [processedCandidates, setProcessedCandidates] = useState(candidates);

  // Check if image exists and set fallback
  useEffect(() => {
    const checkImages = async () => {
      const updatedCandidates = await Promise.all(
        candidates.map(async (candidate) => {
          if (!candidate.image) {
            return { ...candidate, image: '/placeholder.jpg' };
          }
          
          try {
            const response = await fetch(candidate.image, { method: 'HEAD' });
            if (response.ok) {
              return candidate;
            } else {
              return { ...candidate, image: '/placeholder.jpg' };
            }
          } catch {
            return { ...candidate, image: '/placeholder.jpg' };
          }
        })
      );
      setProcessedCandidates(updatedCandidates);
    };

    checkImages();
  }, []);

  // Grade representatives, split into one group per grade (9 to 12)
  const gradeRepGroups = [9, 10, 11, 12].map((grade) => ({
    grade,
    reps: processedCandidates.filter(c => c.role === `grade ${grade} rep`),
  }));
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll event to create parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* ELECTIONS HOME PAGE */}
      <section className="flex flex-col items-center justify-center h-screen relative overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-home bg-cover bg-center"
          style={{ 
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: "transform 0.1s ease-out",
          }}
        ></div>
        
        <div
          className="absolute z-1 inset-0"
          style={{
            background: "rgba(0, 0, 0, 0.69)",
            backdropFilter: "blur(6.85px)",
          }}
        ></div>
        <main className="justify-center text-center items-center min-h-screen flex flex-col gap-y-8 z-50">


          <div className="flex flex-col justify-center items-center gap-y-2">
            <h1 className="font-bold text-5xl md:text-9xl text-[#0073FF]" data-aos="fade-up">Fraser Elections</h1>
            <p className="text-white text-xl md:text-4xl w-2/3 text-wrap mx-auto font-light" data-aos="fade-up" data-aos-delay="300">View the candidates for the 2026 JohnFraser SAC elections, made by <a className="underline text-[#0073FF]" href="https://johnfrasersac.com">JFSS SAC</a></p>
          </div>

          <div className="w-full justify-center items-center flex">
            <div className="mx-auto flex justify-center items-center gap-y-5 gap-x-30 w-full flex-col md:flex-row " data-aos="fade-up" data-aos-delay="600">
              <button 
                className="mx-auto text-lg md:text-2xl font-light bg-[#0073FF] text-white rounded-3xl w-[140px] h-[50px] md:w-[182px] md:h-[65px] cursor-pointer hover:bg-white hover:border hover:border-[#0073FF] hover:text-[#0073FF] transition duration-700 ease-in-out"
                onClick={() => {
                  document.getElementById('candidates')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </button>
              <Link href="/vote">
                <button className="mx-auto text-lg md:text-2xl font-light bg-white text-[#0073FF] border border-[#0073FF] rounded-3xl w-[140px] h-[50px] md:w-[182px] md:h-[65px] cursor-pointer hover:bg-[#0073FF] hover:text-white transition duration-700 ease-in-out">Where to Vote</button>
              </Link>
            </div>
          </div>
        </main>
      </section>

      {/* CANADIDATES */}
      <hr className="h-[40px] md:h-[50px] border-0"></hr>
      <section className="" id="candidates">

        {/* Grade Representatives: one section per grade (9 to 12) */}
        {gradeRepGroups.map(({ grade, reps }) => (
          <div key={grade}>
            <hr className="h-[40px] md:h-[50px] border-0"></hr>
            <main className="flex flex-col justify-center items-center text-center gap-y-10 py-10">
              <div className="flex flex-col gap-y-2 justify-center items-center">
                <h1 className="text-5xl md:text-6xl font-bold text-center">GRADE {grade} REPRESENTATIVES</h1>
                <h2 className="w-[350px] md:w-[407px] text-xl font-light mb-20">TIP: Click on their profile to learn more about their <a className="font-bold">promises!</a></h2>
              </div>
              <div className="flex flex-wrap justify-center max-w-6xl px-4 mx-auto" style={{ gap: "60px" }}>
                {reps.map((candidate) => (
                  <Link
                    key={candidate.name}
                    href={`/candidate/${candidate.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <div
                      className="hover:cursor-pointer bg-white shadow-lg flex flex-col items-center p-6 transition duration-300 hover:scale-105"
                      style={{ width: 312 }}
                    >
                      <div className="relative" style={{ width: 312, height: 312 }}>
                        <Image
                          src={candidate.image}
                          alt={candidate.name}
                          width={312}
                          height={312}
                          className="object-cover"
                          style={{ width: 312, height: 312 }}
                        />
                        <div
                          className="absolute left-0 bottom-0 w-full flex items-end"
                          style={{
                            height: "80px",
                            background: "linear-gradient(0deg, rgba(0, 0, 0, 0.63) 50%, rgba(0, 0, 0, 0.00) 100%)",
                          }}
                        >
                          <span className="text-white text-xl px-4 pb-3 w-full text-center font-light">
                            {candidate.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </main>
          </div>
        ))}
      </section>
      <hr className="h-[40px] md:h-[50px] border-0"></hr>
    </>
  );
}