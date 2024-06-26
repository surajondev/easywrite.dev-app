"use client";

import "../globals.css";
import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });
import Sidebar from "@/app/dashboard/Sidebar";

const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Sidebar>{children}</Sidebar>;
}
