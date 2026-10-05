"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FixtureForm from "@/app/admin/fixtures/FixtureForm";
import { FormSkeleton } from "@/components/admin/Skeletons";
import { FixturesService } from "@/services/FixtureService";
import type { Fixture } from "@/types/fixture";

export default function EditFixturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [fixture, setFixture] = useState<Fixture | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    void params.then(({ id }) =>
      FixturesService.getFixtureById(id)
        .then((response) => setFixture(response.data))
        .catch(() => setError("This fixture could not be loaded.")),
    );
  }, [params]);

  if (error) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-300">{error}</p>
        <Link
          href="/admin/fixtures"
          className="text-sm text-[#00C853] hover:underline">
          Back to fixtures
        </Link>
      </div>
    );
  }
  if (!fixture) return <FormSkeleton />;
  return <FixtureForm fixture={fixture} />;
}
