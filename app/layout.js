import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Zeko Ai",
  description: "Ai Interview Platform by Myways.ai",
};

export default function RootLayout({ children }) {
  return (
    
      <html lang="en">

        <body className={inter.className}>
        

          <Toaster />
          {children}
          
        </body>
      </html>
 
  );
}
