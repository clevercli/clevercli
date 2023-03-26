import { PromptConfiguration } from "../types.js";

const promptConfiguration: PromptConfiguration = {
  description: "Adds JSDoc comments to exported functions.",
  createPrompt(input: string) {
    return `Add JSDoc comments to exported functions. Don't include types if they are already specified in TypeScript.\n\n${input}`;
  },
};

export default promptConfiguration;
