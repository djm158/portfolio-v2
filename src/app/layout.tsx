import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
    <a href={href} className="p-4 w-100 w-32 text-2xl">
      {children}
    </a>
  );
};

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-60 bg-gray-light p-4 hidden sm:block">
      <nav className="flex flex-col p-4 items-center">
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
    <body className={inter.className}>
      <Sidebar />
      <div className="sm:ml-60">{children}</div>
    </body>
  );
}
