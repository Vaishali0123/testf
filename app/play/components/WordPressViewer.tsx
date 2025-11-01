// "use client";

// import { useState, useRef, useEffect } from "react";

// interface WordPressViewerProps {
//   initialUrl?: string;
// }

// export default function WordPressViewer({
//   initialUrl = "http://test20.local/wp-admin/options-general.php",
// }: WordPressViewerProps) {
//   const [url, setUrl] = useState(initialUrl);
//   const [proxiedUrl, setProxiedUrl] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const iframeRef = useRef<HTMLIFrameElement>(null);

//   // Initialize proxied URL on component mount
//   useEffect(() => {
//     if (initialUrl) {
//       handleUrlChange(initialUrl);
//     }
//   }, [initialUrl]);

//   const handleUrlChange = (newUrl: string) => {
//     setUrl(newUrl);
//     setError(null);
//     setLoading(true);

//     // Create proxied URL to bypass CORS and X-Frame-Options
//     const encodedUrl = encodeURIComponent(newUrl);
//     const proxyUrl = `http://localhost:7002/api/proxy?url=${encodedUrl}`;
//     setProxiedUrl(proxyUrl);
//   };

//   const handleIframeLoad = () => {
//     setLoading(false);
//     setError(null);
//   };

//   const handleIframeError = () => {
//     setLoading(false);
//     setError(
//       "Failed to load the WordPress site. This might be due to X-Frame-Options restrictions or the site not being accessible."
//     );
//   };

//   const openInNewTab = () => {
//     window.open(url, "_blank");
//   };

//   const commonWordPressUrls = [
//     "http://test20.local/wp-admin/options-general.php",
//     "http://test20.local/wp-admin/",
//     "http://test20.local/wp-admin/post-new.php",
//     "http://test20.local/wp-admin/edit.php",
//     "http://localhost:8080/wp-admin/",
//     "http://localhost:8888/test-site/wp-admin/",
//   ];

//   return (
//     <div className="w-full h-screen flex flex-col bg-gray-100">
//       {/* Header with URL input */}
//       <div className="bg-white shadow-sm border-b p-4">
//         <div className="flex items-center gap-4">
//           <div className="flex-1">
//             <input
//               type="text"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//               placeholder="Enter WordPress admin URL"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <button
//             onClick={() => handleUrlChange(url)}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Load
//           </button>
//           <button
//             onClick={openInNewTab}
//             className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//           >
//             Open in New Tab
//           </button>
//         </div>

//         {/* Quick URL buttons */}
//         <div className="mt-3 flex flex-wrap gap-2">
//           <span className="text-sm text-gray-600">Quick links:</span>
//           {commonWordPressUrls.map((quickUrl, index) => (
//             <button
//               key={index}
//               onClick={() => handleUrlChange(quickUrl)}
//               className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
//             >
//               {quickUrl.includes("test20.local")
//                 ? "Test20"
//                 : quickUrl.includes("localhost:8080")
//                 ? "Local:8080"
//                 : quickUrl.includes("localhost:8888")
//                 ? "Local:8888"
//                 : "WordPress"}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Error message */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 p-4 m-4 rounded-lg">
//           <div className="flex items-center">
//             <div className="text-red-600">
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <div className="ml-3">
//               <h3 className="text-sm font-medium text-red-800">
//                 Cannot display WordPress site
//               </h3>
//               <p className="text-sm text-red-700 mt-1">{error}</p>
//               <div className="mt-2">
//                 <button
//                   onClick={openInNewTab}
//                   className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200"
//                 >
//                   Open in New Tab Instead
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Loading indicator */}
//       {loading && (
//         <div className="flex items-center justify-center p-8">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <span className="ml-2 text-gray-600">Loading WordPress site...</span>
//         </div>
//       )}

//       {/* Iframe container */}
//       <div className="flex-1 relative">
//         <iframe
//           ref={iframeRef}
//           src={proxiedUrl || url}
//           className="w-full h-full border-0"
//           title="WordPress Admin"
//           onLoad={handleIframeLoad}
//           onError={handleIframeError}
//           sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-modals"
//         />
//       </div>

//       {/* Footer with instructions */}
//       <div className="bg-gray-50 border-t p-4">
//         <div className="text-sm text-gray-600">
//           <p>
//             <strong>Note:</strong> If you see an error above, it's likely due to
//             X-Frame-Options restrictions. Click "Open in New Tab" to view the
//             WordPress admin directly.
//           </p>
//           <p className="mt-1">
//             <strong>Setup:</strong> Make sure you have a local WordPress site
//             running (test20.local, localhost:8080, or localhost:8888).
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
