# numroq

Tiny, zero-dependency client for the [NumroQ API](https://numroq.com/docs): 208+ numerology, astrology and Abjad calculators behind one REST endpoint.

- Docs and full tool reference: https://numroq.com/docs
- Get a free API key: https://dev.numroq.com

## Install

```bash
npm install numroq
```

## Usage

```js
const NumroQ = require("numroq");

const nq = new NumroQ(process.env.NUMROQ_API_KEY);

// Life Path number from a birth date
console.log(await nq.lifePath("1990-05-15"));

// Full numerology report from a name + birth date
console.log(await nq.numerologyReport("John Michael Smith", "1990-05-15"));

// Abjad value of an Arabic name
console.log(await nq.abjad("محمد"));

// Any calculator by its tool_id
console.log(await nq.calculate("matrix_of_destiny", { birth_date: "1990-05-15" }));

// List every available calculator (no key needed)
console.log(await nq.calculators());
```

Requires Node 18+ (uses the global `fetch`). Keep your API key on the server, not in the browser.

## License

MIT
