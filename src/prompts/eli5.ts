import { ParsedResponse, PromptConfiguration } from "../types.js";

const promptConfiguration: PromptConfiguration = {
  description: "Explain Me Like I'm 5",
  createPrompt(input: string) {
    return `Provide a very detailed explanation but like I am 5 years old (ELI5) on this topic: ${input}.\n###\n`;
  },
  parseResponse(response: string, _input: string): ParsedResponse {
    return { message: response };
  },
};

export default promptConfiguration;
