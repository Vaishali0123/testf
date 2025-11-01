// "use client";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import axios, { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
// import { NEXT_PUBLIC_API } from "../utils/config";
// import { useAuthContext, UserData } from "../utils/auth";
// import toast, { Toaster } from "react-hot-toast";
// import Bg from "../../public/Pattern.svg";
// import dot from "../../public/Dot.svg";

// import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";
// import { MdOutlineAccountCircle } from "react-icons/md";
// import { CiLock } from "react-icons/ci";
// import { RiGroupLine } from "react-icons/ri";
// import { GoShieldCheck, GoVerified } from "react-icons/go";
// import { TypingAnimation } from "../(landing)/components/TypingAnimation";

// interface PageProps {
//   text?: string;
//   speed?: number;
//   delay?: number;
// }

// const Page = ({ text, speed = 100, delay = 0 }: PageProps) => {
//   const [email, setEmail] = useState("");
//   const router = useRouter();
//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(true);
//   const { setData, setAuth } = useAuthContext();
//   const [message, setMessage] = useState("");
//   const [displayedText, setDisplayedText] = useState("");

//   useEffect(() => {
//     if (!text) return;

//     let currentIndex = 0;
//     let timeoutId: NodeJS.Timeout;

//     const startTyping = () => {
//       const type = () => {
//         if (currentIndex < text?.length) {
//           setDisplayedText(text.slice(0, currentIndex + 1));
//           currentIndex++;
//           timeoutId = setTimeout(type, speed);
//         }
//       };
//       timeoutId = setTimeout(type, delay);
//     };

//     startTyping();

//     return () => clearTimeout(timeoutId);
//   }, [text, speed, delay]);

//   const handleAuth = async () => {
//     if (!validateEmail(email)) return setMessage("Please enter a valid email");

//     try {
//       // First, try login
//       const res = await axios.post(
//         `${NEXT_PUBLIC_API}/login`,
//         { email, password },
//         { withCredentials: true }
//       );

//       cookieSetter(res.data.data, res.data.token);
//       router.push("/webapp");
//     } catch (err) {
//       console.log(err);
//       // if (err.response?.status === 404) {
//       //   // User not found → signup
//       //   try {
//       //     const resSignup = await axios.post(
//       //       `${NEXT_PUBLIC_API}/signup`,
//       //       { email, password },
//       //       { withCredentials: true }
//       //     );
//       //     cookieSetter(resSignup.data.data, resSignup.data.token);
//       //     router.push("/webapp");
//       //   } catch (signupErr: any) {
//       //     setMessage(signupErr.response?.data?.message || "Signup failed");
//       //   }
//       // } else if (err.response?.status === 401) {
//       //   setMessage("Incorrect password");
//       // } else {
//       //   setMessage("Server error");
//       // }
//     }
//   };

//   const cookieSetter = (data: UserData, token: string) => {
//     try {
//       const expirationDate = new Date();
//       expirationDate.setDate(expirationDate.getDate() + 30);

