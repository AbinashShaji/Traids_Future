"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";
import { Button } from "@/components/button";
import { FormInput as Input } from "@/components/form-input";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Traid Future CMS</h1>
          <p className="text-sm text-gray-500 mt-2">Sign in to manage your content</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Input
                label="Email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full"
              />
            </div>

            <div>
              <Input
                label="Password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                className="w-full"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full justify-center">
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
