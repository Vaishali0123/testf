"use client";
import React from "react";
import { Sparkles, Menu, X } from "lucide-react";

export default function WebMuaLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen  text-white">
      <style jsx>{`
        @keyframes carousel {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-carousel {
          animation: carousel 30s linear infinite;
        }
        .animate-carousel:hover {
          animation-play-state: paused;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative flex justify-center items-center pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]">
        <img
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop"
          alt="AI Technology Visualization"
          className="w-full rounded-2xl sm:rounded-3xl h-auto object-cover animate-scaleIn shadow-2xl"
        />
        <div className="max-w-7xl bg-black p-6 sm:p-8 md:p-12 lg:p-16 rounded-2xl sm:rounded-3xl bg-opacity-40 backdrop-blur-md absolute mx-auto w-[calc(100%-2rem)] sm:w-auto border border-purple-500/20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent animate-fadeInUp leading-tight">
              AI and WordPress: Enhancing Your Website with Intelligent Tools
            </h1>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 animate-fadeInUp delay-200 leading-relaxed px-2">
              We can&apos;t give you exact rich ad platform so we share most basic
              ads and completely delivered by google code. It is an official
              platform
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400 animate-fadeInUp delay-300">
              <span className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full backdrop-blur-sm">
                <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 animate-float" />
                Webmua
              </span>
              <span className="bg-white/5 px-3 py-2 rounded-full backdrop-blur-sm">
                November 7, 2024
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 animate-slideInLeft">
        <div className="text-xs sm:text-sm text-gray-400 flex flex-wrap items-center gap-2">
          <span className="hover:text-purple-400 transition-colors duration-300 cursor-pointer">
            Home
          </span>
          <span>/</span>
          <span className="hover:text-purple-400 transition-colors duration-300 cursor-pointer">
            Blog
          </span>
          <span>/</span>
          <span className="text-purple-400">Show Saved Link</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <article className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white animate-fadeInUp">
            AI and WordPress: Enhancing Your Website with Intelligent Tools
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6 sm:mb-8 animate-fadeInUp delay-100 text-sm sm:text-base lg:text-lg">
            WordPress powers over 40% of all websites on the internet today.
            But, as technology advances, simply using a code Content Management
            system isn&apos;t enough. Is time client. Nowadays users can increasingly
            turning to Artificial Intelligence (AI) to enhance their sites and
            streamline tasks.
          </p>

          <p className="text-gray-300 leading-relaxed mb-8 sm:mb-12 animate-fadeInUp delay-200 text-sm sm:text-base lg:text-lg">
            From content creation and SEO optimization to personalization and
            security, AI can dramatically improve the way WordPress sites
            function and interact with users. Let&apos;s take a closer look at how AI
            is transforming the WordPress experience and the tools that can help
            you leverage this cutting-edge technology.
          </p>

          {/* Section 1 */}
          <section className="mb-12 sm:mb-16 animate-fadeInUp delay-300">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-white">
              1. AI-Powered Content Creation in WordPress
            </h3>

            <p className="text-gray-300 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
              Creating high-quality content is one of the most critical aspects
              of any WordPress site. However, it&apos;s time-consuming and requires
              skill. AI tools now make it easier to produce engaging content.
              This is where AI-powered WordPress plugins come in.
            </p>

            <div className=" p-4 sm:p-6 rounded-xl border border-purple-500/20 mb-6 sm:mb-8 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-[1.02]">
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-purple-300">
                AI Content Generators
              </h4>
              <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                AI tools can generate content in seconds, allowing WordPress
                users to automate part of the content creation process. Fresh
                tools like AI engine models like ChatGPT or GPT-4 enable you to
                create blog posts, product descriptions, and articles from
                pre-set prompts. This feature helps businesses meet tight
                deadlines.
              </p>

              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  <span className="font-semibold text-purple-400">
                    Jasper AI (formerly Jarvis):
                  </span>{" "}
                  Jasper is an AI tool that helps generate high-quality blog
                  posts, social media content, ad copy, or landing campaigns.
                  Integrated with WordPress, it can save your time and help you
                  produce content faster.
                </p>

                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  <span className="font-semibold text-purple-400">
                    INK Editor:
                  </span>{" "}
                  A WordPress plugin that uses AI to optimize your content for
                  SEO as you write. It offers content tips and analysis for
                  improving readability, keyword usage, and ranking potential.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 p-4 sm:p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 transform hover:scale-[1.02]">
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-blue-300">
                AI-Assisted Content Writing
              </h4>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Not only does AI generation content, but it can also help you
                improve your writing. Grammarly or Hemingway Editor both use AI
                to detect errors in writing, improve readability, and make text
                easier to follow and engaging for your audience. These tools use
                AI to analyze your writing and offer real-time suggestions.
              </p>
            </div>
          </section>

          {/* AI Image */}
          <div className="mb-12 sm:mb-16 rounded-xl sm:rounded-2xl overflow-hidden animate-scaleIn delay-400 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop"
              alt="AI Technology Visualization"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Section 2 */}
          <section className="mb-12 sm:mb-16 animate-fadeInUp delay-500">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-white">
              2. AI for SEO Optimization in WordPress
            </h3>

            <p className="text-gray-300 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
              Search Engine Optimization (SEO) is key to getting your WordPress
              site noticed on Google. AI has revolutionized SEO by providing
              smart recommendations and automating tedious tasks, making SEO
              more accessible for all WordPress users.
            </p>

            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 p-4 sm:p-6 rounded-xl border border-green-500/20 mb-6 sm:mb-8 hover:border-green-500/40 transition-all duration-300 transform hover:scale-[1.02]">
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-green-300">
                AI-Powered SEO Plugins
              </h4>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  <span className="font-semibold text-green-400">
                    Yoast SEO
                  </span>{" "}
                  is one of the most popular SEO plugins for WordPress. Yoast
                  SEO now uses AI and machine learning to analyze your content
                  and recommend improvements for better rankings. It analyzes
                  keyword usage, meta descriptions, readability, and provides
                  insights into improving your on-page SEO.
                </p>

                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  <span className="font-semibold text-green-400">
                    RankMath:
                  </span>{" "}
                  Another AI-driven SEO plugin, RankMath offers real-time
                  suggestions based on Google&apos;s ranking algorithm. It uses AI to
                  monitor your content, title structure, and metadata, along
                  with advanced options, all of which help boost your SEO.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 p-4 sm:p-6 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 transform hover:scale-[1.02]">
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-orange-300">
                Content Optimization with AI
              </h4>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                AI tools like{" "}
                <span className="font-semibold text-orange-400">
                  Surfer SEO
                </span>{" "}
                use advanced algorithms to compare your content to top-ranking
                competitors. It analyzes your blog articles or data posts and
                offers actionable suggestions on how to improve your content. It
                can tell you what&apos;s missing from your post, which keywords to
                include, and how to structure your content for better search
                rankings.
              </p>
            </div>
          </section>

          {/* Elevate Section */}
          <section className="mb-12 sm:mb-16 bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 sm:p-8 md:p-10 rounded-2xl border border-purple-500/30 animate-fadeInUp delay-600 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-white">
              Elevate Your Routine
            </h3>

            <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg">
              Ready to elevate your skincare routine? Our curated product line
              empowers you to build a regimen that not only addresses your
              skin&apos;s unique needs but takes you achieve a bright, glowing skin.
              Whether you&apos;re just beginning your skincare journey or you&apos;re a
              seasoned pro, we have the tools to help you reach your full
              potential.
            </p>

            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              With the power of AI-driven technology and expert-crafted
              formulas, skincare solutions can transform your skin—and your
              confidence.
            </p>
          </section>

          {/* Additional Content */}
          <p className="text-gray-300 leading-relaxed mb-6 sm:mb-8 animate-fadeInUp delay-700 text-sm sm:text-base lg:text-lg">
            Transform begins with embracing care! Unlock the potential of your
            skin with solutions that go beyond the ordinary. Our approach goes
            further than just addressing surface-level concerns. By combining
            the best of science, technology, and nature, we empower you to take
            control of your skincare, ensuring healthier skin. With consistency,
            you&apos;ll not only see visible improvements but also experience
            healthier, more resilient skin—inside and out.
          </p>
        </article>

        {/* Related Articles - Auto Carousel */}
        <section className="mt-12 sm:mt-20">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 animate-fadeInUp">
            Fueling Your Success
          </h3>
          <div className="relative overflow-hidden">
            <div className="flex animate-carousel gap-4 sm:gap-6">
              {[...Array(2)].map((_, setIndex) => (
                <React.Fragment key={setIndex}>
                  {[
                    {
                      id: 1,
                      title:
                        "9 prospecting techniques that won't bore your team to death",
                      image: "1522071820",
                    },
                    {
                      id: 2,
                      title: "Understanding AI in modern business",
                      image: "1552664730",
                    },
                    {
                      id: 3,
                      title: "The future of web development",
                      image: "1542744095",
                    },
                    {
                      id: 4,
                      title: "Mastering WordPress optimization",
                      image: "1498050108",
                    },
                    {
                      id: 5,
                      title: "Content creation with AI tools",
                      image: "1677442136",
                    },
                  ].map((item) => (
                    <div
                      key={`${setIndex}-${item.id}`}
                      className="bg-white/5 backdrop-blur-sm rounded-xl flex flex-col sm:flex-row overflow-hidden border border-white/5 hover:border-purple-500/40 transition-all duration-300 group flex-shrink-0 w-[280px] sm:w-[500px] md:w-[550px] hover:shadow-xl hover:shadow-purple-500/20"
                    >
                      <img
                        src={`https://images.unsplash.com/photo-${item.image}-5cff4288553f?w=400&h=250&fit=crop`}
                        alt={item.title}
                        className="w-full sm:w-[40%] h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-4 sm:p-6 flex flex-col justify-between">
                        <div>
                          <h4 className="text-base sm:text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 line-clamp-2">
                            Discover the latest insights and strategies
                          </p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse-slow" />
                            <span className="text-xs sm:text-sm text-gray-400">
                              WebMua
                            </span>
                          </div>
                          <button className="text-purple-400 hover:text-purple-300 transition-colors duration-300 text-xs sm:text-sm font-medium group-hover:translate-x-2 transform transition-transform duration-300 inline-flex items-center gap-1">
                            Read more <span>→</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
