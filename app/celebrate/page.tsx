"use client";
import { useEffect, useRef, useState } from "react";
import { Fireworks } from "fireworks-js";

export default function TestFireworks() {
  const fireworksRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const targetDate = new Date("2025-11-24T19:00:00").getTime();
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    if (fireworksRef.current) {
      const fireworks = new Fireworks(fireworksRef.current);
      fireworks.start();
    }

    const handleAudioToggle = () => {
      if (audioRef.current) {
        if (!audioPlaying) {
          audioRef.current.play().catch(() => {
            console.log("Audio play prevented by browser autoplay policy");
          });
        } else {
          audioRef.current.pause();
        }
        setAudioPlaying(!audioPlaying);
      }
    };

    window.addEventListener("click", handleAudioToggle);
    window.addEventListener("touchstart", handleAudioToggle);

    return () => {
      window.removeEventListener("click", handleAudioToggle);
      window.removeEventListener("touchstart", handleAudioToggle);
    };
  }, [audioPlaying]);

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

  return (
    <div className="relative w-screen h-screen overflow-auto bg-gradient-to-b from-indigo-950 via-indigo-900 to-blue-900">
      {/* الألعاب النارية */}
      <div ref={fireworksRef} className="overflow-hidden absolute inset-0 z-0"></div>

      {/* الصوت */}
      <audio ref={audioRef} src="/firework.mp3" loop />

      {/* المحتوى */}
      <main className="relative z-10 flex flex-col justify-center items-center gap-6 p-6 text-center text-white min-h-screen">
        <h1 className="great-vibes-regular text-6xl md:text-7xl">
          <span className="text-yellow-300 animate__animated animate__fadeInLeft animate__slow">
            Osama
          </span>
          &amp;
          <span className="text-yellow-300 animate__animated animate__fadeInRight animate__slow">
            Mai
          </span>
        </h1>

        <p className="text-lg md:text-xl mt-4">Join us to celebrate our wedding</p>
        <h2 className="text-3xl font-mono">24 Nov 2025</h2>

        <ul className="flex gap-4 mt-4">
          {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
            const value = Object.values(time)[i];
            return (
              <li
                key={label}
                className="flex flex-col items-center bg-white/30 px-4 py-2 rounded-xl shadow"
              >
                <span className="text-3xl font-bold">{value}</span>
                <span className="text-sm text-yellow-300">{label}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 w-full max-w-2xl">
          <h1>قاعة دار الأشغال العسكرية - المعادي</h1>
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
