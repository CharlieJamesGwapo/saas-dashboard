// app/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/app/lib/auth";
import { LoginForm } from "@/app/components/LoginForm";
import { DarkModeToggle } from "@/app/components/DarkModeToggle";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (getCurrentUser()) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-6">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">SaaS Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">Sign in to your account</p>
        <LoginForm />
      </div>
    </main>
  );
}
