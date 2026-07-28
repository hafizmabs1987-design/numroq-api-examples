# NumroQ API — Code Examples

Ready-to-run examples for the **[NumroQ API](https://numroq.com)** — 200+ numerology,
astrology, Abjad and divination calculators behind **one REST endpoint**.

- 🌐 Website: **https://numroq.com**
- 📚 Docs: **https://numroq.com/docs**
- 🔑 Free API key: **https://dev.numroq.com** (Developer portal → My API Keys)
- 📮 Postman collection: [`postman/numroq-api.postman_collection.json`](postman/numroq-api.postman_collection.json)

---

## What is NumroQ?

NumroQ turns a name or a birth date into a numerology / astrology result. One API serves
every tradition: Western, Vedic, Chaldean, Jewish and Greek numerology, Islamic Abjad and
Ism-e-Azam, Western & Vedic astrology, Chinese astrology, the Matrix of Destiny, tarot and
more — plus a full multi-number report.

## Quick start

```
Base URL:  https://numroq-api-production.up.railway.app/api/v1
Auth:      X-API-Key: <your key>   (free key at https://dev.numroq.com)
```

Two endpoints do almost everything:

| Method & path | What it does |
|---|---|
| `GET  /plugin/calculators` | List every calculator and its `tool_id` (no key needed) |
| `POST /calculator/{tool_id}` | Run any calculator (send `X-API-Key`) |

A few popular ones have named shortcuts: `/calculator/abjad`, `/calculator/ismazam`.

### Example: Life Path number

```bash
curl -X POST "https://numroq-api-production.up.railway.app/api/v1/calculator/life_path_calculator" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_KEY" \
  -d '{"birth_date": "1990-05-15"}'
```

### Example: Full Numerology Report

```bash
curl -X POST "https://numroq-api-production.up.railway.app/api/v1/calculator/numerology_report" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_KEY" \
  -d '{"text": "John Michael Smith", "birth_date": "1990-05-15"}'
```

## Run the examples

| Language | File |
|---|---|
| Python | [`python/example.py`](python/example.py) |
| JavaScript (Node) | [`javascript/example.js`](javascript/example.js) |
| cURL | [`curl/examples.sh`](curl/examples.sh) |

Set your key first:

```bash
export NUMROQ_API_KEY="your_key_here"
```

Then, for example:

```bash
python python/example.py          # Python
node javascript/example.js        # Node.js
bash curl/examples.sh             # cURL
```

## Popular tool IDs

| `tool_id` | Calculator |
|---|---|
| `abjad` | Abjad (Arabic numerology) |
| `ismazam` | Ism-e-Azam finder |
| `life_path_calculator` | Western Life Path number |
| `numerology_report` | Full Western numerology report |
| `matrix_of_destiny` | Matrix of Destiny octagram |

Call `GET /plugin/calculators` for the full list of 200+.

## Using it in WordPress?

There's a free official plugin — search "**NumroQ Numerology & Astrology Calculators**"
in your WordPress admin, or see [numroq.com](https://numroq.com).

---

## License

MIT — use these snippets freely. The NumroQ API itself is a hosted service; see
[numroq.com](https://numroq.com) and [numroq.com/docs](https://numroq.com/docs).
