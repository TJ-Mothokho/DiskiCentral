"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";

interface NewsletterSectionProps {
  darkMode: boolean;
}

export default function NewsletterSection({
  darkMode,
}: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <section className="max-w-[1440px] mx-auto px-4 py-12">
      <div
        className={`p-8 sm:p-12 text-center rounded-lg ${darkMode ? "bg-black" : "bg-[#0A0A0A]"}`}>
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-[#00C853]/10 rounded-full flex items-center justify-center">
            <Mail size={20} className="text-[#00C853]" />
          </div>
        </div>
        <h2 className="font-display font-bold text-3xl text-white mb-2">
          Never Miss a Kick
        </h2>
        <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
          Get the best South African football stories delivered to your inbox
          every morning.
        </p>
        {subscribed ? (
          <p className="bg-[#00C853]/10 border border-[#00C853]/30 text-[#00C853] rounded-lg py-3 px-6 inline-block text-sm font-semibold">
            You are subscribed. Welcome to DiskiCentral.
          </p>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg text-sm outline-none focus:border-[#00C853] transition-colors placeholder-gray-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#00C853] text-black font-bold text-sm rounded-lg hover:bg-[#00A344] transition-colors">
              Subscribe
            </button>
          </form>
        )}
        <p className="text-gray-600 text-xs mt-3">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
