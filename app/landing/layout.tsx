import Header from "../landing/components/Header";
import Footer from "./components/Footer";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative  bg-[#000000]  text-white">
      <Header />
      <div className="z-0 pt-24">{children}</div>
      <Footer />
    </div>
  );
}
