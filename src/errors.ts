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
  cause?: Error;
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
    super(opts?.message);
    this.cause = opts?.cause;
  }
}

export class ApiError extends AppError {
  type: string;
  param: string;
  code: string;
  constructor(data: {
    message: string;
    type: string;
    param: string;
    code: string;
  }) {
    super({ message: data.message });
    this.message = data.message;
    this.type = data.type;
    this.param = data.param;
    this.code = data.code;
  }
  toString(): string {
    return `${this.name}: ${this.message} (type = ${this.type}, param = ${this.param}, code = ${this.code})`;
  }
}
export class ConfigError extends AppError {}
