"use client";
import { NEXT_PUBLIC_API } from "@/app/utils/config";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
// import { User, BarChart3, CreditCard } from "lucide-react";
import { MdOutlineSwitchAccount } from "react-icons/md";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AccountSettings: React.FC = () => {
  const router=useRouter()
  const [option, setOption] = useState("account");
  const [file, setFile] = useState<File | null>(null);
  const [subject, setSubject] = useState("");
  const [project, setProject] = useState("");
  const [message, setMessage] = useState("");
const handleLogout = () => {
  // Debug: Check what cookies exist before removal
  console.log("=== BEFORE LOGOUT ===");
  console.log("All cookies:", document.cookie);
  console.log("authToken via Cookies.get:", Cookies.get("authToken"));
  console.log("Current domain:", window.location.hostname);
  console.log("Current path:", window.location.pathname);
  
  // Remove token from cookies with multiple attempts to cover different scenarios
  try {
    // Try different combinations to ensure cookie removal
    // The cookie was set with { expires: expirationDate } so we need to match that
    Cookies.remove("authToken");
    Cookies.remove("authToken", { path: "/" });
    Cookies.remove("authToken", { path: "/", domain: window.location.hostname });
    Cookies.remove("authToken", { path: "/", domain: `.${window.location.hostname}` });
    
    // Force remove using document.cookie (this always works)
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    document.cookie = `authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
    
    console.log("=== AFTER REMOVAL ATTEMPTS ===");
    console.log("All cookies after removal:", document.cookie);
    console.log("authToken via Cookies.get after removal:", Cookies.get("authToken"));
    
  } catch (error) {
    console.error("Error removing cookies:", error);
  }

  // Clear all storage
  localStorage.clear();
  sessionStorage.clear();
  
  // Redirect to login page
  router.push("/auth");
};
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size <= 10 * 1024 * 1024) {
        setFile(selectedFile);
      } else {
        alert("File size exceeds 10 MB");
      }
    }
  };
  const handleSubmit = async () => {
    console.log(subject, project, message);
    if (!subject || !project || !message) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", subject); // you can replace with actual user name
    formData.append("email", "demoaccount@gmail.com"); // replace with actual user email
    formData.append("message", message);
    formData.append("project", project);
    if (file) formData.append("file", file);

    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_API}/sendquery`,
        formData
      );

      const data = response.data;
      if (data.success) {
        alert("Query sent successfully!");
        setSubject("");
        setProject("");
        setMessage("");
        setFile(null);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };
  return (
    <div className="relative w-full border h-full overflow-y-auto">
      {/* <ToastContainer /> */}
      <div className="relative mx-auto w-full flex  items-center px-2">
        <div className="flex p-4 gap-2 w-full ">
          {/* Main Content */}
          <div className="flex    flex-col w-full gap-2 ">
            {/* Account Information */}
            {option === "account" && (
              <div className=" border border-white/10 p-6">
                <h2 className="text-xl font-[nunito] font-semibold text-white mb-2  ">
                  Account Information
                </h2>
                <p className="text-gray-400 mb-6">
                  Manage your account information.
                </p>

                <div className="flex items-center gap-4">
                  <div className="h-[60px] w-[60px] border-r border-l flex justify-center items-center border-white/10 hover:bg-white/10 duration-300 text-white/10 hover:text-white hover:cursor-pointer hover:border-white hover:border ">
                    <MdOutlineSwitchAccount size={30} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">
                        DemoAccount
                      </span>
                      <span className="text-gray-400 text-sm border border-white/10 px-2">
                        free
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm">
                      demoaccount@gmail.com · Joined about 2 hours
                    </div>
                  </div>
                </div>
                 <button
      onClick={handleLogout}
      className="px-8 py-2 mt-4 rounded-lg border border-red-500 bg-red-500/10 text-red-500 font-medium hover:bg-red-500 hover:text-white hover:border-red-500 transition duration-300"
    >
      Log Out
    </button>
              </div>
            )}

            {/* Subscription & Usage */}
            {option === "subscription" && (
              <div className="border border-white/10 p-6">
                <h2 className="text-xl font-[nunito] font-semibold text-white mb-2">
                  Subscription & Usage
                </h2>
                <p className="text-gray-400 mb-6">Manage your subscription.</p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Free Plan Card */}
                  <div className="border border-white/10 p-6">
                    <h3 className="text-lg font-[nunito] font-semibold text-white mb-4">
                      Free Plan
                    </h3>

                    <div className="mb-6">
                      <div className="text-sm text-gray-400 mb-2">
                        Tokens used:{" "}
                        <span className="text-white">0 / 500,000</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-1">
                        <div
                          className="bg-blue-500 h-1 rounded-full"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                    </div>

                    <Link
                      href={"/landing/pricing"}
                      className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      Upgrade Tier
                    </Link>
                  </div>

                  {/* Pay as you go Card */}
                  <div className="border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      {/* <CreditCard className="w-5 h-5 text-gray-400" /> */}
                      <span className="text-lg font-[nunito] font-semibold text-white">
                        Pay as you go is off
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm">
                      Please{" "}
                      <span className="text-white font-medium">
                        upgrade to Ultra plan
                      </span>{" "}
                      to enable the service.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Billing History */}
            {option === "billing" && (
              <div className="border border-white/10 p-6">
                <h2 className="text-xl font-[nunito] font-semibold text-white mb-2">
                  Billing History
                </h2>
                <p className="text-gray-400 mb-6">View your billing history.</p>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 text-gray-400 font-medium">
                          Date
                        </th>
                        <th className="text-left py-3 text-gray-400 font-medium">
                          Status
                        </th>
                        <th className="text-right py-3 text-gray-400 font-medium">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          colSpan={3}
                          className="py-8 text-center text-gray-500"
                        >
                          No billing history available
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* Contact & Support*/}
            {option === "contact" && (
              <div className="border border-white/10 p-6">
                <h2 className="text-xl font-[nunito] font-semibold text-white mb-2">
                  Subject
                </h2>
                <div>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject"
                    className=" mb-6 text-white text-[14px] border border-white/10 outline-none w-full p-3 bg-white/10"
                  />
                </div>
                <h2 className="text-xl font-[nunito] font-semibold text-white mb-2">
                  Project
                </h2>
                <div>
                  <select
                    className="mb-6 text-white text-[14px]  border border-white/10 outline-none w-full p-3 bg-white/10"
                    defaultValue=""
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Project..
                    </option>
                    <option value="project1">AI Research</option>
                    <option value="project2">Marketing Dashboard</option>
                    <option value="project3">E-commerce Store</option>
                    <option value="project4">Personal Portfolio</option>
                  </select>
                </div>
                <h2 className="text-xl font-[nunito] font-semibold text-white mb-2">
                  Message
                </h2>

                <div>
                  <textarea
                    placeholder="Your message"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mb-6 text-[14px] text-white border border-white/10 outline-none w-full p-3 bg-white/10 resize-none"
                  />
                </div>

                <h2 className="text-xl font-[nunito] font-semibold text-white mb-2">
                  Attachments
                </h2>
                {/* <div>
                  <input
                    type="file"
                    multiple
                    className="mb-6 text-gray-400 items-center justify-center flex border border-white/10 outline-none w-full p-3 bg-white/10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30"
                  />
                </div> */}
                <div className="flex mb-6 flex-col items-center justify-center border border-white/10 bg-white/10  p-6 py-8 w-full cursor-pointer  ">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center"
                  >
                    {/* Upload Icon */}
                    <IoCloudUploadOutline size={24} color="white" />

                    {/* Browse text */}
                    <span className="text-[14px] font-medium text-white">
                      Browse files
                    </span>

                    {/* Subtext */}
                    <span className="text-[14px]  text-gray-500 mt-1">
                      Max 10 MB files are allowed
                    </span>
                  </label>

                  {/* Hidden input */}
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {/* Show file name if selected */}
                  {file && (
                    <p className="text-xs text-green-600 mt-3">
                      Selected: {file.name}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-evenly">
                  <button className="text-white border border-white/10 flex items-center justify-center w-[40%] py-3 rounded-full font-medium hover:bg-white/10 ">
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="text-black  bg-white flex items-center justify-center w-[40%] py-3 rounded-full font-medium hover:bg-white/80 "
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-[40%]  ">
            <div className=" ">
              <nav className="space-y-4">
                {/* Account Information */}
                <div
                  onClick={() => {
                    setOption("account");
                  }}
                  className={`flex items-center  gap-3 ${
                    option === "account" &&
                    "bg-white/10 bg-gradient-to-br text-white   border border-white/10"
                  }  px-4 py-3 cursor-pointer `}
                >
                  {/* <User className="w-5 h-5" /> */}
                  <span className="font-medium">Account Information</span>
                </div>
                {/* Subscription & Usage */}
                <div
                  onClick={() => {
                    setOption("subscription");
                  }}
                  className={`flex ${
                    option === "subscription" &&
                    "bg-white/10 bg-gradient-to-br text-white  border border-white/10"
                  } items-center gap-3 text-gray-400 hover:text-white hover:bg-white/10  px-4 py-3   cursor-pointer`}
                >
                  {/* <BarChart3 className="w-5 h-5" /> */}
                  <span className="font-medium">Subscription & Usage</span>
                </div>
                {/* Billing History */}
                <div
                  onClick={() => {
                    setOption("billing");
                  }}
                  className={`flex items-center gap-3 text-gray-400 hover:text-white hover:bg-white/10 ${
                    option === "billing" &&
                    "bg-white/10 text-white  bg-gradient-to-br  border border-white/10"
                  } px-4 py-3   cursor-pointer`}
                >
                  {/* <CreditCard className="w-5 h-5" /> */}
                  <span className="font-medium">Billing History</span>
                </div>
                {/* Contact Support */}
                <div
                  onClick={() => {
                    setOption("contact");
                  }}
                  className={`flex items-center gap-3 text-gray-400 hover:text-white hover:bg-white/10 ${
                    option === "contact" &&
                    "bg-white/10 text-white  bg-gradient-to-br  border border-white/10"
                  } px-4 py-3   cursor-pointer`}
                >
                  {/* <CreditCard className="w-5 h-5" /> */}
                  <span className="font-medium">Contact Support</span>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
