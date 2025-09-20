// "use client";
// import React, { useState } from "react";
// import { MessageCircle, RotateCcw } from "lucide-react";

// const credentials = {
//   site_url: "http://testingultra.local",
//   admin_email: "dev-email@wpengine.local",
//   site_name: "testing_ultra",
//   username: "shreya",
//   app_password: "qZiW WEwj BIxf zhg1 DKz3 gFs6",
// };

// const page = () => {
//   const [iframeKey, setIframeKey] = useState(0);
//   const [prompt, setPrompt] = useState("");
//   const [saving, setSaving] = useState(false);
//   const [showPreview, setShowPreview] = useState(false);
//   const [wpStats, setWpStats] = useState(null);
//   const [imageData, setImageData] = useState([]);
//   // Enhanced conversation state with thread management
//   const [threadId] = useState(() => `thread-${Date.now()}`); // Persistent thread ID
//   const [conversation, setConversation] = useState([
//     {
//       type: "ai",
//       message:
//         "👋 Welcome to WordPress AI Assistant!\n\nI can help you manage your WordPress site with natural language commands. Here's what I can do:\n\n• Create and manage pages & posts\n• Handle user management\n• Modify site settings\n• Manage comments and media\n• Style and design changes\n\nJust tell me what you'd like to do!",
//       timestamp: new Date().toLocaleTimeString(),
//     },
//   ]);
//   const imagesdata = [
//     { id: 1 },
//     { id: 2 },
//     { id: 3 },
//     { id: 4 },
//     { id: 5 },
//     { id: 6 },
//     { id: 7 },
//     { id: 8 },
//     { id: 9 },
//     { id: 10 },
//   ];
//   const addToConversation = (type, message) => {
//     setConversation((prev) => [
//       ...prev,
//       {
//         type,
//         message,
//         timestamp: new Date().toLocaleTimeString(),
//       },
//     ]);
//   };

//   const fetchWordPressStats = async () => {
//     try {
//       const response = await fetch("http://localhost:7002/api/wordpress-info");
//       const data = await response.json();
//       if (data.success) {
//         setWpStats(data.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch WordPress stats:", error);
//     }
//   };
//   console.log(conversation, "conversation");
//   console.log(imageData, "imageData");
//   const handleSubmitPrompt = async () => {
//     if (!prompt.trim()) return;

//     setSaving(true);

//     // Add user message and processing indicator
//     const timestamp = new Date().toLocaleTimeString();
//     const newUserMessage = { type: "user", message: prompt, timestamp };
//     const processingMessage = {
//       type: "ai",
//       message: "Typing...",
//       timestamp,
//     };

//     setConversation((prev) => [...prev, newUserMessage, processingMessage]);

//     // Detect styling/preview-related request
//     const previewKeywords = [
//       "css",
//       "style",
//       "design",
//       "color",
//       "background",
//       "font",
//       "layout",
//       "preview",
//       "show",
//       "display",
//       "appearance",
//     ];
//     const shouldShowPreview = previewKeywords.some((keyword) =>
//       prompt.toLowerCase().includes(keyword)
//     );

//     try {
//       // Prepare conversation history for the backend
//       const conversationHistory = conversation
//         .filter((msg) => msg.type === "user" || msg.type === "ai")
//         .map((msg) => ({
//           role: msg.type === "user" ? "user" : "assistant",
//           content: msg.message,
//         }));

//       // Add current user message to history
//       conversationHistory.push({
//         role: "user",
//         content: prompt,
//       });

//       const response = await fetch("http://localhost:7002/api/test", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           prompt,
//           conversation: conversationHistory, // Send full conversation history
//           threadId, // Include thread ID for backend memory
//           siteUrl: credentials.site_url,
//           username: credentials.username,
//           applicationPassword: credentials.app_password,
//         }),
//       });

//       const data = await response.json();
//       console.log(data, "data");
//       // Remove "Processing..." and replace with actual AI response
//       setConversation((prev) => {
//         const withoutProcessing = prev.slice(0, -1); // remove last "processing..."
//         const updated = [...withoutProcessing];

