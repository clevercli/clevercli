import { ParsedResponse, PromptConfiguration } from "../types.js";

const promptConfiguration: PromptConfiguration = {
  createPrompt(input: string) {
    return input;
  },
  parseResponse(response: string, _input: string): ParsedResponse {
    return { message: response };
  },
};

export default promptConfiguration;
