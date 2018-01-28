import memo from './index';

class Foo {
  @memo()
  foo(a: number) {
    console.log('foo: called');
    return 42;
  }

  @memo(_ => 1)
  bar(a: number) {
    console.log('bar: called');
    return 42;
  }
}

const a = new Foo();
a.foo(1);
a.foo(1);
a.foo(2);

a.bar(1);
a.bar(2);

const b = new Foo();
// Uses the same cache as `a`.
b.foo(1);

// Outputs:
// foo: called
// foo: called
// bar: called
// baz: called
