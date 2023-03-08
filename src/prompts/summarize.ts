export default {
  description: "Outputs a short summary of the text.",
  createPrompt(input: string) {
    return `Give me a short summary of this text: ${input}.\n###\n`;
  },
};
