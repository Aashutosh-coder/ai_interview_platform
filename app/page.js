"use client"; // This marks the component as a Client Component
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use 'next/navigation' instead of 'next/router'
import Interview from "./interview/page"
export default function Home() {
   
  return(
    <>
    <Interview/>
    </>
  )
}
