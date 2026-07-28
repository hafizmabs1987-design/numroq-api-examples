#!/usr/bin/env bash
#
# NumroQ API — cURL examples.
#
# Website: https://numroq.com
# Docs:    https://numroq.com/docs
# Free key: https://dev.numroq.com  (Developer portal -> My API Keys)
#
# Run:
#   export NUMROQ_API_KEY="your_key_here"
#   bash examples.sh
set -euo pipefail

BASE_URL="https://numroq-api-production.up.railway.app/api/v1"
: "${NUMROQ_API_KEY:?Set NUMROQ_API_KEY first (free key at https://dev.numroq.com)}"

echo "== List all calculators (no key needed) =="
curl -s "$BASE_URL/plugin/calculators" | head -c 400; echo; echo

echo "== Life Path number =="
curl -s -X POST "$BASE_URL/calculator/life_path_calculator" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $NUMROQ_API_KEY" \
  -d '{"birth_date": "1990-05-15"}'; echo; echo

echo "== Full Numerology Report =="
curl -s -X POST "$BASE_URL/calculator/numerology_report" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $NUMROQ_API_KEY" \
  -d '{"text": "John Michael Smith", "birth_date": "1990-05-15"}'; echo; echo

echo "== Abjad (Arabic numerology) =="
curl -s -X POST "$BASE_URL/calculator/abjad" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $NUMROQ_API_KEY" \
  -d '{"text": "محمد"}'; echo
