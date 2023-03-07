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

## TODO

- Implement a cache.
- Streaming API.
- Support older Node.js versions?
