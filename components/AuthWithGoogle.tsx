'use client'

import { signIn } from "next-auth/react";

export default function AuthWithGoogle() {
  return (
    <button className="bg-black text-white rounded-md p-2" onClick={ () => signIn("google", {callbackUrl: "/dashboard"}) }>
      Login Com Google
    </button>
  );
}