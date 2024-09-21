import type { Metadata } from "next";
import "@/app/globals.css";
import { Noto_Sans as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { getServerSession } from "next-auth";
import UserContextProvider from "@/context/UserContextProvider";
import { getUserData } from "@/app/_actions/users";
import SessionProvider from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Share Wallet",
  description:
    "Share Wallet is a web application designed to help you keep track of shared expenses. Built using Next.js, Share Wallet simplifies the process of managing and splitting bills among friends, family, or roommates.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  const user = await getUserData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div>
          <UserContextProvider user={user}>
            <ThemeProvider>
              <SessionProvider session={session}>
                <Navbar />
                {children}
              </SessionProvider>
            </ThemeProvider>
          </UserContextProvider>
        </div>
      </body>
    </html>
  );
}
