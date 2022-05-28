import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row mb-5 gap-5 md:gap-10 font-semibold text-xl md:text-3xl">
      <Link href={`/dashboard`}>
        <a
          className={`hover:text-blue-500 ${
            router.pathname == "/dashboard" ? "text-blue-700" : ""
          }`}
        >
          Beranda
        </a>
      </Link>
      <Link href={`/readinglists`}>
        <a
          className={`hover:text-blue-500 ${
            router.pathname == "/readinglists" ? "text-blue-700" : ""
          }`}
        >
          Daftar Bacaan
        </a>
      </Link>
      <Link href={`/tag`}>
        <a
          className={`hover:text-blue-500 ${
            router.pathname == "/tag" ? "text-blue-700" : ""
          }`}
        >
          Tag
        </a>
      </Link>
      <Link href={`/about`}>
        <a
          className={`hover:text-blue-500 ${
            router.pathname == "/about" ? "text-blue-700" : ""
          }`}
        >
          Tentang Kami
        </a>
      </Link>
    </div>
  );
}
