import Link from "next/link";

export default function AuthShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-[calc(100vh-5rem)] bg-surface flex items-center justify-center px-4 py-12">
      <section className="w-full max-w-md bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
        <Link href="/" className="flex items-center gap-2 w-fit mb-8">
          <span className="w-8 h-8 bg-green rounded flex items-center justify-center text-black font-bold text-sm font-display">
            DC
          </span>
          <span className="font-display font-bold text-xl text-gray-900">
            Diski<span className="text-green">Central</span>
          </span>
        </Link>
        <h1 className="font-display font-bold text-3xl text-gray-900">
          {title}
        </h1>
        <p className="text-sm text-gray-500 mt-2 mb-6">{description}</p>
        {children}
      </section>
    </main>
  );
}

export function Field({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
}) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      <span className="block mb-1.5">{label}</span>
      <input
        {...props}
        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-green text-sm text-gray-900 placeholder-gray-400"
      />
      {error && (
        <span className="block mt-1 text-xs text-red-600">{error}</span>
      )}
    </label>
  );
}

export function FormMessage({
  error,
  success,
}: {
  error?: string;
  success?: string;
}) {
  if (!error && !success) return null;
  return (
    <p
      role="alert"
      className={`text-sm rounded-lg px-3 py-2 ${error ? "bg-red-50 text-red-700" : "bg-green-light text-green-dark"}`}>
      {error ?? success}
    </p>
  );
}

export const passwordError = (value: string) =>
  value.length < 8 ? "Password must be at least 8 characters." : "";
export const emailError = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ? ""
    : "Enter a valid email address.";
