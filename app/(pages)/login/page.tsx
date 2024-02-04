"use client";
import { Loader } from "lucide-react";
import AuthWithGoogle from "@/components/AuthWithGoogle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ModeToggle } from "@/components/ThemeToggle";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";

const schema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    .max(16, { message: "A senha deve ter no máximo 16 caracteres" }),
});

type Inputs = z.infer<typeof schema>;

type LoginProps = {
  method: "signIn" | "signUp";
};

export default function Login() {
  const { data: session, update } = useSession()
  
  if (session?.user) {
    redirect("/dashboard")
  }

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

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);
    const inputData = data as Inputs;
    console.log(inputData);
  }; 

  const LoginForm = ({ method }: LoginProps) => {
    return (
      <Card className="mx-auto bg-black  border-white/20">
        <div className="flex justify-between items-center pr-4">
        <CardHeader className="space-y-1 text-white">
          <CardTitle className="text-2xl fade-in">
            {method === "signIn" ? "Login" : "Registrar"}
          </CardTitle>
          <CardDescription className="text-white/60 fade-in-100">
            {method === "signIn" ? "Entre com sua conta" : "Crie uma conta"}
          </CardDescription>
        </CardHeader>
          <ModeToggle />
        </div>
        <CardContent className="grid gap-4">
          <div className="flex justify-center items-center">
            <div className="border-b flex-1 border-white/20" />
            <div className="">
              <span className="px-2 text-white">Ou continue com</span>
            </div>
            <div className="border-b flex-1 border-white/20" />
          </div>
          <div onClick={handleGoogleClick} className="text-white flex items-center justify-center border-2 p-2 rounded-sm border-white/50">
            {isGoogleLoading ? (
              <Loader className="text-white animate-spin-slow" />
            ) : (
              <AuthWithGoogle />
            )}
          </div>
          <div className="border-b flex-1 pt-2 border-white/20" />
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

  return (
    <Tabs defaultValue="signUp" className="w-[310px]">
      <TabsList className="bg-black flex justify-evenly rounded-lg border-2">
        <TabsTrigger className="text-white/50" value="signUp">
          Registrar
        </TabsTrigger>
        <TabsTrigger className="text-white/50" value="signIn">
          Login
        </TabsTrigger>
      </TabsList>
      <TabsContent value="signIn">
        <LoginForm method="signIn" />
      </TabsContent>
      <TabsContent value="signUp">
        <LoginForm method="signUp" />
      </TabsContent>
    </Tabs>
  );
}
