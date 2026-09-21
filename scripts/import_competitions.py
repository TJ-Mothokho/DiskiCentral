#!/usr/bin/env python3
"""Import competitions from a leagues JSON file through the Competitions API.

The script is intentionally dry-run by default. Use --execute to send POST
requests to the API.
"""

from __future__ import annotations

import argparse
import asyncio
import json
import re
from pathlib import Path
from typing import Any

import httpx

API_URL = (
    "https://diskicentraldevapi-cuata7bvf7e4bsgk."
    "southafricanorth-01.azurewebsites.net/api/Competitions"
)


def slugify(name: str) -> str:
    """Lowercase a name and normalize spaces around existing hyphens."""
    return re.sub(r"\s*-\s*|\s+", "-", name.strip()).lower()


def build_payload(league: dict[str, Any]) -> dict[str, str]:
    """Build one form-urlencoded API payload from one JSON league record."""
    api_id = league["Id"]
    name = league["name"]

    # Group stage = 0, knockout = 1; unspecified competition format = 0.
    name_lower = name.lower()
    if "knockout" in name_lower:
        competition_format = "1"
    else:
        competition_format = "0"

    return {
        "Name": name,
        "Slug": slugify(name),
        "ApiId": str(api_id),
        "ShortName": name,
        "Country": league["country"],
        "Logo": f"https://media.api-sports.io/football/leagues/{api_id}.png",
        "Season": "",
        "Format": competition_format,
        "Colour": "",
    }


def load_leagues(path: Path) -> list[dict[str, Any]]:
    """Load and minimally validate the source JSON."""
    with path.open("r", encoding="utf-8") as source:
        leagues = json.load(source)

    if not isinstance(leagues, list):
        raise ValueError("The input JSON must contain a list of league records.")

    required_keys = {"Id", "name", "country"}
    for index, league in enumerate(leagues, start=1):
        if not isinstance(league, dict):
            raise ValueError(f"Record {index} is not a JSON object.")
        missing = required_keys - league.keys()
        if missing:
            raise ValueError(
                f"Record {index} is missing required key(s): {', '.join(sorted(missing))}"
            )

    return leagues


async def post_competition(
    client: httpx.AsyncClient,
    payload: dict[str, str],
    index: int,
    total: int,
) -> None:
    """POST one competition and fail clearly on an unsuccessful response."""
    response = await client.post(API_URL, data=payload)
    response.raise_for_status()
    print(f"[{index}/{total}] Added: {payload['Name']} (HTTP {response.status_code})")


async def import_competitions(input_path: Path, execute: bool) -> None:
    leagues = load_leagues(input_path)
    payloads = [build_payload(league) for league in leagues]

    if not execute:
        print(f"Dry run: {len(payloads)} competition(s) prepared; no requests sent.\n")
        for index, payload in enumerate(payloads, start=1):
            print(f"[{index}/{len(payloads)}] {payload}")
        return

    timeout = httpx.Timeout(30.0, connect=10.0)
    async with httpx.AsyncClient(
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        timeout=timeout,
    ) as client:
        for index, payload in enumerate(payloads, start=1):
            await post_competition(client, payload, index, len(payloads))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "input",
        nargs="?",
        type=Path,
        default=Path("leagues.json"),
        help="Path to the source JSON file (default: leagues.json)",
    )
    parser.add_argument(
        "--execute",
        action="store_true",
        help="Actually POST records. Without this flag, print the generated payloads only.",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    try:
        asyncio.run(import_competitions(args.input, args.execute))
    except (OSError, ValueError, httpx.HTTPError) as error:
        raise SystemExit(f"Import failed: {error}") from error


__all__ = ["build_payload", "import_competitions", "load_leagues"]
