"use client";
import { User } from "@/app/lib/auth";
import { useState } from "react";

const tiers = {
  free: { name: "Free", price: 0, features: ["1 project", "5GB storage", "Community support"] },
  pro: { name: "Pro", price: 29, features: ["Unlimited projects", "100GB storage", "Email support", "Advanced analytics"] },
  enterprise: { name: "Enterprise", price: 99, features: ["Everything in Pro", "Priority support", "Custom integrations", "SLA"] },
};

export function SubscriptionCard({ user, onUpgrade }: { user: User; onUpgrade: (tier: "pro" | "enterprise") => void }) {
  const [showModal, setShowModal] = useState(false);
  const currentTier = tiers[user.subscriptionTier];

  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {currentTier.name} Plan
        </h2>
        <p className="text-3xl font-bold text-blue-500 mb-4">
          ${currentTier.price}<span className="text-lg text-gray-600 dark:text-gray-400">/mo</span>
        </p>
        <ul className="space-y-2 mb-6">
          {currentTier.features.map((feature) => (
            <li key={feature} className="text-gray-700 dark:text-gray-300">✓ {feature}</li>
          ))}
        </ul>
        {user.subscriptionTier === "free" && (
          <button
            onClick={() => setShowModal(true)}
            className="w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
          >
            Upgrade Plan
          </button>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Choose a Plan</h3>
            <div className="space-y-3">
              {(["pro", "enterprise"] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => {
                    onUpgrade(tier);
                    setShowModal(false);
                  }}
                  className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                >
                  {tiers[tier].name} (${tiers[tier].price}/mo)
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-4 px-4 py-3 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
