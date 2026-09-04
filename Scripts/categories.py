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


def create_categories(categories):
    for name, colour in categories:
        payload = {
            "name": name,
            "slug": slugify(name),
            "colour": colour,
        }

        response = requests.post(
            f"{BASE_URL}/Categories",
            headers=HEADERS,
            json=payload,
            timeout=30,
        )

        if response.ok:
            print(f"✓ Category created: {name}")
        else:
            print(
                f"✗ Failed: {name} "
                f"[{response.status_code}] {response.text}"
            )


categories = [
    ("News", "#E11D48"),
    ("Transfers", "#2563EB"),
    ("Match Reports", "#16A34A"),
    ("Previews", "#9333EA"),
    ("Analysis", "#EA580C"),
    ("Features", "#0891B2"),
    ("Interviews", "#7C3AED"),
    ("Opinion", "#DB2777"),
    ("National Teams", "#15803D"),
    ("African Football", "#CA8A04"),
    ("International Football", "#4F46E5"),
    ("South African Football", "#DC2626"),
    ("Players Abroad", "#0F766E"),
]


if __name__ == "__main__":
    print("=== Creating Categories ===")
    create_categories(categories)
    print("\nDone.")