"use client";
import { User } from "@/app/lib/auth";
import { useState } from "react";

export function BillingAddressForm({ user, onSave }: { user: User; onSave: (updates: Partial<User>) => void }) {
  const [address, setAddress] = useState(user.billingAddress || { street: "", city: "", state: "", zip: "", country: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ billingAddress: address });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Billing Address</h3>
      <input
        type="text"
        placeholder="Street"
        value={address.street}
        onChange={(e) => setAddress({ ...address, street: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      />
      <input
        type="text"
        placeholder="City"
        value={address.city}
        onChange={(e) => setAddress({ ...address, city: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      />
      <input
        type="text"
        placeholder="State/Province"
        value={address.state}
        onChange={(e) => setAddress({ ...address, state: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      />
      <input
        type="text"
        placeholder="Zip/Postal Code"
        value={address.zip}
        onChange={(e) => setAddress({ ...address, zip: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      />
      <input
        type="text"
        placeholder="Country"
        value={address.country}
        onChange={(e) => setAddress({ ...address, country: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      />
      <button type="submit" className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold">
        Save Address
      </button>
    </form>
  );
}
