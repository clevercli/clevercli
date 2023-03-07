import { Configuration as OpenAIConfiguration, OpenAIApi } from "openai";
import models, { defaultModel } from "./openaiModels.js";
import { ApiError, AppError } from "./errors.js";
import { Config, ParsedResponse, PromptConfiguration } from "./types.js";

export async function executePrompt(
  promptConfig: PromptConfiguration,
  input: string,
  config: Config
): Promise<ParsedResponse> {
  const model = promptConfig.model
    ? models.get(promptConfig.model)
    : defaultModel;
  if (!model) {
    throw new AppError({
      message: `Could not find model "${promptConfig.model}"`,
    });
  }

  const formattedPrompt = promptConfig.createPrompt(input);

  const openai = new OpenAIApi(
    new OpenAIConfiguration({
      apiKey: config.openai.apiKey,
    })
  );

  const completion = await openai.createChatCompletion({
    model: model.id,
    messages: [{ role: "system", content: formattedPrompt }],
  });
  const choices = completion.data.choices;
  const content = choices[0].message?.content;
  if (!content) {
    throw new ApiError({ message: "No content returned by API." });
  }
  if (typeof promptConfig.parseResponse === "function") {
    return promptConfig.parseResponse(content, input);
  }
  return { message: content };
}

export default executePrompt;
