export interface ParsedResponse {
  message: string,
  meta?: object
}

export enum ModelType {
  Chat,
  Completion
}

export interface Model {
  id: string,
  type: ModelType,
  maxTokens: number
}

export interface PromptConfiguration {
  createPrompt(input: string): string;
  parseResponse?(input: string, response: string): ParsedResponse;
  model?: string;
}

export interface Config {
  openai: {
    apiKey: string
  }
}
