import { ConfigError } from "./errors.js";
import { APPNAME, Config } from "./types.js";
import envPaths from "env-paths";

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
    paths: envPaths(APPNAME, { suffix: "" }),
    useCache: true,
  };
}
