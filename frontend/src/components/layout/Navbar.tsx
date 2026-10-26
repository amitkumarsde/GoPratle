"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/constants/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/">
          <Image src="/logo.svg" alt="GoPratle" width={123} height={32} className="h-7 w-auto" unoptimized />
        </Link>
        <div className="flex gap-4">
          {NAV_LINKS.map((link) => {
            // "/posts" should stay active on detail pages like "/posts/123"
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium ${isActive ? "text-brand" : "text-gray-600 hover:text-ink"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
