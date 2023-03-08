const PROGRAMMING_ERROR_CLASSES: Array<typeof Error> = [
  TypeError,
  ReferenceError,
  RangeError,
  SyntaxError,
];

function isProgrammingError(err: unknown) {
  return PROGRAMMING_ERROR_CLASSES.some((ErrorClass: ErrorConstructor) => {
    return err instanceof ErrorClass;
  });
}

export class AppError extends Error {
  exitCode = 1;

  private static wrap(err: unknown) {
    // We don't wrap errors that indicate unexpected/programming errors
    if (isProgrammingError(err)) {
      return err;
    }
    const cause = err instanceof Error ? err : undefined;
    return new this({ cause });
  }

  get name(): string {
    return this.constructor.name;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
    };
  }

  toString(): string | this {
    const printCause = this.cause
      ? () => {
          return `(cause: ${this.cause})`;
        }
      : () => "";
    return `${this.name}: ${this.message}${printCause()}`;
  }

  constructor(opts?: { message?: string; cause?: Error }) {
    super(opts?.message, { cause: opts?.cause });
  }
}

export class ApiError extends AppError {}
export class ConfigError extends AppError {}
