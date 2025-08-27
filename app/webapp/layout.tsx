import Navbar from "../webapp/components/Navbar";
import Header from "../webapp/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#111111] bg-gradient-to-br from-[#ffffff0f] via-black to-[#ffffff0f]  h-[calc(100vh-35px)] text-[#fff]">
      <Header />
      <div className="flex gap-2 h-[calc(100%-60px)] pt-2">
        <Navbar />
        <div className="w-full ">{children}</div>
      </div>
    </div>
  );
}
