"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { ImageIcon, MessageCircle, RotateCcw } from "lucide-react";
import axios from "axios";
import { NEXT_PUBLIC_API } from "../utils/config";
import purpleeffect from "../../public/purpleeffect.svg";
import { IoChatbubbleEllipsesOutline, IoMic } from "react-icons/io5";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setBasicdata } from "../redux/slices/basicDetails";
import { useAuthContext } from "../utils/auth";
import { useSearchParams } from "next/navigation";
import TypingDots from "./components/Typingdots";
import { BsSend } from "react-icons/bs";
import Bg from "../../public/flowbg.png";
import { FaAnglesLeft } from "react-icons/fa6";
import { GoWorkflow } from "react-icons/go";
import { CgWebsite } from "react-icons/cg";
import { PiMonitor } from "react-icons/pi";
import { FiExternalLink, FiUser } from "react-icons/fi";
import { MdAspectRatio } from "react-icons/md";
import Logo from "../../public/Logo.png";
import { FaWordpress } from "react-icons/fa";
import { useContext } from "react";
import { GuideContext } from "./contexts/GuideContext";

// Type definitions
interface Message {
  type: "user" | "ai" | "system";
  role: "user" | "assistant" | "system";
  message: string;
  response: string;
  timestamp: string;
  images: ImageData[];
  items: unknown[];
  nextActions: string[];
  stepBystep: string[];
}

interface ImageData {
  url?: string;
  thumbnail?: string;
  source_url?: string;
  title?: string;
  name?: string;
  date?: string | Date;
}

interface SiteData {
  site_url?: string;
  admin_username?: string;
  access_token?: string;
  _id?: string;
}

interface AuthData {
  email?: string;
  _id?: string;
  user?: {
    email?: string;
    id?: string;
    _id?: string;
    username?: string;
    dp?: string;
    name?: string;
  };
}

interface BackendResponse {
  success?: boolean;
  response?: string | unknown;
  items?: unknown[];
  nextActions?: string[];
  stepByStep?: string[];
  images?: ImageData[];
  details?: {
    link?: string;
  };
  link?: string;
  agentUsed?: string;
  classificationReasoning?: string;
  suggestions?: string[];
  refreshNeeded?: boolean;
}

interface NormalizedMessage {
  displayText: string;
  parsedMessage: unknown;
  items: unknown[];
  imagesArray: ImageData[];
  nextActions: string[];
  stepByStep: string[];
}

// Extend Window interface for Speech Recognition
declare global {
  interface Window {
    SpeechRecognition: new () => {
      lang: string;
      interimResults: boolean;
      maxAlternatives: number;
      start: () => void;
      onresult:
        | ((event: {
            results: {
              [index: number]: { [index: number]: { transcript: string } };
            };
          }) => void)
        | null;
      onend: (() => void) | null;
    };
    webkitSpeechRecognition: new () => {
      lang: string;
      interimResults: boolean;
      maxAlternatives: number;
      start: () => void;
      onresult:
        | ((event: {
            results: {
              [index: number]: { [index: number]: { transcript: string } };
            };
          }) => void)
        | null;
      onend: (() => void) | null;
    };
  }
}

// Standardized message interface
const createMessage = (overrides: Partial<Message> = {}): Message => ({
  type: "ai", // "user" | "ai" | "system"
  role: "assistant", // "user" | "assistant" | "system"
  message: "",
  response: "",
  timestamp: new Date().toLocaleTimeString(),
  images: [],
  items: [],
  nextActions: [],
  stepBystep: [],
  ...overrides,
});

// Utility function to safely extract text content
const extractTextContent = (content: unknown): string => {
  if (content == null) return "";
  if (typeof content === "string") return content;
  if (typeof content === "object" && content !== null) {
    const obj = content as Record<string, unknown>;
    // Handle WordPress rendered content
    if (obj.rendered && typeof obj.rendered === "string") {
      return obj.rendered;
    }
    // Handle response field
    if (obj.response && typeof obj.response === "string") {
      return obj.response;
    }
    // Fallback to JSON stringify
    try {
      return JSON.stringify(content, null, 2);
    } catch {
      return String(content);
    }
  }
  return String(content);
};

