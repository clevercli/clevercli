import { Config, Model } from "./types.js";
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";

// https://2ality.com/2018/04/async-iter-nodejs.html#generator-%231%3A-from-chunks-to-lines
async function* chunksToLines(chunksAsync: AsyncGenerator<string>) {
  let previous = "";
  for await (const chunk of chunksAsync) {
    const bufferChunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    previous += bufferChunk;
    let eolIndex;
    while ((eolIndex = previous.indexOf("\n")) >= 0) {
      // line includes the EOL
      const line = previous.slice(0, eolIndex + 1).trimEnd();
      if (line === "data: [DONE]") break;
      if (line.startsWith("data: ")) {
        yield line.slice("data: ".length);
      }
      previous = previous.slice(eolIndex + 1);
    }
  }
}

// Wraps openai and provides streaming API + auto selection of api function based on model
export async function* openAIQuery(
  model: Model,
  prompt: string,
  config: Config
): AsyncGenerator<string> {
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: config.openai.apiKey,
    })
  );
  // TODO: select right api route/function based on model
  const opts = {
    stream: true,
    model: model.id,
    messages: [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: prompt,
      },
    ],
  };
  const res = await openai.createChatCompletion(opts, {
    responseType: "stream",
  });
  /* @ts-ignore */
  const stream = res.data as IncomingMessage;
  for await (const chunk of chunksToLines(stream)) {
    const data = JSON.parse(chunk);
    const content = data.choices[0].delta.content;
    // console.log({ json });
    if (content) {
      yield content;
    }
  }
}
