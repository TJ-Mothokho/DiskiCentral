import requests
import re

BASE_URL = "https://diskicentraldevapi-cuata7bvf7e4bsgk.southafricanorth-01.azurewebsites.net/api"

TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjFkZmI3Mi02MmNlLTQ0MDQtODRmMC00NWM4YjkwNmY1ZjciLCJlbWFpbCI6InRzaGlhbW9tb3Rob2tob0BnbWFpbC5jb20iLCJyb2xlIjoiRWRpdG9yIiwianRpIjoiMDkwM2M5ZTE3YWY2NDZkY2I1NjM4ZjM3YTA3NDRmNzQiLCJpc3MiOiJEaXNraUNlbnRyYWwiLCJhdWQiOiJEaXNraUNlbnRyYWwuQXBpIiwiaWF0IjoxNzg4NDM4MDc4LCJleHAiOjE3ODg0NDE2Nzh9.21svriGKYGEeMLopdHjEHXCLVgWr8v1c2n9oOnIi1fs"

HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {TOKEN}",
}


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def create_items(endpoint: str, names: list[str]):
    for name in names:
        payload = {
            "name": name,
            "slug": slugify(name),
        }

        response = requests.post(
            f"{BASE_URL}/{endpoint}",
            headers=HEADERS,
            json=payload,
            timeout=30,
        )

        if response.ok:
            print(f"✓ Created {endpoint[:-1]}: {name}")
        else:
            print(
                f"✗ Failed {endpoint[:-1]}: {name} "
                f"[{response.status_code}] {response.text}"
            )



# ---------------------------------------------------------
# TAGS
# ---------------------------------------------------------

tags = [
    # Domestic football
    "PSL",
    "NFD",
    "Nedbank Cup",
    "MTN8",
    "Carling Knockout",

    # National teams
    "Bafana Bafana",
    "Banyana Banyana",
    "South Africa U20",
    "South Africa U17",

    # African football
    "CAF",
    "AFCON",
    "AFCON U20",
    "AFCON U17",
    "CAF Champions League",
    "CAF Confederation Cup",

    # International football
    "World Cup",
    "World Cup U20",
    "World Cup U17",

    # Editorial / football topics
    "Squad",
    "Qualifiers",
    "Injuries",
    "Coaching",
    "Tactics",
]


if __name__ == "__main__":
    print("\n=== Creating Tags ===")
    create_items("Tags", tags)

    print("\nDone.")