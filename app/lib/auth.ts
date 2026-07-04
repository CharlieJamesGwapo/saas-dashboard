// app/lib/auth.ts
export interface User {
  id: string;
  email: string;
  name?: string;
  subscriptionTier: "free" | "pro" | "enterprise";
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

const USER_KEY = "saas_user";

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export function login(email: string): User {
  const user: User = {
    id: Math.random().toString(36).substring(7),
    email,
    subscriptionTier: "free",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export function logout(): void {
  localStorage.removeItem(USER_KEY);
}

export function updateUser(updates: Partial<User>): User | null {
  const user = getCurrentUser();
  if (!user) return null;
  const updated = {
    ...user,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(USER_KEY, JSON.stringify(updated));
  return updated;
}
