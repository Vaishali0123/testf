import Header from "./components/Header";
import Footer from "./components/Footer";
import Bg from "../../public/bgall.svg";
import BgFooter from "../../public/Footerbg.png";
import Bgtop from "../../public/bgs.png";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{
        backgroundImage: `url(${Bg.src})`,
        backgroundPosition: "top",
      }}
      className="relative  bg-[#1B1C1E]  text-white"
    >
      <div
        style={{
          backgroundImage: `url(${Bgtop.src})`,
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
        className=""
      >
        <Header />
        <div className="z-0 pt-24">{children}</div>
      </div>
      <div
        style={{
          backgroundImage: `url(${BgFooter.src})`,
          backgroundPosition: "bottom",
        }}
        className="bg-contain"
      >
        <Footer />
      </div>
    </div>
  );
}
