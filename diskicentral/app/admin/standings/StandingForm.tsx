"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import { CompetitionsService } from "@/services/CompetitionService";
import { StandingsService } from "@/services/StandingService";
import type { Standing } from "@/types/standing";

const competitionsService = new CompetitionsService();
const standingsService = new StandingsService();

type NumberField =
  | "position"
  | "played"
  | "wins"
  | "draws"
  | "losses"
  | "goalsFor"
  | "goalsAgainst"
  | "goalDifference"
  | "points";

type FormValues = Record<NumberField, number> & {
  competitionId: string;
  apiId: number | null;
  fotmobLink: string;
};

const NUMBER_FIELDS: [NumberField, string][] = [
  ["position", "Position"],
  ["played", "Played"],
  ["wins", "Wins"],
  ["draws", "Draws"],
  ["losses", "Losses"],
  ["goalsFor", "Goals for"],
  ["goalsAgainst", "Goals against"],
  ["goalDifference", "Goal difference"],
  ["points", "Points"],
];

function initialValues(standing?: Standing): FormValues {
  return {
    competitionId: standing?.competitionId ?? "",
    apiId: standing?.apiId ?? null,
    fotmobLink: standing?.fotmobLink ?? "",
    position: standing?.position ?? 1,
    played: standing?.played ?? 0,
    wins: standing?.wins ?? 0,
    draws: standing?.draws ?? 0,
    losses: standing?.losses ?? 0,
    goalsFor: standing?.goalsFor ?? 0,
    goalsAgainst: standing?.goalsAgainst ?? 0,
    goalDifference: standing?.goalDifference ?? 0,
    points: standing?.points ?? 0,
  };
}

export default function StandingForm({ standing }: { standing?: Standing }) {
  const editing = Boolean(standing);
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(() =>
    initialValues(standing),
  );
  const [competitions, setCompetitions] = useState<
    { id: string; name: string }[]
  >([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    competitionsService
      .getApiCompetitions()
      .then((response) => active && setCompetitions(response.data ?? []))
      .catch(() => active && setError("Competitions could not be loaded."))
      .finally(() => active && setLoadingOptions(false));
    return () => {
      active = false;
    };
  }, []);

  // Keep derived totals in step with their inputs; they stay editable.
  function setNumber(field: NumberField, value: number) {
    setValues((current) => {
      const next = { ...current, [field]: value };
      if (field === "goalsFor" || field === "goalsAgainst")
        next.goalDifference = next.goalsFor - next.goalsAgainst;
      if (field === "wins" || field === "draws")
        next.points = next.wins * 3 + next.draws;
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const { competitionId, fotmobLink, ...rest } = values;
    const payload = { ...rest, fotmobLink: fotmobLink || null };
    try {
      if (standing) await standingsService.updateStanding(standing.id, payload);
      else await standingsService.addStanding({ ...payload, competitionId });
      router.push("/admin/standings");
    } catch (submitError) {
      setError(
        typeof submitError === "string"
          ? submitError
          : `Failed to ${editing ? "update" : "create"} standing.`,
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/standings"
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
          aria-label="Back to standings">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-xl font-display font-bold text-white">
          {editing ? "Edit standing" : "Add standing"}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-gray-800 bg-[#111] p-5">
        <div className="space-y-1.5">
          <label
            htmlFor="competitionId"
            className="block text-xs font-medium text-gray-400">
            Competition <span className="ml-1 text-[#00C853]">*</span>
          </label>
          <select
            id="competitionId"
            required
            value={values.competitionId}
            disabled={loadingOptions || editing}
            onChange={(e) =>
              setValues((current) => ({
                ...current,
                competitionId: e.target.value,
              }))
            }
            className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853] disabled:opacity-50">
            <option value="">Select competition</option>
            {competitions.map((competition) => (
              <option key={competition.id} value={competition.id}>
                {competition.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {NUMBER_FIELDS.map(([field, label]) => (
            <Input
              key={field}
              label={label}
              name={field}
              type="number"
              min={field === "goalDifference" ? undefined : 0}
              value={values[field]}
              required
              onChange={(e) => setNumber(field, Number(e.target.value))}
            />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="API ID"
            name="apiId"
            type="number"
            value={values.apiId ?? ""}
            onChange={(e) =>
              setValues((current) => ({
                ...current,
                apiId: e.target.value ? Number(e.target.value) : null,
              }))
            }
          />
          <Input
            label="FotMob link"
            name="fotmobLink"
            value={values.fotmobLink}
            onChange={(e) =>
              setValues((current) => ({
                ...current,
                fotmobLink: e.target.value,
              }))
            }
          />
        </div>
        {error && (
          <p className="rounded-lg border border-red-900/60 bg-red-950/30 p-3 text-sm text-red-300">
            {error}
          </p>
        )}
        <div className="flex gap-3">
          <Link
            href="/admin/standings"
            className="flex-1 rounded-lg border border-gray-700 px-4 py-2.5 text-center text-sm font-semibold text-gray-300 hover:border-gray-500 hover:text-white">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting || loadingOptions}
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
                : "Create standing"}
          </button>
        </div>
      </form>
    </div>
  );
}
