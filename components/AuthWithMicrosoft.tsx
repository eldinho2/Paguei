"use client";

import { signIn } from "next-auth/react";
import microsoftLogo from '@/public/microsoft-alt-svgrepo-com.svg'
import Image from 'next/image'

export default function AuthWithGoogle() {
  return (
    <button
      className="flex items-center gap-2 flex-1 justify-center"
      onClick={() => signIn("azure-ad")}
    >
      <span className="w-4 h-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16"><path d="M0 0h15.206v15.206H0z" fill="#f25022"/><path d="M16.794 0H32v15.206H16.794z" fill="#7fba00"/><path d="M0 16.794h15.206V32H0z" fill="#00a4ef"/><path d="M16.794 16.794H32V32H16.794z" fill="#ffb900"/></svg>
      </span>
      Microsoft
    </button>
  );
}
