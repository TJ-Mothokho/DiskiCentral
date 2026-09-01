"use client";

import { useState } from "react";
import { Globe, Mail, MapPin, Play, Rss, Share2 } from "lucide-react";

export default function ContactPage() {
  const darkMode = false;
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-6">
      <div className="mb-8">
        <h1
          className={`font-display font-bold text-4xl mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Contact
        </h1>
        <p
          className={`text-base ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Get in touch with the DiskiCentral team
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div
            className={`rounded-xl border p-6 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h2
                  className={`font-display font-bold text-2xl mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Message sent!
                </h2>
                <p
                  className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  We’ll get back to you within 2 business days.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 text-sm text-[#00C853] font-semibold">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2
                  className={`font-display font-bold text-xl mb-5 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Send us a message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-xs font-semibold mb-1.5 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Full Name
                    </label>
                    <input
                      value={form.name}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      required
                      className={`w-full px-3.5 py-2.5 text-sm border rounded-lg outline-none focus:border-[#00C853] transition-colors ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-xs font-semibold mb-1.5 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      required
                      className={`w-full px-3.5 py-2.5 text-sm border rounded-lg outline-none focus:border-[#00C853] transition-colors ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-xs font-semibold mb-1.5 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        subject: event.target.value,
                      }))
                    }
                    className={`w-full px-3.5 py-2.5 text-sm border rounded-lg outline-none focus:border-[#00C853] transition-colors ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}>
                    <option value="general">General enquiry</option>
                    <option value="editorial">Editorial</option>
                    <option value="advertising">Advertising</option>
                    <option value="media">Media / interviews</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-xs font-semibold mb-1.5 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                    rows={6}
                    required
                    className={`w-full px-3.5 py-2.5 text-sm border rounded-lg outline-none focus:border-[#00C853] transition-colors ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#00C853] text-black font-bold text-sm rounded-xl hover:bg-[#00A344] transition-colors">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div
            className={`rounded-xl border p-5 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
            <h3
              className={`font-display font-bold text-base mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Office
            </h3>
            <div
              className={`space-y-3 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              <div className="flex gap-2.5">
                <MapPin size={14} className="text-[#00C853] shrink-0 mt-0.5" />
                <span>14 Buitenkant Street, Cape Town, 8001</span>
              </div>
              <div className="flex gap-2.5">
                <Mail size={14} className="text-[#00C853] shrink-0 mt-0.5" />
                <span>editorial@diskicentral.co.za</span>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border p-5 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
            <h3
              className={`font-display font-bold text-base mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Advertising
            </h3>
            <p
              className={`text-sm mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              For advertising and sponsorship enquiries:
            </p>
            <a
              href="mailto:ads@diskicentral.co.za"
              className="text-sm text-[#00C853] font-medium">
              ads@diskicentral.co.za
            </a>
          </div>

          <div
            className={`rounded-xl border p-5 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
            <h3
              className={`font-display font-bold text-base mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Follow Us
            </h3>
            <div className="flex gap-2">
              {[
                { icon: Share2, label: "Twitter / X", color: "bg-sky-500" },
                { icon: Globe, label: "Facebook", color: "bg-blue-700" },
                { icon: Rss, label: "Instagram", color: "bg-pink-600" },
                { icon: Play, label: "YouTube", color: "bg-red-600" },
              ].map(({ icon: Icon, label, color }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className={`w-9 h-9 ${color} text-white rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity`}>
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
