import { Config } from "./types.js";

export async function loadPromptConfig(promptId: string, config: Config) {
  // console.log(config.paths);
  const promptConfig = await import(`./prompts/${promptId}.js`);
  // TODO: validate promptConfig?
  return promptConfig.default;
}
