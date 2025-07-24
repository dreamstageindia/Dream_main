// components/GlassHeader.jsx
import React, { useState } from "react";

const GlassHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative w-full px-4 md:px-0 mt-4 scroll-smooth z-40">
      {/* container */}
      <div
        className="
          ml-auto
          w-full md:w-3/4
          bg-white/10 backdrop-blur-md
          rounded-xl
          p-4
          flex items-center justify-between
          text-white
        "
      >
        {/* Logo or title */}
        <div className="font-semibold flex items-center gap-4">
          <img src="/assets/image/logo.png" height={30} width={30} alt="Logo" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            DREAMSTAGE
          </span>
        </div>

        {/* desktop nav (only lg and up) */}
        <nav className="hidden lg:flex space-x-10">
          <a href="#home" className="cursor-target uppercase">HOME</a>
          <a href="#about" className="cursor-target uppercase">ABOUT</a>
          <a href="#services" className="cursor-target uppercase">Art_Bridge</a>
          <a href="#collective" className="cursor-target uppercase">Collective</a>
          <a href="#contact" className="cursor-target uppercase">Contact</a>
        </nav>

        {/* hamburger button: show from md and below */}
        <button
          className="block lg:hidden"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
      </div>

      {/* mobile dropdown (visible md and below) */}
      {menuOpen && (
        <div
          className="
            absolute
            top-15
            mt-2
            w-[90%]
            lg:hidden
            bg-white/20 backdrop-blur-md
            rounded-xl
            p-4
            text-white
          "
        >
          <nav className="flex flex-col space-y-2">
            <a href="#home" className="hover:underline">Home</a>
            <a href="#about" className="hover:underline">About</a>
            <a href="#services" className="hover:underline">Art Bridge</a>
            <a href="#collective" className="hover:underline">Collective</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
        </div>
      )}
    </div>
  );
};

export default GlassHeader;
