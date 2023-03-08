import { ConfigError } from "./errors.js";
import { APPNAME, Config } from "./types.js";
import envPaths from "env-paths";
import { homedir } from "node:os";
import { join as pathJoin } from "node:path";
import createDebug from "debug";

const debug = createDebug(`${APPNAME}:config`);

function getEnvOrThrow(key: string) {
  const val = process.env[key];
  if (typeof val === "undefined") {
    throw new ConfigError({
      message: `Please set the ${key} environment variable.`,
    });
  }
  return val;
}

const paths = envPaths(APPNAME, { suffix: "" });

export function loadConfig(): Config {
  const config = {
    openai: {
      apiKey: getEnvOrThrow("OPENAI_API_KEY"),
    },
    paths: {
      data: pathJoin(homedir(), `.${APPNAME}`),
      cache: paths.cache,
    },
    useCache: true,
  };
  debug(config);
  return config;
}
