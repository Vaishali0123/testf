// "use client";

// import WordPressViewer from "./components/WordPressViewer";

// export default function WordPressViewerPage() {
//   // Use proxy to bypass X-Frame-Options - try login page first
//   const proxyUrl =
//     "http://localhost:7002/api/proxy?url=" +
//     encodeURIComponent("http://test20.local/wp-login.php");

//   return (
//     <div className="h-screen w-screen">
//       <iframe
//         src={proxyUrl}
//         className="w-full h-screen border-0"
//         title="WordPress Admin"
//         sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-modals allow-storage-access-by-user-activation"
//         allow="fullscreen; camera; microphone; geolocation"
//         referrerPolicy="strict-origin-when-cross-origin"
//       />
//     </div>
//   );
// }
import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page