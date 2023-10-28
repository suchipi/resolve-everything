export type ReportedError = {
  filename?: string;
  request?: string;
  stage: "read" | "parse" | "getRequests" | "resolve";
  error: Error;
};

// This is intentionally the same type as in kame so resolvers written for kame can be used:
// https://github.com/suchipi/kame/blob/ae317caf325d5cbe4925fe30273159b6c04651a6/src/default-resolver.ts#L10
export type ResolverFunction = (id: string, fromFilePath: string) => string;
