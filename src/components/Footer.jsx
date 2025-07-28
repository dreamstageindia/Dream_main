// src/components/Footer.jsx
"use client";

import React, { useRef, useEffect } from "react";
import { FaSquareFacebook, FaLinkedin, FaInstagram   } from "react-icons/fa6";
import { gsap } from "gsap";

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
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full font-medium transition">
            Join as Artist
          </button>
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full font-medium transition">
            Find Artists For your Event
          </button>
          
        </div>
      </div>

      {/* 2. Site Navigation Columns */}
      <div className="footer-nav max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h3 className="font-semibold mb-4">Dream Stage</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-400">Home</a></li>
            <li><a href="#" className="hover:text-indigo-400">About</a></li>
            <li><a href="#" className="hover:text-indigo-400">ArtBridge</a></li>
            <li><a href="#" className="hover:text-indigo-400">Collective</a></li>
            <li><a href="#" className="hover:text-indigo-400">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Artists</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-400">Join as Artist</a></li>
            <li><a href="#" className="hover:text-indigo-400">Showcase Portfolio</a></li>
            <li><a href="#" className="hover:text-indigo-400">How It Works</a></li>
            <li><a href="#" className="hover:text-indigo-400">Testimonials</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Curators</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-400">Book a Talent</a></li>
            <li><a href="#" className="hover:text-indigo-400">Event Discovery</a></li>
            <li><a href="#" className="hover:text-indigo-400">Why Dream Stage</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-400">Careers</a></li>
            <li><a href="#" className="hover:text-indigo-400">Press</a></li>
            <li><a href="#" className="hover:text-indigo-400">Legal</a></li>
            <li><a href="#" className="hover:text-indigo-400">Culture Guidebook</a></li>
            <li><a href="#" className="hover:text-indigo-400">Newsletter Signup</a></li>
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
          <a href="#" className="hover:text-indigo-400">
            <FaLinkedin  size={20} />
          </a>
          <a href="#" className="hover:text-indigo-400">
            <FaInstagram  size={20} />
          </a>
          <a href="#" className="hover:text-indigo-400">
            <FaSquareFacebook size={20} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-gray-500">
          © {new Date().getFullYear()} Dream Stage Media Pvt Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
