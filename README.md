# clevercli

clevercli is a CLI that queries OpenAI models (e.g. ChatGPT). New prompt types can easily be added and there is a growing list of community maintained prompts.

```console
$ npm install -g @clevercli/cli
```

## Usage

```console
$ clevercli <prompt_type> <prompt>
```

## Example

```console
$ clevercli joke "banana"
Why did the banana go to the doctor? Because it wasn't peeling well!
```

## Built-in prompts

- eli5: Explain Me Like I'm 5
- joke: tells a joke about the topic

See [./src/prompts/](./src/prompts) for the list of available prompts.

## Adding a prompt

Create a file `~/.clevercli/<prompt name>.mjs` which returns an object that follows the `PromptConfiguration` interface.

```typescript
export interface PromptConfiguration {
  createPrompt(input: string): string;
  parseResponse?(response: string, input: string): ParsedResponse;
  model?: string;
}
```

For example:

```javascript
// eli5.mjs
export default {
  createPrompt(input) {
    return `Provide a very detailed explanation but like I am 5 years old (ELI5) on this topic: ${input}.\n###\n`;
  },
  // Note: this is the default parseResponse and can therefore be ommitted
  // parseResponse(response, _input) {
  //     return { message: response };
  // },
};
```

## Adding a builtin prompt

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
- GH workflow + tests
- Support older Node.js versions?
- Interactively prompt OpenAI API key and save to filesystem (when OPENAPI_KEY is not set)
