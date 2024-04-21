"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { usePathname, useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

import { Providers } from "./provider";

const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    session: any;
  };
}) {
  const [isSession, setIsSession] = useState<boolean>(false);

  // fetch localstorage data
  const router = useRouter();
  const pathname = usePathname();

  const getUser = async () => {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (
      sessionError ||
      (session === null &&
        pathname != "/register" &&
        pathname != "/forgot-password")
    ) {
      router.push("/login");
    }

    if (
      session &&
      (pathname == "/" || pathname == "/register" || pathname == "/login")
    ) {
      router.push("/dashboard");
    }

    if (sessionError && pathname == "/") {
      router.push("/login");
    }

    console.log("layout", session);
    params.session = session;
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