//       Cookies.set("authToken", token, { expires: expirationDate });
//       setData(data);
//       setAuth(true);
//       // toast.success("Login successful!");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         `${NEXT_PUBLIC_API}/login`,
//         { email, password },
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         toast.success("Login successful!");
//         cookieSetter(res.data.data, res.data.token);
//         router.push("/webapp");
//       } else {
//         // console.log("hi")
//         toast.error("Seems like you don't have an account in the app.");
//         handleSubmit();
//         // router.push("/Signup");
//       }
//     } catch (err) {
//       handleSubmit();
//     }
//   };
//   //  Email validation function
//   const validateEmail = (email: string) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };
//   const handleSubmit = async () => {
//     // e.preventDefault();
//     if (!validateEmail(email)) {
//       alert("Please enter a valid email address");
//       return;
//     }
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await axios.post(
//         `${NEXT_PUBLIC_API}/signup`,
//         {
//           email,
//           password,
//         },
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         toast.success("Signup successful!");
//         cookieSetter(res.data.data, res.data.token);
//         router.push("/welcome");
//         // Save email to sessionStorage
//         // sessionStorage.setItem("userEmail", email);

//         // Redirect to /multisiteconnect
//         // router.push("/webapp");
//       } else {
//         toast.error(res.data.message || "Something went wrong");
//         // setMessage(res.data.message || "Something went wrong");
//       }
//     } catch (err) {
//       setMessage("Error signing up");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const lines = [
//     "Multi-Agent Orchestration",
//     "Secure Plugin Connection",
//     "Built-in Security",
//   ];
//   return (
//     <div
//       style={{
//         backgroundImage: `url(${Bg.src})`,
//       }}
//       className="w-full min-h-screen p-3 sm:p-6 flex relative items-center justify-center bg-black overflow-x-hidden"
//     >
//       <Toaster />
//       <div className="absolute -top-[30%] w-[70%] rounded-full h-[50%] bg-[#f94cff21] blur-3xl hidden sm:block"></div>
//       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#f94cff21] via-transparent to-transparent sm:hidden"></div>
//       <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12">
//         {/* left */}
//         <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start justify-center text-center lg:text-left order-1 lg:order-1">
//           <div className="w-full max-w-lg space-y-4">
//             <div className="flex items-center cursor-auto bg-gradient-to-l from-white/10 to-white/0 w-fit py-2 px-4 rounded-full gap-2 mx-auto lg:mx-0">
//               <Image
//                 src="/logo.png"
//                 alt="logo"
//                 width={30}
//                 height={30}
//                 className="-ml-2"
//               />
//               <span className="text-sm sm:text-base">
//                 From "What now?" to "All set." In one chat.
//               </span>
//             </div>
//             <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
//               Stop Fixing WordPress. Start Commanding It.
//             </div>
//           </div>
//           <div className="w-full pn:max-sm:hidden max-w-lg space-y-6 sm:space-y-8 mt-6 sm:mt-10">
//             {lines.map((line, idx) => (
//               <div key={idx} className="space-y-2">
//                 {idx === 0 && (
//                   <RiGroupLine className="text-[#f94cff] text-xl sm:text-2xl" />
//                 )}
//                 {idx === 1 && (
//                   <GoVerified className="text-[#f94cff] text-xl sm:text-2xl" />
//                 )}
//                 {idx === 2 && (
//                   <GoShieldCheck className="text-[#f94cff] text-xl sm:text-2xl" />
//                 )}
//                 <div className="text-base sm:text-lg font-medium">
//                   <TypingAnimation text={line} speed={80} delay={idx * 2000} />
//                 </div>
//                 {idx === 0 && (
//                   <div className="text-xs sm:text-sm text-white/60">
//                     Specialized Multi AI agents collaborate like a team one
//                     creates a page, another optimizes it, another checks for
//                     bugs.
//                   </div>
//                 )}
//                 {idx === 1 && (
//                   <div className="text-xs sm:text-sm text-white/60">
//                     Install the Webivus plugin, authorize once with a
//                     site-specific token, and Webivus will communicate securely.
//                   </div>
//                 )}
//                 {idx === 2 && (
//                   <div className="text-xs sm:text-sm text-white/60">
//                     Install the Webivus plugin, authorize once with a
//                     site-specific token, and Webivus will communicate securely.
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* right  */}
//         <div className="w-full lg:w-[50%] flex flex-col relative items-center justify-center order-2 lg:order-2">
//           <div
//             style={{
//               backgroundImage: `url(${dot.src})`,
//               backgroundPosition: "bottom",
//               backgroundRepeat: "no-repeat",
//             }}
//             className="w-full max-w-sm sm:max-w-md md:max-w-lg px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-12 lg:py-20 space-y-4 sm:space-y-6 bg-[#ffffff24] border-[#ffffff25] border rounded-2xl"
//           >
//             <div className="w-full flex flex-col items-center justify-center">
//               <div className="text-sm sm:text-base">Continue with:</div>
//               <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center mt-4 w-full">
//                 <div className="flex-1 min-w-0 flex px-3 sm:px-4 text-xs sm:text-sm py-2 rounded-xl bg-white/10 border-[#ffffff25] border items-center justify-center gap-2 hover:bg-white/20 transition-colors cursor-pointer">
//                   <FaGoogle className="text-sm sm:text-base" />
//                   <span className="hidden sm:inline text-xs sm:text-sm">
//                     Google
//                   </span>
//                 </div>
//                 <div className="flex-1 min-w-0 flex px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-xl bg-white/10 border-[#ffffff25] border items-center justify-center gap-2 hover:bg-white/20 transition-colors cursor-pointer">
//                   <FaGithub className="text-sm sm:text-base" />
//                   <span className="hidden sm:inline text-xs sm:text-sm">
//                     Github
//                   </span>
//                 </div>
//                 <div className="flex-1 min-w-0 flex px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-xl bg-white/10 border-[#ffffff25] border items-center justify-center gap-2 hover:bg-white/20 transition-colors cursor-pointer">
//                   <FaDiscord className="text-sm sm:text-base" />
//                   <span className="hidden sm:inline text-xs sm:text-sm">
//                     Discord
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center justify-center gap-2 sm:gap-4 w-full">
//               <hr className="w-full border border-white/10" />
//               <div className="text-xs sm:text-sm">or</div>
//               <hr className="w-full border border-white/10" />
//             </div>
//             <div className="text-sm sm:text-base flex flex-col gap-2">
//               <div>Email</div>
//               <div className="text-sm sm:text-base rounded-xl border bg-white/10 items-center justify-center gap-2 px-3 sm:px-4 border-[#ffffff25] flex">
//                 <MdOutlineAccountCircle className="text-lg" />
//                 <input
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   type="email"
//                   placeholder="Enter your Email"
//                   className="w-full h-10 sm:h-12 pl-2 bg-transparent outline-none text-sm sm:text-base touch-manipulation"
//                   autoComplete="email"
//                 />
//               </div>
//             </div>
//             <div className="text-sm sm:text-base flex flex-col gap-2">
//               <div className="flex justify-between items-center">
//                 <div>Password</div>
//                 <div className="text-xs sm:text-sm text-[#f94cff] hover:underline cursor-pointer">
//                   Forgot Password?
//                 </div>
//               </div>
//               <div className="text-sm sm:text-base rounded-xl border bg-white/10 items-center justify-center gap-2 px-3 sm:px-4 border-[#ffffff25] flex">
//                 <CiLock className="text-lg" />
//                 <input
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   type="Password"
//                   placeholder="Enter your password"
//                   className="w-full h-10 sm:h-12 pl-2 bg-transparent outline-none text-sm sm:text-base touch-manipulation"
//                   autoComplete="current-password"
//                 />
//               </div>
//             </div>
//             <div className="w-full">
//               <div
//                 onClick={handleLogin}
//                 className="w-full px-6 py-3 sm:py-4 hover:scale-105 duration-300 text-sm sm:text-base text-center cursor-pointer rounded-xl bg-white text-black font-medium transition-all hover:bg-gray-100"
//               >
//                 Get started
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
import React from 'react'

function old() {
  return (
    <div>old</div>
  )
}

export default old