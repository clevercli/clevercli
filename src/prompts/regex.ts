import { PromptConfiguration } from "../types.js";

const promptConfiguration: PromptConfiguration = {
  description:
    "Gives a JavaScript compatible RegEx that matches the input examples.",
  createPrompt(input: string) {
    return `Output a JavaScript regex that matches the following examples: ${input}.\n###\n`;
  },
};

export default promptConfiguration;
