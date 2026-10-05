"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import { CompetitionsService } from "@/services/CompetitionService";
import { FixturesService } from "@/services/FixtureService";
import { TeamsService } from "@/services/TeamService";
import { type Fixture, FixtureStatus } from "@/types/fixture";

const competitionsService = new CompetitionsService();
const teamsService = new TeamsService();

export const FIXTURE_STATUS_LABELS: Record<number, string> = {
  [FixtureStatus.Scheduled]: "Scheduled",
  [FixtureStatus.Live]: "Live",
  [FixtureStatus.HalfTime]: "Half time",
  [FixtureStatus.Finished]: "Finished (result)",
  [FixtureStatus.Postponed]: "Postponed",
  [FixtureStatus.Cancelled]: "Cancelled",
};

type Option = { id: string; name: string; teamIds?: string[] };

type FormValues = {
  competitionId: string;
  homeTeamId: string;
  awayTeamId: string;
  apiId: number | null;
  fotmobLink: string;
  kickoff: string;
  venue: string;
  status: FixtureStatus;
  homeScore: number | null;
  awayScore: number | null;
};

// datetime-local expects local "YYYY-MM-DDTHH:mm".
function toLocalInput(iso: string | undefined) {
  if (!iso) return "";
  const date = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function initialValues(fixture?: Fixture): FormValues {
  return {
    competitionId: fixture?.competitionId ?? "",
    homeTeamId: fixture?.homeTeamId ?? "",
    awayTeamId: fixture?.awayTeamId ?? "",
    apiId: fixture?.apiId ?? null,
    fotmobLink: fixture?.fotmobLink ?? "",
    kickoff: toLocalInput(fixture?.kickoff),
    venue: fixture?.venue ?? "",
    status: (fixture?.status as FixtureStatus) ?? FixtureStatus.Scheduled,
    homeScore: fixture?.homeScore ?? null,
    awayScore: fixture?.awayScore ?? null,
  };
}

const selectClass =
  "w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853] disabled:opacity-50";

export default function FixtureForm({ fixture }: { fixture?: Fixture }) {
  const editing = Boolean(fixture);
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(() =>
    initialValues(fixture),
  );
  const [competitions, setCompetitions] = useState<Option[]>([]);
  const [teams, setTeams] = useState<Option[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([
      competitionsService.getApiCompetitions(),
      teamsService.getApiTeams(),
    ])
      .then(([competitionResponse, teamResponse]) => {
        if (!active) return;
        setCompetitions(competitionResponse.data ?? []);
        setTeams(teamResponse.data ?? []);
      })
      .catch(
        () =>
          active &&
          setError(
            "Competitions and teams could not be loaded. Please refresh.",
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

  const selectedCompetition = competitions.find(
    (competition) => competition.id === values.competitionId,
  );
  // Limit to the competition's teams, but keep the saved teams selectable.
  const teamOptions = selectedCompetition?.teamIds?.length
    ? teams.filter(
        (team) =>
          selectedCompetition.teamIds?.includes(team.id) ||
          team.id === fixture?.homeTeamId ||
          team.id === fixture?.awayTeamId,
      )
    : teams;
  const showScores =
    values.status !== FixtureStatus.Scheduled &&
    values.status !== FixtureStatus.Postponed &&
    values.status !== FixtureStatus.Cancelled;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (values.homeTeamId === values.awayTeamId) {
      setError("Home and away teams must be different.");
      return;
    }
    if (
      values.status === FixtureStatus.Finished &&
      (values.homeScore === null || values.awayScore === null)
    ) {
      setError("Enter both scores for a finished fixture.");
      return;
    }
    setSubmitting(true);
    const payload = {
      competitionId: values.competitionId,
      homeTeamId: values.homeTeamId,
      awayTeamId: values.awayTeamId,
      apiId: values.apiId,
      fotmobLink: values.fotmobLink || null,
      kickoff: new Date(values.kickoff).toISOString(),
      venue: values.venue || null,
      status: values.status,
      homeScore: showScores ? values.homeScore : null,
      awayScore: showScores ? values.awayScore : null,
    };
    try {
      if (fixture) await FixturesService.updateFixture(fixture.id, payload);
      else await FixturesService.addFixture(payload);
      router.push("/admin/fixtures");
    } catch (submitError) {
      setError(
        typeof submitError === "string"
          ? submitError
          : `Failed to ${editing ? "update" : "create"} fixture.`,
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/fixtures"
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
          aria-label="Back to fixtures">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-xl font-display font-bold text-white">
          {editing ? "Edit fixture" : "Add fixture"}
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
            disabled={loadingOptions}
            onChange={(e) => setField("competitionId", e.target.value)}
            className={selectClass}>
            <option value="">Select competition</option>
            {competitions.map((competition) => (
              <option key={competition.id} value={competition.id}>
                {competition.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {(
            [
              ["homeTeamId", "Home team"],
              ["awayTeamId", "Away team"],
            ] as const
          ).map(([field, label]) => (
            <div key={field} className="space-y-1.5">
              <label
                htmlFor={field}
                className="block text-xs font-medium text-gray-400">
                {label} <span className="ml-1 text-[#00C853]">*</span>
              </label>
              <select
                id={field}
                required
                value={values[field]}
                disabled={loadingOptions}
                onChange={(e) => setField(field, e.target.value)}
                className={selectClass}>
                <option value="">Select team</option>
                {teamOptions.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Kickoff"
            name="kickoff"
            type="datetime-local"
            value={values.kickoff}
            required
            onChange={(e) => setField("kickoff", e.target.value)}
          />
          <Input
            label="Venue"
            name="venue"
            value={values.venue}
            placeholder="Stadium"
            onChange={(e) => setField("venue", e.target.value)}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-1.5">
            <label
              htmlFor="status"
              className="block text-xs font-medium text-gray-400">
              Status
            </label>
            <select
              id="status"
              value={values.status}
              onChange={(e) => setField("status", Number(e.target.value))}
              className={selectClass}>
              {Object.entries(FIXTURE_STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          {showScores && (
            <>
              <Input
                label="Home score"
                name="homeScore"
                type="number"
                min={0}
                value={values.homeScore ?? ""}
                onChange={(e) =>
                  setField(
                    "homeScore",
                    e.target.value === "" ? null : Number(e.target.value),
                  )
                }
              />
              <Input
                label="Away score"
                name="awayScore"
                type="number"
                min={0}
                value={values.awayScore ?? ""}
                onChange={(e) =>
                  setField(
                    "awayScore",
                    e.target.value === "" ? null : Number(e.target.value),
                  )
                }
              />
            </>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="API ID"
            name="apiId"
            type="number"
            value={values.apiId ?? ""}
            placeholder="External data provider ID"
            onChange={(e) =>
              setField("apiId", e.target.value ? Number(e.target.value) : null)
            }
          />
          <Input
            label="FotMob link"
            name="fotmobLink"
            value={values.fotmobLink}
            placeholder="https://www.fotmob.com/matches/..."
            onChange={(e) => setField("fotmobLink", e.target.value)}
          />
        </div>
        {error && (
          <p className="rounded-lg border border-red-900/60 bg-red-950/30 p-3 text-sm text-red-300">
            {error}
          </p>
        )}
        <div className="flex gap-3">
          <Link
            href="/admin/fixtures"
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
                : "Create fixture"}
          </button>
        </div>
      </form>
    </div>
  );
}
