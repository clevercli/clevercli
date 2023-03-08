export default {
  description:
    "Outputs recipe suggestions given a list of available ingredients.",
  createPrompt(input: string) {
    return `Give me some recipe suggestions knowing that I have the following ingredients available: ${input}.\n###\n`;
  },
};
