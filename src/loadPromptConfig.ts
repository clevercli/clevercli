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

export async function loadFromBaseDir(promptId: string, path: string) {
  const promptConfig = await import(path);
  // TODO: validate promptConfig?
  return promptConfig.default;
}

export async function loadPromptConfig(promptId: string, config: Config) {
  try {
    const promptConfig = await Promise.any([
      loadFromBaseDir(
        promptId,
        sourceRelativePath(import.meta, `./prompts/${promptId}.js`)
      ),
      loadFromBaseDir(promptId, pathJoin(config.paths.data, `${promptId}.mjs`)),
    ]);
    return promptConfig;
  } catch (err) {
    throw new AppError({
      message: `Could not find prompt ${promptId}. Are you sure it is a builtin prompt or that ${config.paths.data}/${promptId}.mjs exists?`,
    });
  }
}
