import Header from "../landing/components/Header";
import Footer from "./components/Footer";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen overflow-y-scroll fixed bg-[#000000] text-white">
      {/* Strike header */}
      <div className="sticky z-10 bg-black top-0">
        <Header />
      </div>
      <div className="z-0">{children}</div>
      <Footer />
    </div>
  );
}
