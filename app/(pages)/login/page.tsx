"use client";

import { Loader } from "lucide-react";
import AuthWithGoogle from "@/components/AuthWithGoogle";
import * as React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ModeToggle } from "@/components/ThemeToggle";
import { useSession } from "next-auth/react"

const schema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    .max(16, { message: "A senha deve ter no máximo 16 caracteres" }),
});

type Inputs = z.infer<typeof schema>;

export default function Login() {
  const { data: session, update } = useSession()

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setGoogleLoading] = useState(false);
  
  const handleGoogleClick = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
    }, 3000);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  
return (
  <Card className="mx-auto bg-black  border-white/20">
    <div className="flex justify-between items-center pr-4">
    <CardHeader className="space-y-1 text-white">
      <CardTitle className="text-2xl fade-in">
        Paguei?
        </CardTitle>
      <CardDescription className="text-white/60 fade-in-100">
        Entre com suas credenciais
      </CardDescription>
    </CardHeader>
      <ModeToggle />
    </div>
    <CardContent className="grid gap-4">
      <div className="flex justify-center items-center">
        <div className="border-b flex-1 border-white/20" />
        <div className="border-b flex-1 border-white/20" />
      </div>
      <div onClick={handleGoogleClick} className="text-white flex items-center justify-center border-2 p-2 rounded-sm border-white/50">
        {isGoogleLoading ? (
          <Loader className="text-white animate-spin-slow" />
        ) : (
          <AuthWithGoogle />
        )}
      </div>
    </CardContent>
  </Card>
);
  };
