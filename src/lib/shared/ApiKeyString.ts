export type ApiKeyString = `xcak_${string & { length: 40 }}`;

export const isApiKeyString = (s: unknown): s is ApiKeyString =>
  typeof s === "string" && s.match(/^(xcak_[0-9a-f]{40})$/) !== null;
