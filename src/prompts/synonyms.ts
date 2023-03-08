export default {
  description: "List synonyms for the input words",
  createPrompt(input: string) {
    return `Ouput a comma separated list of synonyms for: ${input}.\n###\n`;
  },
};
