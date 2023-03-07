import { test } from "vitest";
import { KeyValueStore, FileSystemKVS, MemoryKVS } from "./index.js";

function runTestForKvs(
  KvsClass: new (opts: any) => KeyValueStore<string, string>
) {
  const testData = [
    ["somekey", "somevalue"],
    ['some/  crazy/"key !!😂', "somevalue"],
    ["well", 'some crazy/"value !!😂'],
    ["somekeythatgetsoverwritten", "initial value"],
    ["somekeythatgetsoverwritten", "final value"],
  ];
  const prefix = `kvs: ${KvsClass.name}:`;
  test(`${prefix} integration test`, async ({ expect }) => {
    const kvs = new KvsClass({});
    for (const [k, v] of testData) {
      await kvs.set(k, v);
      let retrievedVal = await kvs.get(k);
      expect(retrievedVal).toBe(v);
    }

    const map = new Map();
    testData.forEach(([k, v]) => map.set(k, v));
    for (const [k, _] of testData) {
      const retrievedVal = await kvs.get(k);
      expect(retrievedVal).toBe(map.get(k));
    }

    expect(await kvs.get("key does not exist")).toBeUndefined();
    await kvs.delete("somekey");
    expect(await kvs.get("somekey")).toBeUndefined();
  });
}

runTestForKvs(MemoryKVS);
runTestForKvs(FileSystemKVS);
