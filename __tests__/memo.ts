import memo from '../';

describe('memo decorator', () => {
  it('should apply memoization', () => {
    let count = 0;
    class Foo {
      @memo()
      bar() {
        count++;
        return 42;
      }
    }

    const a = new Foo();
    a.bar();
    expect(count).toBe(1);
    a.bar();
    expect(count).toBe(1);
  });

  it('should not call multiple times for different instances', () => {
    let count = 0;
    class Foo {
      @memo()
      bar() {
        count++;
        return 42;
      }
    }

    const a = new Foo();
    const b = new Foo();
    a.bar();
    b.bar();
    expect(count).toBe(1);
    a.bar();
    expect(count).toBe(1);
  });

  it('should get invoked multiple times when method called with different args', () => {
    let count = 0;
    class Foo {
      @memo()
      bar(num: number) {
        count++;
        return 42;
      }
    }

    const a = new Foo();
    const b = new Foo();
    a.bar(1);
    b.bar(2);
    expect(count).toBe(2);
    a.bar(2);
    expect(count).toBe(2);
  });

  it('should work with resolve function', () => {
    let count = 0;
    class Foo {
      @memo({ resolver: () => 1 })
      bar(num: number) {
        count++;
        return 42;
      }
    }

    const a = new Foo();
    const b = new Foo();
    a.bar(1);
    b.bar(2);
    expect(count).toBe(1);
    a.bar(3);
    expect(count).toBe(1);
  });
});
