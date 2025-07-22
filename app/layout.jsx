import Link from "next/link";
import "./globals.css";
import { ReactNode } from "react";
import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/authOptions"; // authOptions 경로에 맞게 수정

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions); // ✅ await + authOptions 필요

  return (
    <html lang="en">
      <head />
      <body>
        <div className="navbar">
          <Link href="/" className="logo">
            Appleforum
          </Link>
          <Link href="/write">Write</Link>
          <Link href="/list">List</Link>
          {session ? null : <Link href="/register">Register</Link>}
          {session ? <LogoutBtn /> : <LoginBtn />} {/* ✅ 정확한 조건 */}
        </div>
        {children}
      </body>
    </html>
  );
}
