"use client";
import { User } from "@/app/lib/auth";
import { useState } from "react";

export function ProfileForm({ user, onSave }: { user: User; onSave: (updates: Partial<User>) => void }) {
  const [name, setName] = useState(user.name || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
        <input type="email" value={user.email} readOnly className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" />
      </div>
      <button type="submit" className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold">
        Save Changes
      </button>
    </form>
  );
}
