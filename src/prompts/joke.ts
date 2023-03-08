import { PromptConfiguration } from "../types.js";

const promptConfiguration: PromptConfiguration = {
  createPrompt(input: string) {
    return `Tell me a funny joke on this topic: ${input}.\n###\n`;
  },
};

export default promptConfiguration;
