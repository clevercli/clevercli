export async function loadPromptConfig(promptId: string) {
  const promptConfig = await import(`./prompts/${promptId}.js`);
  // TODO: validate promptConfig?
  return promptConfig.default;
}
