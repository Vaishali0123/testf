// "use client";

// import { useState } from "react";

// interface PageDetails {
//   title: string;
//   content?: string;
//   generate_content?: boolean;
//   content_type?: string;
//   page_slug?: string;
// }

// interface PageDetailsModalProps {
//   onSubmit: (details: PageDetails) => void;
//   onCancel: () => void;
//   suggestions: string[];
//   suggestAutoGenerate: boolean;
// }

// export function PageDetailsModal({
//   onSubmit,
//   onCancel,
//   suggestions,
//   suggestAutoGenerate,
// }: PageDetailsModalProps) {
//   const [details, setDetails] = useState<PageDetails>({
//     title: "",
//     content: "",
//     generate_content: false,
//     content_type: "general",
//   });

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//       <div className="bg-white rounded-lg p-6 w-96 shadow-lg max-h-[80vh] overflow-y-auto">
//         <h2 className="text-lg font-semibold mb-4 text-gray-800">
//           📝 Page Details
//         </h2>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Page Title *
//             </label>
//             <input
//               type="text"
//               placeholder="Enter page title"
//               className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={details.title}
//               onChange={(e) =>
//                 setDetails({ ...details, title: e.target.value })
//               }
//             />
//           </div>

//           {suggestAutoGenerate && (
//             <div className="bg-blue-50 p-3 rounded-lg">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={details.generate_content}
//                   onChange={(e) =>
//                     setDetails({
//                       ...details,
//                       generate_content: e.target.checked,
//                     })
//                   }
//                   className="rounded"
//                 />
//                 <span className="text-sm font-medium text-blue-800">
//                   🤖 Generate content automatically
//                 </span>
//               </label>
//             </div>
//           )}

//           {details.generate_content && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Content Type
//               </label>
//               <select
//                 className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={details.content_type}
//                 onChange={(e) =>
//                   setDetails({ ...details, content_type: e.target.value })
//                 }
//               >
//                 <option value="general">General</option>
//                 <option value="business">Business</option>
//                 <option value="blog">Blog</option>
//                 <option value="landing">Landing Page</option>
//                 <option value="about">About Us</option>
//                 <option value="contact">Contact</option>
//               </select>
//             </div>
//           )}

//           {!details.generate_content && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Page Content
//               </label>
//               <textarea
//                 placeholder="Enter page content (HTML supported)"
//                 className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
//                 value={details.content}
//                 onChange={(e) =>
//                   setDetails({ ...details, content: e.target.value })
//                 }
//               />
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Page Slug (optional)
//             </label>
//             <input
//               type="text"
//               placeholder="page-url-slug"
//               className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={details.page_slug || ""}
//               onChange={(e) =>
//                 setDetails({ ...details, page_slug: e.target.value })
//               }
//             />
//           </div>

//           {suggestions.length > 0 && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Suggestions
//               </label>
//               <div className="flex flex-wrap gap-2">
//                 {suggestions.map((suggestion, index) => (
//                   <button
//                     key={index}
//                     className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
//                     onClick={() => {
//                       if (suggestion.includes("Generate")) {
//                         setDetails({ ...details, generate_content: true });
//                       } else {
//                         setDetails({ ...details, generate_content: false });
//                       }
//                     }}
//                   >
//                     {suggestion}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex justify-end gap-2 mt-6">
//           <button
//             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//             onClick={onCancel}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//             onClick={() => onSubmit(details)}
//             disabled={!details.title}
//           >
//             Create Page
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
