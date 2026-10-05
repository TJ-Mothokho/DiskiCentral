"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import StandingForm from "@/app/admin/standings/StandingForm";
import { FormSkeleton } from "@/components/admin/Skeletons";
import { StandingsService } from "@/services/StandingService";
import type { Standing } from "@/types/standing";

const standingsService = new StandingsService();

export default function EditStandingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [standing, setStanding] = useState<Standing | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    void params.then(({ id }) =>
      standingsService
        .getStandingById(id)
        .then((response) => setStanding(response.data))
        .catch(() => setError("This standing could not be loaded.")),
    );
  }, [params]);

  if (error) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-300">{error}</p>
        <Link
          href="/admin/standings"
          className="text-sm text-[#00C853] hover:underline">
          Back to standings
        </Link>
      </div>
    );
  }
  if (!standing) return <FormSkeleton />;
  return <StandingForm standing={standing} />;
}
