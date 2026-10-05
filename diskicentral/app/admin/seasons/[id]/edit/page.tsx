"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SeasonForm from "@/app/admin/seasons/SeasonForm";
import { FormSkeleton } from "@/components/admin/Skeletons";
import { SeasonsService } from "@/services/SeasonService";
import type { Season } from "@/types/season";

const seasonsService = new SeasonsService();

export default function EditSeasonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [season, setSeason] = useState<Season | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    void params.then(({ id }) =>
      seasonsService
        .getSeasonById(id)
        .then((response) => setSeason(response.data))
        .catch(() => setError("This season could not be loaded.")),
    );
  }, [params]);

  if (error) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-300">{error}</p>
        <Link
          href="/admin/seasons"
          className="text-sm text-[#00C853] hover:underline">
          Back to seasons
        </Link>
      </div>
    );
  }
  if (!season) return <FormSkeleton />;
  return <SeasonForm season={season} />;
}
