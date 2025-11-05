/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const targetDate = new Date("2025-11-24T19:00:00").getTime();
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTime({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/celebrate"); 
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center transition-all duration-1000 relative bg-pink-100">
    
      <div className="absolute inset-2 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-pink-400 text-3xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          >
            {Math.random() > 0.5 ? "💛" : "🌸"}
          </span>
        ))}
      </div>


      <main className="relative z-30 my-5 flex flex-col justify-center items-center gap-6 p-6 text-center text-pink-900 transition-all duration-1000">
        <h1 className="great-vibes-regular text-6xl md:text-7xl">
          <span className="animate__animated animate__fadeInLeft animate__slow">
            Osama
          </span>
          <span >&</span>
          <span className="animate__animated animate__fadeInRight animate__slow">
            Mai
          </span>
        </h1>

        <p className="text-lg md:text-xl">Join us to celebrate our wedding</p>
        <h2 className="text-3xl font-mono">24 Nov 2025</h2>

        <ul className="flex gap-4 mt-4">
          {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
            const value = Object.values(time)[i];
            return (
              <li
                key={label}
                className="flex flex-col items-center bg-white/60 px-4 py-2 rounded-xl shadow"
              >
                <span className="text-3xl font-bold">{value}</span>
                <span className="text-sm text-gray-700">{label}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 w-full max-w-2xl">
        <h1
              dir="rtl"
              className="text-xl md:text-2xl font-light text-pink-900 leading-relaxed"
            >
            دار الأشغال العسكرية – كورنيش المعادي
          </h1>

        <span
          style={{ fontStretch: "85%", textTransform: "uppercase" }}
          className="block mt-2 text-xl md:text-2xl font-semibold tracking-wide drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] animate-pulse"
        >
          Crystal House
        </span>


          <h2 className="my-5">7:00 PM to 11:00 PM</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221063.62225527034!2d31.285354148749523!3d30.033440882019928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145839811a5025df%3A0xd4f6d087deb6f114!2z2K_Yp9ixINin2YTYo9i02LrYp9mEINin2YTYudiz2YPYsdmK2Kk!5e0!3m2!1sen!2seg!4v1762279789633!5m2!1sen!2seg"
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </main>
    </div>
  );
}
