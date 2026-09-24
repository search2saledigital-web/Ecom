import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/main/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Get Grow Mart",
  description: "Get Grow Mart - Your online shopping destination",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}