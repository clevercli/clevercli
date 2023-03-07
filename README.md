# clevercli

clevercli is a CLI that queries OpenAI models (e.g. ChatGPT). New prompt types can easily be added and there is a growing list of community maintained prompts.

```console
npm install -g clevercli
```

## Usage

```console
clevercli <prompt_type> <prompt>
```

## Example

```console
clevercli eli5 "why is the sky blue?"
```

## TODO

- Implement a cache.
- Streaming API.
- Support older Node.js versions?
