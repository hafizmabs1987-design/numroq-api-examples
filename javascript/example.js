/*
 * NumroQ API — JavaScript (Node 18+) example.
 *
 * Website: https://numroq.com
 * Docs:    https://numroq.com/docs
 * Free key: https://dev.numroq.com  (Developer portal -> My API Keys)
 *
 * Run:
 *   export NUMROQ_API_KEY="your_key_here"
 *   node example.js
 */
const BASE_URL = "https://numroq-api-production.up.railway.app/api/v1";
const API_KEY = process.env.NUMROQ_API_KEY || "";

// Run any calculator by its tool_id (see GET /plugin/calculators for the list).
async function calculate(toolId, payload) {
  const res = await fetch(`${BASE_URL}/calculator/${toolId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-Key": API_KEY },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// List every available calculator (public, no key required).
async function listCalculators() {
  const res = await fetch(`${BASE_URL}/plugin/calculators`);
  return res.json();
}

(async () => {
  if (!API_KEY) {
    console.error("Set NUMROQ_API_KEY first (free key at https://dev.numroq.com)");
    process.exit(1);
  }

  // 1) Life Path number from a birth date
  console.log(await calculate("life_path_calculator", { birth_date: "1990-05-15" }));

  // 2) Full numerology report from a name + birth date
  console.log(await calculate("numerology_report", {
    text: "John Michael Smith",
    birth_date: "1990-05-15",
  }));

  // 3) Abjad value of an Arabic name
  console.log(await calculate("abjad", { text: "محمد" }));
})();
