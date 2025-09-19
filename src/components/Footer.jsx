// src/components/Footer.jsx
"use client";

import React, { useRef, useEffect } from "react";
import { FaSquareFacebook, FaLinkedin, FaInstagram, FaYoutube, FaX, FaThreads } from "react-icons/fa6";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { openGmail } from "../utils/email";


export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const elems = footerRef.current.querySelectorAll(
      ".footer-cta, .footer-nav > div, .footer-bottom"
    );
    gsap.from(elems, {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.2,
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-gray-900 text-gray-100 px-6 py-12"
    >
      {/* 1. Emotional CTA */}
      <div className="footer-cta max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
          Your art deserves a stage. Let’s build it together.
        </h2>
        <div className="space-x-4">
          <Link target="_blank" to={"https://form.jotform.com/252493423386058"}>
            <button className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-full font-medium transition">
              Request an invite
            </button>
          </Link>
        </div>
      </div>

      {/* 2. Site Navigation Columns */}
      <div className="footer-nav max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h3 className="font-semibold mb-4">Dream Stage</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-400">Home</a></li>
            <li><a href="#about" className="hover:text-indigo-400">Our Mission</a></li>
            <li><a href="#art_bridge" className="hover:text-indigo-400">ArtBridge</a></li>
            <li><a href="#collective" className="hover:text-indigo-400">Collective</a></li>
            <li><a href="#contact" className="hover:text-indigo-400">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Artists</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="https://form.jotform.com/252493423386058" target="_blank" className="hover:text-indigo-400">Request an invite</a></li>
            
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Curators</h3>
          <ul className="space-y-2 text-sm">
            <li><a aria-disabled target="_blank" className="hover:text-indigo-400">Book a Talent(Coming Soon)</a></li>
            <li><a aria-disabled target="_blank" className="hover:text-indigo-400">Event Discovery(Coming Soon)</a></li>
            <li><a href="#why" className="hover:text-indigo-400">Why Dream Stage</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
          <li>
  <button
    onClick={() =>
      openGmail({
        to: "careers@dreamstage.tech",
        subject: "Job Application",
        body: "Hello Dream Stage Team,"
      })
    }
    className="hover:text-indigo-400 underline decoration-transparent hover:decoration-inherit"
  >
    Careers – careers@dreamstage.tech
  </button>
</li>

<li>
  <button
    onClick={() => openGmail({ to: "hello@dreamstage.tech" })}
    className="hover:text-indigo-400 underline decoration-transparent hover:decoration-inherit"
  >
    Mail us – hello@dreamstage.tech
  </button>
</li>

<li>
  <button
    onClick={() => openGmail({ to: "support@dreamstage.tech" })}
    className="hover:text-indigo-400 underline decoration-transparent hover:decoration-inherit"
  >
    Support – support@dreamstage.tech
  </button>
</li>

          </ul>
        </div>
      </div>

      {/* 3. Bottom Section */}
      <div className="footer-bottom max-w-6xl mx-auto border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between text-sm">
        {/* Logo */}
        <div className="mb-4 md:mb-0">
          <img
            src="/assets/image/logo.png"
            alt="Dream Stage Logo"
            className="h-10"
          />
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="https://www.linkedin.com/company/dreamstagetech" target="_blank" className="hover:text-indigo-400">
            <FaLinkedin size={20} />
          </a>
          <a href="https://www.youtube.com/@dreamstagecollective" target="_blank" className="hover:text-indigo-400">
            <FaYoutube size={20} />
          </a>
          <a href="https://x.com/dreamstage_tech" target="_blank" className="hover:text-indigo-400">
            <FaX size={20} />
          </a>

          <a href="https://www.instagram.com/dreamstagecollective/" target="_blank" className="hover:text-indigo-400">
            <FaInstagram size={20} />
          </a>
          <a href="https://www.threads.com/@dreamstagecollective" target="_blank" className="hover:text-indigo-400">
            <FaThreads size={20} />
          </a>
        </div>
        <a href="/terms-and-community-guidelines" target="_blank" className="hover:text-indigo-400">
            Terms and Community Guidelines
          </a>
          <a href="/privacy-policy" target="_blank" className="hover:text-indigo-400">
            Privacy Policy
          </a>

        {/* Copyright */}
        <div className="text-gray-500">
          © {new Date().getFullYear()} Dream Stage Media Pvt Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