//         if (data.success) {
//           const aiResponse =
//             typeof data.details === "string"
//               ? data.details
//               : JSON.stringify(data.details, null, 2);
//           if (data?.details?.items?.length > 0) {
//             setImageData(data?.details?.items);
//           }
//           updated.push({
//             type: "ai",
//             message: aiResponse || "✅ Done!",
//             timestamp: new Date().toLocaleTimeString(),
//           });

//           // Add debug info about agent routing (optional)
//           if (data.agentUsed && data.classificationReasoning) {
//             updated.push({
//               type: "system", // New message type for debug info
//               message: `🤖 Routed to: ${data.agentUsed} | Reason: ${data.classificationReasoning}`,
//               timestamp: new Date().toLocaleTimeString(),
//             });
//           }

//           if (data.suggestions?.length > 0 && Array.isArray(data.suggestions)) {
//             updated.push({
//               type: "ai",
//               message:
//                 "💡 Suggestions:\n" +
//                 data.suggestions.map((s) => `• ${s}`).join("\n"),
//               timestamp: new Date().toLocaleTimeString(),
//             });
//           }

//           if (data.details) {
//             if (Array.isArray(data.details) && data.details.length > 0) {
//               const detailsText = data.details
//                 .map(
//                   (item) =>
//                     `• ${item.title || item.name || "Item"} (${
//                       item.status || "Status"
//                     })`
//                 )
//                 .join("\n");
//               updated.push({
//                 type: "ai",
//                 message: `📋 Details:\n${detailsText}`,
//                 timestamp: new Date().toLocaleTimeString(),
//               });
//             } else if (typeof data.details === "object") {
//               updated.push({
//                 type: "ai",
//                 message: `📋 Details: ${JSON.stringify(data.details, null, 2)}`,
//                 timestamp: new Date().toLocaleTimeString(),
//               });
//             }
//           }

//           if (data.refreshNeeded || shouldShowPreview) {
//             setShowPreview(true);
//             setIframeKey((prev) => prev + 1);
//             updated.push({
//               type: "ai",
//               message:
//                 "👁️ Preview updated! Check the preview panel to see your changes.",
//               timestamp: new Date().toLocaleTimeString(),
//             });
//           }

//           // Optionally refresh WP stats if content was modified
//           if (
//             data.action?.includes("create") ||
//             data.action?.includes("delete")
//           ) {
//             fetchWordPressStats();
//           }
//         } else {
//           updated.push({
//             type: "ai",
//             message: `⚠️ ${data.message || "Something went wrong"}`,
//             timestamp: new Date().toLocaleTimeString(),
//           });
//         }

//         return updated;
//       });
//     } catch (err) {
//       console.error("AI error:", err);
//       setConversation((prev) => {
//         const withoutProcessing = prev.slice(0, -1);
//         return [
//           ...withoutProcessing,
//           {
//             type: "ai",
//             message: `❌ Error: ${
//               err.message ||
//               "Failed to process your request. Please check if the backend server is running."
//             }`,
//             timestamp: new Date().toLocaleTimeString(),
//           },
//         ];
//       });
//     }

//     setPrompt("");
//     setSaving(false);
//   };

//   // Enhanced conversation reset with thread management
//   const resetConversation = () => {
//     setConversation([
//       {
//         type: "ai",
//         message:
//           "👋 Welcome to WordPress AI Assistant!\n\nI can help you manage your WordPress site with natural language commands. Here's what I can do:\n\n• Create and manage pages & posts\n• Handle user management\n• Modify site settings\n• Manage comments and media\n• Style and design changes\n\nJust tell me what you'd like to do!",
//         timestamp: new Date().toLocaleTimeString(),
//       },
//     ]);
//     // Optionally, you could generate a new thread ID here if you want to start fresh
//   };

//   const [reload, setReload] = useState(false);

