export * from './decorators';

interface cacheEntry {
  v: any;
  t?: number;
}

/*
 * App cache, in memory
 */
const memoryVariables: { [k: string]: cacheEntry } = {};

function get<T>(key: string, ignoreTTL = false): T | undefined {
  // Not found
  const memoryVar = memoryVariables[key];
  if (!memoryVar) {
    return undefined;
  }

  // ttl? expired?
  if (!ignoreTTL && memoryVar.t && memoryVar.t < Date.now()) {
    return undefined;
  }

  return memoryVariables[key].v;
}

function set<T>(key: string, value: T, ttl?: number): T {
  // ttl?
  let liveTime: number | undefined;
  if (ttl) {
    liveTime = Date.now() + ttl * 1000;
  }

  // Update memory cache
  memoryVariables[key] = {
    v: value,
    t: liveTime,
  };

  return memoryVariables[key].v;
}

async function call<T>(key: string, callback: (...args: any[]) => Promise<T>, ...args: any[]): Promise<T> {
  // Get cache
  const valueFromCache = get<T>(key);
  if (valueFromCache !== undefined) {
    return valueFromCache;
  }

  // Update memory cache
  const valueToSave = await callback(...args);
  set(key, valueToSave);

  return valueToSave;
}

export const memoryCache = {
  get,
  set,
  call,
};
