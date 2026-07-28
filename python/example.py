"""
NumroQ API — Python example.

Website: https://numroq.com
Docs:    https://numroq.com/docs
Free key: https://dev.numroq.com  (Developer portal -> My API Keys)

Run:
    export NUMROQ_API_KEY="your_key_here"
    python example.py
"""
import os
import urllib.request
import json

BASE_URL = "https://numroq-api-production.up.railway.app/api/v1"
API_KEY = os.environ.get("NUMROQ_API_KEY", "")


def calculate(tool_id, payload):
    """Run any calculator by its tool_id (see GET /plugin/calculators for the list)."""
    req = urllib.request.Request(
        f"{BASE_URL}/calculator/{tool_id}",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json", "X-API-Key": API_KEY},
        method="POST",
    )
    with urllib.request.urlopen(req) as res:
        return json.loads(res.read().decode("utf-8"))


def list_calculators():
    """List every available calculator (public, no key required)."""
    with urllib.request.urlopen(f"{BASE_URL}/plugin/calculators") as res:
        return json.loads(res.read().decode("utf-8"))


if __name__ == "__main__":
    if not API_KEY:
        raise SystemExit("Set NUMROQ_API_KEY first (free key at https://dev.numroq.com)")

    # 1) Life Path number from a birth date
    print(json.dumps(calculate("life_path_calculator", {"birth_date": "1990-05-15"}), indent=2))

    # 2) Full numerology report from a name + birth date
    print(json.dumps(calculate("numerology_report", {
        "text": "John Michael Smith",
        "birth_date": "1990-05-15",
    }), indent=2))

    # 3) Abjad value of an Arabic name
    print(json.dumps(calculate("abjad", {"text": "محمد"}), indent=2))
