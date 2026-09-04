"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import AuthShell, {
  Field,
  FormMessage,
  passwordError,
} from "@/components/auth/AuthShell";
import { AuthService } from "@/services/AuthService";
import { TokenStorage } from "@/services/TokenStorage";
import { UsersService } from "@/services/UserService";
import { useAuth } from "@/context/AuthContext";
import type { User } from "@/types/user";

export default function ProfilePage() {
  const { user, isLoading, refreshUser } = useAuth();
  if (isLoading)
    return (
      <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center text-gray-500">
        Loading profile...
      </main>
    );
  if (!user)
    return (
      <AuthShell
        title="Sign in required"
        description="Sign in to manage your profile.">
        <Link
          href="/login"
          className="block w-full py-3 bg-green text-center text-black rounded-lg font-bold text-sm">
          Go to sign in
        </Link>
      </AuthShell>
    );

  return <ProfileForm user={user} refreshUser={refreshUser} />;
}

function ProfileForm({
  user,
  refreshUser,
}: {
  user: User;
  refreshUser: () => Promise<User>;
}) {
  const [name, setName] = useState(user.name);
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [error, setError] = useState("");
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  async function updateProfile(event: FormEvent) {
    event.preventDefault();
    setError("");
    setProfileMessage("");
    if (!name.trim()) return setError("Name is required.");
    try {
      const response = await new UsersService().updateUser(user.id, {
        name: name.trim(),
        role: null,
        active: null,
      });
      if (response.data) {
        TokenStorage.setUser(response.data);
        await refreshUser();
      }
      setProfileMessage("Profile updated successfully.");
    } catch (reason) {
      setError(String(reason));
    }
  }

  async function changePassword(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPasswordMessage("");
    const validation = !passwords.currentPassword
      ? "Enter your current password."
      : passwordError(passwords.newPassword) ||
        (passwords.newPassword !== passwords.confirmNewPassword
          ? "Passwords do not match."
          : "");
    if (validation) return setError(validation);
    try {
      await new AuthService().changePassword(passwords);
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setPasswordMessage("Password changed successfully.");
    } catch (reason) {
      setError(String(reason));
    }
  }

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-surface px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
          Your profile
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Update your account details and password.
        </p>
        <div className="grid gap-6">
          <section className="bg-white border border-border rounded-2xl p-6">
            <h2 className="font-display font-bold text-xl text-gray-900 mb-4">
              Profile details
            </h2>
            <form onSubmit={updateProfile} className="space-y-4">
              <Field
                label="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
              />
              <Field label="Email" value={user.email} disabled />
              <FormMessage error={error} success={profileMessage} />
              <button className="py-2.5 px-5 bg-green text-black rounded-lg font-bold text-sm">
                Save profile
              </button>
            </form>
          </section>
          <section className="bg-white border border-border rounded-2xl p-6">
            <h2 className="font-display font-bold text-xl text-gray-900 mb-4">
              Change password
            </h2>
            <form onSubmit={changePassword} className="space-y-4">
              <Field
                label="Current password"
                type="password"
                value={passwords.currentPassword}
                onChange={(event) =>
                  setPasswords({
                    ...passwords,
                    currentPassword: event.target.value,
                  })
                }
                autoComplete="current-password"
              />
              <Field
                label="New password"
                type="password"
                value={passwords.newPassword}
                onChange={(event) =>
                  setPasswords({
                    ...passwords,
                    newPassword: event.target.value,
                  })
                }
                autoComplete="new-password"
                error={
                  passwords.newPassword && passwordError(passwords.newPassword)
                }
              />
              <Field
                label="Confirm new password"
                type="password"
                value={passwords.confirmNewPassword}
                onChange={(event) =>
                  setPasswords({
                    ...passwords,
                    confirmNewPassword: event.target.value,
                  })
                }
                autoComplete="new-password"
              />
              <FormMessage error={error} success={passwordMessage} />
              <button className="py-2.5 px-5 bg-green text-black rounded-lg font-bold text-sm">
                Change password
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
