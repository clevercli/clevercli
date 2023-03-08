export default {
  createPrompt(input: string) {
    return `Give me some recipe suggestions knowing that I have the following ingredients available: ${input}.\n###\n`;
  },
};
