import { PromptConfiguration } from "../types.js";

const promptConfiguration: PromptConfiguration = {
  description: "Asks ChatGPT to refactor code in a file.",
  createPrompt(input: string) {
    return `Help me refactor this code (only output code and comments): ${input}.\n###\n`;
  },
};

export default promptConfiguration;
