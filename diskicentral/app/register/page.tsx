"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import AuthShell, { Field, FormMessage, emailError, passwordError } from "@/components/auth/AuthShell";
import { AuthService } from "@/services/AuthService";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [resendMessage, setResendMessage] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    const validation = !form.name.trim() ? "Enter your name." : emailError(form.email) || passwordError(form.password) || (form.password !== form.confirmPassword ? "Passwords do not match." : "");
    if (validation) return setError(validation);
    setError(""); setLoading(true);
    try { const response = await new AuthService().register(form); if (response.data?.requiresEmailConfirmation) { setMessage("Registration received. Check your email for a confirmation link before signing in."); setResendEmail(form.email); } else { setMessage("Your account is ready. You can now sign in."); } } catch (reason) { setError(String(reason)); } finally { setLoading(false); }
  }

  async function resend(event: FormEvent) {
    event.preventDefault();
    const validation = emailError(resendEmail);
    if (validation) return setError(validation);
    setError("");
    try { await new AuthService().resendConfirmation({ email: resendEmail }); setResendMessage("Confirmation email sent. Check your inbox."); } catch (reason) { setError(String(reason)); }
  }

  return <AuthShell title="Create your account" description="Join DiskiCentral and stay close to the game."><form onSubmit={submit} className="space-y-4"><Field label="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} autoComplete="name" /><Field label="Email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="email" /><Field label="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} autoComplete="new-password" error={form.password && passwordError(form.password)} /><Field label="Confirm password" type="password" value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} autoComplete="new-password" /><FormMessage error={error} success={message} /><button disabled={loading} className="w-full py-3 bg-green text-black rounded-lg font-bold text-sm disabled:opacity-60">{loading ? "Creating account..." : "Create account"}</button></form>{message && <form onSubmit={resend} className="mt-6 pt-6 border-t border-gray-100 space-y-3"><p className="text-sm font-semibold text-gray-900">Need another confirmation email?</p><Field label="Email" type="email" value={resendEmail} onChange={(event) => setResendEmail(event.target.value)} autoComplete="email" /><FormMessage error={error} success={resendMessage} /><button className="w-full py-2.5 border border-green text-green-dark rounded-lg font-semibold text-sm">Resend confirmation</button></form>}<p className="mt-6 text-center text-sm text-gray-600">Already registered? <Link href="/login" className="text-green-dark font-semibold">Sign in</Link></p></AuthShell>;
}
