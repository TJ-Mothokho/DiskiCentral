"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import MultiSelect from "@/components/ui/MultiSelect";
import { CompetitionsService } from "@/services/CompetitionService";
import { SeasonsService } from "@/services/SeasonService";
import { TeamsService } from "@/services/TeamService";
import { type Competition, CompetitionFormat } from "@/types/competition";

const competitionsService = new CompetitionsService();
const seasonsService = new SeasonsService();
const teamsService = new TeamsService();

export const FORMAT_LABELS: Record<number, string> = {
  [CompetitionFormat.League]: "League",
  [CompetitionFormat.Knockout]: "Knockout",
};

type Option = { id: string; name: string };

type FormValues = {
  name: string;
  slug: string;
  shortName: string;
  country: string;
  season: string;
  format: CompetitionFormat;
  apiId: number | null;
  fotmobLink: string;
  logo: string;
  primarycolour: string;
  secondarycolour: string;
  tertiarycolour: string;
  teamIds: string[];
  seasonIds: string[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function initialValues(competition?: Competition): FormValues {
  return {
    name: competition?.name ?? "",
    slug: competition?.slug ?? "",
    shortName: competition?.shortName ?? "",
    country: competition?.country ?? "South Africa",
    season: competition?.season ?? "",
    format:
      (competition?.format as CompetitionFormat) ?? CompetitionFormat.League,
    apiId: competition?.apiId ?? null,
    fotmobLink: competition?.fotmobLink ?? "",
    logo: competition?.logo ?? "",
    primarycolour: competition?.primarycolour ?? "#00C853",
    secondarycolour: competition?.secondarycolour ?? "#000000",
    tertiarycolour: competition?.tertiarycolour ?? "#FFFFFF",
    teamIds: competition?.teamIds ?? [],
    seasonIds: competition?.seasonIds ?? [],
  };
}

const COLOUR_FIELDS = [
  ["primarycolour", "Primary colour"],
  ["secondarycolour", "Secondary colour"],
  ["tertiarycolour", "Tertiary colour"],
] as const;

export default function CompetitionForm({
  competition,
}: {
  competition?: Competition;
}) {
  const editing = Boolean(competition);
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(() =>
    initialValues(competition),
  );
  const [teams, setTeams] = useState<Option[]>([]);
  const [seasons, setSeasons] = useState<Option[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([teamsService.getApiTeams(), seasonsService.getApiSeasons()])
      .then(([teamResponse, seasonResponse]) => {
        if (!active) return;
        setTeams(teamResponse.data ?? []);
        setSeasons(seasonResponse.data ?? []);
      })
      .catch(
        () =>
          active &&
          setError("Teams and seasons could not be loaded. Please refresh."),
      )
      .finally(() => active && setLoadingOptions(false));
    return () => {
      active = false;
    };
  }, []);

  const setField = <K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) => setValues((current) => ({ ...current, [field]: value }));

  async function syncMembership(id: string) {
    const originalTeams = competition?.teamIds ?? [];
    const originalSeasons = competition?.seasonIds ?? [];
    const addedTeams = values.teamIds.filter((t) => !originalTeams.includes(t));
    const removedTeams = originalTeams.filter(
      (t) => !values.teamIds.includes(t),
    );
    const addedSeasons = values.seasonIds.filter(
      (s) => !originalSeasons.includes(s),
    );
    const removedSeasons = originalSeasons.filter(
      (s) => !values.seasonIds.includes(s),
    );
    if (addedTeams.length)
      await competitionsService.addTeamsToCompetition(id, {
        teamIds: addedTeams,
      });
    if (removedTeams.length)
      await competitionsService.removeTeamsFromCompetition(id, {
        teamIds: removedTeams,
      });
    for (const seasonId of addedSeasons)
      await competitionsService.addSeasonToCompetition(id, seasonId);
    for (const seasonId of removedSeasons)
      await competitionsService.removeSeasonFromCompetition(id, seasonId);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const payload = {
      name: values.name,
      slug: values.slug,
      shortName: values.shortName || null,
      country: values.country,
      season: values.season || null,
      format: values.format,
      apiId: values.apiId,
      fotmobLink: values.fotmobLink || null,
      logo: values.logo || null,
      logoRaw: null,
      primarycolour: values.primarycolour || null,
      secondarycolour: values.secondarycolour || null,
      tertiarycolour: values.tertiarycolour || null,
    };
    try {
      const response = competition
        ? await competitionsService.updateCompetition(competition.id, payload)
        : await competitionsService.addCompetition(payload);
      await syncMembership(response.data?.id ?? competition?.id ?? "");
      router.push("/admin/competitions");
    } catch (submitError) {
      setError(
        typeof submitError === "string"
          ? submitError
          : `Failed to ${editing ? "update" : "create"} competition.`,
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/competitions"
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
          aria-label="Back to competitions">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-xl font-display font-bold text-white">
          {editing ? "Edit competition" : "Add competition"}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5 rounded-xl border border-gray-800 bg-[#111] p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Name"
              name="name"
              value={values.name}
              required
              placeholder="Competition name"
              onChange={(e) => {
                setField("name", e.target.value);
                if (!editing) setField("slug", slugify(e.target.value));
              }}
            />
            <Input
              label="Slug"
              name="slug"
              value={values.slug}
              required
              placeholder="competition-name"
              onChange={(e) => setField("slug", e.target.value)}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Short name"
              name="shortName"
              value={values.shortName}
              placeholder="e.g. PSL"
              onChange={(e) => setField("shortName", e.target.value)}
            />
            <Input
              label="Country"
              name="country"
              value={values.country}
              required
              onChange={(e) => setField("country", e.target.value)}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Season label"
              name="season"
              value={values.season}
              placeholder="2025/26"
              onChange={(e) => setField("season", e.target.value)}
            />
            <div className="space-y-1.5">
              <label
                htmlFor="format"
                className="block text-xs font-medium text-gray-400">
                Format
              </label>
              <select
                id="format"
                value={values.format}
                onChange={(e) => setField("format", Number(e.target.value))}
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]">
                {Object.entries(FORMAT_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="API ID"
              name="apiId"
              type="number"
              value={values.apiId ?? ""}
              placeholder="External data provider ID"
              onChange={(e) =>
                setField(
                  "apiId",
                  e.target.value ? Number(e.target.value) : null,
                )
              }
            />
            <Input
              label="FotMob link"
              name="fotmobLink"
              value={values.fotmobLink}
              placeholder="https://www.fotmob.com/leagues/..."
              onChange={(e) => setField("fotmobLink", e.target.value)}
            />
          </div>
          <Input
            label="Logo URL"
            name="logo"
            value={values.logo}
            placeholder="https://..."
            onChange={(e) => setField("logo", e.target.value)}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {COLOUR_FIELDS.map(([field, label]) => (
              <div key={field} className="space-y-1.5">
                <label
                  htmlFor={field}
                  className="block text-xs font-medium text-gray-400">
                  {label}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id={field}
                    type="color"
                    value={values[field]}
                    onChange={(e) => setField(field, e.target.value)}
                    className="h-9 w-11 rounded border border-gray-700 bg-gray-900 p-1"
                  />
                  <input
                    value={values[field]}
                    onChange={(e) => setField(field, e.target.value)}
                    className="min-w-0 flex-1 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="space-y-5">
          <div className="space-y-4 rounded-xl border border-gray-800 bg-[#111] p-5">
            <h2 className="text-sm font-semibold text-white">Teams</h2>
            <MultiSelect
              options={teams}
              value={values.teamIds}
              onChange={(ids) => setField("teamIds", ids)}
              placeholder={loadingOptions ? "Loading teams..." : "Select teams"}
            />
          </div>
          <div className="space-y-4 rounded-xl border border-gray-800 bg-[#111] p-5">
            <h2 className="text-sm font-semibold text-white">Seasons</h2>
            <MultiSelect
              options={seasons}
              value={values.seasonIds}
              onChange={(ids) => setField("seasonIds", ids)}
              placeholder={
                loadingOptions ? "Loading seasons..." : "Select seasons"
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
              href="/admin/competitions"
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
                  : "Create competition"}
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}
