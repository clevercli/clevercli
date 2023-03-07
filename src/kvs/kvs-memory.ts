import KeyValueStore from "./abstract.js";

export default class MemoryKVS<K, V> extends KeyValueStore<K, V> {
  map: Map<K, string>;

  constructor() {
    super();
    this.map = new Map<K, string>();
  }
  async set(key: K, value: V) {
    this.map.set(key, `${value}`);
  }
  async get(key: K): Promise<string | undefined> {
    return this.map.get(key);
  }
  async delete(key: K) {
    this.map.delete(key);
  }
}
