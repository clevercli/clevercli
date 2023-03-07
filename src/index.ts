import { executePrompt } from "./executePrompt.js";
import { loadConfig } from "./config.js";
import { loadPromptConfig } from "./loadPromptConfig.js";
import { APPNAME } from "./types.js";

function parseArgs(argv: string[]) {
  const [_nodeBin, _jsFile, promptId, ...rest] = argv;
  const input = rest.join(" ");
  return { promptId, input };
}

function printUsageAndExit() {
  console.log(`Usage: ${APPNAME} <promptType> <input>`);
  console.log("");
  console.log("Example: ");
  console.log("");
  console.log(`$ ${APPNAME} eli5 "what are large language models?"`);
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
