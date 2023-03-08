export default {
  description: "Asks ChatGPT to write a small poem on the topic.",
  createPrompt(input: string) {
    return `Write a small poem about: ${input}.\n###\n`;
  },
};