//   return (
//     <div
//       className={`duration-200 flex w-full items-center justify-center h-full ${
//         reload === false ? "border-transparent gap-2" : "border-transparent"
//       }`}
//     >
//       {/* <div
//         className={`duration-200 ${
//           reload === false
//             ? "w-[70%] h-full border flex items-center justify-center"
//             : "w-[0%] h-[0%]"
//         }`}
//       ></div> */}

//       {/* Chatting Area */}
//       <div
//         className={`duration-200 relative ${
//           reload === false
//             ? "flex flex-col  w-[100%] border p-2 overflow-hidden justify-center h-full relative"
//             : "flex flex-col items-center justify-center w-full border p-2 h-full relative"
//         }`}
//       >
//         {/* Conversation Area */}
//         <div
//           className={`${
//             reload == false
//               ? "h-[calc(100vh-150px)] w-[100%]  items-start justify-start flex "
//               : "hidden"
//           }`}
//         >
//           {reload === false && (
//             <div className="h-[100%] bg-[#0c0c0c]  w-[100%] mt-2 flex flex-col">
//               <div className="flex items-center justify-between p-3 border-b border-gray-800">
//                 <div className="flex items-center space-x-2">
//                   <MessageCircle size={16} className="text-blue-400" />
//                   <span className="text-sm font-semibold text-gray-300">
//                     Conversation (Thread: {threadId.slice(-6)})
//                   </span>
//                 </div>
//                 <button
//                   onClick={resetConversation}
//                   className="text-gray-400 hover:text-white transition-colors"
//                   title="Clear conversation"
//                 >
//                   <RotateCcw size={14} />
//                 </button>
//               </div>

//               <div className="h-[100%]  p-4 overflow-y-scroll">
//                 <div className="space-y-4">
//                   {conversation.map((msg, idx) => (
//                     <div
//                       key={idx}
//                       className={`flex ${
//                         msg.type === "user"
//                           ? "justify-end"
//                           : msg.type === "system"
//                           ? "justify-center"
//                           : "justify-start"
//                       }`}
//                     >
//                       <div
//                         className={`max-w-[85%] p-3 rounded-lg text-sm ${
//                           msg.type === "user"
//                             ? "bg-purple-800/60 text-white rounded-br-sm"
//                             : msg.type === "system"
//                             ? "bg-white/10 text-gray-300 rounded text-xs opacity-80"
//                             : "bg-white/10 text-gray-100 rounded-bl-sm"
//                         }`}
//                       >
//                         {msg.type === "ai" && imageData?.length > 0 && (
//                           <div className="gap-2 grid grid-cols-3 my-2 flex-wrap">
//                             {imageData.map((image, i) => (
//                               <div className="flex flex-col gap-3">
//                                 <img src={image?.source_url} alt="pic" />
//                                 {/* <div>
//                                   Uploaded Date:
//                                   {image?.date?.toLocaleTimeString()}
//                                 </div> */}
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                         <div className="whitespace-pre-wrap leading-relaxed">
//                           {msg.message}
//                         </div>
//                         <div className="text-xs opacity-60 mt-2">
//                           {msg.timestamp}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Support Section */}
//         <div
//           className={`duration-200 ${
//             reload === false
//               ? "w-[100%] flex flex-col items-center hidden scale-0 z-10"
//               : "w-[40%] flex flex-col items-center z-10"
//           }`}
//         >
//           <div
//             className={`duration-100 ${
//               reload === false
//                 ? "scale-0"
//                 : "text-[#fff] text-[40px] text-center font-bold"
//             }`}
//           >
//             Start <span className="text-[#373737]">out</span> without a{" "}
//             <span className="text-[#373737]">doubt</span>
//           </div>
//           <div
//             className={`duration-100 ${
//               reload === false
//                 ? "scale-0"
//                 : "text-[#626262] text-center text-[16px]"
//             }`}
//           >
//             Go further than the speed of thought. STUDIO AI reads and
//             understands your designs, and with nothing more than a single line
//             of feedback, perform complex actions autonomously.
//           </div>
//         </div>

