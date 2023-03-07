import { executePrompt } from "./executePrompt.js";
import { loadConfig } from "./config.js"
import { ConfigError } from "./errors.js";

function getEnvOrThrow() {
  
}

async function loadPromptConfig(promptId: string) {
  const promptConfig = await import(`./prompts/${promptId}.js`)
  // TODO: validate promptConfig?
  return promptConfig.default;
}

function parseArgs(argv: string[]) {
  const [_nodeBin, _jsFile, promptId, ...rest] = argv;
  const input = rest.join(" ");
  return { promptId, input }
}

function printUsageAndExit() {
  console.log("Usage: aicli <promptType> <input>")
  console.log("")
  console.log("Example: ");
  console.log("")
  console.log(`$ aicli eli5 "what are large language models?"`);
  process.exit(1);
}

export async function cli() {
  const { promptId, input } = parseArgs(process.argv);
  if (!promptId || !input) {
    printUsageAndExit();
  }
  const config = loadConfig();
  const promptConfig = await loadPromptConfig(promptId);
  const { message } = await executePrompt(promptConfig, input, config);
  console.log(message);
}

export default cli;
