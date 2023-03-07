import { ConfigError } from "./errors";
import { Config } from "./types";

function getEnvOrThrow(key: string) {
  const val = process.env[key];
  if (typeof val === "undefined") {
    throw new ConfigError({
      message: `Please set the ${key} environment variable.`,
    });
  }
  return val;
}

export function loadConfig(): Config {
  return {
    openai: {
      apiKey: getEnvOrThrow("OPENAI_API_KEY"),
    },
  };
}
