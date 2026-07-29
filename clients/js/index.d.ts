export interface NumroQOptions {
  /** Override the API base URL. Defaults to the NumroQ production endpoint. */
  baseUrl?: string;
  /** Provide a fetch implementation (defaults to global fetch, Node 18+). */
  fetch?: typeof fetch;
}

/**
 * Tiny client for the NumroQ API.
 * 208+ numerology, astrology and Abjad calculators behind one REST endpoint.
 *
 * Docs: https://numroq.com/docs — Free key: https://dev.numroq.com
 */
export declare class NumroQ {
  constructor(apiKey: string, options?: NumroQOptions);
  /** Run any calculator by its tool_id. */
  calculate(toolId: string, payload?: Record<string, unknown>): Promise<any>;
  /** List every available calculator (public, no key needed). */
  calculators(): Promise<any>;
  /** Life Path number from a birth date (YYYY-MM-DD). */
  lifePath(birthDate: string): Promise<any>;
  /** Full numerology report from a name and a birth date. */
  numerologyReport(name: string, birthDate: string): Promise<any>;
  /** Abjad (Arabic letter numerology) value of a name. */
  abjad(text: string): Promise<any>;
}

export default NumroQ;
