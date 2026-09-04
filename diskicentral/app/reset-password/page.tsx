"use client";

import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthShell, {
  Field,
  FormMessage,
  passwordError,
} from "@/components/auth/AuthShell";
import { AuthService } from "@/services/AuthService";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <AuthShell title="Reset password" description="Loading reset form...">
          <p className="text-sm text-gray-500">Loading...</p>
        </AuthShell>
      }>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm() {
  const params = useSearchParams();
  const [form, setForm] = useState({
    email: params.get("email") ?? "",
    resetToken: params.get("token") ?? "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const validation = !form.email
      ? "Enter your email."
      : !form.resetToken
        ? "Enter the reset token from your email."
        : passwordError(form.newPassword) ||
          (form.newPassword !== form.confirmNewPassword
            ? "Passwords do not match."
            : "");
    if (validation) return setError(validation);
    setError("");
    setLoading(true);
    try {
      await new AuthService().resetPassword(form);
      setSuccess("Password reset successfully. You can now sign in.");
    } catch (reason) {
      setError(String(reason));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Reset password"
      description="Use the token from your reset email to choose a new password.">
      <form onSubmit={submit} className="space-y-4">
        <Field
          label="Email"
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          autoComplete="email"
        />
        <Field
          label="Reset token"
          value={form.resetToken}
          onChange={(event) =>
            setForm({ ...form, resetToken: event.target.value })
          }
        />
        <Field
          label="New password"
          type="password"
          value={form.newPassword}
          onChange={(event) =>
            setForm({ ...form, newPassword: event.target.value })
          }
          autoComplete="new-password"
          error={form.newPassword && passwordError(form.newPassword)}
        />
        <Field
          label="Confirm new password"
          type="password"
          value={form.confirmNewPassword}
          onChange={(event) =>
            setForm({ ...form, confirmNewPassword: event.target.value })
          }
          autoComplete="new-password"
        />
        <FormMessage error={error} success={success} />
        <button
          disabled={loading}
          className="w-full py-3 bg-green text-black rounded-lg font-bold text-sm disabled:opacity-60">
          {loading ? "Resetting..." : "Reset password"}
        </button>
      </form>
    </AuthShell>
  );
}
