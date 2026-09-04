"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import AuthShell, { Field, FormMessage, emailError } from "@/components/auth/AuthShell";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const validation = emailError(email);
    if (validation || !password) return setError(validation || "Enter your password.");
    setError(""); setLoading(true);
    try { await login({ email, password }); router.push("/"); } catch (reason) { setError(String(reason)); } finally { setLoading(false); }
  }

  return <AuthShell title="Welcome back" description="Sign in to your DiskiCentral account."><form onSubmit={submit} className="space-y-4"><Field label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" error={email && emailError(email)} /><Field label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /><FormMessage error={error} /><button disabled={loading} className="w-full py-3 bg-green text-black rounded-lg font-bold text-sm disabled:opacity-60">{loading ? "Signing in..." : "Sign in"}</button><div className="flex justify-between text-sm"><Link href="/forgot-password" className="text-green-dark font-semibold">Forgot password?</Link><Link href="/register" className="text-gray-600 hover:text-gray-900">Create account</Link></div></form></AuthShell>;
}
