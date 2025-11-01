// "use client";

// import { useState } from "react";

// interface Credentials {
//   url: string;
//   email: string;
//   password: string;
// }

// interface CredentialsModalProps {
//   onSubmit: (credentials: Credentials) => void;
//   onCancel: () => void;
// }

// export function CredentialsModal({
//   onSubmit,
//   onCancel,
// }: CredentialsModalProps) {
//   const [credentials, setCredentials] = useState<Credentials>({
//     url: "",
//     email: "",
//     password: "",
//   });

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//       <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
//         <h2 className="text-lg font-semibold mb-4 text-gray-800">
//           🔐 Enter WordPress Credentials
//         </h2>
//         <div className="space-y-3">
//           <input
//             type="url"
//             placeholder="WordPress Site URL (e.g., https://example.com)"
//             className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={credentials.url}
//             onChange={(e) =>
//               setCredentials({ ...credentials, url: e.target.value })
//             }
//           />
//           <input
//             type="email"
//             placeholder="Admin Email"
//             className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={credentials.email}
//             onChange={(e) =>
//               setCredentials({ ...credentials, email: e.target.value })
//             }
//           />
//           <input
//             type="password"
//             placeholder="Admin Password"
//             className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={credentials.password}
//             onChange={(e) =>
//               setCredentials({ ...credentials, password: e.target.value })
//             }
//           />
//         </div>
//         <div className="flex justify-end gap-2 mt-4">
//           <button
//             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//             onClick={onCancel}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//             onClick={() => onSubmit(credentials)}
//             disabled={
//               !credentials.url || !credentials.email || !credentials.password
//             }
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
