import BigBlockText from "./BigBlockText";
import Masonry from "./Masonry";

const items = [
  {
    id: "1",
    img: "/assets/image/collectives/1.png",
    // url: "https://example.com/one",
    title : "PERFORMANCE ARTS",
    height: 400,
  },
  {
    id: "2",
    img: "/assets/image/collectives/2.png",
    title : "MUSICAL ARTS ",

    // url: "https://example.com/two",
    height: 400,
  },
  {
    id: "3",
    img: "/assets/image/collectives/3.png",
    title : "FINE ARTS ",

    // url: "https://example.com/three",
    height: 400,
  },
  {
    id: "4",
    img: "/assets/image/collectives/4.png",
    title : "LENSOGRAPHY",

    // url: "https://example.com/one",
    height: 400,
  },
  {
    id: "5",
    img: "/assets/image/collectives/5.png",
    title : "FASHION ARTS",

    // url: "https://example.com/two",
    height: 400,
  },
  {
    id: "6",
    img: "/assets/image/collectives/6.png",
    title : "CULINARY ARTS",

    // url: "https://example.com/three",
    height: 400,
  },
  {
    id: "7",
    img: "/assets/image/collectives/7.png",
    title : "LITERARY ARTS",

    // url: "https://example.com/one",
    height: 400,
  },
  {
    id: "8",
    img: "/assets/image/collectives/8.png",
    title : "GAMING ARTS",

    // url: "https://example.com/two",
    height: 400,
  },
  {
    id: "9",
    img: "/assets/image/collectives/9.png",
    title : "HEALTH AND FITNESS ",

    // url: "https://example.com/three",
    height: 400,
  },
  {
    id: "10",
    img: "/assets/image/collectives/10.png",
    title : "ATHLETICS ",

    // url: "https://example.com/one",
    height: 400,
  },
  {
    id: "11",
    img: "/assets/image/collectives/11.png",
    title : "EDUCATION ",
    
    // url: "https://example.com/two",
    height: 400,
  },
  {
    id: "12",
    img: "/assets/image/collectives/12.png",
    title : "TRAVEL AND TOURISM ",

    // url: "https://example.com/three",
    height: 400,
  },
  {
    id: "13",
    img: "/assets/image/collectives/13.png",
    title : "HOME IMPROVEMENT ",

    // url: "https://example.com/one",
    height: 400,
  },
  {
    id: "14",
    img: "/assets/image/collectives/14.png",
    title : "CARE MANAGEMENT ",

    // url: "https://example.com/two",
    height: 400,
  },
  {
    id: "15",
    img: "/assets/image/collectives/15.png",
    title : "HEALTH AND MEDICINE ",
    
    // url: "https://example.com/three",
    height: 400,
  },
  {
    id: "16",
    img: "/assets/image/collectives/16.png",
    title : "PLANNING AND MANAGEMENT ",

    // url: "https://example.com/one",
    height: 400,
  },
  
];

export default function Section12() {
  return (
    <div className="h-auto w-screen" id="collective">
      <div>
        <BigBlockText title={"Collectives"} fontSize="2.5rem"/>
      </div>
      <Masonry
        items={items}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover={true}
        hoverScale={0.95}
        blurToFocus={true}
        colorShiftOnHover={true}
      />
    </div>
  );
}
