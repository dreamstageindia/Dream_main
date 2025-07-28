"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import BubbleBackground from "./BubbleBackground";

export default function ContactUs() {
  const containerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
    gsap.from(formRef.current.querySelectorAll(".form-element"), {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.5,
    });
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33%     { transform: translate(30px,-50px) scale(1.1); }
          66%     { transform: translate(-20px,20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
      `}</style>

      <div
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4 overflow-hidden"
      >
        {/* 3D bubbles in background */}
        <BubbleBackground />

        {/* glass‑morphic form */}
        <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden p-8 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Contact Us
          </h2>
          <form ref={formRef} className="space-y-6">
            {["name", "email", "subject"].map((field) => (
              <div key={field} className="form-element">
                <label
                  htmlFor={field}
                  className="block text-gray-200 capitalize"
                >
                  {field}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  placeholder={
                    field === "name"
                      ? "Your Name"
                      : field === "email"
                      ? "you@example.com"
                      : "Subject"
                  }
                  className="w-full mt-1 px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white backdrop-blur-sm transition"
                />
              </div>
            ))}

            <div className="form-element">
              <label htmlFor="message" className="block text-gray-200">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Your message..."
                className="w-full mt-1 px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white backdrop-blur-sm transition"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-indigo-500 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-600 transform hover:scale-105 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
