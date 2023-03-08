export async function asyncIterableToArray<T>(
  asyncIterator: AsyncIterable<T>
): Promise<T[]> {
  const arr = [];
  for await (const ele of asyncIterator) {
    arr.push(ele);
  }
  return arr;
}
