"use client";
import Link from "next/link";
// import { Link } from "lucide-react";
import React, { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const BlogPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const recentBlogs = [
    {
      id: 1,
      category: "STRATEGY",
      title: "Is your amygdala hijacking your success at work?",
      excerpt:
        "There's no 'single source of truth' for how you're perceived in the workplace. 360-degree feedback might be the next best thing.",
      author: "Elliot Alderson",
      date: "February 16, 2023",
      image: "/api/placeholder/300/200",
    },
    {
      id: 2,
      category: "TEAMWORK",
      title: "9 retrospective techniques that won't bore your team to death",
      excerpt:
        "There's no 'single source of truth' for how you're perceived in the workplace. 360-degree feedback might be the next best thing.",
      author: "Elliot Alderson",
      date: "February 16, 2023",
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      category: "LEADERSHIP",
      title: "Organize the chaos: 5 steps to effective change management",
      excerpt:
        "There's no 'single source of truth' for how you're perceived in the workplace. 360-degree feedback might be the next best thing.",
      author: "Elliot Alderson",
      date: "February 16, 2023",
      image: "/api/placeholder/300/200",
    },
    {
      id: 4,
      category: "PRODUCTIVITY",
      title: "5-minute team building activities for virtual and hybrid squads",
      excerpt:
        "There's no 'single source of truth' for how you're perceived in the workplace. 360-degree feedback might be the next best thing.",
      author: "Elliot Alderson",
      date: "February 16, 2023",
      image: "/api/placeholder/300/200",
    },
    {
      id: 5,
      category: "TEAMWORK",
      title:
        "5 signs of a toxic work culture (and what to do if you're stuck in one)",
      excerpt:
        "There's no 'single source of truth' for how you're perceived in the workplace. 360-degree feedback might be the next best thing.",
      author: "Elliot Alderson",
      date: "February 16, 2023",
      image: "/api/placeholder/300/200",
    },
  ];

  const topBlogs = [
    {
      id: 1,
      title: "It's time to stop measuring productivity",
      author: "Elliot Alderson",
      date: "February 16, 2023",
      image: "/api/placeholder/400/250",
    },
    {
      id: 2,
      title: "The future of remote work collaboration",
      author: "Joanna Wellick",
      date: "February 15, 2023",
      image: "/api/placeholder/400/250",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % topBlogs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + topBlogs.length) % topBlogs.length);
  };

  return (
    <div className="min-h-screen text-white">
      {/* Main Content */}
      <div className="px-8 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Recent Blogs Section */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <span className="text-sm text-gray-400 uppercase tracking-wide">
                THE LATEST
              </span>
              <h2 className="text-3xl font-bold mt-2">Recent Blogs</h2>
            </div>

            <div className="space-y-6">
              {recentBlogs.map((blog) => (
                <Link
                  href={`../blog`}
                  key={blog.id}
                  className="flex flex-col sm:flex-row border border-white/5 bg-[#ffffff0f] rounded-2xl overflow-hidden hover:bg-[#ffffff1a] transition-colors group cursor-pointer"
                >
                  <div className="sm:w-48 h-48 sm:h-full bg-[#ffffff1a] flex-shrink-0">
                    <img
                      src={blog.image}
                      alt={blog?.title || ""}
                      className="w-full h-full items-center flex text-center  justify-center object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <span className="text-xs  uppercase tracking-wide">
                        {blog.category}
                      </span>
                      <h3 className="text-xl font-semibold mt-2 mb-3 group-hover:text-white transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                        <div>
                          <div className="text-sm font-medium">
                            {blog.author}
                          </div>
                          <div className="text-xs text-gray-400">
                            {blog.date}
                          </div>
                        </div>
                      </div>
                      <button className="text-sm font-medium flex items-center gap-2  group-hover:underline group-hover:text-white transition-colors">
                        Read more{" "}
                        <div className="scale-0 group-hover:scale-100 duration-200 group-hover:mr-2">
                          {""}→
                        </div>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100  transition-colors font-medium">
                Load more
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Top Blogs Carousel */}
            <div>
              <span className="text-sm text-gray-400 uppercase tracking-wide">
                MONTHLY
              </span>
              <h2 className="text-2xl font-bold mt-2 mb-6">Top Blogs</h2>

              <div className="relative">
                <div className="overflow-hidden rounded-2xl">
                  <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {topBlogs.map((blog, index) => (
                      <div key={blog.id} className="w-full flex-shrink-0">
                        <div className="bg-[#19191932] border border-white/5 rounded-2xl overflow-hidden">
                          <div className="h-48 border-b-2 border-[#ffffff1a]">
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-6">
                            <div className="flex items-center space-x-3 mb-4">
                              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                              <div>
                                <div className="text-sm font-medium">
                                  {blog.author}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {blog.date}
                                </div>
                              </div>
                            </div>
                            <h3 className="text-lg font-semibold leading-tight">
                              {blog.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel Controls */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                >
                  <IoChevronBack size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                >
                  <IoChevronForward size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
