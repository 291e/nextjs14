import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <>
      <div className="w-full h-px bg-neutral-500" />
      <div className="flex flex-col gap-3">
        <Link
          className="btn-meta flex h-10 items-center justify-center gap-2"
          href="/github/start"
        >
          <span>
            <FaGithub className="size-6" />
          </span>
          <span>Continue with GitHub</span>
        </Link>
        <Link
          className="btn-meta flex h-10 items-center justify-center gap-2"
          href="/sms"
        >
          <span className="size-6">💬</span>
          <span>Continue with SMS</span>
        </Link>
      </div>
    </>
  );
}
