"use client";

import { CubeIcon as SolidCube } from "@heroicons/react/24/solid";
import { CubeTransparentIcon as OutlineCube } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-5 border-neutral-600 border-t px-5 py-3 *:text-white bg-neutral-800">
      <Link href="/home" className="flex flex-col items-center gap-px">
        {pathname === "/home" ? (
          <SolidCube className="size-7" />
        ) : (
          <OutlineCube className="size-7" />
        )}
        <span>meta360</span>
      </Link>
      <Link href="/life" className="flex flex-col items-center gap-px">
        {pathname === "/life" ? (
          <SolidCube className="size-7" />
        ) : (
          <OutlineCube className="size-7" />
        )}
        <span>solution</span>
      </Link>
      <Link href="/chat" className="flex flex-col items-center gap-px">
        {pathname === "/chat" ? (
          <SolidCube className="size-7" />
        ) : (
          <OutlineCube className="size-7" />
        )}
        <span>pricing</span>
      </Link>
      <Link href="/live" className="flex flex-col items-center gap-px">
        {pathname === "/live" ? (
          <SolidCube className="size-7" />
        ) : (
          <OutlineCube className="size-7" />
        )}
        <span>help</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        {pathname === "/profile" ? (
          <SolidCube className="size-7" />
        ) : (
          <OutlineCube className="size-7" />
        )}
        <span>partner</span>
      </Link>
    </div>
  );
}
