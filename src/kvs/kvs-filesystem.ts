import { mkdtemp, unlink, readFile, writeFile } from "node:fs/promises";
import mkdirp from "mkdirp";
import { join as pathJoin } from "path";
import { createHash } from "node:crypto";
import KeyValueStore from "./abstract.js";
import { tmpdir } from "node:os";

export default class FileSystemKVS<K, V> extends KeyValueStore<K, V> {
  baseDir: string;
  // tmpPath: string | undefined;
  waitInit: Promise<void>;

  constructor(opts: { baseDir?: string }) {
    super();
    this.baseDir = opts.baseDir ?? "";
    this.waitInit = this._init();
  }

  private async _init() {
    if (this.baseDir) {
      // ensure base dir exists
      await mkdirp(this.baseDir);
      return;
    }
    // create temporary dir
    const tmpPath = await mkdtemp(pathJoin(tmpdir(), "filesystem-kvs-"));
    this.baseDir = tmpPath;
  }

  private _keyToFilename(key: K): string {
    return createHash("sha1").update(`${key}`).digest().toString("hex");
  }

  private _keyToFilePath(key: K): string {
    // if (!this.baseDir) throw new TypeError('_keyToFilePath');
    const baseDir = this.baseDir;
    const filePath = pathJoin(baseDir, this._keyToFilename(key));
    // console.log({ filePath });
    return filePath;
  }

  async set(key: K, value: V) {
    await this.waitInit;
    await writeFile(this._keyToFilePath(key), `${value}`);
  }

  async get(key: K): Promise<string | undefined> {
    await this.waitInit;
    const filePath = this._keyToFilePath(key);
    try {
      const val = await readFile(filePath, "utf8");
      return val;
    } catch (err) {
      return;
    }
  }

  async delete(key: K) {
    await this.waitInit;
    try {
      await unlink(this._keyToFilePath(key));
    } catch {}
  }
}
