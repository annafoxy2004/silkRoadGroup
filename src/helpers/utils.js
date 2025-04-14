// import { clsx } from "clsx"
// import { twMerge } from "tailwind-merge"

// // Функция для объединения классов (Tailwind)
// export function cn(...inputs) {
//   return twMerge(clsx(inputs))
// }

// // Объединение нескольких ref
// export function mergeRefs(...inputRefs) {
//   const filteredInputRefs = inputRefs.filter(Boolean)

//   if (filteredInputRefs.length <= 1) {
//     return filteredInputRefs[0] || null
//   }

//   return function mergedRefs(ref) {
//     for (const inputRef of filteredInputRefs) {
//       if (typeof inputRef === "function") {
//         inputRef(ref)
//       } else if (inputRef) {
//         inputRef.current = ref
//       }
//     }
//   }
// }

// // Преобразование объекта в query string
// export function objectToQueryString(obj) {
//   return Object.keys(obj)
//     .map((key) => {
//       if (Array.isArray(obj[key])) {
//         return obj[key]
//           .map((item, index) =>
//             Object.keys(item)
//               .map((subKey) =>
//                 `FIELDS[${key}][${index}][${subKey}]=${encodeURIComponent(item[subKey])}`
//               )
//               .join("&")
//           )
//           .join("&")
//       } else if (typeof obj[key] === "object") {
//         return Object.keys(obj[key])
//           .map((subKey) =>
//             `FIELDS[${key}][${subKey}]=${encodeURIComponent(obj[key][subKey])}`
//           )
//           .join("&")
//       } else {
//         return `FIELDS[${key}]=${encodeURIComponent(obj[key])}`
//       }
//     })
//     .join("&")
// }
