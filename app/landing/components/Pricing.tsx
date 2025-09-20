"use client";

import React from "react";

const plans = [
  {
    title: "Hobby",
    price: "$0",
    desc: "Great for personal use or as a first step to explore the Scout platform.",
    button: "Sign Up",
    features: [
      "100 Interactions (GPT 3.5 Only)",
      "Deploy 1 App",
      "Connect 1 Collection",
      "10GB of Storage",
      "Community Support (Discord)",
    ],
    highlight: false,
  },
  {
    title: "Pro",
    price: "$50",
    subtitle: "Most Popular",
    desc: "Perfect for building and scaling models with limited context.",
    button: "Sign Up",
    features: [
      "Unlimited Interactions",
      "$0.09 per Interaction",
      "Deploy 10 Apps",
      "Connect 10 Collections",
      "1TB of Storage",
      "Community & Email Support",
    ],
    highlight: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    desc: "For large scale models with large and ever-changing context.",
    button: "Request Access",
    features: [
      "Unlimited Interactions",
      "Custom Interaction Pricing",
      "Unlimited Apps",
      "Unlimited Collections",
      "Unlimited Storage",
      "Dedicated Support",
    ],
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <section className=" text-white py-16 scale-95 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">A plan for every need.</h2>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          Whether you are just starting or require massive scale, we have a
          solution.
        </p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl border ${
              plan.highlight
                ? "bg-gradient-to-b from-purple-800/30  to-black border-purple-600"
                : "bg-gradient-to-b from-[#181818] mt-10 to-black border-gray-700"
            }`}
          >
            {/* Badge for PRO */}
            {plan.subtitle && (
              <span className="inline-block mb-3 text-xs font-semibold px-3 py-1 bg-purple-700 text-white rounded-full">
                {plan.subtitle}
              </span>
            )}
            <h3 className="text-lg font-semibold">{plan.title}</h3>
            <p className="text-3xl font-bold mt-2">{plan.price}</p>
            <p className="text-sm text-gray-400 mt-2">{plan.desc}</p>

            {/* Button */}
            <button
              className={`mt-6 w-full py-2 rounded-full font-semibold ${
                plan.highlight
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {plan.button}
            </button>

            {/* Features */}
            <ul className="mt-6 space-y-2 text-sm text-gray-300">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-400">✔</span> {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Dedicated Support + Add-on */}
      <div className="flex w-[70%] bg-gradient-to-tl from-[#d9d9d900] via-[#7373730d] to-[#73737333] border rounded-3xl   mx-auto mt-4">
        {/* Dedicated Support */}
        <div className="w-[70%] p-2 rounded-l-2xl">
          <div className="border p-6 rounded-l-2xl">
            <h3 className="text-lg font-semibold">Dedicated Support</h3>
            <p className="text-sm text-gray-400 mt-2">
              We are here to help get you started with a dedicated support
              engineer who can assist with scoping your test models and getting
              them deployed.
            </p>
            <p className="text-sm text-gray-300 mt-4 font-semibold">
              What's Included
            </p>
            <ul className="mt-3 space-y-2 text-sm text-gray-300">
              <li>✔ Shared Slack Channel</li>
              <li>✔ Prompt Engineering Guidance</li>
              <li>✔ Dedicated Support Engineer</li>
              <li>✔ Context Sourcing Guidance</li>
            </ul>
          </div>
        </div>

        {/* Add-on */}
        <div className="p-2 w-[30%] rounded-r-2xl bg-gradient-to-b from-[#181818] to-black  border-gray-700 flex flex-col justify-between">
          <div className=" border flex flex-col items-center p-6 rounded-r-2xl h-full">
            <div>
              <span className="inline-block mb-3 text-xs font-semibold px-3 py-1 bg-gray-700 rounded-full">
                Add On
              </span>
              <h3 className="text-3xl font-bold">$750</h3>
              <p className="text-sm text-gray-400">monthly</p>
            </div>
            <button className="mt-6 w-full py-2 rounded-full font-semibold bg-gray-800 hover:bg-gray-700">
              Request Access
            </button>
            <p className="text-xs text-gray-500 mt-2">
              No long term contract obligations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