// Utility function to normalize backend response data
const normalizeBackendResponse = (
  data: BackendResponse | null
): BackendResponse | null => {
  if (!data) return null;

  return {
    success: data.success || false,
    response: extractTextContent(data.response),
    items: Array.isArray(data.items) ? data.items : [],
    nextActions: Array.isArray(data.nextActions) ? data.nextActions : [],
    stepByStep: Array.isArray(data.stepByStep) ? data.stepByStep : [],
    images: Array.isArray(data.images) ? data.images : [],
    link: data.details?.link || data.link || "",
    // Additional fields can be added here
    agentUsed: data.agentUsed,
    classificationReasoning: data.classificationReasoning,
    suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
    refreshNeeded: data.refreshNeeded || false,
  };
};
const PageContent = () => {
  const [siteTab, setSitetab] = useState("website");
  const [layoutMode, setLayoutMode] = useState<
    "default" | "fullscreen" | "chat-focused"
  >("default");
  // Auto-scroll refs (defined early)
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatScrollContainerRef = useRef<HTMLDivElement>(null);
  const workflowButtonRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const siteurlquery = searchParams.get("site_url");
  const [siteUrl, setSiteUrl] = useState("");
  const email = "sheeratgupta@gmail.com";
  const { data: authdata } = useAuthContext() as { data: AuthData };

  // Safely get guide context (may not exist if page is used outside GuideProvider)
  const guideContext = useContext(GuideContext);
  const contextWorkflowRef = guideContext?.workflowButtonRef;

  const [siteid, setSiteid] = useState("");
  const [siteurl, setSiteurl] = useState("");

  // Connect workflow button ref to context (only if context exists)
  useEffect(() => {
    if (contextWorkflowRef && workflowButtonRef.current) {
      contextWorkflowRef.current = workflowButtonRef.current;
    }
  }, [contextWorkflowRef]);

  // Initialize siteid and siteurl from sessionStorage on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSiteid(sessionStorage.getItem("siteId") || "");
      setSiteurl(sessionStorage.getItem("siteurl") || "");
    }
  }, []);

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [sitedata, setSitedata] = useState<SiteData>({});
  const dispatch = useDispatch();

  const normalizeMessage = (msg: Message): NormalizedMessage => {
    if (!msg) {
      return {
        displayText: "",
        parsedMessage: null,
        items: [],
        imagesArray: [],
        nextActions: [],
        stepByStep: [],
      };
    }

    // Initialize with default values
    let displayText = "";
    let items = [];
    let nextActions = [];
    let stepByStep = [];
    let imagesArray = [];
    let parsedMessage = null;

    // Extract text content based on message type
    if (msg?.role === "assistant" || msg?.type === "ai") {
      // For AI messages, try to parse structured data
      try {
        if (typeof msg?.message === "string") {
          // Try to parse as JSON first
          try {
            parsedMessage = JSON.parse(msg.message);
            if (parsedMessage && typeof parsedMessage === "object") {
              displayText = extractTextContent(
                parsedMessage.response || parsedMessage.message
              );
              items = Array.isArray(parsedMessage.items)
                ? parsedMessage.items
                : [];
              nextActions = Array.isArray(parsedMessage.nextActions)
                ? parsedMessage.nextActions
                : [];
              stepByStep = Array.isArray(parsedMessage.stepByStep)
                ? parsedMessage.stepByStep
                : [];
            } else {
              displayText = msg.message;
            }
          } catch {
            // If JSON parsing fails, treat as plain text
            displayText = msg.message;
          }
        } else if (typeof msg?.message === "object") {
          parsedMessage = msg.message as Record<string, unknown>;
          displayText = extractTextContent(
            (parsedMessage as Record<string, unknown>)?.response ||
              (parsedMessage as Record<string, unknown>)?.message
          );
          items = Array.isArray(
            (parsedMessage as Record<string, unknown>)?.items
          )
            ? ((parsedMessage as Record<string, unknown>).items as unknown[])
            : [];
          nextActions = Array.isArray(
            (parsedMessage as Record<string, unknown>)?.nextActions
          )
            ? ((parsedMessage as Record<string, unknown>)
                .nextActions as string[])
            : [];
          stepByStep = Array.isArray(
            (parsedMessage as Record<string, unknown>)?.stepByStep
          )
            ? ((parsedMessage as Record<string, unknown>)
                .stepByStep as string[])
            : [];
        } else {
          displayText = extractTextContent(msg?.message);
        }
      } catch (e) {
        displayText = extractTextContent(msg?.message);
      }
    } else {
      // For user messages, use the message directly
      displayText = extractTextContent(msg?.message);
    }

    // Extract arrays from message object (fallback for direct properties)
    if (!parsedMessage) {
      items = Array.isArray(msg?.items) ? msg.items : [];
      nextActions = Array.isArray(msg?.nextActions) ? msg.nextActions : [];
      stepByStep = Array.isArray(msg?.stepBystep) ? msg.stepBystep : [];
    }

    // Extract images from various possible locations
    imagesArray = Array.isArray(msg?.images) ? msg.images : [];

    // Separate images from items
    const imageItems = items.filter(
      (item: unknown) =>
        item &&
        typeof item === "object" &&
        item !== null &&
        ((item as Record<string, unknown>).url ||
          (item as Record<string, unknown>).thumbnail ||
          (item as Record<string, unknown>).source_url)
    );
    const dataItems = items.filter(
      (item: unknown) =>
        item &&
        typeof item === "object" &&
        item !== null &&
        !(
          (item as Record<string, unknown>).url ||
          (item as Record<string, unknown>).thumbnail ||
          (item as Record<string, unknown>).source_url
        )
    );

    return {
      displayText,
      parsedMessage,
      items: dataItems,
      imagesArray: [...imagesArray, ...imageItems],
      nextActions,
      stepByStep,
    };
  };
  // Site details
  const getsitedetails = async () => {
    if (!siteid) {
      return;
    }
    try {
      const res = await axios.get(`${NEXT_PUBLIC_API}/getsite/${siteid}`);

      setSitedata(res?.data?.data);
    } catch (e) {
      console.log(e);
    }
  };
  // console.log(email, "email");
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const res = await axios.post(`${NEXT_PUBLIC_API}/site`, {
        email: authdata?.user?.email ? authdata?.user?.email : authdata?.email,
        userId: authdata?.user?._id ? authdata?.user?._id : authdata?._id,
        site_url: cleanUrl,
      });

      if (res?.data?.success) {
        if (res?.data?.site?.status === "active") {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("siteId", res?.data?.site?._id);
            sessionStorage.setItem("siteurl", res?.data?.site?.site_url);
          }
        }
      }
      // console.log(res?.data?.success);
      if (!res?.data?.success) return alert("Something went wrong");

      // Open plugins page in new tab
      window.open(pluginsUrl, "_blank");
    } catch (err) {
      console.error(err);
      alert("Invalid site URL");
    }
  };

  const [prompt, setPrompt] = useState("");
  const [saving, setSaving] = useState(false);

  const [reload, setReload] = useState(false);
  const [data, setData] = useState<Record<string, unknown>>({});
  // Conversation & thread management

  const [conversation, setConversation] = useState<Message[]>([
    createMessage({
      type: "ai",
      role: "assistant",
      message:
        "👋 Welcome to WordPress AI Assistant!\n\nI can help you manage your WordPress site with natural language commands. Here's what I can do:\n\n• Create and manage pages & posts\n• Handle user management\n• Modify site settings\n• Manage comments and media\n• Style and design changes\n\nJust tell me what you'd like to do!",
      timestamp: new Date().toLocaleTimeString(),
    }),
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

    // Create standardized user message
    const newUserMessage = createMessage({
      type: "user",
      role: "user",
      message: prompt,
      response: prompt,
      timestamp: new Date().toLocaleTimeString(),
    });

    // Create processing message
    const processingMessage = createMessage({
      type: "ai",
      role: "assistant",
      message: "Typing...",
      response: "Typing...",
      timestamp: new Date().toLocaleTimeString(),
    });

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
    formData.append("siteUrl", sitedata?.site_url || "");
    formData.append("username", sitedata?.admin_username || "");
    formData.append("accessToken", sitedata?.access_token || "");
    formData.append("projectId", sitedata?._id || "");

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
      const response = await axios.post(`${NEXT_PUBLIC_API}/test`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const rawData = response.data?.data;

      // Normalize the backend response
      const normalizedData = normalizeBackendResponse(rawData);
      setLink(normalizedData?.link || "");
      setData(rawData as Record<string, unknown>);
      setConversation((prev) => {
        const withoutProcessing = prev.slice(0, -1); // Remove "Typing..."

        if (normalizedData?.success) {
          // Create standardized AI message
          const newAiMessage = createMessage({
            type: "ai",
            role: "assistant",
            message: String(normalizedData.response || ""),
            response: String(normalizedData.response || ""),
            images: normalizedData.images,
            items: normalizedData.items,
            nextActions: normalizedData.nextActions,
            stepBystep: normalizedData.stepByStep,
            timestamp: new Date().toLocaleTimeString(),
          });

          const updated = [...withoutProcessing, newAiMessage];

          // Add optional system messages
          if (
            normalizedData.agentUsed &&
            normalizedData.classificationReasoning
          ) {
            updated.push(
              createMessage({
                type: "system",
                role: "system",
                message: `🤖 Routed to: ${normalizedData.agentUsed} | Reason: ${normalizedData.classificationReasoning}`,
                timestamp: new Date().toLocaleTimeString(),
              })
            );
          }

          if (
            normalizedData.suggestions &&
            normalizedData.suggestions.length > 0
          ) {
            updated.push(
              createMessage({
                type: "ai",
                role: "assistant",
                message:
                  "💡 Suggestions:\n" +
                  normalizedData.suggestions
                    .map((s: string) => `• ${s}`)
                    .join("\n"),
                timestamp: new Date().toLocaleTimeString(),
              })
            );
          }

          if (normalizedData.refreshNeeded || shouldShowPreview) {
            updated.push(
              createMessage({
                type: "ai",
                role: "assistant",
                message: "👁️ Preview updated! Check the preview panel.",
                timestamp: new Date().toLocaleTimeString(),
              })
            );
          }

          return updated;
        } else {
          // Handle error case
          return [
            ...withoutProcessing,
            createMessage({
              type: "ai",
              role: "assistant",
              message:
                String(normalizedData?.response || "") ||
                "Server is facing issues. Please try again later.",
              items: normalizedData?.items || [],
              nextActions: normalizedData?.nextActions || [],
              stepBystep: normalizedData?.stepByStep || [],
              timestamp: new Date().toLocaleTimeString(),
            }),
          ];
        }
      });
    } catch (err) {
      setConversation((prev) => {
        const withoutProcessing = prev.slice(0, -1);
        return [
          ...withoutProcessing,
          createMessage({
            type: "ai",
            role: "assistant",
            message: `Error: ${
              (err as Error)?.message ||
              "Failed to process your request. Check if the backend server is running."
            }`,
            timestamp: new Date().toLocaleTimeString(),
          }),
        ];
      });
    }

    setPrompt("");
    setSaving(false);
  };

  const resetConversation = () => {
    setConversation([
      createMessage({
        type: "ai",
        role: "assistant",
        message:
          "👋 Welcome to WordPress AI Assistant!\n\nI can help you manage your WordPress site with natural language commands. Here's what I can do:\n\n• Create and manage pages & posts\n• Handle user management\n• Modify site settings\n• Manage comments and media\n• Style and design changes\n\nJust tell me what you'd like to do!",
        timestamp: new Date().toLocaleTimeString(),
      }),
    ]);
  };
  const [link, setLink] = useState("");

  // const siteid = sessionStorage.getItem("siteId");
  // const siteurl = sessionStorage.getItem("siteurl");

  // const [tab, setTab] = useState("tab");
  const tab = useSelector((state: RootState) => state.basicDetails.data.tab);
  useEffect(() => {
    getMessages();
    // Only access sessionStorage on client side
    if (typeof window !== "undefined") {
      setSiteid(sessionStorage.getItem("siteId") || "");
      setSiteurl(sessionStorage.getItem("siteurl") || "");
    }
    getsitedetails();
  }, []);
  const getMessages = async () => {
    if (!siteid) {
      return;
    }
    try {
      const res = await axios.get(`${NEXT_PUBLIC_API}/getmessages/${siteid}`);
      // setConversation(res.data.messages)

      if (res?.data?.messages?.length > 0) {
        // { setConversation((prev) => [...prev, res.data.messages]);}

        setConversation((prev) => [...prev, ...res.data.messages]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const recognitionRef = useRef<{
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
    start: () => void;
    onresult:
      | ((event: {
          results: {
            [index: number]: { [index: number]: { transcript: string } };
          };
        }) => void)
      | null;
    onend: (() => void) | null;
  } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  //  For sound recognition
  useEffect(() => {
    setIsLoaded(true);

    // Initialize SpeechRecognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: {
        results: {
          [index: number]: { [index: number]: { transcript: string } };
        };
      }) => {
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
      className={`duration-200 flex-col sm:flex-row-reverse p-2 flex  w-full items-center justify-center h-full ${
        reload === false ? "border-transparent gap-2" : "border-transparent"
      }`}
    >
      <div
        style={{
          backgroundImage: `url(${Bg.src})`,
          backgroundPosition: "top",
          backgroundRepeat: "repeat",
        }}
        className={`${
          layoutMode === "fullscreen"
            ? "w-[100%]"
            : layoutMode === "chat-focused"
            ? "w-[30%]"
            : tab === "tab" && siteurl
            ? " w-[70%]"
            : tab === "laptop" || !siteurl
            ? "w-[100%]"
            : "w-[30%]"
        }
        ${!siteurl ? "h-screen sm:h-full" : "h-full"} ${
          siteurl ? "pn:max-sm:hidden" : ""
        } border border-[#ffffff10]   bg-contain bg-[#2c2d3061] flex flex-col rounded-2xl items-center justify-center overflow-hidden`}
      >
        <div className="h-[40px]   w-full bg-[#2C2D30] flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <FaAnglesLeft
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => {
                // Cycle through: default -> fullscreen -> chat-focused -> default
                if (layoutMode === "default") {
                  setLayoutMode("fullscreen");
                } else if (layoutMode === "fullscreen") {
                  setLayoutMode("chat-focused");
                } else {
                  setLayoutMode("default");
                }
              }}
            />
            <div className="text-[12px] bg-[#1C1C1C] text-white border-2 border-[#1C1C1C] flex items-center rounded-full">
              <div
                onClick={() => setSitetab("website")}
                className={`px-2 py-1 flex gap-2   ${
                  siteTab === "website" && " bg-white text-black"
                }  items-center rounded-full`}
              >
                <CgWebsite />
                Website
              </div>
              <div
                ref={workflowButtonRef}
                onClick={() => setSitetab("workflow")}
                className={`px-2 py-1 flex gap-2  items-center ${
                  siteTab === "workflow" && " bg-white text-black"
                }    rounded-full`}
              >
                <GoWorkflow />
                <div> Workflow </div>
              </div>
            </div>
          </div>
          <div className="flex  items-center gap-4">
            <div
              className="text-[14px] font-bold cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => {
                // Cycle through: default -> fullscreen -> chat-focused -> default
                if (layoutMode === "default") {
                  setLayoutMode("fullscreen");
                } else if (layoutMode === "fullscreen") {
                  setLayoutMode("chat-focused");
                } else {
                  setLayoutMode("default");
                }
              }}
            >
              <MdAspectRatio />
            </div>
            <FiExternalLink
              className={`cursor-pointer hover:opacity-80 transition-opacity ${
                !siteurl ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                if (siteurl) {
                  const urlToOpen = link || siteurl;
                  window.open(urlToOpen, "_blank", "noopener,noreferrer");
                }
              }}
            />
          </div>
        </div>
        {siteTab === "website" ? (
          siteurl ? (
            <iframe
              src={link ? link : siteurl}
              className="w-full h-full "
              style={{ border: "none" }}
            />
          ) : (
            <div className="w-full  h-full flex items-center justify-center flex-col p-4">
              <div
                className={`duration-100 
                 text-[#fff] text-[40px]  text-center font-bold
              `}
              ></div>
              <div className="flex flex-col gap-3 mt-3  items-start w-full max-w-xl">
                <div
                  className="duration-100 
                    text-[#CACACA] text-sm sm:text-[16px]
              "
                >
                  • Install Webivus Plugin
                </div>
                <button
                  onClick={() => {
                    window.location.href = "/api/download-plugin";
                  }}
                  className="px-4 sm:px-8 z-20 py-2 hover:opacity-[80%] items-center justify-center transition-opacity font-semibold mt-2 text-black text-xs sm:text-[14px] bg-[#fff] rounded-xl flex flex-row gap-2"
                >
                  Install Webivus for{" "}
                  <FaWordpress
                    size={20}
                    className="sm:w-6 sm:h-6"
                    color="#01579B"
                  />
                </button>
                <div
                  className="duration-100 
                    text-[#CACACA] text-sm sm:text-[16px]
              "
                >
                  • Log in to your WordPress Admin.
                </div>
                <input
                  value={siteUrl}
                  type="text"
                  onChange={(e) => setSiteUrl(e.target.value)}
                  required
                  placeholder="Enter Website URL"
                  className="z-20 border-l-2 border-[#A7A0F8] bg-transparent outline-none w-full sm:max-w-[80%] text-white my-4 p-2 text-sm sm:text-[18px] font-semibold"
                />
                <button
                  onClick={handleConnect}
                  className="px-4 sm:px-8 z-20 hover:opacity-[80%] w-full sm:w-auto sm:min-w-[30%] items-center justify-center transition-opacity py-2 text-black text-xs sm:text-[14px] bg-white rounded-xl space-x-2 font-semibold flex gap-2 flex-row"
                >
                  Connect{" "}
                  <span>
                    <FaWordpress
                      size={20}
                      className="sm:w-6 sm:h-6"
                      color="#01579B"
                    />
                  </span>
                </button>
                <div
                  className="duration-100 
                    text-[#CACACA] text-sm sm:text-[16px]
                "
                >
                  • Go to Plugins → Add New → Upload Webivus Plugin
                </div>
                <div
                  className="duration-100 
                    text-[#CACACA] text-sm sm:text-[16px]
                "
                >
                  • Choose the .zip file and click Install Now.
                </div>
              </div>
            </div>
          )
        ) : (
          // PRD SEction
          <div className="w-full h-full">{/* Fetch streamMessages  */}</div>
        )}
      </div>
      {/* Chatting Area */}
      {siteurl && layoutMode !== "fullscreen" && (
        <div
          className={`duration-200 ${
            tab === "laptop"
              ? "hidden"
              : layoutMode === "chat-focused"
              ? "w-[100%] sm:w-[70%]"
              : tab === "tab"
              ? "w-[100%] sm:w-[30%]"
              : "w-[70%]"
          } relative flex flex-col  overflow-hidden h-full

        `}
        >
          {/* Conversation Area */}
          <div
            className={`${
              reload === false
                ? "h-[calc(100vh-150px)]  w-[100%] items-start justify-start flex "
                : "hidden"
            }`}
          >
            {reload === false && (
              <div className="h-[100%] w-[100%] flex flex-col">
                <div
                  ref={chatScrollContainerRef}
                  className="h-[100%] p-4 overflow-y-scroll"
                >
                  <div className="space-y-6 ">
                    {conversation.map((msg, idx) => {
                      const {
                        displayText,
                        items,
                        imagesArray,
                        nextActions,
                        stepByStep,
                      } = normalizeMessage(msg);
                      const imageItems = items?.filter(
                        (d: unknown) =>
                          d &&
                          typeof d === "object" &&
                          d !== null &&
                          ((d as Record<string, unknown>).url ||
                            (d as Record<string, unknown>).thumbnail)
                      );
                      // fallback if items don't contain images but msg.images exists
                      const extraImages = Array.isArray(imagesArray)
                        ? imagesArray
                        : [];

                      // Generate dummy date for messages
                      const getDummyDate = () => {
                        if (msg.type === "user" || msg.role === "user") {
                          return "02:22 AM";
                        } else {
                          return "Oct 17, 2025, 5:22 PM";
                        }
                      };

                      const isUserMessage =
                        msg.type === "user" || msg.role === "user";

                      return (
                        <div
                          key={idx}
                          className={`flex ${
                            isUserMessage
                              ? "justify-end items-end"
                              : "justify-start items-start"
                          } gap-3`}
                        >
                          {/* Avatar/Logo for AI messages (left side) */}
                          {!isUserMessage && msg.type !== "system" && (
                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-[#2c2d30] border border-[#ffffff10] flex items-center justify-center">
                              <Image
                                src={Logo}
                                alt="Webivus"
                                width={40}
                                height={40}
                                className="w-full h-full object-contain p-1"
                              />
                            </div>
                          )}

                          <div
                            className={`flex flex-col ${
                              isUserMessage ? "items-end" : "items-start"
                            } max-w-[75%] sm:max-w-[80%]`}
                          >
                            {/* Date and sender name */}
                            <div
                              className={`flex items-center gap-2 mb-1 px-2 ${
                                isUserMessage ? "flex-row-reverse" : ""
                              }`}
                            >
                              <span className="text-xs text-gray-400">
                                {getDummyDate()}
                              </span>
                              <span className="text-xs text-gray-500">
                                {isUserMessage ? "You" : "Webivus"}
                              </span>
                            </div>

                            {/* Message bubble */}
                            <div
                              className={`flex items-start gap-2 ${
                                isUserMessage ? "flex-row-reverse" : ""
                              }`}
                            >
                              {/* Avatar for user messages (right side) */}
                              {isUserMessage && (
                                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#2c2d30] border border-[#ffffff10] flex items-center justify-center">
                                  <FiUser className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400" />
                                </div>
                              )}

                              <div
                                className={`p-3 sm:p-4 rounded-2xl text-sm ${
                                  isUserMessage
                                    ? "bg-gradient-to-br from-[#7B1459] via-[#7D2B62] to-[#72147B] text-white rounded-tr-sm"
                                    : msg.type === "system"
                                    ? "bg-[#2c2d30] text-gray-300 rounded-lg text-xs opacity-80"
                                    : "bg-[#2c2d30] text-gray-100 rounded-tl-sm border border-[#ffffff05]"
                                }`}
                              >
                                {/* Message Content */}
                                <div className="whitespace-pre-wrap leading-relaxed">
                                  {/* Main message area */}
                                  {msg?.message === "Typing..." ? (
                                    <div className="flex items-center">
                                      <TypingDots size={8} color="#888" />
                                    </div>
                                  ) : (
                                    <div>
                                      {displayText ??
                                        // If there's no textual display value, but msg.message exists as object, render it safely
                                        (typeof msg?.message === "object" ? (
                                          <pre className="whitespace-pre-wrap bg-red-800 text-xs text-gray-300">
                                            {JSON.stringify(
                                              msg.message,
                                              null,
                                              2
                                            )}
                                          </pre>
                                        ) : (
                                          <span className="text-xs text-gray-300">
                                            —
                                          </span>
                                        ))}
                                    </div>
                                  )}
                                </div>

                                {/* Render images if present */}
                                {(imageItems?.length > 0 ||
                                  extraImages?.length > 0) && (
                                  <div className="mt-4 p-3 rounded-lg border border-gray-700/50">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                      {[...imageItems, ...extraImages].map(
                                        (image, i) => {
                                          // If image is a raw string URL (rare), handle it
                                          const url =
                                            typeof image === "string"
                                              ? image
                                              : String(
                                                  (
                                                    image as Record<
                                                      string,
                                                      unknown
                                                    >
                                                  )?.url ??
                                                    (
                                                      image as Record<
                                                        string,
                                                        unknown
                                                      >
                                                    )?.thumbnail ??
                                                    ""
                                                );
                                          const title =
                                            typeof image === "string"
                                              ? ""
                                              : String(
                                                  (
                                                    image as Record<
                                                      string,
                                                      unknown
                                                    >
                                                  )?.title ||
                                                    (
                                                      image as Record<
                                                        string,
                                                        unknown
                                                      >
                                                    )?.name ||
                                                    ""
                                                );
                                          const date =
                                            typeof image === "string"
                                              ? null
                                              : ((
                                                  image as Record<
                                                    string,
                                                    unknown
                                                  >
                                                )?.date as string | null);

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
                                                  e.currentTarget.style.display =
                                                    "none";
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
                                                    {new Date(
                                                      String(date)
                                                    ).toDateString()}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}
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
                                {items?.length > 0 &&
                                  !(items?.[0] as Record<string, unknown>)
                                    ?.url &&
                                  !(items?.[0] as Record<string, unknown>)
                                    ?.thumbnail && (
                                    <div className="mt-4 p-3 rounded-lg border border-gray-700/50">
                                      <div className="space-y-3">
                                        {items.map(
                                          (item: unknown, i: number) => {
                                            // Already rendered as image above if it had url/thumbnail
                                            // if (item && (item.url || item.thumbnail)) return null;
                                            return (
                                              <div
                                                key={i}
                                                className="p-3 overflow-x-auto rounded-lg border border-gray-600/30 hover:bg-gray-700/50 transition-colors"
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
                                                    {typeof item === "object"
                                                      ? JSON.stringify(
                                                          item,
                                                          null,
                                                          2
                                                        )
                                                      : String(item)}
                                                  </pre>
                                                </div>
                                              </div>
                                            );
                                          }
                                        )}
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
                                {Array.isArray(stepByStep) &&
                                  stepByStep?.length > 0 && (
                                    <div>
                                      <div
                                        className={`text-sm mt-4 font-semibold mb-1 ${
                                          isUserMessage
                                            ? "text-white"
                                            : "text-white"
                                        }`}
                                      >
                                        Steps :
                                      </div>
                                      <div className="p-3 rounded-lg border border-gray-700/50">
                                        <div className="space-y-2">
                                          {stepByStep.map(
                                            (s: string, i: number) => (
                                              <div
                                                key={i}
                                                className="text-xs text-gray-300"
                                              >
                                                {typeof s === "string"
                                                  ? s
                                                  : JSON.stringify(s)}
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                {/* nextActions */}
                                {Array.isArray(nextActions) &&
                                  nextActions?.length > 0 && (
                                    <div>
                                      <div
                                        className={`text-sm mt-4 font-semibold mb-1 ${
                                          isUserMessage
                                            ? "text-white"
                                            : "text-white"
                                        }`}
                                      >
                                        Next Actions :
                                      </div>
                                      <div className="p-3 rounded-lg border border-gray-700/50">
                                        <div className="space-y-2">
                                          {nextActions.map(
                                            (a: string, i: number) => (
                                              <div
                                                key={i}
                                                className="text-xs text-gray-300"
                                              >
                                                {typeof a === "string"
                                                  ? a
                                                  : JSON.stringify(a)}
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </div>
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
            className={`duration-200 absolute bottom-0 z-10 ${
              reload === false
                ? "text-[#626262] gap-2 flex items-end p-2 mt-4  w-[100%] rounded-2xl border border-[#ffffff26] bg-[#2f323a] text-center text-[16px]"
                : "text-[#626262] gap-2 flex items-end w-[20%] p-2 mt-4  rounded-2xl border border-[#ffffff26] bg-[#2f323a] text-center text-[16px]"
            }`}
          >
            <div className="flex items-center gap-2 w-full ">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !saving) handleSubmitPrompt();
                }}
                placeholder="Just Type & Watch It Build...."
                className="text-[#fff] outline-none text-[14px] bg-transparent h-full flex-1"
                disabled={saving}
              />
            </div>
            <div
              onClick={handleMicClick}
              // className="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-white"
              className={`relative w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                isRecording ? "" : ""
              }`}
            >
              {isRecording && (
                <span className="absolute w-[40px] h-[40px] rounded-full bg-gray-400 opacity-50 animate-ping"></span>
              )}
              <IoMic
                size={20}
                //  color={isRecording ? "black" : "white"}
                className="relative z-10 text-white"
              />
            </div>
            {/* Image upload */}
            <label className="cursor-pointer flex items-center justify-center w-[30px] h-[30px] rounded-full ">
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
            <button
              onClick={handleSubmitPrompt}
              disabled={saving || !prompt.trim()}
              className={`h-[30px]  w-[40px] rounded-xl flex items-center justify-center transition-colors ${
                saving || !prompt.trim()
                  ? "bg-white text-black cursor-not-allowed"
                  : "hover:bg-gray-300"
              }`}
            >
              {saving ? "..." : <BsSend />}
            </button>
          </div>
        </div>
      )}

      {/* {tab === "laptop" && (
        <div
          onClick={() => {
            // setTab("tab");
            dispatch(setBasicdata({ tab: "tab" }));
            if (typeof window !== "undefined") {
              sessionStorage.setItem("tab", "tab");
            }
          }}
          className="bg-black rounded-full p-2 absolute bottom-10 right-2 flex items-center justify-center"
        >
          <IoChatbubbleEllipsesOutline color="white" size={25} />
        </div>
      )} */}
    </div>
  );
};
const Page = () => {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <PageContent />
    </Suspense>
  );
};
export default Page;
