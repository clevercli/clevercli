import { Config } from "./types.js";
import { join as pathJoin } from "node:path";
import { AppError } from "./errors.js";
import { fileURLToPath } from "node:url";
import { dirname, parse } from "node:path";
import { readdir } from "node:fs/promises";

async function readFilesInDirectory(path: string) {
  const files = await readdir(path);
  return files
    .filter((f) => f.endsWith(".js") || f.endsWith(".mjs") || f.endsWith(".ts"))
    .map((filename) => pathJoin(path, filename));
}

// Returns a path relative to import.meta.filename
export function sourceRelativePath(
  meta: { url: string },
  ...relPaths: string[]
) {
  const __dirname = dirname(fileURLToPath(meta.url));
  return pathJoin(__dirname, ...relPaths);
}

export async function loadFromPath(path: string) {
  const promptConfig = await import(path);
  // TODO: validate promptConfig?
  return promptConfig.default;
}

export async function loadPromptConfig(promptId: string, config: Config) {
  try {
    const promptConfig = await Promise.any([
      loadFromPath(sourceRelativePath(import.meta, `./prompts/${promptId}.js`)),
      loadFromPath(pathJoin(config.paths.data, `${promptId}.mjs`)),
    ]);
    return promptConfig;
  } catch (err) {
    throw new AppError({
      message: `Could not find prompt ${promptId}. Are you sure it is a builtin prompt or that ${config.paths.data}/${promptId}.mjs exists?`,
    });
  }
}

export async function listPrompts(config: Config) {
  const [localFiles, builtinFiles] = await Promise.all(
    [
      sourceRelativePath(import.meta, `./prompts`),
      pathJoin(config.paths.data),
    ].map(readFilesInDirectory)
  );
  const allFiles = [...localFiles, ...builtinFiles];
  const allPromptConfigs = await Promise.all(allFiles.map(loadFromPath));

  return allPromptConfigs.map((config, i) => {
    const name = parse(allFiles[i]).name;
    return {
      name,
      description: config.description,
    };
  });
}
