import { executePrompt, executePromptStream } from "./executePrompt.js";
import { loadConfig } from "./config.js";
import { loadPromptConfig } from "./loadPromptConfig.js";
import { APPNAME } from "./types.js";
import FileSystemKVS from "./kvs/kvs-filesystem.js";
import { AppError } from "./errors.js";
import { readFileSync } from "node:fs";

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

function getInput(argvInput: string) {
  try {
    const stdinInput = readFileSync(process.stdin.fd, "utf-8");
    // console.log({ stdinInput });
    return `${argvInput} ${stdinInput}`;
  } catch (err) {
    return argvInput;
  }
}

export async function cli() {
  try {
    const { promptId, input: argvInput } = parseArgs(process.argv);
    const input = getInput(argvInput);
    if (!promptId || !input) {
      printUsageAndExit();
    }
    const config = loadConfig();
    const promptConfig = await loadPromptConfig(promptId, config);
    const cache = config.useCache
      ? new FileSystemKVS({ baseDir: config.paths.cache })
      : undefined;
    const stream = executePromptStream(promptConfig, input, config, cache);
    for await (const chunk of stream) {
      process.stdout.write(chunk);
    }
    process.stdout.write("\n");
  } catch (err) {
    if (err instanceof AppError) {
      console.error(err.toString());
      process.exit(err.exitCode);
    }
    console.error(err);
    process.exit(1);
  }
}

export default cli;