//         {/* Input Area */}
//         <div
//           className={`duration-200 z-10 ${
//             reload === false
//               ? "text-[#626262] gap-2 flex items-center p-2 mt-4 h-[40px] w-[100%] rounded-full border border-[#373737] bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#73737326] text-center text-[16px]"
//               : "text-[#626262] gap-2 flex items-center w-[20%] p-2 mt-4 h-[40px] rounded-full border border-[#373737] bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#73737322] text-center text-[16px]"
//           }`}
//         >
//           <div className="flex items-center gap-2 w-full">
//             <div className="w-[30px] h-[30px] rounded-full bg-white"></div>
//             <input
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               onKeyPress={(e) => {
//                 if (e.key === "Enter" && !saving) {
//                   handleSubmitPrompt();
//                 }
//               }}
//               placeholder="Enter command"
//               className="text-[#fff] outline-none text-[14px] bg-transparent h-full flex-1"
//               disabled={saving}
//             />
//           </div>
//           <button
//             onClick={handleSubmitPrompt}
//             disabled={saving || !prompt.trim()}
//             className={`w-[30px] h-full rounded-full transition-colors ${
//               saving || !prompt.trim()
//                 ? "bg-gray-500 text-white cursor-not-allowed"
//                 : " hover:bg-red-600"
//             }`}
//           >
//             {saving ? "..." : "→"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;
"use client";
import React, { useEffect, useState } from "react";
import { MessageCircle, RotateCcw } from "lucide-react";
import axios from "axios";

const credentials = {
  site_url: "http://testingultra.local",
  admin_email: "dev-email@wpengine.local",
  site_name: "testing_ultra",
  username: "shreya",
  app_password: "qZiW WEwj BIxf zhg1 DKz3 gFs6",
};

const Page = () => {
  const [iframeKey, setIframeKey] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [wpStats, setWpStats] = useState(null);
  const [reload, setReload] = useState(false);

  // Conversation & thread management
  const [threadId] = useState(() => `thread-${Date.now()}`);
  const [conversation, setConversation] = useState([
    {
      type: "ai",
      message:
        "👋 Welcome to WordPress AI Assistant!\n\nI can help you manage your WordPress site with natural language commands. Here's what I can do:\n\n• Create and manage pages & posts\n• Handle user management\n• Modify site settings\n• Manage comments and media\n• Style and design changes\n\nJust tell me what you'd like to do!",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const addToConversation = (type, message, images = []) => {
    setConversation((prev) => [
      ...prev,
      {
        type,
        message,
        images,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const fetchWordPressStats = async () => {
    try {
      const response = await fetch("http://localhost:7002/api/wordpress-info");
      const data = await response.json();
      if (data.success) setWpStats(data.data);
    } catch (error) {
      console.error("Failed to fetch WordPress stats:", error);
    }
  };

  const handleSubmitPrompt = async () => {
    if (!prompt.trim()) return;

    setSaving(true);

    const timestamp = new Date().toLocaleTimeString();
    const newUserMessage = { type: "user", message: prompt, timestamp };
    const processingMessage = { type: "ai", message: "Typing...", timestamp };

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

      const response = await fetch("http://localhost:7002/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          conversation: conversationHistory,
          threadId,
          // siteUrl: credentials.site_url,
          // username: credentials.username,
          // applicationPassword: credentials.app_password,
          siteUrl: "http://testing3.local/",
          username: "user",
          accessToken: "CjlrO9ozMUxjaMjXHSHiTBK4dKquzvPO",
        }),
      });

      const data = await response.json();
      console.log(data, "dafjhknm");
      setConversation((prev) => {
        const withoutProcessing = prev.slice(0, -1); // Remove "Typing..."

        if (data.success) {
          const aiResponse =
            typeof data.details === "string"
              ? data.details
              : // : JSON.stringify(data.details, null, 2);
                data?.response;
          // null;

          // Attach images to this AI message if present
          const newAiMessage = {
            type: "ai",
            message: aiResponse || "✅ Done!",
            images: Array.isArray(data.details?.items)
              ? data.details.items
              : [],
            timestamp: new Date().toLocaleTimeString(),
          };

          const updated = [...withoutProcessing, newAiMessage];

          // Optional debug/system messages
          if (data.agentUsed && data.classificationReasoning) {
            updated.push({
              type: "system",
              message: `🤖 Routed to: ${data.agentUsed} | Reason: ${data.classificationReasoning}`,
              timestamp: new Date().toLocaleTimeString(),
            });
          }

          if (data.suggestions?.length > 0) {
            updated.push({
              type: "ai",
              message:
                "💡 Suggestions:\n" +
                data.suggestions.map((s) => `• ${s}`).join("\n"),
              timestamp: new Date().toLocaleTimeString(),
            });
          }

          if (data.refreshNeeded || shouldShowPreview) {
            setShowPreview(true);
            setIframeKey((prev) => prev + 1);
            updated.push({
              type: "ai",
              message: "👁️ Preview updated! Check the preview panel.",
              timestamp: new Date().toLocaleTimeString(),
            });
          }

          if (
            data.action?.includes("create") ||
            data.action?.includes("delete")
          ) {
            fetchWordPressStats();
          }

          return updated;
        } else {
          return [
            ...withoutProcessing,
            {
              type: "ai",
              message: `⚠️ ${data.message || "Something went wrong"}`,
              timestamp: new Date().toLocaleTimeString(),
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
              err.message ||
              "Failed to process your request. Check if the backend server is running."
            }`,
            timestamp: new Date().toLocaleTimeString(),
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
      },
    ]);
  };
  const siteid = sessionStorage.getItem("siteId");
  const siteurl = sessionStorage.getItem("siteurl");
  console.log(siteurl, "siteurl");
  return (
    <div
      className={`duration-200 flex w-full items-center justify-center h-full ${
        reload === false ? "border-transparent gap-2" : "border-transparent"
      }`}
    >
      <div className="w-[70%] h-full border flex items-center justify-center overflow-hidden">
        <iframe
          src={siteurl}
          className="w-full h-full "
          style={{ border: "none" }}
        />
      </div>
      {/* Chatting Area */}
      <div
        className={`duration-200 relative ${
          reload === false
            ? "flex flex-col w-[30%] border p-2 overflow-hidden justify-center h-full relative"
            : "flex flex-col items-center justify-center w-full border p-2 h-full relative"
        }`}
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
                <div className="space-y-4">
                  {conversation.map((msg, idx) => (
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
                        className={`max-w-[85%] p-3 rounded-lg text-sm ${
                          msg.type === "user"
                            ? "bg-purple-800/60 text-white rounded-br-sm"
                            : msg.type === "system"
                            ? "bg-white/10 text-gray-300 rounded text-xs opacity-80"
                            : "bg-white/10 text-gray-100 rounded-bl-sm"
                        }`}
                      >
                        <div className="whitespace-pre-wrap leading-relaxed">
                          {msg.message}
                        </div>

                        {/* Render images per message */}
                        {msg.images?.length > 0 && (
                          <div className="gap-2 grid grid-cols-3 my-2">
                            {msg.images.map((image, i) => (
                              <div key={i} className="flex flex-col gap-2">
                                <img
                                  src={image.source_url}
                                  alt={image.title || "image"}
                                  className="h-50 w-50 object-contain"
                                />
                                {image.date && (
                                  <div className="text-xs opacity-60">
                                    Uploaded:{" "}
                                    {new Date(image.date).toLocaleDateString()}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="text-xs opacity-60 mt-2">
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
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
            <div className="w-[30px] h-[30px] rounded-full bg-white"></div>
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
                : "hover:bg-red-600"
            }`}
          >
            {saving ? "..." : "→"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
