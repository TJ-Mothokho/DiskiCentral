"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Fixture } from "@/api/types/fixtures.response";
import type { FixtureEvent } from "@/api/types/events.response";
import type { FixtureTeamStatistics } from "@/api/types/fixtures-statistics.response";
import type { TeamLineup } from "@/api/types/lineups.response";
import type { FixturePlayerStatistics } from "@/api/types/players-statistics.response";
import type { StandingRow } from "@/api/types/standings.response";
import type { Prediction } from "@/api/types/predictions.response";
import type { LiveGameSnapshot } from "@/api/live";
import { MatchHeader } from "./MatchHeader";
import { MatchNavigation, type MatchTab } from "./MatchNavigation";
import { MatchTabContent } from "./MatchTabContent";

export function MatchCentre({
  fixtureId,
  initialFixture,
  initialEvents,
  initialStatistics,
  lineups,
  players,
  meetings,
  standings,
  tableAvailable,
  preMatch,
  upcoming,
  prediction,
  competitionType,
  activeTab,
}: {
  fixtureId: number;
  initialFixture: Fixture;
  initialEvents: FixtureEvent[];
  initialStatistics: FixtureTeamStatistics[];
  lineups: TeamLineup[];
  players: FixturePlayerStatistics[];
  meetings: Fixture[];
  standings: StandingRow[];
  tableAvailable: boolean;
  preMatch: boolean;
  upcoming: boolean;
  prediction: Prediction | null;
  competitionType?: string;
  activeTab: MatchTab;
}) {
  const router = useRouter();
  const [liveData, setLiveData] = useState<{
    serverFixture: Fixture;
    fixture?: Fixture;
    events?: FixtureEvent[];
    statistics?: FixtureTeamStatistics[];
  } | null>(null);
  const [liveEnded, setLiveEnded] = useState(false);
  const currentLiveData =
    liveData?.serverFixture === initialFixture ? liveData : null;
  const fixture = currentLiveData?.fixture ?? initialFixture;
  const events = currentLiveData?.events ?? initialEvents;
  const statistics = currentLiveData?.statistics ?? initialStatistics;

  useEffect(() => {
    if (!preMatch) return;
    const now = Date.now();
    const kickoff = fixture.fixture.timestamp * 1000;
    const refreshAt =
      upcoming && Number.isFinite(kickoff) && kickoff > now
        ? kickoff + 5_000
        : now + (upcoming ? 60_000 : 5 * 60_000);
    const delay = Math.min(upcoming ? 60_000 : 5 * 60_000, Math.max(1_000, refreshAt - now));
    const timer = setTimeout(() => router.refresh(), delay);
    return () => clearTimeout(timer);
  }, [fixture.fixture.timestamp, preMatch, router, upcoming]);

  const handleSnapshot = useCallback((liveFixture: Fixture) => {
    setLiveData((current) => ({
      serverFixture: initialFixture,
      fixture: liveFixture,
      events: current?.serverFixture === initialFixture ? current.events : undefined,
      statistics:
        current?.serverFixture === initialFixture ? current.statistics : undefined,
    }));
  }, [initialFixture]);

  const handleEnded = useCallback(() => setLiveEnded(true), []);
  const handleSnapshotData = useCallback((snapshot: LiveGameSnapshot) => {
    setLiveData((current) => ({
      serverFixture: initialFixture,
      fixture: current?.serverFixture === initialFixture ? current.fixture : undefined,
      events: snapshot.events,
      statistics: snapshot.statistics,
    }));
  }, [initialFixture]);

  return (
    <main className="page-frame py-8 sm:py-12">
      <MatchHeader
        fixtureId={fixtureId}
        fixture={fixture}
        liveEnded={liveEnded}
        onSnapshot={handleSnapshot}
        onSnapshotData={handleSnapshotData}
        onEnded={handleEnded}
      />
      <div className="mt-5">
        <MatchNavigation
          fixtureId={fixtureId}
          active={activeTab}
          tableAvailable={tableAvailable}
          preMatch={preMatch}
          predictionsAvailable={upcoming}
        />
      </div>
      <div className="mt-8">
        <MatchTabContent
          activeTab={activeTab}
          fixture={fixture}
          events={events}
          statistics={statistics}
          lineups={lineups}
          players={players}
          meetings={meetings}
          standings={standings}
          tableAvailable={tableAvailable}
          preMatch={preMatch}
          predictionsAvailable={upcoming}
          prediction={prediction}
          competitionType={competitionType}
        />
      </div>
    </main>
  );
}
