type Object = { [x: string]: any };

export function isObject(val: any) {
  if (val && typeof val === 'object' && !Array.isArray(val)) return true;
  return false;
}

export function merge(target: Object, source: Object) {
  for (const key in source) {
    if (isObject(source[key])) {
      if (!target[key]) target[key] = {};
      merge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

export function mergeDeep<T extends Object, S extends Object>(obj1: T, obj2: S) {
  const result = {};
  merge(result, obj1);
  merge(result, obj2);
  return result as T & S;
}
