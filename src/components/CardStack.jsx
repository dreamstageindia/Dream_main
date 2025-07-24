import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    id: 1,
    title: "“Spreading Happiness by Turning Dreams into Reality”",
    role: "Narrative Role: The emotional hook — sets purpose & tone",
    ux: [
      "Full-screen Hero Banner (animation or video loop)",
      "Artist silhouette walking toward a rising stage / light",
      "CTA Buttons: Join as Artist | Start Curating",
      "Optional: Floating dream bubbles with icons",
    ],
  },
  {
    id: 2,
    title: "“Home of Happy Creative Humans”",
    role: "Narrative Role: Establishing a safe, joyful space",
    ux: [
      "Cozy community illustration: artists co-creating, dancing, jamming",
      "Horizontal scroll reveal or layered parallax",
      "Optional: Hover to show names + roles",
    ],
  },
  {
    id: 3,
    title: "“Making Creative Careers Joyful, Dignified, and Dependable”",
    role: "Narrative Role: Problem + Dream Stage solution",
    ux: [
      "Split-screen: struggle vs thriving",
      "Icons: Fair Pay, Contracts, Gigs, Respect",
      "Optional: Testimonial quotes",
    ],
  },
  {
    id: 4,
    title: "“Building the World’s Largest Artist Collective”",
    role: "Narrative Role: Invitation to join",
    ux: [
      "Interactive world map lighting up artists",
      "Filter by art forms",
      "Zoom on India first, then global",
    ],
  },
  {
    id: 5,
    title: "“Powered by Artists. United by Stories.”",
    role: "Narrative Role: Ecosystem & community",
    ux: [
      "Scrolling mosaic of faces + story blurbs",
      "Vertical card slider: “Meet Neha – A poet from Rishikesh”",
      "Optional: Audio intros",
    ],
  },
  {
    id: 6,
    title: "“Curate Experiences of a Kind With Us”",
    role: "Narrative Role: Call to curators/brands/organizers",
    ux: [
      "Event mockups: cafés, weddings, launches",
      "Carousel tabs: Cafés, Weddings, Brand Events, Workshops",
      "CTA: Book Talent | Talk to a Curator",
    ],
  },
  {
    id: 7,
    title: "“Art + Tech + Purpose = The Next Big Leap”",
    role: "Narrative Role: Future-facing innovation",
    ux: [
      "Interface mockups: ArtBridge, Smart Contracts, EPK",
      "Flow motion: Match → Contract → Gig → Payment",
      "Subline – Discover DreamOS",
    ],
  },
];

const CardStack = () => {
  const stackRef = useRef(null);

  useLayoutEffect(() => {
    const cards = stackRef.current.querySelectorAll(".card-item");
    cards.forEach((el) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top center+=10%",
          end: "bottom center-=10%",
          scrub: true,
        },
      });

      tl.to(el, {
        y: 120,
        rotationX: 65,
        opacity: 0,
        transformOrigin: "top center",
        ease: "power2.in",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger && stackRef.current?.contains(st.trigger)) st.kill();
      });
    };
  }, []);

  return (
    <div className="bg-black text-white py-24">
      <h3 className="text-center text-2xl md:text-4xl font-semibold mb-12">
        The Story Blocks
      </h3>
      <div
        ref={stackRef}
        className="relative w-full max-w-4xl mx-auto pb-64 space-y-6"
      >
        {CARDS.map((c) => (
          <div
            key={c.id}
            className="card-item will-change-transform bg-white/90 text-black rounded-xl p-6 md:p-8 shadow-2xl"
            style={{ perspective: "1000px" }}
          >
            <h4 className="font-bold text-xl md:text-2xl mb-2">{c.title}</h4>
            <p className="text-sm md:text-base opacity-70 mb-3">{c.role}</p>
            <ul className="list-disc pl-4 space-y-1 text-sm md:text-base">
              {c.ux.map((u, i) => (
                <li key={i}>{u}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardStack;
