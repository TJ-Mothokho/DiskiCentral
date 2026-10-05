"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CompetitionForm from "@/app/admin/competitions/CompetitionForm";
import { FormSkeleton } from "@/components/admin/Skeletons";
import { CompetitionsService } from "@/services/CompetitionService";
import type { Competition } from "@/types/competition";

const competitionsService = new CompetitionsService();

export default function EditCompetitionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    void params.then(({ id }) =>
      competitionsService
        .getCompetitionById(id)
        .then((response) => setCompetition(response.data))
        .catch(() => setError("This competition could not be loaded.")),
    );
  }, [params]);

  if (error) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-300">{error}</p>
        <Link
          href="/admin/competitions"
          className="text-sm text-[#00C853] hover:underline">
          Back to competitions
        </Link>
      </div>
    );
  }
  if (!competition) return <FormSkeleton />;
  return <CompetitionForm competition={competition} />;
}
