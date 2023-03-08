import { PromptConfiguration } from "../types.js";

const promptConfiguration: PromptConfiguration = {
  description: "Converts source file to TypeScript",
  createPrompt(input: string) {
    return `Rewrite this file in TypeScript. Only output valid code, no comments. ${input}\n\n`;
  },
};

export default promptConfiguration;
