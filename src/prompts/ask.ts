import { ParsedResponse, PromptConfiguration } from "../types.js";

const promptConfiguration: PromptConfiguration = {
  description: "Just passes through the input directly to ChatGPT.",
  createPrompt(input: string) {
    return input;
  },
  parseResponse(response: string, _input: string): ParsedResponse {
    return { message: response };
  },
};

export default promptConfiguration;
