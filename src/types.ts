export const APPNAME = "clevercli";

export interface ParsedResponse {
  message: string;
  meta?: object;
}

export enum ModelType {
  Chat,
  Completion,
}

export interface Model {
  id: string;
  type: ModelType;
  maxTokens: number;
}

export interface PromptConfiguration {
  createPrompt(input: string): string;
  parseResponse?(response: string, input: string): ParsedResponse;
  model?: string;
}

export interface Config {
  openai: {
    apiKey: string;
  };
  useCache: boolean;
  paths: {
    data: string;
    config: string;
    cache: string;
    log: string;
    temp: string;
  };
}
