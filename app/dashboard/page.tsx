// app/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout, updateUser, User } from "@/app/lib/auth";
import { DarkModeToggle } from "@/app/components/DarkModeToggle";
import { SubscriptionCard } from "@/app/components/SubscriptionCard";
import { BillingHistory } from "@/app/components/BillingHistory";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/");
    } else {
      setUser(currentUser);
    }
  }, [router]);

  const handleUpgrade = (tier: "pro" | "enterprise") => {
    if (user) {
      const updated = updateUser({ subscriptionTier: tier });
      if (updated) setUser(updated);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <div className="absolute top-4 right-4 flex gap-4">
        <DarkModeToggle />
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Welcome, {user.name || user.email}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Manage your subscription and billing</p>

        <div className="space-y-6">
          <SubscriptionCard user={user} onUpgrade={handleUpgrade} />
          <BillingHistory />

          <div className="flex gap-4">
            <button
              onClick={() => router.push("/settings")}
              className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold"
            >
              Go to Settings
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
