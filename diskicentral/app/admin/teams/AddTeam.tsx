import MultiSelect from "@/components/ui/MultiSelect";
import { CompetitionsService } from "@/services/CompetitionService";
import { TeamsService } from "@/services/TeamService";
import { Team } from "@/types/team";
import { X } from "lucide-react";
import { useState, FormEvent, useEffect } from "react";

const teamsService = new TeamsService();
const competitionsService = new CompetitionsService();

export function AddTeamModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (updated: Team) => void;
}) {
  const [allCompetitions, setAllCompetitions] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    competitionsService.getApiCompetitions().then((response) => {
      setAllCompetitions(response.data);
    });
  }, []);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [shortName, setShortName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [colour, setColour] = useState("");
  const [coach, setCoach] = useState("");
  const [stadium, setStadium] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("South Africa");
  const [founded, setFounded] = useState(1900);
  const [description, setDescription] = useState("");
  const [competitionIds, setCompetitionIds] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setDescription(`${name} is a football team from ${city}, ${country}.`);
    setShortName(name);
    setAbbreviation(name.slice(0, 3).toUpperCase());
    setSlug(name.toLowerCase().replace(/\s+/g, "-"));

    setSubmitting(true);
    setFormError("");
    try {
      const response = await teamsService.addTeam({
        name,
        slug,
        shortName,
        abbreviation,
        logo,
        colour,
        coach,
        stadium,
        city,
        country,
        founded,
        description,
        competitionIds,
      });
      onCreated(response.data);
    } catch {
      setFormError("Failed to add team.");
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
          <h2 className="text-sm font-semibold text-white">Add Team</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800">
            <X size={16} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 scrollbar-auto">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"
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
                value={coach}
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
                value={colour}
                onChange={(e) => setColour(e.target.value)}
                className="h-9 w-11 rounded border border-gray-700 bg-gray-900 p-1"
              />
              <input
                value={colour}
                onChange={(e) => setColour(e.target.value)}
                required
                className="flex-1 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                City
              </label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Country
              </label>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
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
                Founded
              </label>
              <input
                type="number"
                value={founded}
                onChange={(e) => setFounded(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Stadium
              </label>
              <input
                value={stadium}
                onChange={(e) => setStadium(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"
              />
            </div>
          </div>
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
              {submitting ? "Adding..." : "Add Team"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
