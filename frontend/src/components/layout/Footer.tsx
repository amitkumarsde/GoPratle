import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/constants/navigation";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Image src="/logo.svg" alt="GoPratle" width={92} height={24} className="h-6 w-auto" unoptimized />
          <p className="mt-2 text-sm text-gray-500">Post event requirements for planners, performers and crew.</p>
        </div>

        <div className="flex gap-6 text-sm text-gray-600">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand">
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <p className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">© GoPratle. All rights reserved.</p>
    </footer>
  );
}
