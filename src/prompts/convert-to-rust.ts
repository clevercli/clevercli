import { PromptConfiguration } from "../types.js";

const promptConfiguration: PromptConfiguration = {
  description: "Converts source file to Rust",
  createPrompt(input: string) {
    return `Rewrite this file in Rust. Only output valid code, no comments. ${input}\n\n`;
  },
};

export default promptConfiguration;
