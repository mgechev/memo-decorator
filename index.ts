declare var require: any;

const memoize = require('lodash.memoize');

export interface Resolver {
  (...args: any[]): any;
}

export default (resolver?: Resolver) => (
  target: any,
  key: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor => {
  if (typeof descriptor.value !== 'function') {
    throw new Error('Memoization can be applied only to methods');
  }

  descriptor.value = memoize(descriptor.value, resolver);
  return descriptor;
};
