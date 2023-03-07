export default abstract class KeyValueStore<K, V> {
  // constructor(opts?: {}) {}
  abstract set(key: K, value: V): Promise<void>;
  abstract get(key: K): Promise<string | undefined>;
  abstract delete(key: K): Promise<void>;
}
