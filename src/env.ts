export function getEnvOrThrow(envName: string): string {
  const env = Deno.env.get(envName);

  if (!env) {
    throw new Error("Unable to read GMAIL_PASSWORD from env!");
  }

  return env;
}
