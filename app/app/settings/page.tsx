"use client";
import React from "react";
// import { User, BarChart3, CreditCard } from "lucide-react";
import { MdOutlineSwitchAccount } from "react-icons/md";

const AccountSettings: React.FC = () => {
  return (
    <div className="relative w-full bg-white/10 py-10">
      <div className="relative mx-auto w-full max-w-[1400px] min-h-[92vh] border border-white/10 flex items-center px-2">
        <div className="hero-stars " />
        <div className="p-2">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-[nunito] font-semibold text-white mb-2">
              Account Settings
            </h1>
            <p className="text-gray-400">
              Manage your account settings and preferences.
            </p>
          </div>

          <div className="flex p-2 gap-2 w-full">
            {/* Main Content */}
            <div className="flex flex-col w-full gap-2 space-y-8">
              {/* Account Information */}
              <div className=" border border-white/10 p-6">
                <h2 className="text-xl font-[nunito] font-semibold text-white mb-2">
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
              </div>

              {/* Subscription & Usage */}
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

                    <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                      Upgrade Tier
                    </button>
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

              {/* Billing History */}
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
            </div>

            {/* Sidebar */}
            <div className="w-[40%] ">
              <div className=" ">
                <nav className="space-y-4">
                  <div className="flex items-center gap-3 border border-white/10 text-white px-4 py-3 ">
                    {/* <User className="w-5 h-5" /> */}
                    <span className="font-medium">Account Information</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-white/20 border-b border-white/10 px-4 py-3  transition-colors cursor-pointer">
                    {/* <BarChart3 className="w-5 h-5" /> */}
                    <span className="font-medium">Subscription & Usage</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-white/20 border-b border-white/10 px-4 py-3  transition-colors cursor-pointer">
                    {/* <CreditCard className="w-5 h-5" /> */}
                    <span className="font-medium">Billing History</span>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
