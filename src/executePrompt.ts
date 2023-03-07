import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration as OpenAIConfiguration,
  OpenAIApi,
} from "openai";
import models, { defaultModel } from "./openaiModels.js";
import { ApiError, AppError } from "./errors.js";
import { Config, ParsedResponse, PromptConfiguration } from "./types.js";
import KeyValueStore from "./kvs/abstract.js";

function defaultParseResponse(content: string, _input: string): ParsedResponse {
  return { message: content };
}

export async function executePrompt(
  promptConfig: PromptConfiguration,
  input: string,
  config: Config,
  cache?: KeyValueStore<string, string>
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

  const response = await (async () => {
    const cacheKey = `${model.id}-${formattedPrompt}`;
    if (cache) {
      const cachedValue = await cache.get(cacheKey);
      if (cachedValue) {
        return JSON.parse(cachedValue);
      }
    }
    const opts = {
      model: model.id,
      messages: [
        {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content: formattedPrompt,
        },
      ],
    };
    const completion = await openai.createChatCompletion(opts);
    const choices = completion.data.choices;
    const content = choices[0].message?.content;
    if (!content) {
      throw new ApiError({ message: "No content returned by API." });
    }
    const parseResponse = promptConfig.parseResponse ?? defaultParseResponse;
    const response = parseResponse(content, input);
    if (cache) {
      await cache.set(cacheKey, JSON.stringify(response));
    }
    return response;
  })();
  return response;
}

export default executePrompt;
