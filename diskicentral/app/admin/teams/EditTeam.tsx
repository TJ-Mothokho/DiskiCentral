"use client";
import { Team } from "@/types/team";
import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";
import { TeamsService } from "@/services/TeamService";
import MultiSelect from "@/components/ui/MultiSelect";
import { CompetitionsService } from "@/services/CompetitionService";

const teamsService = new TeamsService();
const competitionsService = new CompetitionsService();

export function EditTeamModal({
  team,
  onClose,
  onUpdated,
}: {
  team: Team;
  onClose: () => void;
  onUpdated: (updated: Team) => void;
}) {
  const [allCompetitions, setAllCompetitions] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    competitionsService.getApiCompetitions().then((response) => {
      setAllCompetitions(response.data);
    });
  }, []);

  const [name, setName] = useState(team.name);
  const [slug, setSlug] = useState(team.slug);
  const [shortName, setShortName] = useState(team.shortName);
  const [abbreviation, setAbbreviation] = useState(team.abbreviation);
  const [logo, setLogo] = useState<File | null>(null);
  const [competitionIds, setCompetitionIds] = useState<string[]>(
    team.competitionIds ?? [],
  );
  const [colour, setColour] = useState(team.colour);
  const [coach, setCoach] = useState(team.coach);
  const [stadium, setStadium] = useState(team.stadium);
  const [city, setCity] = useState(team.city);
  const [country, setCountry] = useState(team.country);
  const [founded, setFounded] = useState(team.founded);
  const [description, setDescription] = useState(team.description);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setFormError("");
    try {
      const response = await teamsService.updateTeam(team.id, {
        name,
        slug,
        shortName,
        abbreviation,
        logo,
        competitionIds,
        colour,
        coach,
        stadium,
        city,
        country,
        founded,
        description,
      });
      onUpdated(response.data);
    } catch {
      setFormError("Failed to update team.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}>
      <div
        className="w-full max-w-md rounded-xl border border-gray-800 bg-[#111] p-5"
        onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">Edit Team</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800">
            <X size={16} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 scroll-auto">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                ShortName
              </label>
              <input
                value={shortName ?? undefined}
                onChange={(e) => setShortName(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Abbreviation
              </label>
              <input
                value={abbreviation ?? undefined}
                onChange={(e) => setAbbreviation(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"
              />
            </div>
          </div>
          <div>
            <MultiSelect
              label="Competitions"
              options={allCompetitions}
              value={competitionIds}
              onChange={setCompetitionIds}
              placeholder="Select competitions"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Logo
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setLogo(e.target.files ? e.target.files[0] : null)
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Coach
              </label>
              <input
                value={coach ?? undefined}
                onChange={(e) => setCoach(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Colour
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={colour ?? undefined}
                onChange={(e) => setColour(e.target.value)}
                className="h-9 w-11 rounded border border-gray-700 bg-gray-900 p-1"
              />
              <input
                value={colour ?? undefined}
                onChange={(e) => setColour(e.target.value)}
                required
                className="flex-1 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Description
            </label>
            <textarea
              value={description ?? undefined}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"
            />
          </div>
          {/* Colour field removed as it's not part of the Team entity */}
          {formError && <p className="text-sm text-red-400">{formError}</p>}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-[#00C853] text-black font-bold text-sm rounded-lg hover:bg-[#00A344] disabled:opacity-50">
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
