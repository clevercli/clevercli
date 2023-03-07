import { Model, ModelType } from "./types.js";

export const GPT_3_5Turbo: Model = {
  id: "gpt-3.5-turbo",
  type: ModelType.Chat,
  maxTokens: 4096,
};

const allModels = [GPT_3_5Turbo];

const modelsById: Map<string, Model> = new Map(
  allModels.reduce((acc: [string, Model][], ele: Model): [string, Model][] => {
    return [...acc, [ele.id, ele]];
  }, [])
);

export const defaultModel = GPT_3_5Turbo;

export default modelsById;
