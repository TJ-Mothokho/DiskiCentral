"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import AuthShell, { FormMessage } from "@/components/auth/AuthShell";
import { AuthService } from "@/services/AuthService";

export default function ConfirmEmailPage() {
  return (
    <Suspense
      fallback={
        <AuthShell
          title="Confirm your email"
          description="Checking confirmation link...">
          <p className="text-sm text-gray-500">Loading...</p>
        </AuthShell>
      }>
      <Confirmation />
    </Suspense>
  );
}

function Confirmation() {
  const params = useSearchParams();
  const token = params.get("token");
  const [message, setMessage] = useState("Confirming your email...");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    void new AuthService()
      .confirmEmail({ token })
      .then(() => setMessage("Your email is confirmed. You can now sign in."))
      .catch((reason) => {
        setError(String(reason));
        setMessage("");
      });
  }, [token]);

  return (
    <AuthShell
      title="Confirm your email"
      description="Email confirmation keeps your account secure.">
      <FormMessage
        error={token ? error : "This confirmation link is missing its token."}
        success={token ? message : ""}
      />
      <Link
        href="/login"
        className="block w-full mt-5 py-3 bg-green text-center text-black rounded-lg font-bold text-sm">
        Go to sign in
      </Link>
    </AuthShell>
  );
}
