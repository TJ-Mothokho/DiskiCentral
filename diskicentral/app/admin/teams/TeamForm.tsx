"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ImagePlus, Loader2, Save } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import MultiSelect from "@/components/ui/MultiSelect";
import { TeamsService } from "@/services/TeamService";
import { CompetitionsService } from "@/services/CompetitionService";
import type { Team } from "@/types/team";

const teamsService = new TeamsService();
const competitionsService = new CompetitionsService();

type TeamFormProps = { team?: Team };

type FormValues = {
  name: string;
  slug: string;
  shortName: string;
  abbreviation: string;
  apiId: number | null;
  colour: string;
  coach: string;
  stadium: string;
  city: string;
  country: string;
  founded: number;
  description: string;
  competitionIds: string[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function initialValues(team?: Team): FormValues {
  return {
    name: team?.name ?? "",
    slug: team?.slug ?? "",
    shortName: team?.shortName ?? "",
    abbreviation: team?.abbreviation ?? "",
    apiId: team?.apiId ?? null,
    colour: team?.colour ?? "#00C853",
    coach: team?.coach ?? "",
    stadium: team?.stadium ?? "",
    city: team?.city ?? "",
    country: team?.country ?? "South Africa",
    founded: team?.founded ?? 1900,
    description: team?.description ?? "",
    competitionIds: team?.competitionIds ?? [],
  };
}

export default function TeamForm({ team }: TeamFormProps) {
  const editing = Boolean(team);
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(() => initialValues(team));
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    team?.logo ?? null,
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
      .then((response) => {
        if (active) setCompetitions(response.data ?? []);
      })
      .catch(
        () =>
          active &&
          setError(
            "Competitions could not be loaded. Please refresh and try again.",
          ),
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

  function selectLogo(file: File | null) {
    setLogo(file);
    if (file) setLogoPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      if (editing && team) {
        await teamsService.updateTeam(team.id, { ...values, logo });
      } else {
        await teamsService.addTeam({ ...values, logo });
      }
      router.push("/admin/teams");
    } catch {
      setError(`Failed to ${editing ? "update" : "create"} team.`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/teams"
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
          aria-label="Back to teams">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <p className="text-xs uppercase tracking-widest text-[#00C853]">
            Club directory
          </p>
          <h1 className="text-xl font-display font-bold text-white">
            {editing ? "Edit team" : "Add team"}
          </h1>
        </div>
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
              onChange={(e) => {
                setField("name", e.target.value);
                if (!editing) setField("slug", slugify(e.target.value));
              }}
              required
              placeholder="Team name"
            />
            <Input
              label="Slug"
              name="slug"
              value={values.slug}
              onChange={(e) => setField("slug", e.target.value)}
              required
              placeholder="team-name"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Short name"
              name="shortName"
              value={values.shortName}
              onChange={(e) => setField("shortName", e.target.value)}
              placeholder="e.g. Chiefs"
            />
            <Input
              label="Abbreviation"
              name="abbreviation"
              value={values.abbreviation}
              onChange={(e) => setField("abbreviation", e.target.value)}
              placeholder="e.g. KAC"
            />
          </div>
          <Input
            label="API ID"
            name="apiId"
            type="number"
            value={values.apiId ?? ""}
            onChange={(e) =>
              setField("apiId", e.target.value ? Number(e.target.value) : null)
            }
            placeholder="External data provider ID"
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Coach"
              name="coach"
              value={values.coach}
              onChange={(e) => setField("coach", e.target.value)}
              placeholder="Head coach"
            />
            <Input
              label="Stadium"
              name="stadium"
              value={values.stadium}
              onChange={(e) => setField("stadium", e.target.value)}
              placeholder="Home ground"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="City"
              name="city"
              value={values.city}
              onChange={(e) => setField("city", e.target.value)}
              placeholder="City"
            />
            <Input
              label="Country"
              name="country"
              value={values.country}
              onChange={(e) => setField("country", e.target.value)}
              placeholder="Country"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Founded"
              name="founded"
              type="number"
              value={values.founded}
              onChange={(e) => setField("founded", Number(e.target.value))}
              placeholder="1900"
            />
            <div className="space-y-1.5">
              <label
                htmlFor="colour"
                className="block text-xs font-medium text-gray-400">
                Colour
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="colour"
                  type="color"
                  value={values.colour}
                  onChange={(e) => setField("colour", e.target.value)}
                  className="h-9 w-11 rounded border border-gray-700 bg-gray-900 p-1"
                />
                <input
                  value={values.colour}
                  onChange={(e) => setField("colour", e.target.value)}
                  className="flex-1 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"
                />
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="description"
              className="block text-xs font-medium text-gray-400">
              Description
            </label>
            <textarea
              id="description"
              value={values.description}
              onChange={(e) => setField("description", e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"
              placeholder="A short club summary"
            />
          </div>
        </div>
        <aside className="space-y-5">
          <div className="space-y-4 rounded-xl border border-gray-800 bg-[#111] p-5">
            <h2 className="text-sm font-semibold text-white">Competitions</h2>
            <MultiSelect
              options={competitions}
              value={values.competitionIds}
              onChange={(ids) => setField("competitionIds", ids)}
              placeholder={
                loadingOptions
                  ? "Loading competitions..."
                  : "Select competitions"
              }
            />
          </div>
          <div className="rounded-xl border border-gray-800 bg-[#111] p-5">
            <label className="block text-xs font-medium text-gray-400">
              Logo
            </label>
            <label className="mt-2 flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-gray-700 bg-gray-900/60 text-center hover:border-[#00C853]">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="h-36 w-full object-contain bg-gray-950"
                />
              ) : (
                <span className="flex h-28 flex-col items-center justify-center gap-2 text-xs text-gray-500">
                  <ImagePlus size={22} />
                  Choose image
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => selectLogo(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>
          {error && (
            <p className="rounded-lg border border-red-900/60 bg-red-950/30 p-3 text-sm text-red-300">
              {error}
            </p>
          )}
          <div className="flex gap-3">
            <Link
              href="/admin/teams"
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
                  : "Create team"}
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}
