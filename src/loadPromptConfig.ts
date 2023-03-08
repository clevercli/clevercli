import { Config } from "./types.js";
import { join as pathJoin } from "node:path";
import { AppError } from "./errors.js";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// Returns a path relative to import.meta.filename
export function sourceRelativePath(
  meta: { url: string },
  ...relPaths: string[]
) {
  const __dirname = dirname(fileURLToPath(meta.url));
  return pathJoin(__dirname, ...relPaths);
}

export async function loadFromBaseDir(path: string) {
  const promptConfig = require(path);
  // TODO: validate promptConfig?
  if (promptConfig.default) {
    return promptConfig.default;
  }
  return promptConfig;
}

export async function loadPromptConfig(promptId: string, config: Config) {
  try {
    const promptConfig = await Promise.any([
      loadFromBaseDir(pathJoin(__dirname, `./prompts/${promptId}.js`)),
      loadFromBaseDir(pathJoin(config.paths.data, `${promptId}.mjs`)),
      loadFromBaseDir(pathJoin(config.paths.data, `${promptId}.js`)),
    ]);
    return promptConfig;
  } catch (err) {
    if (err instanceof Error) {
      throw new AppError({
        message: `Could not find prompt ${promptId}. Are you sure it is a builtin prompt or that ${config.paths.data}/${promptId}.mjs exists?`,
        cause: err,
      });
    }
    throw err;
  }
}
