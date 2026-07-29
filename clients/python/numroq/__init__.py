"""Tiny, zero-dependency client for the NumroQ API.

208+ numerology, astrology and Abjad calculators behind one REST endpoint.

Docs: https://numroq.com/docs
Free key: https://dev.numroq.com
"""
import json
import urllib.request
import urllib.error

__version__ = "1.0.0"
__all__ = ["NumroQ", "NumroQError"]

DEFAULT_BASE = "https://numroq-api-production.up.railway.app/api/v1"


class NumroQError(Exception):
    """Raised when the NumroQ API returns a non-2xx response."""


class NumroQ:
    def __init__(self, api_key, base_url=DEFAULT_BASE):
        if not api_key:
            raise ValueError(
                "NumroQ: an API key is required (free key at https://dev.numroq.com)"
            )
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")

    def _request(self, path, method="GET", payload=None):
        data = json.dumps(payload).encode("utf-8") if payload is not None else None
        headers = {"Content-Type": "application/json"}
        if payload is not None:
            headers["X-API-Key"] = self.api_key
        req = urllib.request.Request(
            f"{self.base_url}{path}", data=data, headers=headers, method=method
        )
        try:
            with urllib.request.urlopen(req) as res:
                return json.loads(res.read().decode("utf-8"))
        except urllib.error.HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace")
            raise NumroQError(f"NumroQ {exc.code}: {body}") from None

    def calculate(self, tool_id, payload=None):
        """Run any calculator by its tool_id (see calculators() for the list)."""
        return self._request(f"/calculator/{tool_id}", "POST", payload or {})

    def calculators(self):
        """List every available calculator (public, no key needed)."""
        return self._request("/plugin/calculators")

    # Convenience helpers for the most common calculators.
    def life_path(self, birth_date):
        return self.calculate("life_path_calculator", {"birth_date": birth_date})

    def numerology_report(self, name, birth_date):
        return self.calculate(
            "numerology_report", {"text": name, "birth_date": birth_date}
        )

    def abjad(self, text):
        return self.calculate("abjad", {"text": text})
