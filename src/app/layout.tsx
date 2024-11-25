import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Toaster } from "@/components/ui/toaster";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import Providers from "@/lib/Providers";
import DynamicUserButton from "./DynamicUserButton";
import { BurgerIcon } from "@/components/ui/icons";
import NavLinks from "./NavLinks";
import { DialogTitle } from "@radix-ui/react-dialog";
import Link from "next/link";
import Feedback from "./feedback";

export const metadata: Metadata = {
  title: "Smart Sportoviska Petrzalka",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers>
          <TRPCReactProvider>
            <div className="h-lvh">
              <nav className="flex h-[15%] items-center justify-between bg-dark-blue px-3 py-6">
                <Link href={"/"}>
                  <h1 className="text-lg text-white">Petržalka</h1>
                </Link>
                <div className="sm:hidden">
                  <Drawer>
                    <DrawerTrigger>
                      <BurgerIcon size={20} className="text-white" />
                    </DrawerTrigger>
                    <DrawerContent className="gap-2 bg-dark-blue">
                      <DialogTitle></DialogTitle>
                      <div className="flex flex-col bg-dark-blue">
                        <NavLinks />
                      </div>
                    </DrawerContent>
                  </Drawer>
                </div>
                <DynamicUserButton />
              </nav>
              <main className="h-[85%]">{children}</main>
            </div>
            <Feedback />
          </TRPCReactProvider>
        </Providers>
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
