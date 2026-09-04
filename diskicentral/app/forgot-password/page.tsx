"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import AuthShell, { Field, FormMessage, emailError } from "@/components/auth/AuthShell";
import { AuthService } from "@/services/AuthService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const validation = emailError(email);
    if (validation) return setError(validation);
    setError(""); setLoading(true);
    try { await new AuthService().forgotPassword({ email }); setSuccess("If an account exists for this email, check your inbox for reset instructions."); } catch (reason) { setError(String(reason)); } finally { setLoading(false); }
  }

  return <AuthShell title="Forgot your password?" description="Enter your email and we will send password reset instructions."><form onSubmit={submit} className="space-y-4"><Field label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" error={email && emailError(email)} /><FormMessage error={error} success={success} /><button disabled={loading} className="w-full py-3 bg-green text-black rounded-lg font-bold text-sm disabled:opacity-60">{loading ? "Sending..." : "Send reset email"}</button><p className="text-center text-sm text-gray-600"><Link href="/login" className="text-green-dark font-semibold">Back to sign in</Link></p></form></AuthShell>;
}