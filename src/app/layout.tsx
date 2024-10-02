import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "danielmcgrath.xyz",
  description: "Daniel McGrath's personal website",
};

const SidebarLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <a href={href} className="w-100 w-32 p-4 text-2xl">
      {children}
    </a>
  );
};

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 hidden h-full w-60 items-center bg-gray-light p-4 sm:flex sm:flex-col">
      <Image src="/assets/logo-medium.png" alt="Logo" width={90} height={0} />
      <nav className="flex flex-col items-center p-4">
        <SidebarLink href="/">Home</SidebarLink>
        <SidebarLink href="/projects">Projects</SidebarLink>
        <SidebarLink href="/blog">Blog</SidebarLink>
        <SidebarLink href="/about">About</SidebarLink>
        <SidebarLink href="/contact">Contact</SidebarLink>
      </nav>
    </div>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar />
        <main className="p-10 sm:ml-60">{children}</main>
      </body>
    </html>
  );
}
