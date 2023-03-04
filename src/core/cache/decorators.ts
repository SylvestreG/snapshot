import { memoryCache } from '.';

export interface CacheOptions {
  ttl: number | undefined;
}

const defaultCacheOptions = {
  ttl: 60,
};

export function Cached(options: CacheOptions = defaultCacheOptions) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const className = target.constructor.name;
    const methodName = propertyKey;
    const originalMethod = descriptor.value;

    return {
      ...descriptor,
      async value(...args: any[]) {
        const argsJSON = args.map(() => JSON.stringify(args));
        const cacheKey = 'cache.Cached().' + className + '.' + methodName + '(' + argsJSON.join(',') + ')';

        // Get cache
        const valueFromCache = memoryCache.get(cacheKey);
        if (valueFromCache !== undefined) {
          return valueFromCache;
        }

        // Update memory cache
        const valueToSave = await originalMethod.apply(this, args);
        memoryCache.set(cacheKey, valueToSave, options.ttl);

        return valueToSave;
      },
    };
  };
}
