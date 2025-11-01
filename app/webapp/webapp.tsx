"use client";
import React, { useEffect, useState } from "react";
import { MessageCircle, RotateCcw } from "lucide-react";
import axios from "axios";
import { NEXT_PUBLIC_API } from "../utils/config";
import purpleeffect from "../../public/purpleeffect.svg";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { CiMicrophoneOn } from "react-icons/ci";
import Image from "next/image";

interface Item {
  url: string;
}
interface Message {
  type: string;
  message: string;
  timestamp: string;
  images: ImageData[];
  items: ItemData[];
}
interface ImageData {
  source_url: string;
  title?: string;
  date?: string | Date;
}

interface ThemeData {
  name: string;
  slug: string;
  description: string;
  features: string[];
  rating: number;
  downloads: string;
}

interface ItemData {
  // For images
  source_url?: string;
  title?: string;
  date?: string | Date;
  // For themes/data
  name?: string;
  slug?: string;
  description?: string;
  features?: string[];
  rating?: number;
  downloads?: string;
}
const Page = () => {
  const [siteUrl, setSiteUrl] = useState("");
  const email = "sheeratgupta@gmail.com";
  // console.log(email, "email");
  const handleConnect = async () => {
    if (!siteUrl) return alert("Please enter a site URL");

    try {
      // Ensure protocol exists
      let formattedUrl = siteUrl.trim();
      if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = "http://" + formattedUrl; // default to http
      }

      //  Parse with URL API to always get clean origin
      const urlObj = new URL(formattedUrl);
      const cleanUrl = urlObj.origin; // e.g. http://testing3.local

      // Build plugins page URL
      const pluginsUrl = `${cleanUrl}/wp-admin/plugins.php`;

      // Save only clean site_url in DB
      const res = await axios.post("http://localhost:7002/api/site", {
        email: email,
        site_url: cleanUrl,
      });

      console.log(res?.data?.success);
      if (!res?.data?.success) return alert("Something went wrong");

      // Open plugins page in new tab
      window.open(pluginsUrl, "_blank");
    } catch (err) {
      console.error(err);
      alert("Invalid site URL");
    }
  };

  const [iframeKey, setIframeKey] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [reload, setReload] = useState(false);
  const [data, setData] = useState({});
  // Conversation & thread management
  const [threadId] = useState(() => `thread-${Date.now()}`);
  const [conversation, setConversation] = useState<Message[]>([
    {
      type: "ai",
      message:
        "👋 Welcome to WordPress AI Assistant!\n\nI can help you manage your WordPress site with natural language commands. Here's what I can do:\n\n• Create and manage pages & posts\n• Handle user management\n• Modify site settings\n• Manage comments and media\n• Style and design changes\n\nJust tell me what you'd like to do!",
      timestamp: new Date().toLocaleTimeString(),
      images: [],
      items: [],
    },
  ]);

  // const addToConversation = (type, message, images = []) => {
  //   setConversation((prev) => [
  //     ...prev,
  //     {
  //       type,
  //       message,
  //       images,
  //       timestamp: new Date().toLocaleTimeString(),
  //     },
  //   ]);
  // };

  // const fetchWordPressStats = async () => {
  //   try {
  //     const response = await fetch("http://localhost:7002/api/wordpress-info");
  //     const data = await response.json();
  //     if (data.success) setWpStats(data.data);
  //   } catch (error) {
  //     console.error("Failed to fetch WordPress stats:", error);
  //   }
  // };

  const handleSubmitPrompt = async () => {
    if (!prompt.trim()) return;

    setSaving(true);

    const timestamp = new Date().toLocaleTimeString();
    const newUserMessage = {
      type: "user",
      message: prompt,
      timestamp,
      images: [],
      items: [],
    };
    const processingMessage = {
      type: "ai",
      message: "Typing...",
      timestamp,
      images: [],
      items: [],
    };

    setConversation((prev) => [...prev, newUserMessage, processingMessage]);

    const previewKeywords = [
      "css",
      "style",
      "design",
      "color",
      "background",
      "font",
      "layout",
      "preview",
      "show",
      "display",
      "appearance",
    ];
    const shouldShowPreview = previewKeywords.some((keyword) =>
      prompt.toLowerCase().includes(keyword)
    );

    try {
      const conversationHistory = conversation
        .filter((msg) => msg.type === "user" || msg.type === "ai")
        .map((msg) => ({
          role: msg.type === "user" ? "user" : "assistant",
          content: msg.message,
        }));

      conversationHistory.push({ role: "user", content: prompt });

      const response = await fetch(`${NEXT_PUBLIC_API}/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          conversation: conversationHistory,
          threadId,
          projectId: "68d3d45e89de8ffc1846457b",

          // username: credentials.username,
          // applicationPassword: credentials.app_password,
          siteUrl: "http://testingultra.local/",
          username: "vaishalii",
          accessToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90ZXN0aW5ndWx0cmEubG9jYWwiLCJhdWQiOiJodHRwOlwvXC90ZXN0aW5ndWx0cmEubG9jYWwiLCJpYXQiOjE3NTg3MjgwMDMsImV4cCI6MTc1ODgxNDQwMywidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJ2YWlzaGFsaWkiLCJlbWFpbCI6ImRldi1lbWFpbEB3cGVuZ2luZS5sb2NhbCIsInJvbGVzIjpbImFkbWluaXN0cmF0b3IiXSwic2l0ZV91cmwiOiJodHRwOlwvXC90ZXN0aW5ndWx0cmEubG9jYWwifQ.sfEsNooOxvdcGIzWloLs1QXkA8HUfmGsk0zDXT0LCPY",
        }),
      });

      const data = await response.json();
      console.log(data, "data");
      setData(data);
      setConversation((prev) => {
        const withoutProcessing = prev.slice(0, -1); // Remove "Typing..."

        if (data.success) {
          // Use data.response as primary response, fallback to data.details
          const aiResponse =
            data?.response ||
            (typeof data.details === "string" ? data.details : "✅ Done!");

          // Check if details?.items exists and is an array
          const itemsArray = Array.isArray(data.details?.items)
            ? data.details.items
            : [];

          // Separate images and other items
          const imageItems = itemsArray.filter((item: Item) => item.url);
          const dataItems = itemsArray.filter((item: Item) => !item.url);

          // Attach items to this AI message
          const newAiMessage = {
            type: "ai",
            message: aiResponse,
            images: imageItems,
            items: dataItems,
            timestamp: new Date().toLocaleTimeString(),
          };

          const updated = [...withoutProcessing, newAiMessage];

          // Optional debug/system messages
          if (data.agentUsed && data.classificationReasoning) {
            updated.push({
              type: "system",
              message: `🤖 Routed to: ${data.agentUsed} | Reason: ${data.classificationReasoning}`,
              timestamp: new Date().toLocaleTimeString(),
              images: [],
              items: [],
            });
          }

          if (data.suggestions?.length > 0) {
            updated.push({
              type: "ai",
              message:
                "💡 Suggestions:\n" +
                data.suggestions.map((s: string) => `• ${s}`).join("\n"),
              timestamp: new Date().toLocaleTimeString(),
              images: [],
              items: [],
            });
          }

          if (data.refreshNeeded || shouldShowPreview) {
            setShowPreview(true);
            setIframeKey((prev) => prev + 1);
            updated.push({
              type: "ai",
              message: "👁️ Preview updated! Check the preview panel.",
              timestamp: new Date().toLocaleTimeString(),
              images: [],
              items: [],
            });
          }

          // if (
          //   data.action?.includes("create") ||
          //   data.action?.includes("delete")
          // ) {
          //   fetchWordPressStats();
          // }

          return updated;
        } else {
          return [
            ...withoutProcessing,
            {
              type: "ai",
              message: `⚠️ ${data.message || "Something went wrong"}`,
              timestamp: new Date().toLocaleTimeString(),
              images: [],
              items: [],
            },
          ];
        }
      });
    } catch (err) {
      console.error("AI error:", err);
      setConversation((prev) => {
        const withoutProcessing = prev.slice(0, -1);
        return [
          ...withoutProcessing,
          {
            type: "ai",
            message: `❌ Error: ${
              err ||
              "Failed to process your request. Check if the backend server is running."
            }`,
            timestamp: new Date().toLocaleTimeString(),
            images: [],
            items: [],
          },
        ];
      });
    }

    setPrompt("");
    setSaving(false);
  };

  const resetConversation = () => {
    setConversation([
      {
        type: "ai",
        message:
          "👋 Welcome to WordPress AI Assistant!\n\nI can help you manage your WordPress site with natural language commands. Here's what I can do:\n\n• Create and manage pages & posts\n• Handle user management\n• Modify site settings\n• Manage comments and media\n• Style and design changes\n\nJust tell me what you'd like to do!",
        timestamp: new Date().toLocaleTimeString(),
        images: [],
        items: [],
      },
    ]);
  };
  const [siteid, setSiteid] = useState("");
  const [siteurl, setSiteurl] = useState("");
  // const siteid = sessionStorage.getItem("siteId");
  // const siteurl = sessionStorage.getItem("siteurl");

  const [tab, setTab] = useState("tab");
  useEffect(() => {
    console.log("object");
    getMessages();
    setTab(sessionStorage.getItem("tab") || "tab");
    if (typeof window !== "undefined") {
      setSiteid(sessionStorage.getItem("siteId") || "");
      setSiteurl(sessionStorage.getItem("siteurl") || "");
    }
  }, []);
  const getMessages = async () => {
    if (!siteid) {
      return;
    }
    try {
      const res = await axios.get(`${NEXT_PUBLIC_API}/getmessages/${siteid}`);
      console.log(res.data, "mkk");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className={`duration-200  flex w-full items-center justify-center h-full ${
        reload === false ? "border-transparent gap-2" : "border-transparent"
      }`}
    >
      <div
        className={`${
          tab === "tab" && siteurl
            ? " w-[70%]"
            : tab === "laptop" || !siteurl
            ? "w-[100%]"
            : "w-[30%]"
        }
        h-full border flex flex-row-reverse bg-red-600 items-center justify-center overflow-hidden`}
      >
        {siteurl ? (
          <iframe
            src={siteurl}
            className="w-full h-full "
            style={{ border: "none" }}
          />
        ) : (
          <div className="w-full h-full  flex items-center justify-center flex-col">
            <Image
              src={purpleeffect}
              alt="pic"
              width={300}
              height={300}
              className="absolute top-50 left-50 z-0"
            />
            <div
              className={`duration-100 
                 text-[#fff] text-[40px]  text-center font-bold
              `}
            >
              Start <span className="text-[#7A7A7A]">out</span> with
              <span className="text-[#7A7A7A]">out</span> a{" "}
              <span className="text-[#7A7A7A]">doubt</span>
            </div>
            <div className="flex flex-col gap-2 mt-3  items-start">
              <div
                className={`duration-100 
                  text-[#CACACA] mb-4 font-bold text-center text-[16px]
              }`}
              >
                Upload to WordPress
              </div>
              <div
                className="duration-100 
                  text-[#CACACA]  text-[16px]
              "
              >
                • Log in to your WordPress Admin.
              </div>
              <div
                className="duration-100 
                  text-[#CACACA]  text-[16px]
              "
              >
                • Go to Plugins → Add New → Upload Plugin
              </div>
              <div
                className="duration-100 
                  text-[#CACACA]  text-[16px]
              "
              >
                • Choose the .zip file and click Install Now.
              </div>
            </div>
            <input
              value={siteUrl}
              type="text"
              onChange={(e) => setSiteUrl(e.target.value)}
              required
              placeholder="Site url"
              className="border-2 z-20 border-[#fff] bg-black outline-none w-[30%]  text-white my-4 p-2 text-[14px] rounded-full"
            />
            <button
              onClick={handleConnect}
              className="px-8 z-20 py-2 text-black text-[14px] bg-white rounded-full"
            >
              Connect Webivus to Your Site
            </button>
          </div>
        )}
      </div>
      {/* Chatting Area */}
      {siteurl && (
        <div
          className={`duration-200 ${
            tab === "laptop" ? "hidden" : tab === "tab" ? "w-[30%]" : "w-[70%]"
          } relative flex flex-col w-[30%] border p-2 overflow-hidden justify-center h-full

        `}
        >
          {/* Conversation Area */}
          <div
            className={`${
              reload === false
                ? "h-[calc(100vh-150px)] w-[100%]  items-start justify-start flex "
                : "hidden"
            }`}
          >
            {reload === false && (
              <div className="h-[100%] bg-[#0c0c0c] w-[100%] mt-2 flex flex-col">
                <div className="flex items-center justify-between p-3 border-b border-gray-800">
                  <div className="flex items-center space-x-2">
                    <MessageCircle size={16} className="text-blue-400" />
                    <span className="text-sm font-semibold text-gray-300">
                      Conversation (Thread: {threadId.slice(-6)})
                    </span>
                  </div>
                  <button
                    onClick={resetConversation}
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Clear conversation"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                <div className="h-[100%] p-4 overflow-y-scroll">
                  <div className="space-y-4 ">
                    {conversation.map((msg: Message, idx: number) => {
                      return (
                        <div
                          key={idx}
                          className={`flex ${
                            msg.type === "user"
                              ? "justify-end"
                              : msg.type === "system"
                              ? "justify-center"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[85%] p-4 rounded-lg text-sm ${
                              msg.type === "user"
                                ? "bg-purple-800/60 text-white rounded-br-sm"
                                : msg.type === "system"
                                ? "bg-white/10 border border-gray-600 text-gray-300 rounded text-xs opacity-80"
                                : "bg-gradient-to-br from-gray-800/50 to-gray-900/50 text-gray-100 rounded-bl-sm border border-gray-700/30"
                            }`}
                          >
                            {/* AI Response Content */}
                            <div className="whitespace-pre-wrap leading-relaxed mb-3">
                              {msg.message}
                            </div>

                            {/* Render images if present */}
                            {msg.images?.length > 0 && (
                              <div className="mt-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                                <div className="text-xs text-gray-400 mb-2 font-medium">
                                  📎 Attached Images ({msg.images.length})
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {msg.images.map(
                                    (image: ImageData, i: number) => (
                                      <div
                                        key={i}
                                        className="flex flex-col gap-2 p-2 bg-gray-700/30 rounded border border-gray-600/30"
                                      >
                                        {image?.source_url && (
                                          <img
                                            src={image.source_url}
                                            alt={image.title || "image"}
                                            className="w-full h-32 object-cover rounded"
                                            onError={(e) => {
                                              e.currentTarget.style.display =
                                                "none";
                                            }}
                                          />
                                        )}
                                        <div className="text-xs text-gray-300">
                                          {image.title && (
                                            <div
                                              className="font-medium truncate"
                                              title={image.title}
                                            >
                                              {image.title}
                                            </div>
                                          )}
                                          {image.date && (
                                            <div className="text-gray-400 mt-1">
                                              {new Date(
                                                image.date
                                              ).toLocaleDateString()}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Render data items (themes, etc.) if present */}
                            {msg.items?.length > 0 && (
                              <div className="mt-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                                <div className="text-xs text-gray-400 mb-3 font-medium">
                                  📋 Recommendations ({msg.items.length})
                                </div>
                                <div className="space-y-3">
                                  {msg.items.map(
                                    (item: ItemData, i: number) => (
                                      <div
                                        key={i}
                                        className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:bg-gray-700/50 transition-colors"
                                      >
                                        {/* Theme/Item Header */}
                                        <div className="flex items-start justify-between mb-2">
                                          <div className="flex-1">
                                            <h4 className="text-sm font-semibold text-white mb-1">
                                              {item.name ||
                                                item.title ||
                                                "Item"}
                                            </h4>
                                            {item.slug && (
                                              <p className="text-xs text-gray-400 font-mono">
                                                {item.slug}
                                              </p>
                                            )}
                                          </div>
                                          {item.rating && (
                                            <div className="flex items-center gap-1 text-xs text-yellow-400">
                                              <span>⭐</span>
                                              <span>{item.rating}</span>
                                            </div>
                                          )}
                                        </div>

                                        {/* Description */}
                                        {item.description && (
                                          <p className="text-xs text-gray-300 mb-2 leading-relaxed">
                                            {item.description}
                                          </p>
                                        )}

                                        {/* Features */}
                                        {item.features &&
                                          item.features.length > 0 && (
                                            <div className="mb-2">
                                              <div className="text-xs text-gray-400 mb-1 font-medium">
                                                Features:
                                              </div>
                                              <div className="flex flex-wrap gap-1">
                                                {item.features.map(
                                                  (
                                                    feature: string,
                                                    idx: number
                                                  ) => (
                                                    <span
                                                      key={idx}
                                                      className="text-xs bg-gray-600/50 text-gray-200 px-2 py-1 rounded"
                                                    >
                                                      {feature}
                                                    </span>
                                                  )
                                                )}
                                              </div>
                                            </div>
                                          )}

                                        {/* Downloads */}
                                        {item.downloads && (
                                          <div className="text-xs text-gray-400">
                                            Downloads: {item.downloads}
                                          </div>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                            <div className="text-xs opacity-60 mt-3 pt-2 border-t border-gray-600/30">
                              {msg.timestamp}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div
            className={`duration-200 z-10 ${
              reload === false
                ? "text-[#626262] gap-2 flex items-center p-2 mt-4 h-[40px] w-[100%] rounded-full border border-[#373737] bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#73737326] text-center text-[16px]"
                : "text-[#626262] gap-2 flex items-center w-[20%] p-2 mt-4 h-[40px] rounded-full border border-[#373737] bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#73737322] text-center text-[16px]"
            }`}
          >
            <div className="flex items-center gap-2 w-full ">
              <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-white">
                <CiMicrophoneOn size={20} />
              </div>
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !saving) handleSubmitPrompt();
                }}
                placeholder="Enter command"
                className="text-[#fff] outline-none text-[14px] bg-transparent h-full flex-1"
                disabled={saving}
              />
            </div>
            <button
              onClick={handleSubmitPrompt}
              disabled={saving || !prompt.trim()}
              className={`w-[30px] h-full rounded-full transition-colors ${
                saving || !prompt.trim()
                  ? "bg-gray-500 text-white cursor-not-allowed"
                  : "hover:bg-gray-600"
              }`}
            >
              {saving ? "..." : "→"}
            </button>
          </div>
        </div>
      )}

      {tab === "laptop" && (
        <div
          onClick={() => {
            setTab("tab");
            sessionStorage.setItem("tab", "tab");
          }}
          className="bg-black rounded-full p-2 absolute bottom-10 right-2 flex items-center justify-center"
        >
          <IoChatbubbleEllipsesOutline color="white" size={25} />
        </div>
      )}
    </div>
  );
};

export default Page;
