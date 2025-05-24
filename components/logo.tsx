import type React from "react"
export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="6" y="14" width="52" height="36" rx="4" stroke="currentColor" strokeWidth="4" />
      <path d="M16 26L16 38" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M24 22L24 42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 18L32 46" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M40 22L40 42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M48 26L48 38" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="32" cy="32" r="20" fill="currentColor" fillOpacity="0.1" />
    </svg>
  )
}
