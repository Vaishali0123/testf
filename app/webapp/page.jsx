

"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { ImageIcon, MessageCircle, RotateCcw } from "lucide-react";
import axios from "axios";
import { NEXT_PUBLIC_API } from "../utils/config";
import purpleeffect from "../../public/purpleeffect.svg";
import { IoChatbubbleEllipsesOutline, IoMic } from "react-icons/io5";
import { CiMicrophoneOn } from "react-icons/ci";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setBasicdata } from "../redux/slices/basicDetails";
import { useAuthContext } from "../utils/auth";
import { useSearchParams } from "next/navigation";
import TypingDots from "./components/Typingdots";

// type SpeechRecognitionEvent = Event & {
//   results: SpeechRecognitionResultList;
// };
// interface Message {
//   type: string;
//   // message: object | string ;
//   response: string;
//   timestamp: string;
//   images: ImageData[];
//   message: string;

//   role: string;
//   items: ItemData[];
//   // nextActions:any[];
//   // stepBystep:any[];
// }
// interface ImageData {
//   url: string;
//   title?: string;
//   date?: string | Date;
// }


// interface ItemData {
//   // For images
//   source_url?: string;
//   title?: string;
//   date?: string | Date;
//   // For themes/data
//   name?: string;
//   slug?: string;
//   description?: string;
//   features?: string[];
//   rating?: number;
//   downloads?: string;
//   message?: string;
//   response?: string;
// }
// // Safely render message content that could be a string or an object (e.g., WP REST API with { rendered })
// const renderMessageContent = (message: any): string => {
//   if (message == null) return "";
//   if (typeof message === "string") return message;
//   if (typeof message === "object") {
//     const maybeRendered = (message as any)?.rendered;
//     if (typeof maybeRendered === "string") return maybeRendered;
//     try {
//       return JSON.stringify(message, null, 2);
//     } catch {
//       return String(message);
//     }
//   }
//   return String(message);
// };
const PageContent = () => {
  // Auto-scroll refs (defined early)
  const messagesEndRef = useRef(null);
  const chatScrollContainerRef = useRef(null);
const searchParams = useSearchParams();
  const siteurlquery = searchParams.get("site_url");
  const [siteUrl, setSiteUrl] = useState("");
  const email = "sheeratgupta@gmail.com";
  const {data:authdata}=useAuthContext()
  const [siteid, setSiteid] = useState(sessionStorage.getItem("siteId") || "");
  const [siteurl, setSiteurl] = useState(sessionStorage.getItem("siteurl") || "");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [sitedata,setSitedata]=useState({})
  const dispatch=useDispatch()
  const safeJsonParse = async(input) => {
  // If it's already an object, return it
  if (input === null || input === undefined) return input;
  if (typeof input !== "string") return input;
  try {
    return JSON.parse(input);
  } catch (e) {
    // Not JSON — return original string
    return input;
  }
}
  const normalizeMessage = (msg) => {
    // Handle different message formats based on role
    let parsedMessage = null;
    let displayText = "";
    let items;
    let nextActions;
    let stepByStep;
    
    // For assistant messages, the structured data is in the message field as JSON
    if (msg?.role === "assistant" || msg?.type === "ai") {
      try {
        // Use synchronous JSON parsing instead of async safeJsonParse
        if (typeof msg?.message === "string") {
          parsedMessage = JSON.parse(msg.message);
        } else if (typeof msg?.message === "object") {
          parsedMessage = msg.message;
        }
        
        if (parsedMessage && typeof parsedMessage === "object") {
          displayText = parsedMessage.response || "";
          items = Array.isArray(parsedMessage.items) ? parsedMessage.items : [];
          nextActions = Array.isArray(parsedMessage.nextActions) ? parsedMessage.nextActions : [];
          stepByStep = Array.isArray(parsedMessage.stepByStep) ? parsedMessage.stepByStep : [];
        } else {
          // Fallback if parsing fails
          displayText = typeof msg?.message === "string" ? msg.message : "";
        }
      } catch (e) {
        displayText = typeof msg?.message === "string" ? msg.message : "";
      }
    } else {
      // For user messages, use the message directly
      displayText = typeof msg?.message === "string" ? msg.message : "";
      
      // Also check for existing items/nextActions/stepByStep in the message object
      items = Array.isArray(msg?.items) ? msg.items : [];
      nextActions = Array.isArray(msg?.nextActions) ? msg.nextActions : [];
      stepByStep = Array.isArray(msg?.stepBystep) ? msg.stepBystep : [];
    }

    // Images: from msg.images array
    const imagesArray = Array.isArray(msg?.images) ? msg.images : [];

    return {
      displayText,
      parsedMessage,
      items,
      imagesArray,
      nextActions,
      stepByStep,
    };
  };
// Site details
const getsitedetails=async()=>{
  if(!siteid){
    return
  }
try{
  const res=await axios.get(`${NEXT_PUBLIC_API}/getsite/${siteid}`)

  setSitedata(res?.data?.data)
}
catch(e){
  console.log(e)
}
}
  // console.log(email, "email");
   const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setUploadedImages((prev) => [...prev, ...files]);
  };
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
        email: authdata?.user?.email,
        userId: authdata?.user?.id,
        site_url: cleanUrl,
      });

      // console.log(res?.data?.success);
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

  const [conversation, setConversation] = useState([
    {
      type: "ai",
      message:
        "👋 Welcome to WordPress AI Assistant!\n\nI can help you manage your WordPress site with natural language commands. Here's what I can do:\n\n• Create and manage pages & posts\n• Handle user management\n• Modify site settings\n• Manage comments and media\n• Style and design changes\n\nJust tell me what you'd like to do!",
      response: "👋 Welcome to WordPress AI Assistant!\n\nI can help you manage your WordPress site with natural language commands. Here's what I can do:\n\n• Create and manage pages & posts\n• Handle user management\n• Modify site settings\n• Manage comments and media\n• Style and design changes\n\nJust tell me what you'd like to do!",
      role: "assistant",
      timestamp: new Date().toLocaleTimeString(),
      images: [],
      items: [],
      nextActions: [],
      stepBystep: []
    },
  ]);
   // Auto-scroll effect (after conversation is initialized)
  useEffect(() => {
    try {
      if (chatScrollContainerRef.current) {
        const el = chatScrollContainerRef.current;
        el.scrollTop = el.scrollHeight;
      } else {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } catch {}
  }, [conversation]);

  const handleSubmitPrompt = async () => {
   if (!prompt.trim() && uploadedImages.length === 0) return;

    setSaving(true);

    const timestamp = new Date().toLocaleTimeString();
    const newUserMessage = {
      type: "user",
      message: prompt,
      response: prompt,
      role: "user",
      timestamp,
      images: [],
      items: [],
      nextActions: [],
      stepBystep: []
    };
    const processingMessage = {
      type: "ai",
      message: "Typing...",
      response: "Typing...",
      role: "assistant",
      timestamp,
      images: [],
      items: [],
      nextActions: [],
      stepBystep: []
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
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("threadId", "thread-xyz");
    formData.append("siteUrl", sitedata?.site_url);
    formData.append("username", sitedata?.admin_username);
    formData.append("accessToken", sitedata?.access_token);
    formData.append("projectId", sitedata?._id);

    uploadedImages.forEach((file) => {
      formData.append("images", file);
    });
    try {
      const conversationHistory = conversation
        .filter((msg) => msg.type === "user" || msg.type === "ai")
        .map((msg) => ({
          role: msg.type === "user" ? "user" : "assistant",
          content: msg.message,
        }));

      conversationHistory.push({ role: "user", content: prompt });
 formData.append("conversation", JSON.stringify(conversationHistory));
 const response = await axios.post(
        `${NEXT_PUBLIC_API}/test`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
     
        const data = response.data?.data;
        console.log(response.data?.data,typeof response.data?.data,"response.data?.data")
      setLink(data?.details?.link)
      setData(data);
      setConversation((prev) => {
        const withoutProcessing = prev.slice(0, -1); // Remove "Typing..."
console.log(data,typeof data,"data")
        if (data.success) {
          // Use data.response as primary response, fallback to data.details
          const aiResponse =
            data?.response ??
            (typeof data?.response === "string" ? data.response : JSON.stringify(data.response));

          // const aiResponse =
          //   typeof aiResponseRaw === "string"
          //     ? aiResponseRaw
          //     : (aiResponseRaw && typeof aiResponseRaw === "object" && typeof (aiResponseRaw as any).rendered === "string")
          //     ? (aiResponseRaw as any).rendered
          //     : (() => {
          //         try {
          //           return JSON.stringify(aiResponseRaw);
          //         } catch {
          //           return String(aiResponseRaw);
          //         }
          //       })();

          // Check if details?.items exists and is an array
          const itemsArray = Array.isArray(data?.items) && data.items.length > 0
            ? data.items
            : [];
const nextActions = Array.isArray(data?.nextActions) && data?.nextActions.length > 0
            ? data?.nextActions
            : [];
        const stepByStep = Array.isArray(data?.stepByStep) && data?.stepByStep.length > 0
            ? data?.stepByStep
            : [];
          // Separate images and other items
          const imageItems = itemsArray.filter((item) => item.url);
          const dataItems = itemsArray.filter((item) => !item.url);

          // Attach items to this AI message
          const newAiMessage = {
            type: "ai",
          
            message: aiResponse,
            role: "assistant",
            images: imageItems,
            items: dataItems,
            nextActions: nextActions,
            stepBystep: stepByStep,
            timestamp: new Date().toLocaleTimeString(),
          };

          const updated = [...withoutProcessing, newAiMessage];

          // Optional debug/system messages
          // if (data.agentUsed && data.classificationReasoning) {
          //   updated.push({
          //     type: "system",
          //     response: ` Routed to: ${data.agentUsed} | Reason: ${data.classificationReasoning}`,
          //     timestamp: new Date().toLocaleTimeString(),
          //     images: [],
          //     items: [],
          //      nextActions:[],
          //     stepByStep:[]
          //   });
          // }

          // if (data.suggestions?.length > 0) {
          //   updated.push({
          //     type: "ai",
          //     message:
          //       " Suggestions:\n" +
          //       data.suggestions.map((s: string) => `• ${s}`).join("\n"),
          //     timestamp: new Date().toLocaleTimeString(),
          //     images: [],
          //     items: [],
          //   });
          // }

          // if (data.refreshNeeded || shouldShowPreview) {
          //   setShowPreview(true);
          //   setIframeKey((prev) => prev + 1);
          //   updated.push({
          //     type: "ai",
          //     message: "👁️ Preview updated! Check the preview panel.",
          //     timestamp: new Date().toLocaleTimeString(),
          //     images: [],
          //     items: [],
          //      nextActions:[],
          //     stepByStep:[]
          //   });
          // }

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
              message: `${data?.response || "Server is facing issues.Please try again later."}`,
              timestamp: new Date().toLocaleTimeString(),
              images: [],
              items: [],
              nextActions:[],
              stepByStep:[]
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
            response: `Error: ${
              err ||
              "Failed to process your request. Check if the backend server is running."
            }`,
            timestamp: new Date().toLocaleTimeString(),
            images: [],
            items: [],
            nextActions:[], 
            stepByStep:[]
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
          " Welcome to WordPress AI Assistant!\n\nI can help you manage your WordPress site with natural language commands. Here's what I can do:\n\n• Create and manage pages & posts\n• Handle user management\n• Modify site settings\n• Manage comments and media\n• Style and design changes\n\nJust tell me what you'd like to do!",
        timestamp: new Date().toLocaleTimeString(),
        images: [],
        items: [],
      },
    ]);
  };
  const [link,setLink]=useState("")

  // const siteid = sessionStorage.getItem("siteId");
  // const siteurl = sessionStorage.getItem("siteurl");

  // const [tab, setTab] = useState("tab");
    const tab = useSelector((state) => state.basicDetails.data.tab);
  useEffect(() => {
    getMessages()
    // setTab(sessionStorage.getItem("tab") || "tab");
    // if (typeof window !== "undefined") {
      setSiteid(sessionStorage.getItem("siteId") || "");
      setSiteurl(sessionStorage.getItem("siteurl") || "");
      getsitedetails()
    // }
  }, []);
  const getMessages=async()=>{
   
    if(!siteid){
      return;
    }
      try{
        const res=await axios.get(`${NEXT_PUBLIC_API}/getmessages/${siteid}`);
        // setConversation(res.data.messages)
      
        if(res?.data?.messages?.length>0  )
        // { setConversation((prev) => [...prev, res.data.messages]);}
      {setConversation((prev) => [...prev, ...res.data.messages])}
       
      }
      catch(e){
        console.log(e
        )
      }
  }

  const recognitionRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
   const [isRecording, setIsRecording] = useState(false);
  useEffect(() => {
    setIsLoaded(true);

    // Initialize SpeechRecognition
    const SpeechRecognition =
      (window ).SpeechRecognition ||
      (window ).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  setPrompt(transcript);
};
 recognition.onend = () => {
        setIsRecording(false);
      };
      recognitionRef.current = recognition;
     
    } else {
      console.warn("SpeechRecognition API not supported in this browser");
    }
  }, []);
    const handleMicClick = () => {
       setIsRecording((prev) => !prev);
    if (!recognitionRef.current) return;
    recognitionRef.current.start();
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
        h-full border flex items-center justify-center overflow-hidden`}
      >
        {siteurl ? (
          <iframe
            src={link?link:siteurl}
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
             <button
              onClick={() => {
                window.location.href = "/api/download-plugin";
              }}
              className="px-8 z-20 py-2  mt-2 text-white text-[14px] bg-[#561735] rounded-full"
            >
              Download Webivus Plugin
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
                    {/* <span className="text-sm font-semibold text-gray-300">
                      Conversation (Thread: {threadId.slice(-6)})
                    </span> */}
                  </div>
                  <button
                    onClick={resetConversation}
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Clear conversation"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                <div ref={chatScrollContainerRef} className="h-[100%] p-4 overflow-y-scroll">
                  <div className="space-y-4 ">
                    {conversation.map((msg, idx) => { 
                      const {
    displayText,
    items,
    imagesArray,
    nextActions,
    stepByStep,
  } = normalizeMessage(msg);
    const imageItems = items?.filter((d) => d && (d.url || d.thumbnail));
  // fallback if items don't contain images but msg.images exists
  const extraImages = Array.isArray(imagesArray) ? imagesArray : [];
                      return (
                        <div
                          key={idx}
                          className={`flex ${
                            msg.type === "user" || msg.role === "user"
                              ? "justify-end"
                              : msg.type === "system" || msg.type === "ai" || msg.role === "assistant" || msg.role === "ai" || msg.role === "system"
                              ? "justify-start"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[85%] p-4 rounded-lg text-sm ${
                              msg.type==="user" || msg.role === "user"
                                ? "bg-purple-800/60 text-white rounded-br-sm"
                                : msg.type === "system"
                                ? " text-gray-300 rounded text-xs opacity-80"
                                : "bg-gradient-to-br from-white/5 to-white/10 text-gray-100 rounded-bl-sm "
                            }`}
                          >
                            {/* AI Response Content */}
                            <div className="whitespace-pre-wrap leading-relaxed mb-3">
                         
      {/* Main message area */}
      {msg?.message === "Typing..." ? (
        <div className="flex items-center">
          <TypingDots size={8} color="#888" />
        </div>
      ) : (
        <div>
          {displayText ?? (
            // If there's no textual display value, but msg.message exists as object, render it safely
            typeof msg?.message === "object" ? (
              <pre className="whitespace-pre-wrap text-xs text-gray-300">
                {JSON.stringify(msg.message, null, 2)}
              </pre>
            ) : (
              <span className="text-xs text-gray-300">—</span>
            )
          )}
        </div>
      )}
  {/* {msg.message === "Typing..." ? (
    <div className="flex items-center">
      <TypingDots size={8} color="#888" />
    </div>
  ) : (
    <div>
      {typeof msg.response === "string" 
        ? msg.response 
        : (() => {
              try { 
                return JSON.parse(msg?.message)?.response || msg.message;
              } catch (e) {
                return msg.message;
              }
            })()
      }
    </div>
  )} */}
                            </div>

                            {/* Render images if present */}
                            {(imageItems?.length > 0 || extraImages?.length > 0) && (
        <div className="mt-4 p-3  rounded-lg border border-gray-700/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...imageItems, ...extraImages].map((image, i) => {
              // If image is a raw string URL (rare), handle it
              const url = typeof image === "string" ? image : image.url ?? image.thumbnail;
              const title =
                typeof image === "string"
                  ? ""
                  : image.title || image.name || "";
              const date = typeof image === "string" ? null : image.date;

              if (!url) return null;

              return (
                <div
                  key={i}
                  className="flex flex-col gap-2 p-2 rounded border border-gray-600/30"
                >
                  <img
                    src={url}
                    alt={title || "image"}
                    className="w-full h-32 object-cover rounded"
                    onError={(e) => {
                      // hide broken images rather than show broken icon
                      (e.currentTarget).style.display = "none";
                    }}
                  />
                  <div className="text-xs text-gray-300">
                    {title && (
                      <div
                        className="font-medium truncate"
                        title={title}
                      >
                        {title}
                      </div>
                    )}
                    {date && (
                      <div className="text-gray-400 mt-1">
                        {new Date(date).toDateString()}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

                            {/* Render data items (themes, etc.) if present */}
                            {/* {msg?.items?.length > 0 && (
                              <div className="mt-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                               
                                <div className="space-y-3">
                                  {msg?.items?.map(
                                    (item: ItemData, i: number) => (
                                      <div
                                        key={i}
                                        className="p-3  rounded-lg border border-gray-600/30 hover:bg-gray-700/50 transition-colors"
                                      >
                                    
                                        <div className="flex items-start justify-between mb-2">
                                          <div className="flex-1">
                                            <h4 className="text-sm font-semibold text-white mb-1">
                                              {renderMessageContent(
                                                (item.name as any) ?? (item.title as any) ?? "Item"
                                              )}
                                            </h4>
                                            {JSON.stringify(item)}
                                            {item.slug && (
                                              <p className="text-xs text-gray-400 font-mono">
                                                {renderMessageContent(item.slug as any)}
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

                                        
                                        {item.description && (
                                          <p className="text-xs text-gray-300 mb-2 leading-relaxed">
                                            {renderMessageContent(item.description as any)}
                                          </p>
                                        )}

                                        
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )} */}
                            {items?.length > 0 && !items?.[0]?.url && !items?.[0]?.thumbnail && (
        <div className="mt-4 p-3  rounded-lg border border-gray-700/50">
          <div className="space-y-3">
            {items.map((item, i) => {
              // Already rendered as image above if it had url/thumbnail
              // if (item && (item.url || item.thumbnail)) return null;
              return (
                <div
                  key={i}
                  className="p-3 overflow-x-auto  rounded-lg border border-gray-600/30 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    {/* <div className="flex-1">
                      {typeof item==="object"?(
                         <div className="text-sm font-semibold text-white mb-1">
                        {JSON.stringify(item)}
                      
                      </div>
                      ):(<div className="text-sm font-semibold text-white mb-1">
                        {item}
                      
                      </div>)}
                     
                      {item?.slug && (
                        <p className="text-xs text-gray-400 font-mono">
                          {item.slug}
                        </p>
                      )}
                    </div> */}
                  </div>

                  {/* show full JSON for complex items so devs can inspect */}
                  <div className="text-xs text-gray-300">
                    <pre className="whitespace-pre-wrap">
                      {typeof item === "object" ? JSON.stringify(item, null, 2) : String(item)}
                    </pre>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
                            {/* Steps */}
                            {/* {msg?.message && JSON.parse(msg?.message)?.stepBystep?.length > 0 && (
                              <div className="mt-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                                 <div className="space-y-3">
                                  {JSON.parse(msg?.message)?.stepBystep?.map((step,i)=>(
                                     <div key={i} className="text-xs text-gray-300">
                                       {step}
                                     </div> 
                                  ))}
                                 </div>
                              </div>
                            )} */}
                            {/* Next Actions */}
                            {/* {msg?.message && JSON.parse(msg?.message)?.nextActions?.length > 0 && (
                              <div className="mt-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                                 <div className="space-y-3">
                                  {JSON.parse(msg?.message)?.nextActions?.map((nextAction,i)=>(
                                     <div key={i} className="text-xs text-gray-300">
                                       {nextAction}
                                     </div> 
                                  ))}
                                 </div>
                              </div>
                            )} */}
                            {/* stepByStep */}
      {Array.isArray(stepByStep) && stepByStep?.length > 0 && (
        <div className="mt-4 p-3  rounded-lg border border-gray-700/50">
          <div className="space-y-2">
            {stepByStep.map((s, i) => (
              <div key={i} className="text-xs text-gray-300">
                {typeof s === "string" ? s : JSON.stringify(s)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* nextActions */}
      {Array.isArray(nextActions) && nextActions?.length > 0 && (
        <div className="mt-4 p-3  rounded-lg border border-gray-700/50">
          <div className="space-y-2">
            {nextActions.map((a, i) => (
              <div key={i} className="text-xs text-gray-300">
                {typeof a === "string" ? a : JSON.stringify(a)}
              </div>
            ))}
          </div>
        </div>
      )}
{(msg.type === "user" || msg.role === "user") && (
                              <div className="text-xs opacity-60 mt-3 pt-2 border-t border-gray-600/30">
                                {msg.timestamp}
                              </div>
                            )}
                           
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
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
              <div onClick={handleMicClick}
              // className="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-white"
              className={`relative w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
        isRecording ? "" : ""
      }`}
    
              >
                {isRecording && (
        <span className="absolute w-[40px] h-[40px] rounded-full bg-gray-400 opacity-50 animate-ping"></span>
      )}
                <IoMic size={20}
                //  color={isRecording ? "black" : "white"}
        className="relative z-10 text-white"
                 />
              </div>
              {/* Image upload */}
      <label className="cursor-pointer flex items-center justify-center w-[30px] h-[30px] rounded-full bg-gray-700 hover:bg-gray-600">
        <ImageIcon size={18} className="text-white" />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>
      {/* Uploaded thumbnails */}
      {uploadedImages.length > 0 && (
        <div className="flex gap-2">
          {uploadedImages.map((img, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(img)}
              alt="preview"
              className="w-8 h-8 rounded object-cover border border-gray-500"
            />
          ))}
        </div>
      )}
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
                  ? "bg-white text-black cursor-not-allowed"
                  : "hover:bg-gray-300"
              }`}
            >
              {saving ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}

      {tab === "laptop" && (
        <div
          onClick={() => {
            // setTab("tab");
             dispatch(setBasicdata({ tab: "tab" }));
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
const Page=()=>{
   return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
     <PageContent />
    </Suspense>
  );
}
export default Page;


// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { ImageIcon, MessageCircle, RotateCcw } from "lucide-react";
// import axios from "axios";
// import { NEXT_PUBLIC_API } from "../utils/config";
// import purpleeffect from "../../public/purpleeffect.svg";
// import { IoChatbubbleEllipsesOutline, IoMic } from "react-icons/io5";
// import { CiMicrophoneOn } from "react-icons/ci";
// import Image from "next/image";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../redux/store";
// import { setBasicdata } from "../redux/slices/basicDetails";
// import { useAuthContext } from "../utils/auth";
// import { useSearchParams } from "next/navigation";
// import TypingDots from "./components/Typingdots";


// interface Message {
//   type: string;
//   message;
//   response: string;
//   timestamp: string;
//   images: ImageData[];
//   items[];
//   role: string;
//   nextActions:any[];
//   stepBystep:any[];
// }
// interface ImageData {
//   url: string;
//   title?: string;
//   date?: string | Date;
// }


// interface ItemData {
//   // For images
//   source_url?: string;
//   title?: string;
//   date?: string | Date;
//   // For themes/data
//   name?: string;
//   slug?: string;
//   description?: string;
//   features?: string[];
//   rating?;
//   downloads?: string;
// }
// // Safely render message content that could be a string or an object (e.g., WP REST API with { rendered })
// const renderMessageContent = (message): string => {
//   if (message == null) return "";
//   if (typeof message === "string") return message;
//   if (typeof message === "object") {
//     const maybeRendered = (message as any)?.rendered;
//     if (typeof maybeRendered === "string") return maybeRendered;
//     try {
//       return JSON.stringify(message, null, 2);
//     } catch {
//       return String(message);
//     }
//   }
//   return String(message);
// };
// const Page = () => {
//   // Auto-scroll refs (defined early)
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);
//   const chatScrollContainerRef = useRef<HTMLDivElement | null>(null);
// const searchParams = useSearchParams();
//   const siteurlquery = searchParams.get("site_url");
//   const [siteUrl, setSiteUrl] = useState("");
//   const email = "sheeratgupta@gmail.com";
//   const {data:authdata}=useAuthContext()
//   const [siteid, setSiteid] = useState(sessionStorage.getItem("siteId") || "");
//   const [siteurl, setSiteurl] = useState(sessionStorage.getItem("siteurl") || "");
//   const [uploadedImages, setUploadedImages] = useState<File[]>([]);
//   const [sitedata,setSitedata]=useState({})
//   const dispatch=useDispatch()
//   const safeJsonParse = async(input: any) => {
//   // If it's already an object, return it
//   if (input === null || input === undefined) return input;
//   if (typeof input !== "string") return input;
//   try {
//     return JSON.parse(input);
//   } catch (e) {
//     // Not JSON — return original string
//     return input;
//   }
// }
//   const normalizeMessage = (msg: any) => {
//     // Handle different message formats based on role
//     let parsedMessage = null;
//     let displayText = "";
//     let items: any[] = [];
//     let nextActions: any[] = [];
//     let stepByStep: any[] = [];
    
//     // For assistant messages, the structured data is in the message field as JSON
//     if (msg?.role === "assistant" || msg?.type === "ai") {
//       try {
//         // Use synchronous JSON parsing instead of async safeJsonParse
//         if (typeof msg?.message === "string") {
//           parsedMessage = JSON.parse(msg.message);
//         } else if (typeof msg?.message === "object") {
//           parsedMessage = msg.message;
//         }
        
//         if (parsedMessage && typeof parsedMessage === "object") {
//           displayText = parsedMessage.response || "";
//           items = Array.isArray(parsedMessage.items) ? parsedMessage.items : [];
//           nextActions = Array.isArray(parsedMessage.nextActions) ? parsedMessage.nextActions : [];
//           stepByStep = Array.isArray(parsedMessage.stepByStep) ? parsedMessage.stepByStep : [];
//         } else {
//           // Fallback if parsing fails
//           displayText = typeof msg?.message === "string" ? msg.message : "";
//         }
//       } catch (e) {
//         displayText = typeof msg?.message === "string" ? msg.message : "";
//       }
//     } else {
//       // For user messages, use the message directly
//       displayText = typeof msg?.message === "string" ? msg.message : "";
      
//       // Also check for existing items/nextActions/stepByStep in the message object
//       items = Array.isArray(msg?.items) ? msg.items : [];
//       nextActions = Array.isArray(msg?.nextActions) ? msg.nextActions : [];
//       stepByStep = Array.isArray(msg?.stepBystep) ? msg.stepBystep : [];
//     }

//     // Images: from msg.images array
//     const imagesArray = Array.isArray(msg?.images) ? msg.images : [];

//     return {
//       displayText,
//       parsedMessage,
//       items,
//       imagesArray,
//       nextActions,
//       stepByStep,
//     };
//   };
// // Site details
// const getsitedetails=async()=>{
//   if(!siteid){
//     return
//   }
// try{
//   const res=await axios.get(`${NEXT_PUBLIC_API}/getsite/${siteid}`)

//   setSitedata(res?.data?.data)
// }
// catch(e){
//   console.log(e)
// }
// }
//   // console.log(email, "email");
//    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     setUploadedImages((prev) => [...prev, ...files]);
//   };
//   const handleConnect = async () => {
//     if (!siteUrl) return alert("Please enter a site URL");

//     try {
//       // Ensure protocol exists
//       let formattedUrl = siteUrl.trim();
//       if (!/^https?:\/\//i.test(formattedUrl)) {
//         formattedUrl = "http://" + formattedUrl; // default to http
//       }

//       //  Parse with URL API to always get clean origin
//       const urlObj = new URL(formattedUrl);
//       const cleanUrl = urlObj.origin; // e.g. http://testing3.local

//       // Build plugins page URL
//       const pluginsUrl = `${cleanUrl}/wp-admin/plugins.php`;

//       // Save only clean site_url in DB
//       const res = await axios.post("http://localhost:7002/api/site", {
//         email: authdata?.user?.email,
//         userId: authdata?.user?.id,
//         site_url: cleanUrl,
//       });

//       // console.log(res?.data?.success);
//       if (!res?.data?.success) return alert("Something went wrong");

//       // Open plugins page in new tab
//       window.open(pluginsUrl, "_blank");
//     } catch (err) {
//       console.error(err);
//       alert("Invalid site URL");
//     }
//   };

//   const [iframeKey, setIframeKey] = useState(0);
//   const [prompt, setPrompt] = useState("");
//   const [saving, setSaving] = useState(false);
//   const [showPreview, setShowPreview] = useState(false);

//   const [reload, setReload] = useState(false);
//   const [data, setData] = useState({});
//   // Conversation & thread management

//   const [conversation, setConversation] = useState<Message[]>([
//     {
//       type: "ai",
//       message:
//         "👋 Welcome to WordPress AI Assistant!\n\nI can help you manage your WordPress site with natural language commands. Here's what I can do:\n\n• Create and manage pages & posts\n• Handle user management\n• Modify site settings\n• Manage comments and media\n• Style and design changes\n\nJust tell me what you'd like to do!",
//       response: "👋 Welcome to WordPress AI Assistant!\n\nI can help you manage your WordPress site with natural language commands. Here's what I can do:\n\n• Create and manage pages & posts\n• Handle user management\n• Modify site settings\n• Manage comments and media\n• Style and design changes\n\nJust tell me what you'd like to do!",
//       role: "assistant",
//       timestamp: new Date().toLocaleTimeString(),
//       images: [],
//       items: [],
//       nextActions: [],
//       stepBystep: []
//     },
//   ]);
//    // Auto-scroll effect (after conversation is initialized)
//   useEffect(() => {
//     try {
//       if (chatScrollContainerRef.current) {
//         const el = chatScrollContainerRef.current;
//         el.scrollTop = el.scrollHeight;
//       } else {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//       }
//     } catch {}
//   }, [conversation]);

//   const handleSubmitPrompt = async () => {
//    if (!prompt.trim() && uploadedImages.length === 0) return;

//     setSaving(true);

//     const timestamp = new Date().toLocaleTimeString();
//     const newUserMessage = {
//       type: "user",
//       message: prompt,
//       response: prompt,
//       role: "user",
//       timestamp,
//       images: [],
//       items: [],
//       nextActions: [],
//       stepBystep: []
//     };
//     const processingMessage = {
//       type: "ai",
//       message: "Typing...",
//       response: "Typing...",
//       role: "assistant",
//       timestamp,
//       images: [],
//       items: [],
//       nextActions: [],
//       stepBystep: []
//     };

//     setConversation((prev) => [...prev, newUserMessage, processingMessage]);

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
//     const formData = new FormData();
//     formData.append("prompt", prompt);
//     formData.append("threadId", "thread-xyz");
//     formData.append("siteUrl", sitedata?.site_url);
//     formData.append("username", sitedata?.admin_username);
//     formData.append("accessToken", sitedata?.access_token);
//     formData.append("projectId", sitedata?._id);

//     uploadedImages.forEach((file) => {
//       formData.append("images", file);
//     });
//     try {
//       const conversationHistory = conversation
//         .filter((msg) => msg.type === "user" || msg.type === "ai")
//         .map((msg) => ({
//           role: msg.type === "user" ? "user" : "assistant",
//           content: msg.message,
//         }));

//       conversationHistory.push({ role: "user", content: prompt });
//  formData.append("conversation", JSON.stringify(conversationHistory));
//  const response = await axios.post(
//         `${NEXT_PUBLIC_API}/test`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
     
//         const data = response.data?.data;
//         console.log(response.data?.data,typeof response.data?.data,"response.data?.data")
//       setLink(data?.details?.link)
//       setData(data);
//       setConversation((prev) => {
//         const withoutProcessing = prev.slice(0, -1); // Remove "Typing..."
// console.log(data,typeof data,"data")
//         if (data.success) {
//           // Use data.response as primary response, fallback to data.details
//           const aiResponse =
//             data?.response ??
//             (typeof data?.response === "string" ? data.response : JSON.stringify(data.response));

//           // const aiResponse =
//           //   typeof aiResponseRaw === "string"
//           //     ? aiResponseRaw
//           //     : (aiResponseRaw && typeof aiResponseRaw === "object" && typeof (aiResponseRaw as any).rendered === "string")
//           //     ? (aiResponseRaw as any).rendered
//           //     : (() => {
//           //         try {
//           //           return JSON.stringify(aiResponseRaw);
//           //         } catch {
//           //           return String(aiResponseRaw);
//           //         }
//           //       })();

//           // Check if details?.items exists and is an array
//           const itemsArray = Array.isArray(data?.items) && data.items.length > 0
//             ? data.items
//             : [];
// const nextActions = Array.isArray(data?.nextActions) && data?.nextActions.length > 0
//             ? data?.nextActions
//             : [];
//         const stepByStep = Array.isArray(data?.stepByStep) && data?.stepByStep.length > 0
//             ? data?.stepByStep
//             : [];
//           // Separate images and other items
//           const imageItems = itemsArray.filter((item: any) => item.url);
//           const dataItems = itemsArray.filter((item: any) => !item.url);

//           // Attach items to this AI message
//           const newAiMessage = {
//             type: "ai",
          
//             message: aiResponse,
//             role: "assistant",
//             images: imageItems,
//             items: dataItems,
//             nextActions: nextActions,
//             stepBystep: stepByStep,
//             timestamp: new Date().toLocaleTimeString(),
//           };

//           const updated = [...withoutProcessing, newAiMessage];

//           // Optional debug/system messages
//           // if (data.agentUsed && data.classificationReasoning) {
//           //   updated.push({
//           //     type: "system",
//           //     response: ` Routed to: ${data.agentUsed} | Reason: ${data.classificationReasoning}`,
//           //     timestamp: new Date().toLocaleTimeString(),
//           //     images: [],
//           //     items: [],
//           //      nextActions:[],
//           //     stepByStep:[]
//           //   });
//           // }

//           // if (data.suggestions?.length > 0) {
//           //   updated.push({
//           //     type: "ai",
//           //     message:
//           //       " Suggestions:\n" +
//           //       data.suggestions.map((s: string) => `• ${s}`).join("\n"),
//           //     timestamp: new Date().toLocaleTimeString(),
//           //     images: [],
//           //     items: [],
//           //   });
//           // }

//           // if (data.refreshNeeded || shouldShowPreview) {
//           //   setShowPreview(true);
//           //   setIframeKey((prev) => prev + 1);
//           //   updated.push({
//           //     type: "ai",
//           //     message: "👁️ Preview updated! Check the preview panel.",
//           //     timestamp: new Date().toLocaleTimeString(),
//           //     images: [],
//           //     items: [],
//           //      nextActions:[],
//           //     stepByStep:[]
//           //   });
//           // }

//           // if (
//           //   data.action?.includes("create") ||
//           //   data.action?.includes("delete")
//           // ) {
//           //   fetchWordPressStats();
//           // }

//           return updated;
//         } else {
//           return [
//             ...withoutProcessing,
//             {
//               type: "ai",
//               message: `${data?.response || "Server is facing issues.Please try again later."}`,
//               timestamp: new Date().toLocaleTimeString(),
//               images: [],
//               items: [],
//               nextActions:[],
//               stepByStep:[]
//             },
//           ];
//         }
//       });
//     } catch (err) {
//       console.error("AI error:", err);
//       setConversation((prev) => {
//         const withoutProcessing = prev.slice(0, -1);
//         return [
//           ...withoutProcessing,
//           {
//             type: "ai",
//             response: `Error: ${
//               err ||
//               "Failed to process your request. Check if the backend server is running."
//             }`,
//             timestamp: new Date().toLocaleTimeString(),
//             images: [],
//             items: [],
//             nextActions:[], 
//             stepByStep:[]
//           },
//         ];
//       });
//     }

//     setPrompt("");
//     setSaving(false);
//   };

//   const resetConversation = () => {
//     setConversation([
//       {
//         type: "ai",
//         message:
//           " Welcome to WordPress AI Assistant!\n\nI can help you manage your WordPress site with natural language commands. Here's what I can do:\n\n• Create and manage pages & posts\n• Handle user management\n• Modify site settings\n• Manage comments and media\n• Style and design changes\n\nJust tell me what you'd like to do!",
//         timestamp: new Date().toLocaleTimeString(),
//         images: [],
//         items: [],
//       },
//     ]);
//   };
//   const [link,setLink]=useState("")

//   // const siteid = sessionStorage.getItem("siteId");
//   // const siteurl = sessionStorage.getItem("siteurl");

//   // const [tab, setTab] = useState("tab");
//     const tab = useSelector((state: RootState) => state.basicDetails.data.tab);
//   useEffect(() => {
//     getMessages()
//     // setTab(sessionStorage.getItem("tab") || "tab");
//     // if (typeof window !== "undefined") {
//       setSiteid(sessionStorage.getItem("siteId") || "");
//       setSiteurl(sessionStorage.getItem("siteurl") || "");
//       getsitedetails()
//     // }
//   }, []);
 
//   const getMessages=async()=>{
   
//     if(!siteid){
//       return;
//     }
//       try{
//         const res=await axios.get(`${NEXT_PUBLIC_API}/getmessages/${siteid}`);
//         // setConversation(res.data.messages)
//       console.log(res?.data?.messages,"messages")
//         if(res?.data?.messages?.length>0  )
//         // { setConversation((prev) => [...prev, res.data.messages]);}
//       {setConversation((prev) => [...prev, ...res.data.messages])}
       
//       }
//       catch(e){
//         console.log(e
//         )
//       }
//   }

//   const recognitionRef = useRef(null);
//   // const [isLoaded, setIsLoaded] = useState(false);
//    const [isRecording, setIsRecording] = useState(false);
//   useEffect(() => {
//     // setIsLoaded(true);

//     // Initialize SpeechRecognition
//     const SpeechRecognition =
//       (window as any).SpeechRecognition ||
//       (window as any).webkitSpeechRecognition;
//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition();
//       recognition.lang = "en-US";
//       recognition.interimResults = true;
//       recognition.maxAlternatives = 1;

//       recognition.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         setPrompt(transcript);
       
//       };
//  recognition.onend = () => {
//         setIsRecording(false);
//       };
//       recognitionRef.current = recognition;
     
//     } else {
//       console.warn("SpeechRecognition API not supported in this browser");
//     }
//   }, []);
//     const handleMicClick = () => {
//        setIsRecording((prev) => !prev);
//     if (!recognitionRef.current) return;
//     recognitionRef.current.start();
//   };
//  console.log(conversation,"con")
//   return (
//     <div
//       className={`duration-200  flex w-full items-center justify-center h-full ${
//         reload === false ? "border-transparent gap-2" : "border-transparent"
//       }`}
//     >
//       <div
//         className={`${
//           tab === "tab" && siteurl
//             ? " w-[70%]"
//             : tab === "laptop" || !siteurl
//             ? "w-[100%]"
//             : "w-[30%]"
//         }
//         h-full border flex items-center justify-center overflow-hidden`}
//       >
//         {siteurl ? (
//           <iframe
//             src={link?link:siteurl}
//             className="w-full h-full "
//             style={{ border: "none" }}
//           />
//         ) : (
//           <div className="w-full h-full  flex items-center justify-center flex-col">
//             <Image
//               src={purpleeffect}
//               alt="pic"
//               width={300}
//               height={300}
//               className="absolute top-50 left-50 z-0"
//             />
//             <div
//               className={`duration-100 
//                  text-[#fff] text-[40px]  text-center font-bold
//               `}
//             >
//               Start <span className="text-[#7A7A7A]">out</span> with
//               <span className="text-[#7A7A7A]">out</span> a{" "}
//               <span className="text-[#7A7A7A]">doubt</span>
//             </div>
//             <div className="flex flex-col gap-2 mt-3  items-start">
//               <div
//                 className={`duration-100 
//                   text-[#CACACA] mb-4 font-bold text-center text-[16px]
//               }`}
//               >
//                 Upload to WordPress
//               </div>
//               <div
//                 className="duration-100 
//                   text-[#CACACA]  text-[16px]
//               "
//               >
//                 • Log in to your WordPress Admin.
//               </div>
//               <div
//                 className="duration-100 
//                   text-[#CACACA]  text-[16px]
//               "
//               >
//                 • Go to Plugins → Add New → Upload Plugin
//               </div>
//               <div
//                 className="duration-100 
//                   text-[#CACACA]  text-[16px]
//               "
//               >
//                 • Choose the .zip file and click Install Now.
//               </div>
//             </div>
//             <input
//               value={siteUrl}
//               type="text"
//               onChange={(e) => setSiteUrl(e.target.value)}
//               required
//               placeholder="Site url"
//               className="border-2 z-20 border-[#fff] bg-black outline-none w-[30%]  text-white my-4 p-2 text-[14px] rounded-full"
//             />
           
//             <button
//               onClick={handleConnect}
//               className="px-8 z-20 py-2 text-black text-[14px] bg-white rounded-full"
//             >
//               Connect Webivus to Your Site
//             </button>
//              <button
//               onClick={() => {
//                 window.location.href = "/api/download-plugin";
//               }}
//               className="px-8 z-20 py-2  mt-2 text-white text-[14px] bg-[#561735] rounded-full"
//             >
//               Download Webivus Plugin
//             </button>
//           </div>
//         )}
//       </div>
//       {/* Chatting Area */}
//       {siteurl && (
//         <div
//           className={`duration-200 ${
//             tab === "laptop" ? "hidden" : tab === "tab" ? "w-[30%]" : "w-[70%]"
//           } relative flex flex-col w-[30%] border p-2 overflow-hidden justify-center h-full

//         `}
//         >
//           {/* Conversation Area */}
//           <div
//             className={`${
//               reload === false
//                 ? "h-[calc(100vh-150px)] w-[100%]  items-start justify-start flex "
//                 : "hidden"
//             }`}
//           >
//             {reload === false && (
//               <div className="h-[100%] bg-[#0c0c0c] w-[100%] mt-2 flex flex-col">
//                 <div className="flex items-center justify-between p-3 border-b border-gray-800">
//                   <div className="flex items-center space-x-2">
//                     <MessageCircle size={16} className="text-blue-400" />
//                     {/* <span className="text-sm font-semibold text-gray-300">
//                       Conversation (Thread: {threadId.slice(-6)})
//                     </span> */}
//                   </div>
//                   <button
//                     onClick={resetConversation}
//                     className="text-gray-400 hover:text-white transition-colors"
//                     title="Clear conversation"
//                   >
//                     <RotateCcw size={14} />
//                   </button>
//                 </div>

//                 <div ref={chatScrollContainerRef} className="h-[100%] p-4 overflow-y-scroll">
//                   <div className="space-y-4 ">
//                     {conversation.map((msg: Message, idx) => { 
//                       const {
//     displayText,
//     items,
//     imagesArray,
//     nextActions,
//     stepByStep,
//   } = normalizeMessage(msg);
//     const imageItems = items?.filter((d: any) => d && (d.url || d.thumbnail));
//   // fallback if items don't contain images but msg.images exists
//   const extraImages = Array.isArray(imagesArray) ? imagesArray : [];
//                       return (
//                         <div
//                           key={idx}
//                           className={`flex ${
//                             msg.type === "user" || msg.role === "user"
//                               ? "justify-end"
//                               : msg.type === "system" || msg.type === "ai" || msg.role === "assistant" || msg.role === "ai" || msg.role === "system"
//                               ? "justify-start"
//                               : "justify-start"
//                           }`}
//                         >
//                           <div
//                             className={`max-w-[85%] p-4 rounded-lg text-sm ${
//                               msg.type==="user" || msg.role === "user"
//                                 ? "bg-purple-800/60 text-white rounded-br-sm"
//                                 : msg.type === "system"
//                                 ? " text-gray-300 rounded text-xs opacity-80"
//                                 : "bg-gradient-to-br from-white/5 to-white/10 text-gray-100 rounded-bl-sm "
//                             }`}
//                           >
//                             {/* AI Response Content */}
//                             <div className="whitespace-pre-wrap leading-relaxed mb-3">
                         
//       {/* Main message area */}
//       {msg?.message === "Typing..." ? (
//         <div className="flex items-center">
//           <TypingDots size={8} color="#888" />
//         </div>
//       ) : (
//         <div>
//           {displayText ?? (
//             // If there's no textual display value, but msg.message exists as object, render it safely
//             typeof msg?.message === "object" ? (
//               <pre className="whitespace-pre-wrap text-xs text-gray-300">
//                 {JSON.stringify(msg.message, null, 2)}
//               </pre>
//             ) : (
//               <span className="text-xs text-gray-300">—</span>
//             )
//           )}
//         </div>
//       )}
//   {/* {msg.message === "Typing..." ? (
//     <div className="flex items-center">
//       <TypingDots size={8} color="#888" />
//     </div>
//   ) : (
//     <div>
//       {typeof msg.response === "string" 
//         ? msg.response 
//         : (() => {
//               try { 
//                 return JSON.parse(msg?.message)?.response || msg.message;
//               } catch (e) {
//                 return msg.message;
//               }
//             })()
//       }
//     </div>
//   )} */}
//                             </div>

//                             {/* Render images if present */}
//                             {(imageItems?.length > 0 || extraImages?.length > 0) && (
//         <div className="mt-4 p-3  rounded-lg border border-gray-700/50">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//             {[...imageItems, ...extraImages].map((image: any, i) => {
//               // If image is a raw string URL (rare), handle it
//               const url = typeof image === "string" ? image : image.url ?? image.thumbnail;
//               const title =
//                 typeof image === "string"
//                   ? ""
//                   : image.title || image.name || "";
//               const date = typeof image === "string" ? null : image.date;

//               if (!url) return null;

//               return (
//                 <div
//                   key={i}
//                   className="flex flex-col gap-2 p-2 rounded border border-gray-600/30"
//                 >
//                   <img
//                     src={url}
//                     alt={title || "image"}
//                     className="w-full h-32 object-cover rounded"
//                     onError={(e) => {
//                       // hide broken images rather than show broken icon
//                       (e.currentTarget as HTMLImageElement).style.display = "none";
//                     }}
//                   />
//                   <div className="text-xs text-gray-300">
//                     {title && (
//                       <div
//                         className="font-medium truncate"
//                         title={title}
//                       >
//                         {title}
//                       </div>
//                     )}
//                     {date && (
//                       <div className="text-gray-400 mt-1">
//                         {new Date(date).toDateString()}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//                             {/* Render data items (themes, etc.) if present */}
//                             {/* {msg?.items?.length > 0 && (
//                               <div className="mt-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                               
//                                 <div className="space-y-3">
//                                   {msg?.items?.map(
//                                     (item: ItemData, i: number) => (
//                                       <div
//                                         key={i}
//                                         className="p-3  rounded-lg border border-gray-600/30 hover:bg-gray-700/50 transition-colors"
//                                       >
                                    
//                                         <div className="flex items-start justify-between mb-2">
//                                           <div className="flex-1">
//                                             <h4 className="text-sm font-semibold text-white mb-1">
//                                               {renderMessageContent(
//                                                 (item.name as any) ?? (item.title as any) ?? "Item"
//                                               )}
//                                             </h4>
//                                             {JSON.stringify(item)}
//                                             {item.slug && (
//                                               <p className="text-xs text-gray-400 font-mono">
//                                                 {renderMessageContent(item.slug as any)}
//                                               </p>
//                                             )}
//                                           </div>
//                                           {item.rating && (
//                                             <div className="flex items-center gap-1 text-xs text-yellow-400">
//                                               <span>⭐</span>
//                                               <span>{item.rating}</span>
//                                             </div>
//                                           )}
//                                         </div>

                                        
//                                         {item.description && (
//                                           <p className="text-xs text-gray-300 mb-2 leading-relaxed">
//                                             {renderMessageContent(item.description as any)}
//                                           </p>
//                                         )}

                                        
//                                       </div>
//                                     )
//                                   )}
//                                 </div>
//                               </div>
//                             )} */}
//                             {items?.length > 0 && !items?.[0]?.url && !items?.[0]?.thumbnail && (
//         <div className="mt-4 p-3  rounded-lg border border-gray-700/50">
//           <div className="space-y-3">
//             {items.map((item: any, i: number) => {
//               // Already rendered as image above if it had url/thumbnail
//               // if (item && (item.url || item.thumbnail)) return null;
//               return (
//                 <div
//                   key={i}
//                   className="p-3 overflow-x-auto  rounded-lg border border-gray-600/30 hover:bg-gray-700/50 transition-colors"
//                 >
//                   <div className="flex items-start justify-between mb-2">
//                     {/* <div className="flex-1">
//                       {typeof item==="object"?(
//                          <div className="text-sm font-semibold text-white mb-1">
//                         {JSON.stringify(item)}
                      
//                       </div>
//                       ):(<div className="text-sm font-semibold text-white mb-1">
//                         {item}
                      
//                       </div>)}
                     
//                       {item?.slug && (
//                         <p className="text-xs text-gray-400 font-mono">
//                           {item.slug}
//                         </p>
//                       )}
//                     </div> */}
//                   </div>

//                   {/* show full JSON for complex items so devs can inspect */}
//                   <div className="text-xs text-gray-300">
//                     <pre className="whitespace-pre-wrap">
//                       {typeof item === "object" ? JSON.stringify(item, null, 2) : String(item)}
//                     </pre>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//                             {/* Steps */}
//                             {/* {msg?.message && JSON.parse(msg?.message)?.stepBystep?.length > 0 && (
//                               <div className="mt-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
//                                  <div className="space-y-3">
//                                   {JSON.parse(msg?.message)?.stepBystep?.map((step,i)=>(
//                                      <div key={i} className="text-xs text-gray-300">
//                                        {step}
//                                      </div> 
//                                   ))}
//                                  </div>
//                               </div>
//                             )} */}
//                             {/* Next Actions */}
//                             {/* {msg?.message && JSON.parse(msg?.message)?.nextActions?.length > 0 && (
//                               <div className="mt-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
//                                  <div className="space-y-3">
//                                   {JSON.parse(msg?.message)?.nextActions?.map((nextAction,i)=>(
//                                      <div key={i} className="text-xs text-gray-300">
//                                        {nextAction}
//                                      </div> 
//                                   ))}
//                                  </div>
//                               </div>
//                             )} */}
//                             {/* stepByStep */}
//       {Array.isArray(stepByStep) && stepByStep?.length > 0 && (
//         <div className="mt-4 p-3  rounded-lg border border-gray-700/50">
//           <div className="space-y-2">
//             {stepByStep.map((s: any, i: number) => (
//               <div key={i} className="text-xs text-gray-300">
//                 {typeof s === "string" ? s : JSON.stringify(s)}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* nextActions */}
//       {Array.isArray(nextActions) && nextActions?.length > 0 && (
//         <div className="mt-4 p-3  rounded-lg border border-gray-700/50">
//           <div className="space-y-2">
//             {nextActions.map((a: any, i: number) => (
//               <div key={i} className="text-xs text-gray-300">
//                 {typeof a === "string" ? a : JSON.stringify(a)}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
// {(msg.type === "user" || msg.role === "user") && (
//                               <div className="text-xs opacity-60 mt-3 pt-2 border-t border-gray-600/30">
//                                 {msg.timestamp}
//                               </div>
//                             )}
                           
//                           </div>
//                         </div>
//                       );
//                     })}
//                     <div ref={messagesEndRef} />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Input Area */}
//           <div
//             className={`duration-200 z-10 ${
//               reload === false
//                 ? "text-[#626262] gap-2 flex items-center p-2 mt-4 h-[40px] w-[100%] rounded-full border border-[#373737] bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#73737326] text-center text-[16px]"
//                 : "text-[#626262] gap-2 flex items-center w-[20%] p-2 mt-4 h-[40px] rounded-full border border-[#373737] bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#73737322] text-center text-[16px]"
//             }`}
//           >
//             <div className="flex items-center gap-2 w-full ">
//               <div onClick={handleMicClick}
//               // className="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-white"
//               className={`relative w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
//         isRecording ? "" : ""
//       }`}
    
//               >
//                 {isRecording && (
//         <span className="absolute w-[40px] h-[40px] rounded-full bg-gray-400 opacity-50 animate-ping"></span>
//       )}
//                 <IoMic size={20}
//                 //  color={isRecording ? "black" : "white"}
//         className="relative z-10 text-white"
//                  />
//               </div>
//               {/* Image upload */}
//       {/* <label className="cursor-pointer flex items-center justify-center w-[30px] h-[30px] rounded-full bg-gray-700 hover:bg-gray-600">
//         <ImageIcon size={18} className="text-white" />
//         <input
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleImageUpload}
//           className="hidden"
//         />
//       </label> */}
//       {/* Uploaded thumbnails */}
//       {uploadedImages.length > 0 && (
//         <div className="flex gap-2">
//           {uploadedImages.map((img, idx) => (
//             <img
//               key={idx}
//               src={URL.createObjectURL(img)}
//               alt="preview"
//               className="w-8 h-8 rounded object-cover border border-gray-500"
//             />
//           ))}
//         </div>
//       )}
//               <input
//                 value={prompt}
//                 onChange={(e) => setPrompt(e.target.value)}
//                 onKeyPress={(e) => {
//                   if (e.key === "Enter" && !saving) handleSubmitPrompt();
//                 }}
//                 placeholder="Enter command"
//                 className="text-[#fff] outline-none text-[14px] bg-transparent h-full flex-1"
//                 disabled={saving}
//               />
//             </div>
//             <button
//               onClick={handleSubmitPrompt}
//               disabled={saving || !prompt.trim()}
//               className={` h-full text-[12px] font-semibold px-2 rounded-full transition-colors ${
//                 saving || !prompt.trim()
//                   ? "bg-white text-black cursor-not-allowed"
//                   : "hover:bg-white/80"
//               }`}
//             >
//               {saving ? "..." : "Send"}
//             </button>
//           </div>
//         </div>
//       )}

//       {tab === "laptop" && (
//         <div
//           onClick={() => {
//             // setTab("tab");
//              dispatch(setBasicdata({ tab: "tab" }));
//             sessionStorage.setItem("tab", "tab");
//           }}
//           className="bg-black rounded-full p-2 absolute bottom-10 right-2 flex items-center justify-center"
//         >
//           <IoChatbubbleEllipsesOutline color="white" size={25} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;
