# numroq

Tiny, zero-dependency client for the [NumroQ API](https://numroq.com/docs): 208+ numerology, astrology and Abjad calculators behind one REST endpoint.

- Docs and full tool reference: https://numroq.com/docs
- Get a free API key: https://dev.numroq.com

## Install

```bash
pip install numroq
```

## Usage

```python
import os
from numroq import NumroQ

nq = NumroQ(os.environ["NUMROQ_API_KEY"])

# Life Path number from a birth date
print(nq.life_path("1990-05-15"))

# Full numerology report from a name + birth date
print(nq.numerology_report("John Michael Smith", "1990-05-15"))

# Abjad value of an Arabic name
print(nq.abjad("محمد"))

# Any calculator by its tool_id
print(nq.calculate("matrix_of_destiny", {"birth_date": "1990-05-15"}))

# List every available calculator (no key needed)
print(nq.calculators())
```

Pure standard library, no dependencies. Keep your API key on the server, not in the browser.

## License

MIT
