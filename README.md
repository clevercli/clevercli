# clevercli

clevercli is a CLI that queries OpenAI models (e.g. ChatGPT). New prompt types can easily be added and there is a growing list of community maintained prompts.

```console
npm install -g @clevercli/cli
```

## Usage

```console
clevercli <prompt_type> <prompt>
```

## Example

```console
clevercli eli5 "why is the sky blue?"
```

## Adding a prompt

1. Fork the repository.

2. Create a new prompt configuration in [./src/prompts/](./src/prompts/). You can use the [eli5](./src/prompts/eli5.ts) prompt configuration as a base.

3. Send a pull request!

Here's a sample prompt configuration:

```typescript
import { ParsedResponse, PromptConfiguration } from "../types.js";

const promptConfiguration: PromptConfiguration = {
  createPrompt(input: string) {
    return `Provide a very detailed explanation but like I am 5 years old (ELI5) on this topic: ${input}.\n###\n`;
  },
  parseResponse(response: string): ParsedResponse {
    return { message: response };
  },
};

export default promptConfiguration;
```

## Cache

Query results are cached on your filesystem's cache directory.

## TODO

- Streaming API.
- Support older Node.js vesions?
