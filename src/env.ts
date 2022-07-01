export function getEnvOrThrow(envName: string): string {
  const env = Deno.env.get(envName);

  if (!env) {
    throw new Error("Unable to read ${envName} from env!");
  }

  return env;
}
