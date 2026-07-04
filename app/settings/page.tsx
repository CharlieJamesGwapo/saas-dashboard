"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout, updateUser, User } from "@/app/lib/auth";
import { DarkModeToggle } from "@/app/components/DarkModeToggle";
import { ProfileForm } from "@/app/components/ProfileForm";
import { BillingAddressForm } from "@/app/components/BillingAddressForm";

export default function SettingsPage() {
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

  const handleSave = (updates: Partial<User>) => {
    if (user) {
      const updated = updateUser(updates);
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
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

        <div className="space-y-6">
          <ProfileForm user={user} onSave={handleSave} />
          <BillingAddressForm user={user} onSave={handleSave} />

          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}
