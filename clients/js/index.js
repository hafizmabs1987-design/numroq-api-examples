'use strict';

// Tiny client for the NumroQ API.
// 208+ numerology, astrology and Abjad calculators behind one REST endpoint.
//
// Docs: https://numroq.com/docs
// Free key: https://dev.numroq.com

const DEFAULT_BASE = 'https://numroq-api-production.up.railway.app/api/v1';

class NumroQ {
  constructor(apiKey, options = {}) {
    if (!apiKey) {
      throw new Error('NumroQ: an API key is required (get a free one at https://dev.numroq.com)');
    }
    this.apiKey = apiKey;
    this.baseUrl = (options.baseUrl || DEFAULT_BASE).replace(/\/+$/, '');
    this.fetch = options.fetch || globalThis.fetch;
    if (!this.fetch) {
      throw new Error('NumroQ: no fetch found. Use Node 18+ or pass options.fetch.');
    }
  }

  // Run any calculator by its tool_id (see calculators() for the full list).
  async calculate(toolId, payload = {}) {
    const res = await this.fetch(`${this.baseUrl}/calculator/${toolId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': this.apiKey },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`NumroQ ${res.status}: ${text || res.statusText}`);
    }
    return res.json();
  }

  // List every available calculator (public, no key needed).
  async calculators() {
    const res = await this.fetch(`${this.baseUrl}/plugin/calculators`);
    if (!res.ok) throw new Error(`NumroQ ${res.status}: ${res.statusText}`);
    return res.json();
  }

  // Convenience helpers for the most common calculators.
  lifePath(birthDate) {
    return this.calculate('life_path_calculator', { birth_date: birthDate });
  }
  numerologyReport(name, birthDate) {
    return this.calculate('numerology_report', { text: name, birth_date: birthDate });
  }
  abjad(text) {
    return this.calculate('abjad', { text });
  }
}

module.exports = NumroQ;
module.exports.NumroQ = NumroQ;
module.exports.default = NumroQ;
