"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { FormEvent, useState } from "react";
import Input from "@/components/ui/Input";
import { SeasonsService } from "@/services/SeasonService";
import { CompetitionStatus } from "@/types/common";
import type { Season } from "@/types/season";

const seasonsService = new SeasonsService();

export const SEASON_STATUS_LABELS: Record<number, string> = {
  [CompetitionStatus.Upcoming]: "Upcoming",
  [CompetitionStatus.Active]: "Active",
  [CompetitionStatus.Completed]: "Completed",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function SeasonForm({ season }: { season?: Season }) {
  const editing = Boolean(season);
  const router = useRouter();
  const [name, setName] = useState(season?.name ?? "");
  const [slug, setSlug] = useState(season?.slug ?? "");
  const [status, setStatus] = useState<CompetitionStatus>(
    (season?.status as CompetitionStatus) ?? CompetitionStatus.Upcoming,
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      if (season) {
        await seasonsService.updateSeason(season.id, { name, slug, status });
      } else {
        await seasonsService.addSeason({ name, slug, status });
      }
      router.push("/admin/seasons");
    } catch (submitError) {
      setError(
        typeof submitError === "string"
          ? submitError
          : `Failed to ${editing ? "update" : "create"} season.`,
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/seasons"
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
          aria-label="Back to seasons">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-xl font-display font-bold text-white">
          {editing ? "Edit season" : "Add season"}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-gray-800 bg-[#111] p-5">
        <Input
          label="Name"
          name="name"
          value={name}
          required
          placeholder="2025/26"
          onChange={(e) => {
            setName(e.target.value);
            if (!editing) setSlug(slugify(e.target.value));
          }}
        />
        <Input
          label="Slug"
          name="slug"
          value={slug}
          required
          placeholder="2025-26"
          onChange={(e) => setSlug(e.target.value)}
        />
        <div className="space-y-1.5">
          <label
            htmlFor="status"
            className="block text-xs font-medium text-gray-400">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]">
            {Object.entries(SEASON_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <p className="rounded-lg border border-red-900/60 bg-red-950/30 p-3 text-sm text-red-300">
            {error}
          </p>
        )}
        <div className="flex gap-3">
          <Link
            href="/admin/seasons"
            className="flex-1 rounded-lg border border-gray-700 px-4 py-2.5 text-center text-sm font-semibold text-gray-300 hover:border-gray-500 hover:text-white">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#00C853] px-4 py-2.5 text-sm font-bold text-black hover:bg-[#00A344] disabled:cursor-not-allowed disabled:opacity-50">
            {submitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {submitting
              ? "Saving..."
              : editing
                ? "Save changes"
                : "Create season"}
          </button>
        </div>
      </form>
    </div>
  );
}
