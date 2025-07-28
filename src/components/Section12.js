import BigBlockText from "./BigBlockText";
import Masonry from "./Masonry";

const items = [
  {
    id: "1",
    img: "/assets/image/collectives/1.png",
    // url: "https://example.com/one",
    height: 400,
  },
  {
    id: "2",
    img: "/assets/image/collectives/2.png",
    // url: "https://example.com/two",
    height: 250,
  },
  {
    id: "3",
    img: "/assets/image/collectives/3.png",
    // url: "https://example.com/three",
    height: 600,
  },
  {
    id: "4",
    img: "/assets/image/collectives/4.png",
    // url: "https://example.com/one",
    height: 400,
  },
  {
    id: "5",
    img: "/assets/image/collectives/5.png",
    // url: "https://example.com/two",
    height: 250,
  },
  {
    id: "6",
    img: "/assets/image/collectives/6.png",
    // url: "https://example.com/three",
    height: 600,
  },
  {
    id: "7",
    img: "/assets/image/collectives/7.png",
    // url: "https://example.com/one",
    height: 400,
  },
  {
    id: "8",
    img: "/assets/image/collectives/8.png",
    // url: "https://example.com/two",
    height: 250,
  },
  {
    id: "9",
    img: "/assets/image/collectives/9.png",
    // url: "https://example.com/three",
    height: 600,
  },
  {
    id: "10",
    img: "/assets/image/collectives/10.png",
    // url: "https://example.com/one",
    height: 400,
  },
  {
    id: "11",
    img: "/assets/image/collectives/11.png",
    // url: "https://example.com/two",
    height: 250,
  },
  {
    id: "12",
    img: "/assets/image/collectives/12.png",
    // url: "https://example.com/three",
    height: 600,
  },
  {
    id: "13",
    img: "/assets/image/collectives/13.png",
    // url: "https://example.com/one",
    height: 400,
  },
  {
    id: "14",
    img: "/assets/image/collectives/14.png",
    // url: "https://example.com/two",
    height: 250,
  },
  {
    id: "15",
    img: "/assets/image/collectives/15.png",
    // url: "https://example.com/three",
    height: 600,
  },
  {
    id: "16",
    img: "/assets/image/collectives/16.png",
    // url: "https://example.com/one",
    height: 400,
  },
  {
    id: "17",
    img: "/assets/image/collectives/17.png",
    // url: "https://example.com/two",
    height: 250,
  },
  
];

export default function Section12() {
  return (
    <div className="h-auto w-screen">
      <div>
        <BigBlockText title={"Collectives"} />
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
